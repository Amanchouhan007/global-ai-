import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  User,
  ChevronDown,
  Globe,
  Menu,
  X,
  Home,
  CheckCircle2,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { BRAND } from '../config/brand';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import HealthOrbitLogo from './common/HealthOrbitLogo';

export default function Header({ onNavigate, onOpenDisclaimer }) {
  const { currentLang, setLanguage, supportedLanguages, t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState('Home');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const headerRef = useRef(null);

  // Active landing page nav items: strictly matches real landing page sections
  const navItems = [
    { id: 'home', label: t('nav', 'home', 'Home'), isHome: true },
    { id: 'chat-assistant', label: t('nav', 'symptomChecker', 'Symptom Checker') },
    { id: 'categories', label: t('nav', 'categories', 'Categories') },
    { id: 'about', label: t('nav', 'about', 'About') }
  ];

  // Dropdown menu options for interactive header links
  const dropdownMenus = {
    categories: [
      { label: `${t('categories', 'symptomsTitle', 'My Symptoms')} (${t('categories', 'symptomsBadge', '1,000+ Health Cards')})`, targetId: 'categories' },
      { label: `${t('categories', 'personalHealthTitle', 'My Personal Health')}`, targetId: 'categories' },
      { label: `${t('categories', 'familyTitle', 'My Family')}`, targetId: 'categories' },
      { label: `${t('categories', 'parentingTitle', 'My Parenting')}`, targetId: 'categories' },
      { label: `${t('categories', 'mindTitle', 'My Mind')}`, targetId: 'categories' },
      { label: `${t('categories', 'viewAll', 'Explore All 10 Categories')} →`, targetId: 'categories', isCta: true }
    ]
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
        setUserDropdownOpen(false);
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownItemClick = (subItem) => {
    setActiveDropdown(null);
    if (subItem.action === 'login') {
      if (onNavigate) {
        onNavigate('/login');
      } else {
        window.location.pathname = '/login';
      }
      return;
    }
    if (subItem.targetId) {
      handleNavClick(subItem.targetId, subItem.label);
    }
  };

  const handleNavClick = (id, label) => {
    setActiveNav(label);
    setActiveDropdown(null);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'chat-assistant' || id === 'search-section') {
      const el = document.getElementById('chat-assistant') || document.getElementById('search-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          const input = el.querySelector('input[type="text"]') || document.querySelector('input[placeholder*="symptom"], input[type="text"]');
          if (input) input.focus();
        }, 450);
      }
      return;
    }
    if (id === 'about' || id === 'for-doctors') {
      const el = document.getElementById('about') || document.getElementById('founder');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (id === 'resources') {
      const el = document.getElementById('resources') || document.getElementById('demo-videos');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-[0_2px_12px_rgba(13,92,58,0.03)] transition-all duration-200">
      <div className="w-full max-w-[1520px] mx-auto px-1.5 xs:px-3 sm:px-4 lg:px-4 xl:px-6">
        <div className="flex items-center justify-between h-[68px] gap-1 xs:gap-1.5 lg:gap-2">

          {/* Logo & Clinical Brand Title */}
          <div
            onClick={() => handleNavClick('home', 'Home')}
            className="flex items-center gap-1 xs:gap-2 sm:gap-2.5 shrink-0 cursor-pointer select-none group"
          >
            {/* Health Orbit Pro Official Emblem */}
            <HealthOrbitLogo className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10" idPrefix="header-logo" />

            <div className="flex flex-col">
              <div className="flex items-center leading-none">
                <span className="text-[13px] xs:text-xl lg:text-[21px] xl:text-[23px] font-black text-[#0D5C3A] tracking-tight">
                  {BRAND.prefix}
                </span>
                <span className="text-[9px] xs:text-[11px] sm:text-[13px] font-black text-white bg-[#D81B60] px-1 xs:px-1.5 sm:px-2 py-0.5 rounded-full ml-0.5 xs:ml-1 sm:ml-1.5 align-middle shadow-2xs tracking-normal">
                  {BRAND.suffix}™
                </span>
              </div>
              <div className="text-[7.5px] sm:text-[8px] font-bold text-slate-500 tracking-wider uppercase mt-1 hidden lg:block">
                {BRAND.tagline}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links — visible on laptops and desktop (>= 1024px) */}
          <nav className="hidden lg:flex items-center gap-0.5 lg:gap-1 text-[11px] lg:text-[12px] xl:text-[13px] font-semibold text-slate-700">
            {navItems.map((item) => {
              const isActive = activeNav === item.label;

              if (item.isHome) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavClick(item.id, item.label)}
                    className="flex items-center gap-1 px-1.5 lg:px-2 xl:px-2.5 py-1 rounded-full text-xs font-bold bg-[#EBF5F0] text-[#0D5C3A] shadow-2xs cursor-pointer transition-all"
                  >
                    <Home className="w-3.5 h-3.5 fill-current" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              if (item.hasDropdown && dropdownMenus[item.id]) {
                const isDropdownOpen = activeDropdown === item.id;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.id, item.label)}
                      className={`flex items-center gap-0.5 px-1.5 lg:px-2 py-1 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-colors ${isActive
                        ? 'text-[#0D5C3A] font-bold bg-[#EBF5F0]'
                        : 'hover:text-[#0D5C3A] hover:bg-[#F2F8F5]'
                        }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${isDropdownOpen ? 'rotate-180 text-[#0D5C3A]' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-emerald-100 p-1.5 z-50 text-xs animate-in fade-in duration-150">
                        <div className="px-3 py-1.5 text-[10.5px] font-black text-[#0D5C3A] uppercase tracking-wider border-b border-emerald-50 flex items-center justify-between">
                          <span>{item.label}</span>
                          <span className="text-[9.5px] font-normal text-slate-400">Quick Jump</span>
                        </div>
                        <div className="py-1 space-y-0.5">
                          {dropdownMenus[item.id].map((subItem, sIdx) => (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => handleDropdownItemClick(subItem)}
                              className={`w-full text-left px-3 py-2 rounded-xl cursor-pointer transition-colors flex items-center justify-between text-xs ${subItem.isCta
                                ? 'bg-[#EBF5F0] text-[#0D5C3A] font-bold hover:bg-emerald-100 mt-1'
                                : 'text-slate-700 hover:bg-[#F4F9F6] hover:text-[#0D5C3A] font-medium'
                                }`}
                            >
                              <span>{subItem.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.id, item.label)}
                  className={`flex items-center gap-0.5 px-1.5 lg:px-2 py-1 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-colors ${isActive
                    ? 'text-[#0D5C3A] font-bold bg-[#EBF5F0]'
                    : 'hover:text-[#0D5C3A] hover:bg-[#F2F8F5]'
                    }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Search Icon Trigger */}
            <button
              type="button"
              onClick={() => handleNavClick('chat-assistant', 'Symptom Checker')}
              className="p-1.5 text-slate-600 hover:text-[#0D5C3A] rounded-full hover:bg-[#F2F8F5] transition-colors cursor-pointer"
              title="Search symptoms"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[2.3]" />
            </button>
          </nav>

          {/* Right Actions: 6-Language Selector, Disclaimer, Authentication */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 shrink-0">

            {/* 6-Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-1.5 xs:px-2 sm:px-2.5 py-1 xs:py-1.5 rounded-full border border-emerald-200 bg-[#F4F9F6] text-xs font-bold text-[#0D5C3A] hover:bg-[#EBF5F0] transition-colors cursor-pointer shadow-2xs"
                title="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-[#0D5C3A]" />
                <span className="hidden 2xl:inline">
                  {currentLang === 'EN' ? 'EN | हिंदी | मराठी' : currentLang}
                </span>
                <span className="2xl:hidden text-[11px] sm:text-xs font-black">{currentLang}</span>
                <ChevronDown className="w-3 h-3 text-[#0D5C3A]" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-emerald-100 p-1.5 z-50 text-xs animate-in fade-in duration-150">
                  <div className="px-2.5 py-1 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    6 Languages (RTL Supported)
                  </div>
                  {supportedLanguages.map(l => (
                    <button
                      key={l.code}
                      data-lang={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-xl font-medium cursor-pointer flex items-center justify-between transition-colors ${currentLang === l.code
                        ? 'bg-[#EBF5F0] text-[#0D5C3A] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      <span>{l.nativeName}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Disclaimer Trigger Pill */}
            {onOpenDisclaimer && (
              <button
                type="button"
                onClick={onOpenDisclaimer}
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-[#0D5C3A] hover:bg-[#EBF5F0] transition-colors cursor-pointer"
                title="View Healthcare Disclaimer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('nav', 'disclaimer', 'Disclaimer')}</span>
              </button>
            )}

            {/* Real Authentication State Button */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D5C3A] hover:bg-[#0A4D30] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="max-w-[90px] truncate">{user.name || 'Account'}</span>
                  <ChevronDown className="w-3 h-3 text-emerald-200" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-emerald-100 p-1.5 z-50 text-xs animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email || user.role}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-700 hover:bg-[#EBF5F0] hover:text-[#0D5C3A] font-semibold transition-colors cursor-pointer"
                    >
                      My Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (logout) logout();
                        if (onNavigate) onNavigate('/');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-semibold transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('/login') : (window.location.pathname = '/login')}
                className="flex items-center gap-1 xs:gap-1.5 px-1.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 rounded-full bg-[#0D5C3A] hover:bg-[#0A4D30] text-white text-[10px] xs:text-[11px] sm:text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              >
                <User className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                <span>{t('nav', 'signIn', 'Sign In')}</span>
              </button>
            )}

            {/* Mobile/Tablet Hamburger Menu (visible below lg: 1024px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 xs:p-1.5 sm:p-2 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile/Tablet Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-3 bg-white">
            {/* Mobile Auth Status Banner */}
            <div className="px-4 py-2.5 rounded-xl bg-[#F4F9F6] border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#0D5C3A]" />
                <span className="text-xs font-bold text-slate-800">
                  {user ? (user.name || 'Logged In') : 'Guest Session'}
                </span>
              </div>
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (logout) logout();
                  }}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigate) onNavigate('/login');
                  }}
                  className="text-xs font-black text-[#0D5C3A] hover:underline"
                >
                  Sign In →
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick(item.id, item.label);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-between ${activeNav === item.label
                    ? 'bg-[#EBF5F0] text-[#0D5C3A] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {item.isHome && <Home className="w-4 h-4 text-[#0D5C3A]" />}
                    <span>{item.label}</span>
                  </div>
                  {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              ))}
            </div>

            {/* Mobile 6-Language Selector */}
            <div className="px-4 py-3 rounded-2xl bg-[#F8FAF9] border border-emerald-100 mt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Globe className="w-4 h-4 text-[#0D5C3A]" />
                <span>6 Languages (with RTL):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentLang === lang.code
                      ? 'bg-[#0D5C3A] text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    {lang.nativeName}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Disclaimer Trigger */}
            {onOpenDisclaimer && (
              <div className="px-4 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDisclaimer();
                  }}
                  className="w-full py-2 px-3 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Clinical Disclaimer & Educational Scope</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
}
