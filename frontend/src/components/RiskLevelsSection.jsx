import React, { useState } from 'react';
import {
  Siren,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { BRAND } from '../config/brand';
import { useLanguage } from '../context/LanguageContext';

export default function RiskLevelsSection({ onStartAssessment }) {
  const { currentLang, t } = useLanguage();
  const [activeSeverityTab, setActiveSeverityTab] = useState('YELLOW');

  const severityData = {
    RED: {
      title: t('risk', 'redTitle', 'Red — Immediate Emergency Action'),
      badge: t('risk', 'redBadge', 'Critical Red-Flag Emergency'),
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      tagColor: 'bg-red-600 text-white',
      definition: t('risk', 'redDef', 'Life-threatening or time-sensitive physiological conditions requiring immediate hospital evaluation.'),
      sampleCondition: t('risk', 'redSample', 'Acute Crushing Chest Pain with Shortness of Breath'),
      signs: [
        'Sudden, severe chest pressure or radiation to arm/jaw',
        'Acute difficulty breathing or cyanosis (blue lips)',
        'Sudden weakness, facial droop, or slurred speech (FAST signs)',
        'Uncontrolled bleeding, severe trauma, or loss of consciousness'
      ],
      action: t('risk', 'redAction', 'Call emergency medical services (108 in India / 911 in US) or go to the nearest emergency department immediately. Do not attempt to drive yourself.')
    },
    YELLOW: {
      title: t('risk', 'yellowTitle', 'Yellow — Clinical Doctor Consultation (24–48h)'),
      badge: t('risk', 'yellowBadge', 'Moderate Caution / Medical Review'),
      color: 'text-amber-800',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      tagColor: 'bg-amber-500 text-white',
      definition: t('risk', 'yellowDef', 'Sub-acute symptoms requiring physical examination, lab tests, or prescription medications by a licensed clinician.'),
      sampleCondition: t('risk', 'yellowSample', 'Persistent High Fever with Productive Cough (> 3 Days)'),
      signs: [
        'Fever exceeding 101°F (38.3°C) that persists past 72 hours',
        'Unexplained weight loss or severe nocturnal sweating',
        'Persistent abdominal pain or inability to retain fluids',
        'Worsening chronic condition flare-up (asthma, hypertension, diabetes)'
      ],
      action: t('risk', 'yellowAction', 'Schedule an in-person consultation with a qualified general practitioner or relevant specialist within 24 to 48 hours for clinical evaluation and diagnostics.')
    },
    GREEN: {
      title: t('risk', 'greenTitle', 'Green — Safe Self-Care & Observation'),
      badge: t('risk', 'greenBadge', 'Low Urgency / Home Supportive Care'),
      color: 'text-emerald-800',
      bgColor: 'bg-[#EBF5F0]',
      borderColor: 'border-emerald-200',
      tagColor: 'bg-[#0D5C3A] text-white',
      definition: t('risk', 'greenDef', 'Mild, self-limiting symptoms that typically resolve with rest, balanced hydration, and gentle home supportive care.'),
      sampleCondition: t('risk', 'greenSample', 'Mild Tension Headache or Seasonal Runny Nose'),
      signs: [
        'Mild nasal congestion without facial pain or high fever',
        'Transient muscle fatigue after exercise with normal vital signs',
        'Occasional acid reflux after a heavy meal without weight loss',
        'Minor superficial scratches or bruises without swelling'
      ],
      action: t('risk', 'greenAction', 'Maintain hydration, prioritize 7–8 hours of restorative sleep, and monitor symptoms. If symptoms fail to improve or worsen after 48–72 hours, consult a physician.')
    }
  };

  const currentSeverity = severityData[activeSeverityTab];

  return (
    <section id="risk-levels" className="py-16 sm:py-20 lg:py-24 bg-[#FAFDFB] border-b border-emerald-950/10 scroll-mt-20">
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-xs sm:text-sm font-bold text-[#0D5C3A] shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#0D5C3A]" />
            <span>{t('risk', 'badge', 'Clinical Triage Architecture')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t('risk', 'title', 'Understanding Your Risk Level: Red, Yellow & Green')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t('risk', 'subtitle', `Every clinical decision rule in ${BRAND.name}™ is calibrated to provide immediate clarity on symptom urgency and eliminate diagnostic hesitation.`)}
          </p>
        </div>

        {/* 3 Color Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => setActiveSeverityTab('RED')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeSeverityTab === 'RED'
                ? 'bg-red-600 text-white shadow-md scale-102 ring-2 ring-red-300'
                : 'bg-white text-slate-700 hover:bg-red-50 border border-slate-200 hover:border-red-200'
            }`}
          >
            <Siren className="w-4 h-4" />
            <span>{t('risk', 'tabRed', 'Red: Emergency')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSeverityTab('YELLOW')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeSeverityTab === 'YELLOW'
                ? 'bg-amber-500 text-white shadow-md scale-102 ring-2 ring-amber-300'
                : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200 hover:border-amber-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{t('risk', 'tabYellow', 'Yellow: Doctor in 24–48h')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSeverityTab('GREEN')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeSeverityTab === 'GREEN'
                ? 'bg-[#0D5C3A] text-white shadow-md scale-102 ring-2 ring-emerald-300'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('risk', 'tabGreen', 'Green: Safe Self-Care')}</span>
          </button>
        </div>

        {/* Dynamic Severity Tier Card */}
        <div className={`p-6 sm:p-10 rounded-3xl sm:rounded-4xl border-2 ${currentSeverity.borderColor} ${currentSeverity.bgColor} shadow-sm transition-all duration-300 text-left space-y-6 max-w-5xl mx-auto`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
            <div className="space-y-1">
              <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${currentSeverity.tagColor}`}>
                {currentSeverity.badge}
              </span>
              <h3 className={`text-2xl sm:text-3xl font-black ${currentSeverity.color} pt-2`}>
                {currentSeverity.title}
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 self-start sm:self-auto">
              Sample: {currentSeverity.sampleCondition}
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
            {currentSeverity.definition}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Key Symptoms & Manifestations:
              </h4>
              <ul className="space-y-2">
                {currentSeverity.signs.map((sign, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 mt-2"></span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 border border-black/5 space-y-3 shadow-2xs flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Mandated Clinical Action:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {currentSeverity.action}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onStartAssessment}
                  className="w-full py-2.5 rounded-xl bg-[#0D5C3A] text-white text-xs font-bold hover:bg-[#0A4D30] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Evaluate Your Symptoms In This Tier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
