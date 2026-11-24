import React from 'react';
import {
  Users,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { BRAND } from '../config/brand';
import { FOUNDER_INFO } from '../config/company';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative w-full pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10 overflow-hidden bg-gradient-to-b from-[#F2F8F5] via-[#FAFDFB] to-[#F8FAF9]">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main 2-Column Hero Grid: Left Formula & Titles, Right Dr. Pratap Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* ================= LEFT SIDE: BRAND TITLE, PILLS & CO-INTELLIGENCE EQUATION ================= */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5 text-left">

            {/* Top Brand Headline: Health Orbit Pro™ */}
            <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 leading-none">
              <span className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-black text-[#0D5C3A] tracking-tight">
                {BRAND.prefix}
              </span>
              <span className="text-2xl sm:text-3xl lg:text-[32px] font-black text-white bg-[#D81B60] px-4 py-1.5 sm:py-2 rounded-2xl shadow-sm tracking-normal">
                {BRAND.suffix}™
              </span>
            </div>

            {/* Pill 1: Amber Banner — India's Own Co-Intelligence Healthcare AI */}
            <div>
              <div className="inline-flex items-center px-4 sm:px-5 py-2 rounded-full bg-[#FEF3C7] text-amber-950 text-xs sm:text-sm lg:text-base font-extrabold shadow-2xs tracking-tight border border-amber-300">
                <span>{t('hero', 'badge', BRAND.badge)}</span>
              </div>
            </div>

            {/* Pill 2: Deep Forest/Indigo Headline — Where Human Experience Meets AI. */}
            <div>
              <div className="inline-flex items-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#0E281F] text-white text-base sm:text-xl lg:text-[22px] xl:text-[24px] font-black shadow-md tracking-tight border border-emerald-900">
                <span>{t('hero', 'headline', BRAND.headline)}</span>
              </div>
            </div>

            {/* The Co-Intelligence Formula Equation Strip */}
            <div className="pt-1.5 w-full">
              <div className="p-3 sm:p-3.5 rounded-2xl sm:rounded-full bg-white border border-emerald-950/10 shadow-[0_4px_20px_rgba(13,92,58,0.06)] max-w-full">
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">

                  {/* 1. Human Insight */}
                  <div className="flex items-center gap-1.5 sm:gap-2 px-1 sm:px-2 py-1 bg-pink-50/50 sm:bg-transparent rounded-lg">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-pink-50 text-[#D81B60] flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.4]" />
                    </div>
                    <span className="text-xs sm:text-sm lg:text-[14.5px] font-black text-[#D81B60] truncate">
                      {t('hero', 'formulaHuman', BRAND.formula.human)}
                    </span>
                  </div>

                  <span className="hidden sm:inline text-slate-400 font-black text-xs sm:text-sm">+</span>

                  {/* 2. Artificial Intelligence */}
                  <div className="flex items-center gap-1.5 sm:gap-2 px-1 sm:px-2 py-1 bg-teal-50/50 sm:bg-transparent rounded-lg">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-teal-50 text-[#0D9488] flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.4]" />
                    </div>
                    <span className="text-xs sm:text-sm lg:text-[14.5px] font-black text-[#0D9488] truncate">
                      {t('hero', 'formulaAI', BRAND.formula.ai)}
                    </span>
                  </div>

                  <span className="hidden sm:inline text-slate-400 font-black text-xs sm:text-sm">+</span>

                  {/* 3. Medical Evidence */}
                  <div className="flex items-center gap-1.5 sm:gap-2 px-1 sm:px-2 py-1 bg-emerald-50/50 sm:bg-transparent rounded-lg">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-50 text-[#0D5C3A] flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.4]" />
                    </div>
                    <span className="text-xs sm:text-sm lg:text-[14.5px] font-black text-[#0D5C3A] truncate">
                      {t('hero', 'formulaEvidence', BRAND.formula.evidence)}
                    </span>
                  </div>

                  <span className="hidden sm:inline text-slate-400 font-black text-xs sm:text-sm">=</span>

                  {/* 4. Outcome: Clearer Health Decisions */}
                  <div className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full bg-[#FDE047] text-slate-900 font-black text-xs sm:text-sm lg:text-[14px] shadow-2xs border border-amber-300 text-center col-span-2 sm:col-span-1">
                    {t('hero', 'formulaOutcome', BRAND.formula.outcome)}
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT SIDE: DR. PRATAP MADHUKAR VISUAL & CREDENTIALS ================= */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
            
            {/* Desktop / Tablet Landscape: Full 4K Panoramic Banner — 100% Unclipped, Zero Dead White Gaps */}
            <div className="hidden sm:block w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(13,92,58,0.10)] border border-emerald-950/10 bg-white">
              <img
                src="/assets/dr_pratap_clinic_hero_exact_4k.jpg"
                data-desk-ref="/assets/dr-pratap-desk-hd.jpg"
                alt="Dr Pratap Madhukar - Senior Physician & Family Health Mentor"
                className="w-full h-auto block object-contain"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                loading="eager"
              />
            </div>

            {/* Mobile View (< 640px): Large doctor portrait & crystal-clear credentials matching user reference */}
            <div className="sm:hidden w-full space-y-3">
              <div className="w-full bg-white rounded-3xl p-4 border border-emerald-950/10 shadow-sm space-y-3.5">
                {/* Large Doctor Portrait */}
                <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100">
                  <img
                    src="/assets/dr_pratap_user_card_photo.jpg"
                    alt="Dr Pratap Madhukar - Senior Physician"
                    className="w-full h-auto object-cover object-center"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                    loading="eager"
                  />
                </div>

                {/* Readable Credentials Badge */}
                <div className="text-left space-y-1.5 px-1">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <h3 className="text-xl font-black text-[#8B0000] tracking-tight">
                      {FOUNDER_INFO.name}
                    </h3>
                    <span className="px-2.5 py-1 rounded-full bg-[#FDE047] text-slate-900 text-xs font-black border border-amber-300">
                      {FOUNDER_INFO.experience}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    {FOUNDER_INFO.role}
                  </p>
                  <p className="text-xs font-semibold text-slate-600 leading-snug">
                    {FOUNDER_INFO.credentials}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
