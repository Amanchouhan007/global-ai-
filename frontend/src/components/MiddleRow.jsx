import React from 'react';
import {
  MessageSquareText,
  Activity,
  FileCheck2,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Brain,
  Award
} from 'lucide-react';
import { BRAND } from '../config/brand';
import { FOUNDER_INFO } from '../config/company';

export default function MiddleRow({ onStartAssessment }) {
  const steps = [
    {
      step: '01',
      title: 'Describe Your Symptoms',
      desc: 'Enter what you are experiencing in plain English or your preferred regional language. Include duration, severity, and any accompanying discomfort.',
      icon: MessageSquareText,
      badge: 'Natural Text or Voice',
      color: 'text-[#0D5C3A]',
      bgColor: 'bg-[#EBF5F0] border-emerald-200'
    },
    {
      step: '02',
      title: 'Clinical Risk Stratification',
      desc: 'Our physician-guided decision rules evaluate your inputs against 1,000+ conditions and categorize urgency into Green, Yellow, or Red tiers.',
      icon: Activity,
      badge: 'Evidence-Based Triage',
      color: 'text-[#0F766E]',
      bgColor: 'bg-[#F0FDFA] border-teal-200'
    },
    {
      step: '03',
      title: 'Clear Actionable Next Steps',
      desc: 'Receive a structured clinical summary (≈ 100 words), guidance on safe self-care, key questions for your physician, or emergency escalation alerts.',
      icon: FileCheck2,
      badge: 'Doctor & Family Ready',
      color: 'text-[#0D5C3A]',
      bgColor: 'bg-[#EBF5F0] border-emerald-200'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-[#F4F9F6] border-y border-emerald-950/10 scroll-mt-20">
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-xs sm:text-sm font-bold text-[#0D5C3A] shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#0D5C3A]" />
            <span>Clinical Intelligence Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How {BRAND.name}™ Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            A transparent, 3-step clinical process designed to transform symptom uncertainty into calm, evidence-based guidance.
          </p>
        </div>

        {/* 3 Step Workflow Cards with Actual Clinical UI Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative">
          
          {/* Step 1 */}
          <div className="relative bg-white rounded-3xl p-7 sm:p-9 border border-emerald-950/10 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-emerald-300 tracking-tight font-mono">01</span>
                <span className="text-xs font-black px-3 py-1 rounded-full border bg-[#EBF5F0] border-emerald-200 text-[#0D5C3A]">
                  Text, Voice or Report
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#EBF5F0] border border-emerald-200 text-[#0D5C3A]">
                <MessageSquareText className="w-7 h-7 stroke-[2.3]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Describe Your Symptoms
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  <strong>What it does:</strong> Accepts natural descriptions in plain English or 4 Indian regional languages. Supports speech dictation and PDF/image report parsing.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  <strong>Patient benefit:</strong> No confusing medical terms required. Speak or type freely as you would to a trusted family doctor.
                </p>
              </div>

              {/* UI Preview Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-emerald-100 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Input Interface Preview</span>
                  <span className="text-[#0D5C3A] font-extrabold flex items-center gap-1">● Voice Dictation Active</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                  "Severe right-sided throbbing headache with light sensitivity since yesterday morning..."
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#0D5C3A] border border-emerald-200">✓ Natural English</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-[#0F766E] border border-teal-200">✓ Hindi / Marathi</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-pink-50 text-[#D81B60] border border-pink-200">✓ Lab PDF Attached</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-800">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Clinical safety validated</span>
              <button type="button" onClick={onStartAssessment} className="text-xs font-black text-[#0D5C3A] hover:underline flex items-center gap-1">
                Try Input <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white rounded-3xl p-7 sm:p-9 border border-emerald-950/10 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-teal-300 tracking-tight font-mono">02</span>
                <span className="text-xs font-black px-3 py-1 rounded-full border bg-[#F0FDFA] border-teal-200 text-[#0F766E]">
                  Evidence-Based Triage
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#F0FDFA] border border-teal-200 text-[#0F766E]">
                <Activity className="w-7 h-7 stroke-[2.3]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Clinical Risk Stratification
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  <strong>What it does:</strong> Cross-references symptoms against 1,000+ conditions curated by Dr. Pratap Madhukar and international ICMR/WHO triage criteria.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  <strong>Patient benefit:</strong> Instant certainty on whether symptoms represent an emergency (Red), need a doctor within 24–48h (Yellow), or allow safe self-care (Green).
                </p>
              </div>

              {/* UI Preview Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-teal-100 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Stratification Result Preview</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black">Yellow Caution</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">Acute Migraine with Aura</span>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">96% Match</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">Urgency: Schedule consultation with a general physician within 24 to 48 hours.</p>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-[#0F766E] border border-teal-200">✓ ICMR Protocol Matched</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#0D5C3A] border border-emerald-200">✓ Zero Hallucination Guard</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-teal-800">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Evidence-based protocol</span>
              <button type="button" onClick={onStartAssessment} className="text-xs font-black text-[#0F766E] hover:underline flex items-center gap-1">
                See Triage <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white rounded-3xl p-7 sm:p-9 border border-emerald-950/10 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-emerald-300 tracking-tight font-mono">03</span>
                <span className="text-xs font-black px-3 py-1 rounded-full border bg-[#EBF5F0] border-emerald-200 text-[#0D5C3A]">
                  Doctor & Family Ready
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#EBF5F0] border border-emerald-200 text-[#0D5C3A]">
                <FileCheck2 className="w-7 h-7 stroke-[2.3]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Clear Actionable Next Steps
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  <strong>What it does:</strong> Produces a concise (~100 words) clinical briefing, supportive home-care steps, harmful actions to avoid, and doctor consultation checklists.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  <strong>Patient benefit:</strong> Saves valuable time in the doctor's office and prevents risky self-medication errors before appointment.
                </p>
              </div>

              {/* UI Preview Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-emerald-100 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Structured Guidance Output</span>
                  <span className="text-emerald-800 font-extrabold text-[11px]">~100 Words Briefing</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2 text-xs text-slate-700 shadow-2xs">
                  <div className="flex items-start gap-1.5 text-emerald-900 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Safe Steps: Rest in dark, quiet room with cold compress.</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-rose-900 font-bold">
                    <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>Do Not: Take repeated painkillers without blood pressure check.</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-0.5 text-slate-600">
                  <span className="text-[11px] font-bold text-[#0D5C3A]">✓ Doctor Appointment Checklist</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#FDE047] text-slate-900 border border-amber-300">Offline Ready</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-800">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Actionable guidance</span>
              <button type="button" onClick={onStartAssessment} className="text-xs font-black text-[#0D5C3A] hover:underline flex items-center gap-1">
                Start Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Action Callout Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-950/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-black text-slate-900">Experience Our Clinical Intelligence Firsthand</h4>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">Enter your symptoms now to receive your personalized Red-Yellow-Green risk assessment.</p>
          </div>
          <button
            type="button"
            onClick={onStartAssessment}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0D5C3A] hover:bg-[#0A4D30] text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <span>Start Free Assessment Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Clinical Leadership & Founder Spotlight */}
        <div id="founder" className="bg-gradient-to-br from-[#0D5C3A] via-[#0E6B44] to-[#09432A] rounded-3xl p-7 sm:p-12 lg:p-14 text-white shadow-2xl relative overflow-hidden scroll-mt-24">

          {/* Subtle background decoration */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

            {/* Left: Doctor Photo Card */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl bg-slate-900">
                <img
                  src="/assets/dr_pratap_founder_square.jpg"
                  alt={FOUNDER_INFO.name}
                  className="w-full h-full object-cover object-center"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                  loading="eager"
                />
              </div>

              <div className="mt-5 space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 text-xs sm:text-sm font-bold">
                  <Award className="w-4 h-4" />
                  <span>Chief Medical Mentor</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-white">{FOUNDER_INFO.name}</h4>
                <p className="text-base sm:text-lg text-emerald-100 font-semibold">{FOUNDER_INFO.role}</p>
                <p className="text-xs sm:text-sm text-emerald-200 font-medium">{FOUNDER_INFO.credentials} • {FOUNDER_INFO.experience}</p>
              </div>
            </div>

            {/* Right: Message & Principles */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-black text-emerald-200 uppercase tracking-wider block">
                  A Clinical Message from the Founder
                </span>
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-100 leading-relaxed italic">
                  "{FOUNDER_INFO.quote}"
                </blockquote>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/15">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs space-y-1">
                  <span className="text-xs text-emerald-200 font-bold uppercase">Evidence Base</span>
                  <p className="text-sm font-bold text-white">ICMR & WHO Protocols</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs space-y-1">
                  <span className="text-xs text-emerald-200 font-bold uppercase">Clinical Review</span>
                  <p className="text-sm font-bold text-white">1,000+ Validated Cards</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs space-y-1">
                  <span className="text-xs text-emerald-200 font-bold uppercase">Regional Reach</span>
                  <p className="text-sm font-bold text-white">5 Indian Languages</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onStartAssessment ? onStartAssessment() : (window.location.pathname = '/user/dashboard')}
                  className="px-8 py-4 rounded-full bg-[#FDE047] hover:bg-[#facc15] text-slate-900 font-black text-sm sm:text-base shadow-lg transition-all cursor-pointer inline-flex items-center gap-2.5 active:scale-98"
                >
                  <span>Start Assessment with Clinical Guidance</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
