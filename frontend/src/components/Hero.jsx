import React from 'react';
import { BRAND } from '../config/brand';
import { FOUNDER_INFO } from '../config/company';
import { useLanguage } from '../context/LanguageContext';

/**
 * Hero Component - Fully Responsive Homepage Hero Banner
 * 
 * Implements native 100% viewport width banner with automatic aspect-ratio
 * scaling (1024/341 ~ 3:1). Preserves all embedded typography, badges,
 * Dr. Pratap Madhukar portrait, and clinic information card.
 * 
 * Features:
 * - Responsive CSS: width 100%, height auto, display block, object-fit contain
 * - Zero hardcoded pixel width/height, zero fixed positioning, zero distortion/cropping
 * - Dual asset resolution (Native 1024x341 + UHD 4K 3840x1280 srcset)
 * - Accessible sr-only landmarks for SEO & screen-readers (no duplicated visual overlays)
 * - Functional interactive DPDP Disclaimer action matching embedded button bounds
 * - Seamless breakpoint scaling for Mobile, Tablet, Desktop, 2K QHD, and 4K UHD
 */
export default function Hero({ onOpenDisclaimer }) {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative w-full bg-white overflow-hidden p-0 m-0 border-b border-slate-100"
    >
      {/* 1. Accessible Screen-Reader Semantic Content for SEO & Assistive Tech */}
      <div className="sr-only">
        <h1>
          {BRAND.prefix} {BRAND.suffix}™ - {t('hero', 'badge', BRAND.badge)}
        </h1>
        <p>{t('hero', 'headline', BRAND.headline)}</p>
        <div>
          <h2>{FOUNDER_INFO.name}</h2>
          <p>{FOUNDER_INFO.role}</p>
          <p>{FOUNDER_INFO.credentials}</p>
          <p>{FOUNDER_INFO.experience}</p>
        </div>
      </div>

      {/* 2. Responsive Hero Banner Container with Functional Interactive Overlays */}
      <div className="relative w-full max-w-[3840px] mx-auto aspect-[1024/341]">
        <img
          src="/assets/hero_banner_clean_2x.webp"
          srcSet="/assets/hero_banner_clean_1x.webp 1024w, /assets/hero_banner_clean_2x.webp 2048w, /assets/hero_banner_clean_4k.webp 3840w"
          sizes="(min-width: 1920px) 100vw, (min-width: 1024px) 100vw, 100vw"
          alt="Health Orbit Pro™ - Where Human Experience Meets AI. Senior Physician Dr Pratap Madhukar."
          className="w-full h-auto block object-contain select-none"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
            aspectRatio: '1024 / 341'
          }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        {/* 3. Interactive DPDP Disclaimer Action - Mapped directly onto the embedded banner pill button */}
        <button
          type="button"
          onClick={() => {
            if (typeof onOpenDisclaimer === 'function') {
              onOpenDisclaimer();
            }
          }}
          aria-label="Open Indian DPDP Act 2023 Clinical Governance Disclaimer"
          title="Click to view DPDP Act 2023 Privacy & Clinical Governance details"
          className="absolute z-10 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 hover:bg-emerald-500/10 active:scale-95"
          style={{
            left: '1.25%',
            top: '86.8%',
            width: '13.5%',
            height: '8.5%'
          }}
        />
      </div>
    </section>
  );
}
