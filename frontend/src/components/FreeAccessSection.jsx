import React from 'react';
import { ShieldCheck, Check, Sparkles, HeartHandshake, Lock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FreeAccessSection({ onStartAssessment }) {
  const { t } = useLanguage();

  const benefits = [
    'All 1,000 clinical health cards completely open and free',
    'No credit card, subscription, or paywall required',
    'Full access to Red-Yellow-Green triage risk evaluation',
    'Available in 5 regional Indian languages (EN, HI, MR, GU, BN)',
    '100% private guest mode with zero tracking'
  ];

  return (
    <section className="py-10 sm:py-16 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-r from-[#0D5C3A] via-[#0E7A4C] to-[#0A4D30] text-white shadow-xl relative overflow-hidden text-left">
        
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs sm:text-sm font-bold border border-white/20">
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{t('freeAccess', 'badge', '100% Free Public Health Intelligence')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-white leading-tight">
              {t('freeAccess', 'title', 'Accessible Family Health Without Commercial Barriers')}
            </h2>

            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-2xl font-medium">
              {t('freeAccess', 'desc', 'All 1,000 clinical health cards and symptom assessments are free for every citizen. No hidden subscriptions, no fees.')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 text-xs sm:text-sm">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-emerald-100 font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-400 text-[#0D5C3A] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Visual Value Comparison Strip */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-black/20 border border-white/10 space-y-1">
                <span className="font-extrabold text-rose-300 block">Commercial Portals:</span>
                <p className="text-slate-300 leading-snug">Paywalls, pharmaceutical ad sponsors, and health data tracking for marketing.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/20 border border-emerald-300/30 space-y-1">
                <span className="font-extrabold text-amber-300 block">Health Orbit Pro™ Standard:</span>
                <p className="text-emerald-100 leading-snug">100% free access, zero ads, session-isolated privacy, and ICMR/WHO clinical rules.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center pt-4 lg:pt-0 w-full">
            <button
              type="button"
              onClick={() => onStartAssessment ? onStartAssessment() : (window.location.pathname = '/user/dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FDE047] hover:bg-[#facc15] text-slate-900 font-black text-sm sm:text-base shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2.5 active:scale-98"
            >
              <span>Explore Free Health Cards</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            <p className="text-xs text-emerald-200 font-medium mt-2.5">
              Instant access • No registration required
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
