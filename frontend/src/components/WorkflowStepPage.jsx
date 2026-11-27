import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  MessageSquareText,
  Activity,
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  Mic,
  FileText,
  Globe,
  AlertTriangle,
  Sparkles,
  ClipboardCheck
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { BRAND } from '../config/brand';

const STEP_CONFIG = {
  'describe-symptoms': {
    stepNumber: '01',
    tag: 'Text, Voice or Report',
    title: 'Describe Your Symptoms',
    subtitle:
      'Share what you are experiencing in plain, everyday language — via text, voice dictation, or by referencing lab report values — with zero medical jargon required.',
    accent: 'emerald',
    icon: MessageSquareText,
    highlights: [
      {
        icon: MessageSquareText,
        title: 'Natural Plain-Language Input',
        desc: 'Describe duration, severity, and location just as you would to a trusted family physician.'
      },
      {
        icon: Mic,
        title: 'Voice Dictation & 6 Languages',
        desc: 'Supported across English, Hindi, Marathi, Gujarati, Bengali, and Arabic (RTL).'
      },
      {
        icon: FileText,
        title: 'Lab Report & Context Support',
        desc: 'Mention CBC, sugar, thyroid, or blood pressure readings alongside physical symptoms.'
      }
    ],
    sampleTitle: 'Example Symptom Inputs You Can Try',
    samples: [
      'Severe right-sided throbbing headache with light sensitivity since yesterday morning',
      'High fever (102°F) with body ache and chills for 2 days',
      'Mild dizziness and fatigue after skipping meals, BP reading 110/70'
    ],
    ctaLabel: 'Open Symptom Checker'
  },
  'clinical-triaging': {
    stepNumber: '02',
    tag: 'Co-Intelligence AI',
    title: 'AI Clinical Triaging & Matching',
    subtitle:
      'Your symptom details are screened for urgent red flags and organized into clear Red, Yellow, or Green clinical urgency levels so you know what to do next.',
    accent: 'teal',
    icon: Activity,
    highlights: [
      {
        icon: AlertTriangle,
        title: 'Red — Immediate Emergency (102 / 112)',
        desc: 'Detects critical danger signs like chest pain, breathing difficulty, or sudden neurological changes.'
      },
      {
        icon: Activity,
        title: 'Yellow — Consult Doctor (24–48 hrs)',
        desc: 'Identifies persistent or worsening symptoms that need timely in-person clinical evaluation.'
      },
      {
        icon: CheckCircle2,
        title: 'Green — Safe Home Monitoring',
        desc: 'Guides mild, self-limiting symptoms with clear watch-out signs if anything changes.'
      }
    ],
    sampleTitle: 'How Triage Levels Are Stratified',
    samples: [
      'RED: Chest tightness radiating to left arm, sudden confusion, or severe shortness of breath -> Seek emergency care immediately',
      'YELLOW: Persistent migraine with aura or fever lasting over 48 hours -> Schedule a physician visit within 24–48 hours',
      'GREEN: Mild seasonal throat scratchiness with stable vitals -> Supportive hydration, rest, and monitoring'
    ],
    ctaLabel: 'Try Live Triage Check'
  },
  'actionable-guidance': {
    stepNumber: '03',
    tag: 'Evidence Guidance',
    title: 'Receive Actionable Guidance',
    subtitle:
      'Get a concise, structured ~100-word clinical briefing covering safe home care, harmful actions to avoid, and a practical doctor-visit preparation checklist.',
    accent: 'emerald',
    icon: FileCheck2,
    highlights: [
      {
        icon: CheckCircle2,
        title: 'Safe Home-Care Steps',
        desc: 'Clear, supportive comfort measures like hydration, rest, and temperature monitoring.'
      },
      {
        icon: ShieldCheck,
        title: 'What NOT To Do',
        desc: 'Prevents risky self-medication or ignoring worsening red-flag symptoms.'
      },
      {
        icon: ClipboardCheck,
        title: 'Doctor Visit Checklist',
        desc: 'Helps you prepare key symptom timelines, medications, and questions before your appointment.'
      }
    ],
    sampleTitle: 'Interactive Doctor Visit Preparation Checklist',
    samples: [
      'Note exact symptom start time, frequency, and triggers',
      'List current medications, allergies, and recent lab or BP/sugar readings',
      'Write down top 2 questions to ask your physician during consultation'
    ],
    ctaLabel: 'Generate Your Guidance'
  }
};

export default function WorkflowStepPage({ stepId, onNavigate, onOpenDisclaimer, onOpenAgeGate }) {
  const step = STEP_CONFIG[stepId] || STEP_CONFIG['describe-symptoms'];
  const StepIcon = step.icon;
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (idx) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleOpenChecker = () => {
    if (onNavigate) {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById('categories');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#F8FAF9] text-slate-900 font-sans flex flex-col">
      <Header onNavigate={onNavigate} onOpenDisclaimer={onOpenDisclaimer} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Top Back + Step Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 text-xs sm:text-sm font-bold text-[#0D5C3A] hover:bg-[#EBF5F0] transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(STEP_CONFIG).map(([key, cfg]) => {
              const isActive = key === (STEP_CONFIG[stepId] ? stepId : 'describe-symptoms');
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onNavigate && onNavigate(`/workflow/${key}`)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0D5C3A] text-white border-[#0D5C3A]'
                      : 'bg-white text-slate-700 border-emerald-200 hover:bg-[#EBF5F0] hover:text-[#0D5C3A]'
                  }`}
                >
                  {cfg.stepNumber}. {cfg.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Feature Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-950/10 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF5F0] border border-emerald-200 text-xs font-black text-[#0D5C3A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STEP {step.stepNumber} • {step.tag}</span>
            </div>
            <span className="text-xs font-bold text-slate-500">{BRAND.name}™ Clinical Workflow</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#EBF5F0] border border-emerald-200 text-[#0D5C3A] flex items-center justify-center shrink-0">
              <StepIcon className="w-8 h-8 stroke-[2.2]" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {step.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-3xl">
                {step.subtitle}
              </p>
            </div>
          </div>

          {/* 3 Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {step.highlights.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F4F9F6] border border-emerald-100 space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 text-[#0D5C3A] flex items-center justify-center">
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-slate-900">{item.title}</h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Feature Detail / Checklist */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-sm space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">{step.sampleTitle}</h2>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D5C3A] bg-[#EBF5F0] px-3 py-1 rounded-full">
              <Globe className="w-3.5 h-3.5" /> Educational Triage Guidance
            </span>
          </div>

          <div className="space-y-3">
            {step.samples.map((text, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleItem(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                  checkedItems[idx]
                    ? 'bg-[#EBF5F0] border-[#0D5C3A]'
                    : 'bg-[#F8FAF9] border-emerald-100 hover:border-emerald-300'
                }`}
              >
                <CheckCircle2
                  className={`w-5 h-5 shrink-0 mt-0.5 ${
                    checkedItems[idx] ? 'text-[#0D5C3A]' : 'text-slate-400'
                  }`}
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {text}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-medium">
              Educational guidance only — for medical emergencies, dial 102 / 112 immediately.
            </p>
            <button
              type="button"
              onClick={handleOpenChecker}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D5C3A] hover:bg-[#0A4D30] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-sm"
            >
              <span>{step.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <Footer
        onOpenDisclaimer={onOpenDisclaimer}
        onOpenAgeGate={onOpenAgeGate}
        onNavigate={onNavigate}
      />
    </div>
  );
}
