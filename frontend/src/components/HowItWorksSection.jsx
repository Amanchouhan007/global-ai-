import React from 'react';
import {
  MessageSquareText,
  Activity,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { BRAND } from '../config/brand';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorksSection({ onStartAssessment }) {
  const { currentLang, t } = useLanguage();

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-[#F4F9F6] border-y border-emerald-950/10 scroll-mt-20">
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-xs sm:text-sm font-bold text-[#0D5C3A] shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#0D5C3A]" />
            <span>{t('howItWorks', 'badge', 'Clinical Intelligence Architecture')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t('howItWorks', 'title', `How ${BRAND.name}™ Works`)}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t('howItWorks', 'subtitle', 'A transparent, 3-step clinical process designed to transform symptom uncertainty into calm, evidence-based guidance.')}
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
                  {t('howItWorks', 'step1Tag', 'Text, Voice or Report')}
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#EBF5F0] border border-emerald-200 text-[#0D5C3A]">
                <MessageSquareText className="w-7 h-7 stroke-[2.3]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {t('howItWorks', 'step1Title', 'Describe Your Symptoms')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {t('howItWorks', 'step1What', 'What it does: Accepts natural descriptions in plain English or 5 regional languages. Supports speech dictation and PDF/image report parsing.')}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {t('howItWorks', 'step1Benefit', 'Patient benefit: No confusing medical terms required. Speak or type freely as you would to a trusted family doctor.')}
                </p>
              </div>

              {/* UI Preview Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-emerald-100 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>{t('howItWorks', 'previewInputTitle', 'Input Interface Preview')}</span>
                  <span className="text-[#0D5C3A] font-extrabold flex items-center gap-1">● {t('howItWorks', 'previewVoiceActive', 'Voice Dictation Active')}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                  {t('howItWorks', 'previewSampleSymptom', '"Severe right-sided throbbing headache with light sensitivity since yesterday morning..."')}
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#0D5C3A] border border-emerald-200">{t('howItWorks', 'previewPillEnglish', '✓ Natural English')}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-[#0F766E] border border-teal-200">{t('howItWorks', 'previewPillRegional', '✓ Hindi / Regional')}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-pink-50 text-[#D81B60] border border-pink-200">{t('howItWorks', 'previewPillPdf', '✓ Lab PDF Attached')}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-800">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t('howItWorks', 'previewSafetyValidated', 'Clinical safety validated')}</span>
              <button type="button" onClick={onStartAssessment} className="text-xs font-black text-[#0D5C3A] hover:underline flex items-center gap-1">
                {t('howItWorks', 'previewTryInput', 'Try Input')} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white rounded-3xl p-7 sm:p-9 border border-emerald-950/10 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-teal-300 tracking-tight font-mono">02</span>
                <span className="text-xs font-black px-3 py-1 rounded-full border bg-[#F0FDFA] border-teal-200 text-[#0F766E]">
                  {t('howItWorks', 'step2Tag', 'Co-Intelligence AI')}
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#F0FDFA] border border-teal-200 text-[#0F766E]">
                <Activity className="w-7 h-7 stroke-[2.3]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {t('howItWorks', 'step2Title', 'AI Clinical Triaging & Matching')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {t('howItWorks', 'step2What', 'What it does: Cross-references symptoms against 1,000+ conditions curated by Dr. Pratap Madhukar and international ICMR/WHO triage criteria.')}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {t('howItWorks', 'step2Benefit', 'Patient benefit: Instant certainty on whether symptoms represent an emergency (Red), need a doctor within 24–48h (Yellow), or allow safe self-care (Green).')}
                </p>
              </div>

              {/* UI Preview Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-teal-100 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>{t('howItWorks', 'previewStratTitle', 'Stratification Result Preview')}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black">
                    {t('howItWorks', 'previewYellowCaution', 'Yellow Caution')}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">
                      {t('howItWorks', 'previewMigraineMatch', 'Acute Migraine with Aura')}
                    </span>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {t('howItWorks', 'previewMatchPercent', '96% Match')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    {t('howItWorks', 'previewUrgencyText', 'Urgency: Schedule consultation with a general physician within 24 to 48 hours.')}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-[#0F766E] border border-teal-200">
                    {t('howItWorks', 'previewPillIcmr', '✓ ICMR Protocol Matched')}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#0D5C3A] border border-emerald-200">
                    {t('howItWorks', 'previewPillZeroHal', '✓ Zero Hallucination Guard')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-teal-800">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-600" /> {t('howItWorks', 'previewEvidenceProtocol', 'Evidence-based protocol')}</span>
              <button type="button" onClick={onStartAssessment} className="text-xs font-black text-[#0F766E] hover:underline flex items-center gap-1">
                {t('howItWorks', 'previewSeeTriage', 'See Triage')} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white rounded-3xl p-7 sm:p-9 border border-emerald-950/10 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-emerald-300 tracking-tight font-mono">03</span>
                <span className="text-xs font-black px-3 py-1 rounded-full border bg-[#EBF5F0] border-emerald-200 text-[#0D5C3A]">
                  {t('howItWorks', 'step3Tag', 'Evidence Guidance')}
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#EBF5F0] border border-emerald-200 text-[#0D5C3A]">
                <FileCheck2 className="w-7 h-7 stroke-[2.3]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {t('howItWorks', 'step3Title', 'Clear Actionable Next Steps')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {t('howItWorks', 'step3What', 'What it does: Produces a concise (~100 words) clinical briefing, supportive home-care steps, harmful actions to avoid, and doctor consultation checklists.')}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {t('howItWorks', 'step3Benefit', 'Patient benefit: Saves valuable time in the doctor\'s office and prevents risky self-medication errors before appointment.')}
                </p>
              </div>

              {/* UI Preview Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-emerald-100 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>{t('howItWorks', 'previewGuidanceTitle', 'Structured Guidance Output')}</span>
                  <span className="text-emerald-800 font-extrabold text-[11px]">
                    {t('howItWorks', 'previewBriefingTag', '~100 Words Briefing')}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2 text-xs text-slate-700 shadow-2xs">
                  <div className="flex items-start gap-1.5 text-emerald-900 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t('howItWorks', 'previewSafeSteps', 'Safe Steps: Rest in dark, quiet room with cold compress.')}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-rose-900 font-bold">
                    <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{t('howItWorks', 'previewDoNot', 'Do Not: Take repeated painkillers without blood pressure check.')}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-0.5 text-slate-600">
                  <span className="text-[11px] font-bold text-[#0D5C3A]">
                    {t('howItWorks', 'previewPillChecklist', '✓ Doctor Appointment Checklist')}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#FDE047] text-slate-900 border border-amber-300">
                    {t('howItWorks', 'previewOfflineReady', 'Offline Ready')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-800">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t('howItWorks', 'previewActionable', 'Actionable guidance')}</span>
              <button type="button" onClick={onStartAssessment} className="text-xs font-black text-[#0D5C3A] hover:underline flex items-center gap-1">
                {t('howItWorks', 'previewStartNow', 'Start Now')} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
