import React, { useState, useEffect } from 'react';
import { Shield, UserCheck, Heart, AlertCircle, X } from 'lucide-react';
import { BRAND } from '../config/brand';
import { useLanguage } from '../context/LanguageContext';

export default function AgeVerificationModal({ isOpenManual, onCloseManual }) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgeOption, setSelectedAgeOption] = useState('adult');

  useEffect(() => {
    if (isOpenManual !== undefined) {
      setIsOpen(isOpenManual);
      return;
    }
    // Check if user has already verified age
    try {
      const verified = localStorage.getItem('healthorbit_age_verified');
      if (!verified) {
        // Show after a slight delay to allow smooth page load
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, [isOpenManual]);

  const handleConfirm = () => {
    try {
      localStorage.setItem('healthorbit_age_verified', JSON.stringify({
        status: 'verified',
        option: selectedAgeOption,
        timestamp: new Date().toISOString()
      }));
    } catch {
      // ignore
    }
    setIsOpen(false);
    if (onCloseManual) onCloseManual();
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseManual) onCloseManual();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
      >
        {/* Top Header Banner */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 via-teal-700 to-[#0D5C3A] text-white relative">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-white/20 text-white backdrop-blur-xs">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-200">
                DPDP 2023 Child Safety Standard
              </span>
              <h2 id="age-gate-title" className="text-xl font-black text-white">
                {t('ageGate', 'title', 'Family Age Guidance')}
              </h2>
            </div>
          </div>
          <p className="text-xs text-emerald-100 leading-relaxed">
            {t('ageGate', 'subtitle', `Welcome to ${BRAND.name}™. In adherence with health data ethics and the Digital Personal Data Protection Act 2023, please confirm your usage category:`)}
          </p>
        </div>

        {/* Options Selection */}
        <div className="p-6 space-y-3">
          <label 
            className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedAgeOption === 'adult' 
                ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 dark:border-emerald-500' 
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <input
              type="radio"
              name="ageOption"
              value="adult"
              checked={selectedAgeOption === 'adult'}
              onChange={() => setSelectedAgeOption('adult')}
              className="mt-1 w-4 h-4 text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                {t('ageGate', 'adultOption', 'I am 18 years of age or older')}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                Full access to clinical symptom triage, health cards, and emergency protocols.
              </span>
            </div>
          </label>

          <label 
            className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedAgeOption === 'under18' 
                ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 dark:border-emerald-500' 
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <input
              type="radio"
              name="ageOption"
              value="under18"
              checked={selectedAgeOption === 'under18'}
              onChange={() => setSelectedAgeOption('under18')}
              className="mt-1 w-4 h-4 text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                {t('ageGate', 'minorOption', 'I am under 18 (Parental Guidance Advised)')}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                For educational reading with consent and guidance from a parent or doctor.
              </span>
            </div>
          </label>

          {/* Quick Note */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>
              {t('ageGate', 'notice', 'Health Orbit Pro™ does not collect child personal data, run targeted advertisements, or sell browsing profiles.')}
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>{t('ageGate', 'confirmBtn', 'Confirm & Enter Platform')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
