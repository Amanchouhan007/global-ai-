import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageSelector({ className = '', align = 'right', compact = false }) {
  const { currentLang, setLanguage, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLangConfig = supportedLanguages.find(l => l.code === currentLang) || supportedLanguages[0];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-emerald-200/90 dark:border-slate-700 bg-[#F4F9F6] dark:bg-slate-800 text-xs font-bold text-[#0D5C3A] dark:text-emerald-300 hover:bg-[#EBF5F0] dark:hover:bg-slate-700 transition-all cursor-pointer shadow-2xs select-none"
        title="Select Language / भाषा चुनें"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#0D5C3A] dark:text-emerald-400 shrink-0" />
        <span className="font-semibold text-[11px] sm:text-xs">
          {compact ? activeLangConfig.code : activeLangConfig.nativeName}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-400 dark:text-slate-500 transition-transform duration-150 ${isOpen ? 'rotate-180 text-[#0D5C3A]' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute ${align === 'left' ? 'left-0' : 'right-0'} mt-1.5 w-48 sm:w-52 bg-white dark:bg-[#0B132B] rounded-2xl shadow-xl border border-emerald-100 dark:border-slate-800 p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span>6 Languages</span>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono">i18n</span>
          </div>

          <div className="py-1 space-y-0.5 max-h-64 overflow-y-auto">
            {supportedLanguages.map((l) => {
              const isSelected = currentLang === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLanguage(l.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl font-medium cursor-pointer flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#EBF5F0] dark:bg-emerald-950/50 text-[#0D5C3A] dark:text-emerald-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{l.nativeName}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase">({l.code})</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0D5C3A] dark:text-emerald-400 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
