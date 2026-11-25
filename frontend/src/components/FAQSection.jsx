import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { BRAND } from '../config/brand';
import { useLanguage } from '../context/LanguageContext';

export default function FAQSection() {
  const { t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: t('faq', 'q1', 'How does Health Orbit Pro™ categorize my symptoms safely?'),
      a: t('faq', 'a1', 'Health Orbit Pro™ applies evidence-based clinical triage rules curated by Dr. Pratap Madhukar (38 years clinical experience) and ICMR/WHO guidelines. Your inputs are mapped to symptom patterns and categorized into Red (Emergency), Yellow (Doctor in 24–48h), or Green (Safe Self-Care).')
    },
    {
      q: t('faq', 'q2', 'Is my health data stored on your servers or shared with third parties?'),
      a: t('faq', 'a2', 'No. In strict adherence with the Indian Digital Personal Data Protection (DPDP) Act 2023, symptom inquiries in guest mode are processed locally in your session memory. We do not maintain server-side health dossiers, track personal health searches, or sell advertising profiles.')
    },
    {
      q: t('faq', 'q3', 'Does Health Orbit Pro™ provide prescriptions or replace my doctor?'),
      a: t('faq', 'a3', 'No. The platform is designed strictly for educational triage guidance and consultation preparation. It does not prescribe medications, adjust dosages, or replace in-person examination by a licensed medical practitioner.')
    },
    {
      q: t('faq', 'q4', 'Are all 1,000 clinical health cards genuinely free?'),
      a: t('faq', 'a4', 'Yes. All 1,000 clinical health cards across all 12 core specialties are 100% free for individuals and families, with no subscription barriers or paywalls.')
    },
    {
      q: t('faq', 'q5', 'What should I do if I experience a sudden red-flag medical emergency?'),
      a: t('faq', 'a5', 'If you or someone nearby experiences sudden chest crushing pain, facial drooping, slurred speech, or worst-ever headache, immediately dial national emergency services (108 / 112 in India, 911 in the US) or proceed to the nearest hospital emergency room.')
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-emerald-950/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF5F0] border border-emerald-200 text-xs sm:text-sm font-bold text-[#0D5C3A]">
            <HelpCircle className="w-4 h-4 text-[#0D5C3A]" />
            <span>{t('faq', 'badge', 'Clinical Transparency & FAQ')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t('faq', 'title', 'Frequently Asked Questions')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            {t('faq', 'subtitle', 'Clear, honest answers regarding data privacy, clinical safety standards, and doctor-approved use.')}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-2xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-black text-slate-900 text-sm sm:text-base hover:text-[#0D5C3A] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-[#F4F9F6] border border-emerald-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#EBF5F0] text-[#0D5C3A]' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
