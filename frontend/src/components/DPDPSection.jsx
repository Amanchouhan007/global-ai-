import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Trash2, CheckCircle2, AlertTriangle, FileText, Mail, RefreshCw } from 'lucide-react';
import { COMPANY_INFO } from '../config/company';
import { useLanguage } from '../context/LanguageContext';

export default function DPDPSection() {
  const { currentLang, t } = useLanguage();
  const [consentGranted, setConsentGranted] = useState(() => {
    return localStorage.getItem('healthorbit_dpdp_consent') !== 'withdrawn';
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleWithdrawConsent = () => {
    try {
      localStorage.removeItem('healthorbit_search_history');
      localStorage.removeItem('healthorbit_feedback_history');
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('healthorbit_checklist_') || key.startsWith('healthorbit_notes_')) {
          localStorage.removeItem(key);
        }
      });
      localStorage.setItem('healthorbit_dpdp_consent', 'withdrawn');
      setConsentGranted(false);
      setStatusMessage('All local search history, card checklists, and session caches have been deleted. Ephemeral mode is now active.');
      setTimeout(() => setStatusMessage(''), 6000);
    } catch (e) {
      console.error('Failed to clear local data:', e);
    }
  };

  const handleRestoreConsent = () => {
    localStorage.removeItem('healthorbit_dpdp_consent');
    setConsentGranted(true);
    setStatusMessage('Local session preferences restored. Health cards and checklists can be saved locally on your device.');
    setTimeout(() => setStatusMessage(''), 5000);
  };

  return (
    <section id="privacy-dpdp" className="py-16 sm:py-20 bg-gradient-to-b from-[#F8FAF9] via-[#F4F9F6] to-[#F8FAF9] border-t border-emerald-950/10 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF5F0] text-[#0D5C3A] text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-[#0D5C3A]" />
            <span>{t('dpdp', 'badge', 'DPDP Act 2023 Compliant • Privacy-First Architecture')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t('dpdp', 'title', 'Your Health Data Belongs to You.')} <span className="text-[#0D5C3A]">{t('dpdp', 'titleHighlight', 'Zero Server Tracking.')}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t('dpdp', 'desc', 'In compliance with the Indian Digital Personal Data Protection (DPDP) Act 2023, Health Orbit Pro™ is engineered on a local-first privacy standard. Your symptom queries and checklist selections are processed locally in your session and are never sold or profiled.')}
          </p>
        </div>

        {/* 4 Pillars Grid: strictly 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-emerald-950/10 shadow-xs hover:shadow-lg transition-all text-left">
            <div className="w-10 h-10 rounded-xl bg-[#EBF5F0] flex items-center justify-center text-[#0D5C3A] mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">{t('dpdp', 'pillar1Title', 'Zero Server Tracking')}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {t('dpdp', 'pillar1Desc', 'Symptom queries and checklists remain strictly in your browser session. They are never transmitted to external ad brokers or analytics databases.')}
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-emerald-950/10 shadow-xs hover:shadow-lg transition-all text-left">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#0F766E] mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">{t('dpdp', 'pillar2Title', 'Purpose Limitation')}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {t('dpdp', 'pillar2Desc', 'All clinical intelligence inputs are used solely to generate real-time triage guidance. No user profiling, no behavioral tracking.')}
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-emerald-950/10 shadow-xs hover:shadow-lg transition-all text-left">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 mb-3">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">{t('dpdp', 'pillar3Title', 'Right to Erasure')}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {t('dpdp', 'pillar3Desc', 'With a single click, purge your entire search history, saved health cards, and session cache from your device.')}
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-emerald-950/10 shadow-xs hover:shadow-lg transition-all text-left">
            <div className="w-10 h-10 rounded-xl bg-[#EBF5F0] flex items-center justify-center text-[#0D5C3A] mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">{t('dpdp', 'pillar4Title', 'Statutory 48h Redressal')}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {t('dpdp', 'pillar4Desc', 'Our dedicated Data Protection Officer is available for statutory privacy queries with response guarantees under 48 hours.')}
            </p>
          </div>
        </div>

        {/* Visual Architecture Demonstration of Local-First Sandbox */}
        <div className="mb-10 p-5 sm:p-7 rounded-3xl bg-white border border-emerald-950/10 shadow-xs space-y-4 text-left">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-black text-[#0D5C3A] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0D5C3A]" />
              {t('dpdp', 'archTitle', 'Architectural Verification: How We Protect Your Clinical Privacy')}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0D5C3A] border border-emerald-200">
              {t('dpdp', 'sessionIsolated', 'Session-Isolated Standard')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-emerald-100 space-y-1">
              <span className="text-xs font-bold text-slate-900 block">{t('dpdp', 'arch1Title', '1. Ephemeral Client Execution')}</span>
              <p className="text-[11px] text-slate-600 leading-snug">{t('dpdp', 'arch1Desc', 'Symptom analysis runs locally inside browser memory. Once you close your tab, search state vanishes unless saved as offline doctor note.')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-emerald-100 space-y-1">
              <span className="text-xs font-bold text-slate-900 block">{t('dpdp', 'arch2Title', '2. No Commercial Trackers')}</span>
              <p className="text-[11px] text-slate-600 leading-snug">{t('dpdp', 'arch2Desc', 'Zero Google Analytics health tags, zero Meta Pixel tracking, and zero advertising broker network scripts.')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-emerald-100 space-y-1">
              <span className="text-xs font-bold text-slate-900 block">{t('dpdp', 'arch3Title', '3. One-Click Statutory Purge')}</span>
              <p className="text-[11px] text-slate-600 leading-snug">{t('dpdp', 'arch3Desc', 'Full compliance with Section 12 (Right to Erasure) of the Indian DPDP Act 2023 via instant client-side deletion.')}</p>
            </div>
          </div>
        </div>

        {/* Live Interactive Consent & Erasure Control Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D261C] text-white shadow-xl border border-emerald-900/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300">
                  {t('dpdp', 'consentStatusLabel', 'Data Consent Status')}
                </span>
                {consentGranted ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {t('dpdp', 'consentActive', 'Consent Active (Local Storage Only)')}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    {t('dpdp', 'consentWithdrawn', 'Consent Withdrawn (Strict Ephemeral Session)')}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">{t('dpdp', 'managePrivacyTitle', 'Manage Your Privacy & Local Device Records')}</h3>
              <p className="text-xs text-emerald-100 max-w-2xl leading-relaxed">
                {consentGranted 
                  ? t('dpdp', 'consentActiveDesc', 'Your device currently keeps temporary offline checklists to help you during doctor appointments. You can purge them at any moment.')
                  : t('dpdp', 'consentWithdrawnDesc', 'Ephemeral mode is active. No search history or checklist states are saved to your browser storage.')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
              {consentGranted ? (
                <button
                  type="button"
                  onClick={handleWithdrawConsent}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{t('dpdp', 'withdrawBtn', 'Withdraw Consent & Erase Local Data')}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRestoreConsent}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t('dpdp', 'restoreBtn', 'Re-Enable Local Saving')}</span>
                </button>
              )}
            </div>
          </div>

          {statusMessage && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-200 flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Grievance Officer details bar */}
          <div className="mt-6 pt-5 border-t border-emerald-900/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-emerald-200/80 text-left">
            <div>
              <span className="block text-emerald-400/80 font-bold uppercase tracking-wider text-[10px]">{t('dpdp', 'dpoLabel', 'Data Protection Officer')}</span>
              <span className="text-white font-medium">Dr. Pratap Madhukar, Chief Clinical Officer</span>
            </div>
            <div>
              <span className="block text-emerald-400/80 font-bold uppercase tracking-wider text-[10px]">{t('dpdp', 'grievanceEmailLabel', 'Statutory Grievance Email')}</span>
              <a href={`mailto:${COMPANY_INFO.grievanceEmail}`} className="text-emerald-300 hover:underline flex items-center gap-1 font-mono">
                <Mail className="w-3.5 h-3.5" /> {COMPANY_INFO.grievanceEmail}
              </a>
            </div>
            <div>
              <span className="block text-emerald-400/80 font-bold uppercase tracking-wider text-[10px]">{t('dpdp', 'jurisdictionLabel', 'Jurisdiction & Governing Law')}</span>
              <span className="text-white font-medium">Mumbai, India • DPDP Act 2023</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
