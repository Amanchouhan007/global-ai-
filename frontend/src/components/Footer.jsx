import React from 'react';
import { ShieldCheck, Heart, AlertCircle, Mail, Phone, ExternalLink, Globe } from 'lucide-react';
import { BRAND } from '../config/brand';
import { FOUNDER_INFO, COMPANY_INFO } from '../config/company';
import { useLanguage } from '../context/LanguageContext';
import HealthOrbitLogo from './common/HealthOrbitLogo';

export default function Footer({ onOpenDisclaimer, onOpenAgeGate, onNavigate }) {
  const { currentLang, setLanguage, supportedLanguages, t } = useLanguage();

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Disclaimer Banner */}
        <div className="mb-10 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-200">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white uppercase tracking-wider block sm:inline mr-2">
                Clinical Safety Notice:
              </span>
              {t('footer', 'disclaimerNotice', `${BRAND.name}™ provides educational triage based on ${FOUNDER_INFO.experience} of physician experience. It does not provide definitive medical diagnoses or replace an emergency room.`)}
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenDisclaimer}
            className="w-full sm:w-auto text-center px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 text-xs sm:text-sm shrink-0 transition-colors cursor-pointer"
          >
            {t('nav', 'disclaimer', 'Read Disclaimer')}
          </button>
        </div>

        {/* Main Footer Grid: strictly stacks in 1 column on mobile, 2 on tablet, 5 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 border-b border-slate-800">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <HealthOrbitLogo className="w-10 h-10" idPrefix="footer-logo" />
              <div className="flex items-center">
                <span className="text-xl font-black text-white tracking-tight">{BRAND.prefix}</span>
                <span className="ml-1 px-1.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-[#D81B60] text-white">
                  {BRAND.suffix}™
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
              {t('footer', 'tagline', BRAND.tagline)}. {t('hero', 'badge', BRAND.badge)}
            </p>

            {/* Dr. Pratap Credentials Badge */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Clinical Editor: {FOUNDER_INFO.name}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {FOUNDER_INFO.credentials} • {FOUNDER_INFO.experience}
              </p>
            </div>

            {/* 5-Language Switcher Pills */}
            <div className="pt-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" /> Multi-Language Edition
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {supportedLanguages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                      currentLang === l.code
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {l.nativeName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clinical Navigation */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">{t('footer', 'quickTitle', 'Health Platform')}</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><button type="button" onClick={(e) => handleScrollTo(e, 'home')} className="hover:text-white transition-colors py-0.5 block text-left cursor-pointer">{t('nav', 'home', 'Home')}</button></li>
              <li><button type="button" onClick={(e) => handleScrollTo(e, 'chat-assistant')} className="hover:text-white transition-colors py-0.5 block text-left cursor-pointer">{t('chat', 'title', 'Clinical Chat Assistant')}</button></li>
              <li><button type="button" onClick={(e) => handleScrollTo(e, 'categories')} className="hover:text-white transition-colors py-0.5 block text-left cursor-pointer">{t('categories', 'title', 'Specialty Categories')}</button></li>
              <li><button type="button" onClick={(e) => handleScrollTo(e, 'how-it-works')} className="hover:text-white transition-colors py-0.5 block text-left cursor-pointer">{t('howItWorks', 'title', 'How It Works')}</button></li>
              <li><button type="button" onClick={(e) => handleScrollTo(e, 'demo-videos')} className="hover:text-white transition-colors py-0.5 block text-left cursor-pointer">{t('videos', 'title', 'Platform Walkthrough')}</button></li>
            </ul>
          </div>

          {/* Privacy & Governance */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">{t('footer', 'legalTitle', 'Privacy & Trust')}</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><button type="button" onClick={(e) => handleScrollTo(e, 'privacy-dpdp')} className="hover:text-white transition-colors py-0.5 block text-left cursor-pointer">{t('footer', 'dpdpAct', 'DPDP Act 2023 Compliance')}</button></li>
              <li>
                <button type="button" onClick={onOpenDisclaimer} className="hover:text-white transition-colors text-left py-0.5 block cursor-pointer">
                  {t('nav', 'disclaimer', 'Clinical Disclaimer')}
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenAgeGate} className="hover:text-white transition-colors text-left py-0.5 block cursor-pointer">
                  {t('footer', 'patientPrivacy', 'Age & Family Verification')}
                </button>
              </li>
              <li>
                <a href={`mailto:${COMPANY_INFO.grievanceEmail}`} className="hover:text-white transition-colors py-0.5 block">
                  {t('footer', 'ethicalAI', 'Grievance Redressal')}
                </a>
              </li>
              <li>
                <button type="button" onClick={(e) => handleScrollTo(e, 'patient-feedback')} className="hover:text-white transition-colors py-0.5 block text-left cursor-pointer">
                  {t('feedback', 'title', 'Patient Quality Feedback')}
                </button>
              </li>
            </ul>
          </div>

          {/* Portals & Emergency */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">{t('footer', 'clinicalTitle', 'Portals & Emergency')}</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate ? onNavigate('/user/dashboard') : (window.location.pathname = '/user/dashboard')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1 text-emerald-400 font-semibold py-0.5 block cursor-pointer"
                >
                  Patient Dashboard <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate ? onNavigate('/admin/dashboard') : (window.location.pathname = '/admin/dashboard')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1 py-0.5 block cursor-pointer"
                >
                  Clinical Admin Portal <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate ? onNavigate('/login') : (window.location.pathname = '/login')}
                  className="hover:text-white transition-colors text-left py-0.5 block cursor-pointer"
                >
                  {t('nav', 'signIn', 'Doctor / Staff Sign In')}
                </button>
              </li>
              <li className="pt-2 text-rose-400 font-bold">
                <span className="block text-[11px] text-slate-400 font-normal">Emergency Ambulatory:</span>
                India: 108 / 112 • US: 911
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {t('footer', 'allRightsReserved', BRAND.copyright)}
          </div>
          <div className="flex items-center gap-6">
            <span>{COMPANY_INFO.compliance}</span>
            <span>Made with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> for India & the World</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
