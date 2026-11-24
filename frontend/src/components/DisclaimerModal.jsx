import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, X, PhoneCall, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BRAND } from '../config/brand';
import { COMPANY_INFO, FOUNDER_INFO } from '../config/company';

export default function DisclaimerModal({ isOpen, onClose }) {
  const { currentLang, setLanguage, t, supportedLanguages } = useLanguage();
  const [acknowledged, setAcknowledged] = useState(() => {
    return Boolean(localStorage.getItem('healthorbit_disclaimer_ack'));
  });

  if (!isOpen) return null;

  const handleAcknowledge = () => {
    localStorage.setItem('healthorbit_disclaimer_ack', 'true');
    setAcknowledged(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-600 via-rose-600 to-rose-700 text-white shrink-0 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-200">
                Clinical Safety & Governance Notice
              </span>
              <h2 id="disclaimer-title" className="text-xl font-black text-white">
                {t('disclaimer.title')}
              </h2>
            </div>
          </div>

          {/* 5-Language Switcher Tabs */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
                  currentLang === lang.code
                    ? 'bg-white text-rose-800 shadow-sm'
                    : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
              >
                {lang.nativeName} ({lang.code})
              </button>
            ))}
          </div>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-medium">
            {t('disclaimer.bannerText')}
          </div>

          <p>
            {t('disclaimer.body')}
          </p>

          <div className="space-y-2.5 pt-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Core Principles of Triage Guidance:
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">1.</span>
                <span><strong>Educational Nature:</strong> Content on {BRAND.name}™ is developed under the clinical leadership of {FOUNDER_INFO.name} ({FOUNDER_INFO.experience}) to help users articulate their symptoms and prepare for physician visits.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">2.</span>
                <span><strong>No Doctor-Patient Relationship:</strong> Using this website, reading health cards, or submitting feedback does not establish a legal, contractual, or clinical doctor-patient relationship.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">3.</span>
                <span><strong>No Prescription or Dispensing:</strong> The platform does not prescribe medication, adjust dosages, or sell pharmaceuticals. Never discontinue prescribed medicine without physician approval.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 dark:text-rose-400 font-bold">4.</span>
                <span><strong>Emergency Escalation:</strong> If experiencing sudden crushing chest pain, difficulty breathing, slurred speech, sudden facial drooping, or worst-ever headache, call <strong>{COMPANY_INFO.emergencyNumbers.india}</strong> (India) or <strong>{COMPANY_INFO.emergencyNumbers.usa}</strong> (US) immediately.</span>
              </li>
            </ul>
          </div>

          {/* Emergency Alert Box */}
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-600 text-white">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-900 dark:text-rose-200 block">Emergency Ambulatory Escalation</span>
                <span className="text-[11px] text-rose-700 dark:text-rose-300">National Emergency Services: 108 / 112 (India) | 911 (USA)</span>
              </div>
            </div>
            <a 
              href="tel:108"
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0 transition-colors"
            >
              Dial 108
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>DPDP 2023 & Clinical Safety Protocol</span>
          </div>

          <button
            type="button"
            onClick={handleAcknowledge}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            {t('disclaimer.ackBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
