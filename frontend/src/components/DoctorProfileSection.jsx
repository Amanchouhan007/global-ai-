import React from 'react';
import {
  Award,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  HeartHandshake
} from 'lucide-react';
import { FOUNDER_INFO } from '../config/company';
import { useLanguage } from '../context/LanguageContext';

export default function DoctorProfileSection({ onStartAssessment }) {
  const { currentLang, t } = useLanguage();

  return (
    <section id="about" className="w-full min-h-screen flex items-center py-8 sm:py-12 bg-gradient-to-br from-[#0D5C3A] via-[#0E6B44] to-[#09432A] text-white border-b border-emerald-950/10 scroll-mt-0 relative overflow-hidden">
      <div id="founder" className="absolute top-0 left-0"></div>

      {/* Subtle background decoration */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10">
        
        {/* Clinical Leadership & Founder Spotlight */}
        <div className="w-full relative">

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
                  <span>{t('doctor', 'mentorBadge', 'Chief Medical Mentor')}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{FOUNDER_INFO.name}</h3>
                <p className="text-base sm:text-lg text-emerald-100 font-semibold">
                  {t('hero', 'doctorRole', FOUNDER_INFO.role)}
                </p>
                <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                  {t('hero', 'doctorCredentials', FOUNDER_INFO.credentials)} • {t('hero', 'doctorExperience', FOUNDER_INFO.experience)}
                </p>
              </div>
            </div>

            {/* Right: Message & Clinical Principles */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-black text-emerald-200 uppercase tracking-wider block">
                  {t('doctor', 'messageTitle', 'A Clinical Message from the Founder')}
                </span>
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-100 leading-relaxed italic">
                  "{t('doctor', 'quote', FOUNDER_INFO.quote)}"
                </blockquote>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/15">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs space-y-1">
                  <span className="text-xs text-emerald-200 font-bold uppercase">
                    {t('doctor', 'pillar1Title', 'Evidence Base')}
                  </span>
                  <p className="text-sm font-bold text-white">
                    {t('doctor', 'pillar1Text', 'ICMR & WHO Protocols')}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs space-y-1">
                  <span className="text-xs text-emerald-200 font-bold uppercase">
                    {t('doctor', 'pillar2Title', 'Clinical Review')}
                  </span>
                  <p className="text-sm font-bold text-white">
                    {t('doctor', 'pillar2Text', '1,000+ Validated Cards')}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs space-y-1">
                  <span className="text-xs text-emerald-200 font-bold uppercase">
                    {t('doctor', 'pillar3Title', 'Primary Care')}
                  </span>
                  <p className="text-sm font-bold text-white">
                    {t('doctor', 'pillar3Text', '38+ Years Direct Practice')}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onStartAssessment ? onStartAssessment() : (window.location.pathname = '/user/dashboard')}
                  className="px-8 py-4 rounded-full bg-[#FDE047] hover:bg-[#facc15] text-slate-900 font-black text-sm sm:text-base shadow-lg transition-all cursor-pointer inline-flex items-center gap-2.5 active:scale-98"
                >
                  <span>{t('doctor', 'ctaBtn', 'Consult Dr. Pratap AI Guidance')}</span>
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
