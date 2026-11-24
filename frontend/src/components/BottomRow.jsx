import React, { useState } from 'react';
import {
  Siren,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  Info,
  Stethoscope,
  HeartPulse
} from 'lucide-react';
import { BRAND } from '../config/brand';

export default function BottomRow({ onStartAssessment }) {
  const [activeSeverityTab, setActiveSeverityTab] = useState('YELLOW');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const severityData = {
    RED: {
      title: 'Red — Immediate Emergency Action',
      badge: 'Critical Red-Flag Emergency',
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      tagColor: 'bg-red-600 text-white',
      definition: 'Life-threatening or time-sensitive physiological conditions requiring immediate hospital evaluation.',
      sampleCondition: 'Acute Crushing Chest Pain with Shortness of Breath',
      signs: [
        'Sudden, severe chest pressure or radiation to arm/jaw',
        'Acute difficulty breathing or cyanosis (blue lips)',
        'Sudden weakness, facial droop, or slurred speech (FAST signs)',
        'Uncontrolled bleeding, severe trauma, or loss of consciousness'
      ],
      action: 'Call emergency medical services (108 in India / 911 in US) or go to the nearest emergency department immediately. Do not attempt to drive yourself.'
    },
    YELLOW: {
      title: 'Yellow — Clinical Doctor Consultation (24–48h)',
      badge: 'Moderate Caution / Medical Review',
      color: 'text-amber-800',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      tagColor: 'bg-amber-500 text-white',
      definition: 'Sub-acute symptoms requiring physical examination, lab tests, or prescription medications by a licensed clinician.',
      sampleCondition: 'Persistent High Fever with Productive Cough (> 3 Days)',
      signs: [
        'Fever exceeding 101°F (38.3°C) that persists past 72 hours',
        'Unexplained weight loss or severe nocturnal sweating',
        'Persistent abdominal pain or inability to retain fluids',
        'Worsening chronic condition flare-up (asthma, hypertension, diabetes)'
      ],
      action: 'Schedule an in-person consultation with a qualified general practitioner or relevant specialist within 24 to 48 hours for clinical evaluation and diagnostics.'
    },
    GREEN: {
      title: 'Green — Safe Self-Care & Observation',
      badge: 'Low Urgency / Home Supportive Care',
      color: 'text-emerald-800',
      bgColor: 'bg-[#EBF5F0]',
      borderColor: 'border-emerald-200',
      tagColor: 'bg-[#0D5C3A] text-white',
      definition: 'Mild, self-limiting symptoms that typically resolve with rest, balanced hydration, and gentle home supportive care.',
      sampleCondition: 'Mild Tension Headache or Seasonal Runny Nose',
      signs: [
        'Mild nasal congestion without facial pain or high fever',
        'Transient muscle fatigue after exercise with normal vital signs',
        'Occasional acid reflux after a heavy meal without weight loss',
        'Minor superficial scratches or bruises without swelling'
      ],
      action: 'Maintain hydration, prioritize 7–8 hours of restorative sleep, and monitor symptoms. If symptoms fail to improve or worsen after 48–72 hours, consult a physician.'
    }
  };

  const faqs = [
    {
      q: 'How does Health Orbit Pro™ categorize my symptoms safely?',
      a: 'Health Orbit Pro™ applies evidence-based clinical triage rules curated by Dr. Pratap Madhukar (38 years clinical experience) and ICMR/WHO guidelines. Your inputs are mapped to symptom patterns and categorized into Red (Emergency), Yellow (Doctor in 24–48h), or Green (Safe Self-Care).'
    },
    {
      q: 'Is my health data stored on your servers or shared with third parties?',
      a: 'No. In strict adherence with the Indian Digital Personal Data Protection (DPDP) Act 2023, symptom inquiries in guest mode are processed locally in your session memory. We do not maintain server-side health dossiers, track personal health searches, or sell advertising profiles.'
    },
    {
      q: 'Does Health Orbit Pro™ provide prescriptions or replace my doctor?',
      a: 'No. The platform is designed strictly for educational triage guidance and consultation preparation. It does not prescribe medications, adjust dosages, or replace in-person examination by a licensed medical practitioner.'
    },
    {
      q: 'Are all 1,000 clinical health cards genuinely free?',
      a: 'Yes. All 1,000 clinical health cards across all 12 core specialties are 100% free for individuals and families, with no subscription barriers or paywalls.'
    },
    {
      q: 'What should I do if I experience a sudden red-flag medical emergency?',
      a: 'If you or someone nearby experiences sudden chest crushing pain, facial drooping, slurred speech, or worst-ever headache, immediately dial national emergency services (108 / 112 in India, 911 in the US) or proceed to the nearest hospital emergency room.'
    }
  ];

  const currentSeverity = severityData[activeSeverityTab];

  return (
    <section id="triage-guide" className="py-16 sm:py-20 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20 scroll-mt-20">

      {/* 1. Interactive Clinical Triage Safety Guide */}
      <div className="space-y-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5F0] border border-emerald-200 text-xs font-bold text-[#0D5C3A] shadow-2xs">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Physician-Curated Triage Safety Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Understanding Your Risk Level: Red, Yellow & Green
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Clinical medicine classifies symptoms by urgency, not guesswork. Use our stratified decision matrix below to understand when to rest, when to see a doctor, and when to seek immediate emergency care.
          </p>
        </div>

        {/* Severity Tabs Navigation: stacked full-width on mobile, horizontal row on tablet/desktop */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setActiveSeverityTab('RED')}
            className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-3 rounded-2xl sm:rounded-full text-sm sm:text-base font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${activeSeverityTab === 'RED'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-red-50'
              }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span>Emergency (Red)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSeverityTab('YELLOW')}
            className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-3 rounded-2xl sm:rounded-full text-sm sm:text-base font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${activeSeverityTab === 'YELLOW'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
              }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300"></span>
            <span>Doctor Consultation (Yellow)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSeverityTab('GREEN')}
            className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-3 rounded-2xl sm:rounded-full text-sm sm:text-base font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${activeSeverityTab === 'GREEN'
                ? 'bg-[#0D5C3A] text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-[#EBF5F0]'
              }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Self-Care & Observation (Green)</span>
          </button>
        </div>

        {/* Active Severity Detailed Card */}
        <div className={`p-6 sm:p-8 lg:p-10 rounded-3xl border ${currentSeverity.borderColor} ${currentSeverity.bgColor} shadow-sm space-y-6 text-left transition-all duration-200`}>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${currentSeverity.tagColor}`}>
                {currentSeverity.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentSeverity.title}
              </h3>
            </div>
            <div className="text-xs font-semibold text-slate-500">
              Guidance reviewed by Dr Pratap Madhukar
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            {currentSeverity.definition}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left: Classic Signs & Symptoms */}
            <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <AlertTriangle className={`w-4 h-4 ${currentSeverity.color}`} />
                <span>Classic Clinical Indicators</span>
              </div>

              <div className="space-y-1.5">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Example: {currentSeverity.sampleCondition}</span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {currentSeverity.signs.map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={`${currentSeverity.color} font-bold`}>•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Exact Actionable Guidance & Escalation Rule */}
            <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <ShieldCheck className={`w-4 h-4 ${currentSeverity.color}`} />
                    <span>Recommended Patient Action</span>
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {activeSeverityTab === 'RED' ? '< 60 Min Response' : activeSeverityTab === 'YELLOW' ? '24–48h Consultation' : '48–72h Observation'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {currentSeverity.action}
                </p>

                {/* Escalation Rule */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                  <span className="font-bold text-slate-900 block flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Clinical Escalation Threshold:
                  </span>
                  <p className="text-slate-600 leading-snug">
                    {activeSeverityTab === 'GREEN' && 'If symptoms persist past 72 hours, develop fever > 101°F, or worsen, transition to Yellow Consultation.'}
                    {activeSeverityTab === 'YELLOW' && 'If chest pain, confusion, severe breathlessness, or worst-ever headache emerges, escalate to Red Emergency immediately.'}
                    {activeSeverityTab === 'RED' && 'Time-sensitive emergency. Do not attempt to drive yourself. Dial 108/112 in India or 911 in the US.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onStartAssessment ? onStartAssessment() : (window.location.pathname = '/user/dashboard')}
                className="w-full py-3 px-5 rounded-xl bg-[#0D5C3A] hover:bg-[#0A4D30] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Check Your Own Symptoms Under This Protocol</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 2. Frequently Asked Questions (FAQ) */}
      <div id="faq" className="space-y-8 scroll-mt-20 max-w-4xl mx-auto">

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5F0] border border-emerald-200 text-xs font-bold text-[#0D5C3A]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Patient Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Common questions regarding our clinical triage, data privacy, and evidence protocols.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-emerald-950/10 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-black text-base sm:text-lg text-slate-900 cursor-pointer hover:text-[#0D5C3A] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0D5C3A]' : ''
                      }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-sm sm:text-base text-slate-700 leading-relaxed font-medium border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* 3. Final Conversion Call-To-Action Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0D5C3A] via-[#0E7A4C] to-[#0A4D30] p-8 sm:p-12 text-white shadow-xl text-center space-y-6 max-w-5xl mx-auto">
        <div className="space-y-2 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            Ready in Under 2 Minutes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Take Control of Your Health Decisions Today
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-medium">
            Evaluate your symptoms with physician-curated clinical intelligence. 100% free, private, and session-isolated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onStartAssessment ? onStartAssessment() : (window.location.pathname = '/user/dashboard')}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#FDE047] hover:bg-[#FACC15] text-slate-900 text-sm sm:text-base font-black shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start Free Symptom Check</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('categories');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-bold transition-all cursor-pointer"
          >
            Explore 12 Specialties
          </button>
        </div>
      </div>

    </section>
  );
}
