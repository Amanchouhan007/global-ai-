import fs from 'node:fs';
import path from 'node:path';
import { GoogleGenAI, Type } from '@google/genai';

function loadRootEnvFallback() {
  if (process.env.GEMINI_API_KEY) return;
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '..', '.env'),
    path.resolve(process.cwd(), '..', '..', '.env'),
  ];
  for (const envPath of candidates) {
    try {
      if (!fs.existsSync(envPath)) continue;
      const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;
        const eqIdx = line.indexOf('=');
        if (eqIdx === -1) continue;
        const key = line.slice(0, eqIdx).trim();
        const val = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        if ((key === 'GEMINI_API_KEY' || key === 'GEMINI_MODEL') && val && !process.env[key]) {
          process.env[key] = val;
        }
      }
      if (process.env.GEMINI_API_KEY) break;
    } catch {
      // Ignore unreadable local .env files
    }
  }
}

const MAX_BODY_BYTES = 32 * 1024; // 32 KB request cap
const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY_ITEMS = 6;
const MAX_HISTORY_ITEM_CHARS = 1000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

const SUPPORTED_LANGUAGES = new Set(['EN', 'HI', 'MR', 'GU', 'BN', 'AR']);
const LANGUAGE_NAMES = {
  EN: 'English',
  HI: 'Hindi',
  MR: 'Marathi',
  GU: 'Gujarati',
  BN: 'Bengali',
  AR: 'Arabic',
};

const EMERGENCY_TRIGGERS = [
  'crushing chest pain',
  'chest pain radiating',
  'pain in left arm and chest',
  'chest tightness on exertion',
  'difficulty breathing',
  'severe breathlessness',
  'shortness of breath at rest',
  'lips turning blue',
  'sudden weakness on one side',
  'slurred speech',
  'facial drooping',
  'coughing up blood',
  'uncontrolled bleeding',
  'unconscious',
  'fainting with chest pain',
  'worst headache of my life',
  'thunderclap headache',
  'stiff neck with high fever',
  'vomiting blood',
  'black tarry stools',
  'sudden loss of vision',
  'suicidal',
  'self-harm',
];

// Best-effort in-memory per-instance rate limit store
const ipRequests = new Map();

function getClientIp(req, context) {
  return (
    context?.ip ||
    req.headers.get('x-nf-client-connection-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (ipRequests.get(ip) || []).filter((ts) => ts > windowStart);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = recent[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
    ipRequests.set(ip, recent);
    return { allowed: false, retryAfterSec };
  }

  recent.push(now);
  ipRequests.set(ip, recent);
  if (ipRequests.size > 500) {
    for (const [key, timestamps] of ipRequests.entries()) {
      if (timestamps.every((ts) => ts <= windowStart)) {
        ipRequests.delete(key);
      }
    }
  }
  return { allowed: true, retryAfterSec: 0 };
}

export function detectEmergencyRedFlags(text) {
  if (!text || typeof text !== 'string') return false;
  const q = text.toLowerCase();
  return EMERGENCY_TRIGGERS.some((trigger) => q.includes(trigger));
}

function jsonResponse(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  });
}

function buildSystemInstruction(languageCode, category, isEmergency) {
  const langName = LANGUAGE_NAMES[languageCode] || 'English';
  return [
    'You are the Health Orbit Pro™ Clinical Guidance Assistant, providing educational symptom guidance and risk triage under clinical safety protocols.',
    `Active category context: ${category || 'symptoms'}.`,
    `Respond in ${langName} (${languageCode}).`,
    'STRICT MEDICAL SAFETY RULES:',
    '1. NEVER provide a definitive medical diagnosis.',
    '2. NEVER prescribe medications, name prescription drugs to start/stop, or recommend drug dosages.',
    '3. Clearly communicate clinical uncertainty and state that educational guidance is not a substitute for an in-person licensed physician.',
    '4. Always highlight red-flag warning signs and escalate emergency symptoms to immediate urgent care (India: 108 / 112, US: 911).',
    isEmergency
      ? 'CRITICAL OVERRIDE: The user message matched deterministic emergency red-flag criteria. You MUST set urgency to "RED" and prioritize immediate emergency medical escalation at the top of replyText.'
      : 'Classify urgency conservatively as "RED" (immediate emergency), "YELLOW" (see a doctor within 24-48 hours), or "GREEN" (self-care/monitoring with clear return precautions).',
  ].join('\n');
}

