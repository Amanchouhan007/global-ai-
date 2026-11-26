import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ListCheck,
  Search,
  AlertTriangle,
  ShieldCheck,
  XCircle,
  Users,
  CheckSquare,
  Lightbulb,
  Clock,
  ArrowRight,
  Brain,
  Heart,
  Thermometer,
  Activity,
  Layers,
  ChevronRight,
  Home,
  Check,
  Stethoscope
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedCard, getLocalizedCatalog } from '../data/clinicalCardsCatalog';

export default function HealthCardShowcase({ 
  query = '', 
  onPrepareVisit, 
  initialCardId = null,
  showCardSelector = true 
}) {
  const { t, currentLang } = useLanguage();
  const [activeTab, setActiveTab] = useState('answer');
  const activeCatalog = getLocalizedCatalog(currentLang);
  const [selectedCardId, setSelectedCardId] = useState(() => {
    if (initialCardId && activeCatalog[initialCardId]) return initialCardId;
    return 'H-032';
  });

  // Automatically match the card based on the symptom query
  useEffect(() => {
    if (!query) return;
    const q = query.toLowerCase();
    if (q.includes('chest') || q.includes('heart') || q.includes('angina') || q.includes('arm pain')) {
      setSelectedCardId('H-001');
    } else if (q.includes('fever') || q.includes('chills') || q.includes('temperature') || q.includes('infection')) {
      setSelectedCardId('H-014');
    } else if (q.includes('stomach') || q.includes('abdomen') || q.includes('acidity') || q.includes('gastric') || q.includes('cramp')) {
      setSelectedCardId('H-045');
    } else if (q.includes('headache') || q.includes('migraine') || q.includes('head pain')) {
      setSelectedCardId('H-032');
    }
  }, [query]);

  const activeCard = getLocalizedCard(selectedCardId, currentLang);
  const [checkedSymptoms, setCheckedSymptoms] = useState({});

  // Reset checklist when card changes
  useEffect(() => {
    const initialCheck = {};
    activeCard.checklistItems.forEach(item => {
      initialCheck[item.id] = false;
    });
    setCheckedSymptoms(initialCheck);
  }, [selectedCardId]);

  const tabs = [
    { id: 'answer', label: t('cards', 'tabAnswer', 'Answer'), icon: BookOpen },
    { id: 'common', label: t('cards', 'tabCauses', 'Common Causes'), icon: ListCheck },
    { id: 'missed', label: t('cards', 'oftenMissedTitle', 'Often-Missed Causes'), icon: Search },
    { id: 'warning', label: t('cards', 'tabRedFlags', 'Warning Signs'), icon: AlertTriangle },
    { id: 'steps', label: t('cards', 'tabSafeSteps', 'Safe Steps Now'), icon: ShieldCheck },
    { id: 'donot', label: t('cards', 'doNotDoTitle', 'Do Not Do'), icon: XCircle },
    { id: 'groups', label: t('cards', 'tabSpecialGroups', 'Special Groups'), icon: Users },
    { id: 'mycheck', label: t('cards', 'tabChecklist', 'My Check'), icon: CheckSquare }
  ];

  const handleCheckboxToggle = (key) => {
    setCheckedSymptoms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const hasRedFlagChecked = activeCard.checklistItems.some(
    item => item.red && checkedSymptoms[item.id]
  );

  const handlePrepareDoctorVisit = () => {
    const selectedLabels = activeCard.checklistItems
      .filter(item => checkedSymptoms[item.id])
      .map(item => item.label);

    const symptomString = selectedLabels.length > 0
      ? `${activeCard.title} [${activeCard.id}] with flagged symptoms: ${selectedLabels.join(', ')}`
      : `${activeCard.title} [${activeCard.id}] clinical inquiry`;

    if (onPrepareVisit) {
      onPrepareVisit(symptomString);
    } else {
      alert(`Doctor Visit Summary Prepared:\n${symptomString}\n\nClinical Urgency: ${hasRedFlagChecked ? 'EMERGENCY RED FLAG' : 'ROUTINE EVALUATION'}`);
    }
  };

  const CardIcon = activeCard.icon || Brain;

  return (
    <div className="w-full space-y-4 animate-fadeIn">
      
      {/* 1,000+ Cards Engine Switcher Shelf */}
      {showCardSelector && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              {t('cards', 'engineBanner', '1,000+ Clinically Reviewed Health Cards')}
            </span>
            <span className="text-[11px] text-slate-400">
              ({t('cards', 'cardEngine', 'Card Engine H-001 to H-1000')})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {Object.values(activeCatalog).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCardId(c.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCardId === c.id
                    ? 'bg-[#0D5C3A] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-[#0D5C3A]'
                }`}
              >
                {c.id}: {c.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Health Card matching Client Reference Image 2 */}
      <div className="bg-[#F4FAF8] dark:bg-[#0D1E18] rounded-3xl p-3.5 sm:p-5 lg:p-6 border border-emerald-200/80 dark:border-emerald-900/50 shadow-md space-y-4 max-w-full overflow-hidden">
        
        {/* Breadcrumb Path matching reference */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 flex-wrap">
          <Home className="w-3.5 h-3.5 text-[#0D5C3A]" />
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="hover:text-[#0D5C3A] cursor-pointer">{activeCard.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="hover:text-[#0D5C3A] cursor-pointer">{activeCard.subcategory}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#0D5C3A] dark:text-emerald-400 font-bold">{activeCard.title}</span>
        </div>

        {/* Hero Banner: Illustration/Photo + Title + At a Glance Box matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white dark:bg-[#0F1C36] rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          
          {/* Clinical Visual Image matching Image 2 */}
          <div className="md:col-span-3">
            <div className="relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden bg-slate-100 border border-emerald-100 shadow-2xs">
              <img
                src={activeCard.image}
                srcSet={`${activeCard.image} 1x, ${activeCard.image} 2x`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 240px, 320px"
                alt={activeCard.title}
                className="w-full h-full object-cover object-center"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                loading="eager"
              />
              <div className="absolute inset-0 bg-emerald-900/5 pointer-events-none" />
            </div>
          </div>

          {/* Center Title & Clinical Question */}
          <div className="md:col-span-5 space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] dark:bg-emerald-950/60 text-[#166534] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <span>{t('cards', 'healthCardPrefix', 'Health Card')} {activeCard.id}</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0D5C3A] dark:text-emerald-400 tracking-tight">
              {activeCard.title}
            </h2>

            <p className="text-xs sm:text-sm font-bold text-[#9F1239] dark:text-rose-400 leading-snug">
              {activeCard.question}
            </p>
          </div>

          {/* Right: Head Anatomy Illustration + At a Glance Pink Box matching Image 2 */}
          <div className="md:col-span-4 flex items-center gap-3">
            {activeCard.illustration ? (
              <div className="shrink-0 hidden sm:flex items-center justify-center w-16 h-20">
                <img
                  src={activeCard.illustration}
                  srcSet={`${activeCard.illustration} 1x, ${activeCard.illustration} 2x`}
                  alt="Anatomy illustration"
                  className="w-full h-full object-contain"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                  loading="eager"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950 text-[#D81B60] hidden sm:flex items-center justify-center shrink-0">
                <CardIcon className="w-5 h-5 stroke-[2.2]" />
              </div>
            )}

            <div className="flex-1 bg-[#FFF1F5] dark:bg-[#280E1C] p-3.5 sm:p-4 rounded-2xl border border-pink-200 dark:border-pink-900/50 space-y-1.5 text-left shadow-2xs">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-[#9F1239] dark:text-rose-300 uppercase tracking-wider">
                  {t('cards', 'atAGlanceTitle', 'At a Glance')}
                </span>
              </div>
              <p className="text-[11.5px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {activeCard.atAGlance}
              </p>
            </div>
          </div>

        </div>

        {/* Interactive Tab Navigation Bar matching Image 2 */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0D5C3A] text-white shadow-xs'
                    : 'bg-white dark:bg-[#0F1C36] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Panels matching Image 2 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Left Column: Quick Answer (Image 2 Left Box) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#0F1C36] rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-extrabold text-[#0D5C3A] dark:text-emerald-400">{t('cards', 'tabAnswer', 'Quick Answer')}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeCard.quickAnswer}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t('cards', 'doctorReviewCredit', 'Reviewed by Dr Pratap Madhukar • 38 Yrs Experience')}</span>
            </div>
          </div>

          {/* Right Column: Grid of Causes & Warnings (Image 2 2x2 Grid) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Common Causes Card (Top-Left) */}
            <div className="bg-[#FFF9F5] dark:bg-[#1E140F] rounded-2xl p-4 border border-amber-200/80 dark:border-amber-900/50 shadow-2xs text-left">
              <div className="flex items-center gap-2 mb-2 text-rose-800 dark:text-amber-400 font-extrabold text-sm">
                <ListCheck className="w-4 h-4 text-rose-600 dark:text-amber-400" />
                <span>{t('cards', 'causesTitle', 'Common Causes')}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeCard.commonCauses.map((cause, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold shrink-0">•</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Often-Missed Causes Card (Top-Right) */}
            <div className="bg-[#F8F9FE] dark:bg-[#11162B] rounded-2xl p-4 border border-blue-200/80 dark:border-blue-900/50 shadow-2xs text-left">
              <div className="flex items-center gap-2 mb-2 text-blue-800 dark:text-blue-300 font-extrabold text-sm">
                <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{t('cards', 'oftenMissedTitle', 'Often-Missed Causes')}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeCard.oftenMissedCauses.map((cause, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning Signs Card with Red & Yellow splits (Bottom-Left) */}
            <div className="bg-[#FFF5F5] dark:bg-[#250F14] rounded-2xl p-4 border border-red-200 dark:border-red-900/60 shadow-2xs text-left">
              <div className="flex items-center gap-2 mb-2 text-red-800 dark:text-red-300 font-extrabold text-sm">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>{t('cards', 'tabRedFlags', 'Warning Signs – Seek Urgent Care')}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {/* Emergency Red Box */}
                <div className="p-2.5 rounded-xl bg-[#DC2626] text-white space-y-1">
                  <span className="block text-[11px] font-black uppercase tracking-wider">
                    {t('cards', 'redFlagsTitle', 'Emergency – Go to ER Now')}
                  </span>
                  <ul className="space-y-1 text-[11px] leading-snug">
                    {activeCard.emergencyRed.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Yellow See Doctor Soon Box */}
                <div className="p-2.5 rounded-xl bg-[#FEF3C7] dark:bg-[#3D2C0A] text-slate-900 dark:text-amber-200 space-y-1 border border-amber-300 dark:border-amber-700">
                  <span className="block text-[11px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-100">
                    {t('cards', 'yellowFlagsTitle', 'See a Doctor Soon (24–48h)')}
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-800 dark:text-amber-200 leading-snug">
                    {activeCard.doctorSoonYellow.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Safe Steps & Do Not Do (Bottom-Right Split) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Safe Steps Now (Green) */}
              <div className="p-3.5 rounded-2xl bg-[#F0FDF4] dark:bg-[#0A2312] border border-emerald-200 dark:border-emerald-900/60 text-left">
                <div className="flex items-center gap-1.5 mb-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('cards', 'tabSafeSteps', 'Safe Steps Now')}</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-200 leading-snug">
                  {activeCard.safeSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Do Not Do (Red) */}
              <div className="p-3.5 rounded-2xl bg-[#FFF1F2] dark:bg-[#280E13] border border-rose-200 dark:border-rose-900/60 text-left">
                <div className="flex items-center gap-1.5 mb-1.5 text-rose-800 dark:text-rose-300 font-bold text-xs">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>{t('cards', 'doNotDoTitle', 'Do Not Do')}</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-200 leading-snug">
                  {activeCard.doNotDo.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Clinical Insights Bar (Image 2 Bottom Row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Age & Special Groups */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0F1C36] border border-slate-200 dark:border-slate-800 shadow-2xs flex items-start gap-2.5 text-left">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-900 dark:text-white">
                {t('cards', 'specialGroupsTitle', 'Age & Special Groups')}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug mt-0.5">
                {activeCard.specialGroups}
              </p>
            </div>
          </div>

          {/* Dr. Pratap's Special Insight */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0F1C36] border border-slate-200 dark:border-slate-800 shadow-2xs flex items-start gap-2.5 text-left">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-purple-900 dark:text-purple-300">
                {t('cards', 'doctorInsightTitle', "Dr. Pratap's Special Insight")}
              </span>
              <p className="text-[11px] italic text-slate-600 dark:text-slate-300 leading-snug mt-0.5">
                {activeCard.drPratapInsight}
              </p>
            </div>
          </div>

          {/* Practice Story */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0F1C36] border border-slate-200 dark:border-slate-800 shadow-2xs flex items-start gap-2.5 text-left">
            <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-teal-900 dark:text-teal-300">
                {t('cards', 'practiceStoryTitle', 'Practice Story')}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug mt-0.5">
                {activeCard.practiceStory}
              </p>
            </div>
          </div>

        </div>

        {/* Interactive Symptom Checklist & Prepare for Doctor Visit Bar matching Image 2 */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0F1C36] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 shrink-0">
            <CheckSquare className="w-4 h-4 text-[#0D5C3A] dark:text-emerald-400" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              {t('cards', 'mySymptomsCheck', 'My Symptoms (Check if you have):')}
            </span>
          </div>

          {/* Interactive Checkbox Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
            {activeCard.checklistItems.map((item) => (
              <label 
                key={item.id}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                  checkedSymptoms[item.id]
                    ? item.red
                      ? 'bg-rose-100 border-rose-400 text-rose-900 font-bold dark:bg-rose-950 dark:border-rose-700 dark:text-rose-200'
                      : 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold dark:bg-emerald-950 dark:border-emerald-700 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={Boolean(checkedSymptoms[item.id])}
                  onChange={() => handleCheckboxToggle(item.id)}
                  className="w-3.5 h-3.5 rounded text-[#0D5C3A] focus:ring-[#0D5C3A]"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          {/* Prepare for Doctor Visit Action Button matching Image 2 */}
          <button
            type="button"
            onClick={handlePrepareDoctorVisit}
            className={`w-full lg:w-auto px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer ${
              hasRedFlagChecked
                ? 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 animate-pulse'
                : 'bg-gradient-to-r from-[#D81B60] to-[#BE185D] hover:from-[#BE185D] hover:to-[#9D174D]'
            }`}
          >
            <span>{t('cards', 'prepareVisitBtn', 'Prepare for Doctor Visit')}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

        </div>

      </div>

    </div>
  );
}
