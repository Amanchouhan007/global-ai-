import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('healthorbit_language');
        if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
          return saved;
        }
      }
    } catch {
      // ignore
    }
    return 'EN';
  });

  useEffect(() => {
    try {
      localStorage.setItem('healthorbit_language', currentLang);
      const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === currentLang);
      if (typeof document !== 'undefined') {
        document.documentElement.dir = langConfig?.dir || 'ltr';
        document.documentElement.lang = currentLang.toLowerCase();
      }
    } catch {
      // ignore
    }
  }, [currentLang]);

  const setLanguage = (code) => {
    if (SUPPORTED_LANGUAGES.some(l => l.code === code)) {
      setCurrentLang(code);
    }
  };

  const t = (section, key, fallback = '') => {
    try {
      const sectionObj = TRANSLATIONS[currentLang]?.[section] || TRANSLATIONS.EN?.[section];
      if (sectionObj && sectionObj[key]) {
        return sectionObj[key];
      }
    } catch {
      // ignore
    }
    return fallback || TRANSLATIONS.EN?.[section]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, supportedLanguages: SUPPORTED_LANGUAGES, t, translations: TRANSLATIONS[currentLang] || TRANSLATIONS.EN }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