export default async function handler(req, context) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        Allow: 'POST, OPTIONS',
      },
    });
  }

  if (req.method !== 'POST') {
    return jsonResponse(
      405,
      { error: 'Method not allowed. Use POST.' },
      { Allow: 'POST, OPTIONS' }
    );
  }

  const clientIp = getClientIp(req, context);
  const rate = checkRateLimit(clientIp);
  if (!rate.allowed) {
    return jsonResponse(
      429,
      { error: 'Too many requests. Please wait before trying again.' },
      { 'Retry-After': String(rate.retryAfterSec) }
    );
  }

  const contentLengthHeader = req.headers.get('content-length');
  if (contentLengthHeader && Number(contentLengthHeader) > MAX_BODY_BYTES) {
    return jsonResponse(413, { error: 'Request payload exceeds 32 KB limit.' });
  }

  let rawBody;
  try {
    rawBody = await req.text();
  } catch {
    return jsonResponse(400, { error: 'Unable to read request body.' });
  }

  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    return jsonResponse(413, { error: 'Request payload exceeds 32 KB limit.' });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody || '{}');
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON request body.' });
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return jsonResponse(400, { error: 'Request body must be a JSON object.' });
  }

  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  if (!message) {
    return jsonResponse(400, { error: 'Field "message" is required and must be a non-empty string.' });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return jsonResponse(400, {
      error: `Field "message" must not exceed ${MAX_MESSAGE_CHARS} characters.`,
    });
  }

  const rawLang = typeof payload.language === 'string' ? payload.language.trim().toUpperCase() : 'EN';
  if (!SUPPORTED_LANGUAGES.has(rawLang)) {
    return jsonResponse(400, {
      error: 'Unsupported "language". Allowed values: EN, HI, MR, GU, BN, AR.',
    });
  }

  const category =
    typeof payload.category === 'string' && payload.category.trim()
      ? payload.category.trim().slice(0, 64)
      : 'symptoms';

  let safeHistory = [];
  if (payload.history !== undefined) {
    if (!Array.isArray(payload.history)) {
      return jsonResponse(400, { error: 'Field "history" must be an array.' });
    }
    safeHistory = payload.history
      .slice(-MAX_HISTORY_ITEMS)
      .filter((item) => item && typeof item === 'object')
      .map((item) => {
        const text =
          typeof item.text === 'string'
            ? item.text.trim().slice(0, MAX_HISTORY_ITEM_CHARS)
            : typeof item.content === 'string'
              ? item.content.trim().slice(0, MAX_HISTORY_ITEM_CHARS)
              : '';
        const role = item.sender === 'ai' || item.role === 'model' ? 'model' : 'user';
        return text ? { role, parts: [{ text }] } : null;
      })
      .filter(Boolean);
  }

  loadRootEnvFallback();
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return jsonResponse(503, {
      error: 'AI service is not configured on the server. Missing GEMINI_API_KEY.',
      code: 'GEMINI_NOT_CONFIGURED',
    });
  }

  const deterministicEmergency = detectEmergencyRedFlags(message);
  const modelName = process.env.GEMINI_MODEL?.trim() || 'gemini-3.7-flash';

  try {
    const ai = new GoogleGenAI({ apiKey, httpOptions: { timeout: 10000 } });
    const contents = [...safeHistory, { role: 'user', parts: [{ text: message }] }];
    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction: buildSystemInstruction(rawLang, category, deterministicEmergency),
        temperature: 0.25,
        maxOutputTokens: 700,
        thinkingConfig: { thinkingBudget: 0 },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            replyText: { type: Type.STRING },
            urgency: { type: Type.STRING, enum: ['RED', 'YELLOW', 'GREEN'] },
            sources: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['replyText', 'urgency', 'sources'],
        },
      },
    });

    let parsed;
    try {
      parsed = JSON.parse(response.text || '{}');
    } catch {
      parsed = {
        replyText:
          response.text?.trim() ||
          'Please consult a qualified physician for a clinical evaluation.',
        urgency: deterministicEmergency ? 'RED' : 'YELLOW',
        sources: ['Health Orbit Pro™ Clinical Safety Protocol'],
      };
    }

    const finalUrgency = deterministicEmergency
      ? 'RED'
      : ['RED', 'YELLOW', 'GREEN'].includes(parsed.urgency)
        ? parsed.urgency
        : 'YELLOW';

    let finalReply =
      typeof parsed.replyText === 'string' && parsed.replyText.trim()
        ? parsed.replyText.trim()
        : 'Please consult a qualified physician for an in-person clinical evaluation.';

    if (
      deterministicEmergency &&
      !/108|112|911|emergency/i.test(finalReply)
    ) {
      finalReply = `URGENT: Please seek immediate emergency medical care (India: 108 / 112, US: 911).\n\n${finalReply}`;
    }

    const finalSources = Array.isArray(parsed.sources)
      ? parsed.sources.filter((s) => typeof s === 'string' && s.trim()).slice(0, 5)
      : ['Health Orbit Pro™ Clinical Safety Protocol'];

    return jsonResponse(200, {
      replyText: finalReply,
      urgency: finalUrgency,
      sources:
        finalSources.length > 0
          ? finalSources
          : ['Health Orbit Pro™ Clinical Safety Protocol'],
    });
  } catch (err) {
    console.error('Gemini chat function error:', err?.name || 'Error');
    return jsonResponse(502, {
      error: 'Unable to generate AI response at this time. Please try again later.',
      code: 'AI_UPSTREAM_ERROR',
    });
  }
}

export const config = {
  path: '/api/chat',
};
