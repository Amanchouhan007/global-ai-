import React from 'react';
import { BRAND } from '../config/brand';
import { FOUNDER_INFO } from '../config/company';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative w-full min-h-[calc(100vh-68px)] flex items-center overflow-hidden bg-white bg-no-repeat bg-cover bg-[position:88%_center] sm:bg-[position:right_center]"
      style={{
        backgroundImage: "url('/assets/doctor_clinic_desk_bg.jpg')"
      }}
    >
      {/* Light responsive overlay on small screens to ensure text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40 lg:from-transparent lg:via-transparent lg:to-transparent pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-20 xl:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* Left Column (Brand, Badges, Formula Equation Strip) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left space-y-3.5 sm:space-y-4">

            {/* 1. Health Orbit Pro™ Headline */}
            <div className="flex items-center gap-2.5 sm:gap-3 leading-none">
              <span className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-black text-[#0D5C3A] tracking-tight">
                {BRAND.prefix}
              </span>
              <span className="text-xl sm:text-2xl lg:text-[28px] font-black text-white bg-[#D81B60] px-3.5 py-1 sm:py-1.5 rounded-2xl shadow-sm tracking-normal">
                {BRAND.suffix}™
              </span>
            </div>

            {/* 2. Yellow Pill: India's Own Co-Intelligence Healthcare AI */}
            <div>
              <div className="inline-flex items-center px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#FFE600] text-slate-900 text-xs sm:text-sm lg:text-[15px] font-extrabold italic shadow-2xs border border-yellow-300">
                <span>{t('hero', 'badge', BRAND.badge)}</span>
              </div>
            </div>

            {/* 3. Deep Purple Pill: Where Human Experience Meets AI. */}
            <div>
              <div className="inline-flex items-center px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-[#200B4D] text-white text-sm sm:text-lg lg:text-[20px] xl:text-[22px] font-black italic shadow-md border border-purple-900">
                <span>{t('hero', 'headline', BRAND.headline)}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dr. Pratap Credentials Badge (Compact & positioned to the side) */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end pt-4 sm:pt-6 lg:pt-32 xl:pt-40">
            <div className="w-full max-w-[250px] sm:max-w-[270px] bg-white/95 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 shadow-lg border border-slate-200/80 text-left space-y-1 transition-all lg:translate-x-4 xl:translate-x-8 lg:translate-y-6">
              <h3 className="text-sm sm:text-[15px] font-black text-[#8B0000] tracking-tight leading-tight">
                {FOUNDER_INFO.name}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 leading-snug">
                {FOUNDER_INFO.role}
              </p>
              <p className="text-[9.5px] sm:text-[10px] font-medium text-slate-600 leading-tight">
                {FOUNDER_INFO.credentials}
              </p>
              <div className="pt-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFE600] text-slate-900 text-[10px] font-black shadow-2xs">
                  {FOUNDER_INFO.experience}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
