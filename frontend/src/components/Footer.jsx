import React from 'react';
import { ShieldCheck, Heart, AlertCircle, Mail, Phone, ExternalLink, Globe } from 'lucide-react';
import { BRAND } from '../config/brand';
import { FOUNDER_INFO, COMPANY_INFO } from '../config/company';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onOpenDisclaimer, onOpenAgeGate, onNavigate }) {
  const { currentLang, setLanguage, supportedLanguages } = useLanguage();

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
              {BRAND.name}™ provides educational triage based on {FOUNDER_INFO.experience} of physician experience. It does not provide definitive medical diagnoses or replace an emergency room.
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenDisclaimer}
            className="w-full sm:w-auto text-center px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 text-xs sm:text-sm shrink-0 transition-colors"
          >
            Read Disclaimer
          </button>
        </div>

        {/* Main Footer Grid: strictly stacks in 1 column on mobile, 2 on tablet, 5 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 border-b border-slate-800">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0D5C3A] to-emerald-500 text-white shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3a9 9 0 0 1 9 9" stroke="#FDE047" strokeWidth="2.5" />
                  <path d="M12 7v10" stroke="#FFFFFF" />
                  <path d="M7 12h10" stroke="#FFFFFF" />
                </svg>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-black text-white tracking-tight">{BRAND.prefix}</span>
                <span className="ml-1 px-1.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-[#D81B60] text-white">
                  {BRAND.suffix}™
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
              {BRAND.tagline}. {BRAND.badge} combining human medical insight with AI to bring structured, calm guidance to every family.
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
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">Health Platform</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><a href="#home" className="hover:text-white transition-colors py-0.5 block">Home</a></li>
              <li><a href="#clinical-search" className="hover:text-white transition-colors py-0.5 block">Clinical Insights</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors py-0.5 block">Specialty Categories</a></li>
              <li><a href="#health-card-showcase" className="hover:text-white transition-colors py-0.5 block">Health Card H-032</a></li>
              <li><a href="#free-access" className="hover:text-white transition-colors py-0.5 block">100% Free Access</a></li>
              <li><a href="#demo-videos" className="hover:text-white transition-colors py-0.5 block">Platform Walkthrough</a></li>
            </ul>
          </div>

          {/* Privacy & Governance */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">Privacy & Trust</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><a href="#privacy-dpdp" className="hover:text-white transition-colors py-0.5 block">DPDP Act 2023 Compliance</a></li>
              <li>
                <button type="button" onClick={onOpenDisclaimer} className="hover:text-white transition-colors text-left py-0.5 block">
                  Clinical Disclaimer
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenAgeGate} className="hover:text-white transition-colors text-left py-0.5 block">
                  Age & Family Verification
                </button>
              </li>
              <li>
                <a href={`mailto:${COMPANY_INFO.grievanceEmail}`} className="hover:text-white transition-colors py-0.5 block">
                  Grievance Redressal
                </a>
              </li>
              <li>
                <a href="#patient-feedback" className="hover:text-white transition-colors py-0.5 block">
                  Patient Quality Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Portals & Emergency */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">Portals & Emergency</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate ? onNavigate('/user/dashboard') : window.location.hash = '#user'}
                  className="hover:text-white transition-colors text-left flex items-center gap-1 text-emerald-400 font-semibold py-0.5 block"
                >
                  Patient Dashboard <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate ? onNavigate('/admin/dashboard') : window.location.hash = '#admin'}
                  className="hover:text-white transition-colors text-left flex items-center gap-1 py-0.5 block"
                >
                  Clinical Admin Portal <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate ? onNavigate('/login') : window.location.hash = '#login'}
                  className="hover:text-white transition-colors text-left py-0.5 block"
                >
                  Doctor / Staff Sign In
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
            {BRAND.copyright}
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
