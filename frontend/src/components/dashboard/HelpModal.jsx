import React, { useEffect } from 'react';
import { X, HelpCircle, PhoneCall, ShieldCheck, Stethoscope } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function HelpModal({ onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-[#0F1C36] text-slate-800 dark:text-slate-100 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] dark:text-teal-400 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('helpModal', 'title') || 'Help & Clinical Guidelines'}
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                {t('helpModal', 'subtitle') || 'GlobalHealthAI Educational Platform'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Close help modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          
          {/* Emergency Alert Box */}
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 space-y-1">
            <div className="flex items-center gap-2 font-bold text-red-800 dark:text-red-300">
              <PhoneCall className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              <span>{t('helpModal', 'emergencyTitle') || 'Immediate Medical Emergencies'}</span>
            </div>
            <p className="text-[11px] text-red-700 dark:text-red-300 leading-normal">
              {t('helpModal', 'emergencyDesc') || 'If experiencing crushing chest pain, sudden difficulty breathing, slurred speech, or heavy uncontrolled bleeding, call 102 / 108 / 112 immediately.'}
            </p>
          </div>

          {/* Clinical Architecture */}
          <div className="space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-[#0D9488] dark:text-teal-400" />
              <span>{t('helpModal', 'evalTitle') || 'How GlobalHealthAI Evaluates Symptoms'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {t('helpModal', 'evalDesc') || 'Our system compares user-described health symptoms against 1,000 clinically reviewed cards and peer-reviewed clinical triage protocols curated by physicians.'}
            </p>
          </div>

          {/* Privacy Guarantee */}
          <div className="space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t('helpModal', 'privacyTitle') || 'Privacy & Confidentiality'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {t('helpModal', 'privacyDesc') || 'Your personal symptom queries and generated reports are stored privately in your browser session and are never commercialized.'}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold text-xs cursor-pointer"
          >
            {t('helpModal', 'gotIt') || 'Got It'}
          </button>
        </div>

      </div>
    </div>
  );
}
