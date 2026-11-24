import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  ArrowRight,
  ClipboardList,
  Heart,
  Users,
  Sprout,
  Apple,
  Brain,
  Bed,
  Sparkles,
  FlaskConical,
  Pill,
  Search,
  X,
  Stethoscope,
  Smile
} from 'lucide-react';
import { PORTAL_CATEGORIES } from '../data/portalCategories';
import { useLanguage } from '../context/LanguageContext';

export default function ExploreCategories({ onSelectCategory }) {
  const { t } = useLanguage();
  const [showAllModal, setShowAllModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showAllModal) {
        setShowAllModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAllModal]);

  // Exact 10 Categories with Rich Clinical Descriptions & Topic Counts (Fully Dynamic across 6 Languages)
  const clientCategories = [
    // Row 1
    {
      id: 'symptoms',
      title: t('categories', 'symptomsTitle', 'My Symptoms'),
      badge: t('categories', 'symptomsBadge', '1,000+ Health Cards'),
      desc: t('categories', 'symptomsDesc', 'Immediate emergency triage, red-flag detection, and 1,000+ acute clinical symptom checklists.'),
      tags: ['Headache', 'Chest Pain', 'Fever', 'Cough'],
      textColor: 'text-[#BE185D]',
      borderColor: 'border-[#D81B60]/40',
      bgColor: 'bg-gradient-to-br from-[#FFF0F5] to-[#FFE4EE]',
      iconColor: 'text-[#D81B60]',
      arrowBorder: 'border-[#D81B60] text-[#D81B60]',
      icon: Stethoscope,
      isMain: true
    },
    {
      id: 'personal-health',
      title: t('categories', 'personalHealthTitle', 'My Personal Health'),
      badge: t('categories', 'personalHealthBadge', '85+ Clinical Guides'),
      desc: t('categories', 'personalHealthDesc', 'Vitals regulation, blood pressure, diabetes metrics, and preventive longevity care.'),
      tags: ['Hypertension', 'Sugar / HbA1c', 'Thyroid', 'Lipids'],
      textColor: 'text-[#0D5C3A]',
      borderColor: 'border-emerald-200/90',
      bgColor: 'bg-[#F2F8F5]',
      iconColor: 'text-[#0D5C3A]',
      arrowBorder: 'border-[#0D5C3A] text-[#0D5C3A]',
      icon: Heart
    },
    {
      id: 'family',
      title: t('categories', 'familyTitle', 'My Family'),
      badge: t('categories', 'familyBadge', '95+ Family Topics'),
      desc: t('categories', 'familyDesc', 'Multigenerational family health, senior citizen care, and infection safety.'),
      tags: ['Elderly Care', 'Seasonal Flu', 'Joint Care', 'Immunity'],
      textColor: 'text-[#0D5C3A]',
      borderColor: 'border-emerald-200/80',
      bgColor: 'bg-[#FAFDF9]',
      iconColor: 'text-[#0D5C3A]',
      arrowBorder: 'border-[#0D5C3A] text-[#0D5C3A]',
      icon: Users
    },
    {
      id: 'parenting',
      title: t('categories', 'parentingTitle', 'My Parenting'),
      badge: t('categories', 'parentingBadge', '70+ Pediatric Topics'),
      desc: t('categories', 'parentingDesc', 'Infant growth milestones, pediatric fevers, childhood rashes, and safe child care.'),
      tags: ['Baby Fever', 'Teething', 'Colic', 'Growth'],
      textColor: 'text-[#0F766E]',
      borderColor: 'border-teal-200/80',
      bgColor: 'bg-[#F4F9F6]',
      iconColor: 'text-[#0F766E]',
      arrowBorder: 'border-[#0F766E] text-[#0F766E]',
      icon: Sprout
    },
    {
      id: 'food-nutrition',
      title: t('categories', 'foodTitle', 'My Food'),
      badge: t('categories', 'foodBadge', '110+ Diet Guides'),
      desc: t('categories', 'foodDesc', 'Therapeutic meal planning, gut microbiome, balanced nutrients, and diabetic diets.'),
      tags: ['Low-Sodium', 'High-Fiber', 'Gut Health', 'Anemia'],
      textColor: 'text-[#0D5C3A]',
      borderColor: 'border-emerald-200/80',
      bgColor: 'bg-[#FAFBF9]',
      iconColor: 'text-[#0D5C3A]',
      arrowBorder: 'border-[#0D5C3A] text-[#0D5C3A]',
      icon: Apple
    },
    // Row 2
    {
      id: 'mind-emotions',
      title: t('categories', 'mindTitle', 'My Mind'),
      badge: t('categories', 'mindBadge', '60+ Mental Health Topics'),
      desc: t('categories', 'mindDesc', 'Cognitive wellness, anxiety coping mechanisms, burnout relief, and mood balance.'),
      tags: ['Anxiety', 'Burnout', 'Panic Symptoms', 'Focus'],
      textColor: 'text-[#0D5C3A]',
      borderColor: 'border-emerald-200/80',
      bgColor: 'bg-[#F2F8F5]',
      iconColor: 'text-[#0D5C3A]',
      arrowBorder: 'border-[#0D5C3A] text-[#0D5C3A]',
      icon: Brain
    },
    {
      id: 'sleep',
      title: t('categories', 'sleepTitle', 'My Sleep'),
      badge: t('categories', 'sleepBadge', '45+ Sleep Protocols'),
      desc: t('categories', 'sleepDesc', 'Circadian rhythm stabilization, insomnia mitigation, and sleep apnea protocols.'),
      tags: ['Insomnia', 'Snoring / Apnea', 'Sleep Hygiene', 'REM'],
      textColor: 'text-[#0F766E]',
      borderColor: 'border-teal-200/80',
      bgColor: 'bg-[#FAFDF9]',
      iconColor: 'text-[#0F766E]',
      arrowBorder: 'border-[#0F766E] text-[#0F766E]',
      icon: Bed
    },
    {
      id: 'beauty',
      title: t('categories', 'beautyTitle', 'My Beauty'),
      badge: t('categories', 'beautyBadge', '65+ Dermatology Topics'),
      desc: t('categories', 'beautyDesc', 'Clinical dermatology, skin barrier health, acne treatment, and scalp wellness.'),
      tags: ['Acne', 'Eczema', 'Hair Fall', 'Sun Care'],
      textColor: 'text-[#0D5C3A]',
      borderColor: 'border-pink-200/70',
      bgColor: 'bg-[#F4F9F6]',
      iconColor: 'text-[#0D5C3A]',
      arrowBorder: 'border-[#0D5C3A] text-[#0D5C3A]',
      icon: Sparkles
    },
    {
      id: 'medicine-tests',
      title: t('categories', 'labTestsTitle', 'My Lab Tests'),
      badge: t('categories', 'labTestsBadge', '150+ Lab Explanations'),
      desc: t('categories', 'labTestsDesc', 'Decoding CBC, lipid profile, liver function, and diagnostic biomarker ranges.'),
      tags: ['CBC Panel', 'Lipid Profile', 'HbA1c', 'LFT / KFT'],
      textColor: 'text-[#0D5C3A]',
      borderColor: 'border-emerald-200/90',
      bgColor: 'bg-[#F2F8F5]',
      iconColor: 'text-[#0D5C3A]',
      arrowBorder: 'border-[#0D5C3A] text-[#0D5C3A]',
      icon: FlaskConical
    },
    {
      id: 'medicines',
      title: t('categories', 'medicinesTitle', 'My Medicines'),
      badge: t('categories', 'medicinesBadge', '200+ Drug Overviews'),
      desc: t('categories', 'medicinesDesc', 'Medication usage rules, potential interactions, common side effects, and safety.'),
      tags: ['Paracetamol', 'Antibiotics', 'Antacids', 'Safety'],
      textColor: 'text-[#0D5C3A]',
      borderColor: 'border-emerald-200/90',
      bgColor: 'bg-[#FAFDF9]',
      iconColor: 'text-[#0D5C3A]',
      arrowBorder: 'border-[#0D5C3A] text-[#0D5C3A]',
      icon: Pill
    }
  ];

  const handleCardClick = (cat) => {
    const matched = PORTAL_CATEGORIES.find(
      c => c.id === cat.id || c.name.toLowerCase().includes(cat.title.toLowerCase().replace('my ', ''))
    ) || {
      id: cat.id,
      name: cat.title,
      dotColor: 'bg-emerald-500',
      description: `Clinical insights and symptom guidance for ${cat.title}.`
    };

    if (onSelectCategory) {
      onSelectCategory(matched);
    }
  };

  const filteredAllCategories = PORTAL_CATEGORIES.filter(cat => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return cat.name.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q);
  });

  return (
    <section id="categories" className="pt-2 pb-8 sm:pt-3 sm:pb-10 max-w-[1520px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 scroll-mt-20">

      {/* Section Header matching Client Reference Image */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-pink-50 text-[#D81B60] flex items-center justify-center shrink-0">
            <LayoutGrid className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.4]" />
          </div>
          <h2 className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight">
            {t('categories', 'title', 'Explore by Category')}
          </h2>
        </div>

        {/* View All Categories Link on Right in magenta */}
        <button
          type="button"
          onClick={() => {
            setSearchQuery('');
            setShowAllModal(true);
          }}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#D81B60] hover:text-[#BE185D] hover:underline transition-colors cursor-pointer"
        >
          <span>{t('categories', 'viewAll', 'View All Categories')}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* 10 Clinical Category Cards: exactly 2 columns on mobile, 3 on tablet, 5 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
        {clientCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              onClick={() => handleCardClick(cat)}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border ${cat.borderColor} ${cat.bgColor} ${
                cat.isMain
                  ? 'ring-2 sm:ring-[2.5px] ring-[#D81B60] shadow-[0_8px_30px_rgba(216,27,96,0.16)] sm:scale-[1.02] z-10'
                  : 'shadow-2xs'
              } hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-1 select-none min-h-[140px] sm:min-h-[190px]`}
            >
              <div className="space-y-2 text-left">
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center shrink-0 ${
                    cat.isMain ? 'shadow-sm ring-1 ring-pink-300' : 'shadow-2xs'
                  } ${cat.iconColor}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.3]" />
                  </div>
                  <span className={`text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${
                    cat.isMain
                      ? 'bg-[#D81B60] text-white shadow-xs border border-transparent'
                      : 'bg-white/90 text-slate-700 shadow-2xs border border-slate-200/80'
                  }`}>
                    {cat.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`font-black ${cat.isMain ? 'text-sm sm:text-[17px]' : 'text-xs sm:text-base'} leading-tight tracking-tight ${cat.textColor}`}>
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                  {cat.desc}
                </p>

                {/* Condition Tags (hidden on tiny screens, shown on md+) */}
                <div className="hidden md:flex flex-wrap gap-1 pt-1">
                  {cat.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/70 text-slate-600 border border-slate-200/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="pt-2 sm:pt-3 border-t border-black/5 flex items-center justify-between text-left mt-2">
                <span className={`text-[11px] sm:text-xs font-black ${cat.textColor} group-hover:underline`}>
                  {t('categories', 'browseTopics', 'Browse Topics')}
                </span>
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border ${cat.arrowBorder} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform`}>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Categories Modal */}
      {showAllModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowAllModal(false)}
        >
          <div
            className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-emerald-100 p-6 sm:p-8 space-y-4 max-h-[88vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EBF5F0] text-[#0D5C3A] flex items-center justify-center">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    All Clinical Specialties & Topics
                  </h3>
                  <p className="text-xs text-slate-500">
                    Browse 23 verified medical specialty departments
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input inside modal */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specialty (e.g. Heart, Pediatrics, Diabetes, Neurology)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0D5C3A] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Scrollable list of 23 categories */}
            <div className="overflow-y-auto space-y-2 pr-1 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {filteredAllCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setShowAllModal(false);
                      if (onSelectCategory) onSelectCategory(cat);
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-[#0D5C3A] hover:bg-[#F2F8F5] text-left transition-all cursor-pointer group flex items-start gap-2.5"
                  >
                    <span className={`w-3 h-3 rounded-full ${cat.dotColor || 'bg-[#0D5C3A]'} shrink-0 mt-0.5`} />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#0D5C3A] block truncate">
                        {cat.name}
                      </span>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                        {cat.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredAllCategories.length} categories</span>
              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
