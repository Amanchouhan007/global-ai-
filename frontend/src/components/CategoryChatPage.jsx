import React, { useState, useMemo } from 'react';
import { ArrowLeft, Sparkles, Stethoscope } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import FloatingHealthChatbot from './dashboard/FloatingHealthChatbot';
import CategoryMicroApp from './microapps/CategoryMicroApp';
import { getClientCategories } from './ExploreCategories';
import { PORTAL_CATEGORIES } from '../data/portalCategories';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function CategoryChatPage({
  categoryId,
  initialCategory = null,
  onNavigate,
  onOpenDisclaimer,
  onOpenAgeGate
}) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [externalPrompt, setExternalPrompt] = useState(null);

  const clientCategories = useMemo(() => getClientCategories(t), [t]);

  const resolvedCategory = useMemo(() => {
    const cleanId = (categoryId || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    const clientMatch = clientCategories.find(
      (c) => c.id.toLowerCase() === cleanId
    );
    const portalMatch = PORTAL_CATEGORIES.find(
      (c) => c.id.toLowerCase() === cleanId
    );

    if (clientMatch) {
      return {
        ...(portalMatch || {}),
        ...clientMatch,
        name: clientMatch.title,
        title: clientMatch.title,
        description: clientMatch.desc || portalMatch?.description || ''
      };
    }

    if (portalMatch) {
      return {
        ...portalMatch,
        title: portalMatch.name,
        desc: portalMatch.description,
        badge: 'Clinical Topic',
        tags: portalMatch.examplePrompt ? [portalMatch.examplePrompt] : [],
        bgColor: 'bg-[#F2F8F5]',
        borderColor: portalMatch.borderColor || 'border-emerald-200',
        textColor: portalMatch.textColor || 'text-[#0D5C3A]',
        iconColor: portalMatch.textColor || 'text-[#0D5C3A]',
        icon: Stethoscope
      };
    }

    if (initialCategory) {
      return {
        ...initialCategory,
        id: initialCategory.id || cleanId || 'symptoms',
        title: initialCategory.title || initialCategory.name || 'Health Guidance',
        name: initialCategory.name || initialCategory.title || 'Health Guidance',
        desc: initialCategory.desc || initialCategory.description || '',
        badge: initialCategory.badge || 'Clinical Guide',
        tags: initialCategory.tags || [],
        bgColor: initialCategory.bgColor || 'bg-[#F2F8F5]',
        borderColor: initialCategory.borderColor || 'border-emerald-200',
        textColor: initialCategory.textColor || 'text-[#0D5C3A]',
        iconColor: initialCategory.iconColor || 'text-[#0D5C3A]',
        icon: initialCategory.icon || Stethoscope
      };
    }

    return clientCategories[0];
  }, [categoryId, initialCategory, clientCategories]);

  const categoryQuickPrompts = useMemo(() => {
    const prompts = [];
    if (resolvedCategory.examplePrompt) {
      prompts.push(resolvedCategory.examplePrompt);
    }
    if (Array.isArray(resolvedCategory.tags)) {
      resolvedCategory.tags.forEach((tag) => {
        prompts.push(`Tell me about ${tag} in ${resolvedCategory.title}`);
      });
    }
    return prompts;
  }, [resolvedCategory]);

  const Icon = resolvedCategory.icon || Stethoscope;

  const handleTopicClick = (promptText) => {
    setExternalPrompt({ text: promptText, nonce: Date.now() });
    const chatEl = document.getElementById('category-ai-chat');
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#F8FAF9] text-slate-900 font-sans flex flex-col">
      <Header onNavigate={onNavigate} />

      <main className="flex-1">
        {/* Dynamic Category Banner */}
        <section className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8 pt-4 sm:pt-6 pb-2">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-[#0D5C3A]/40 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0D5C3A] shadow-2xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('nav', 'backToHome', 'Back to Categories')}</span>
            </button>

            <span className="text-xs font-semibold text-slate-500">
              {t('categories', 'title', 'Explore by Category')} /{' '}
              <span className="font-bold text-slate-800">{resolvedCategory.title}</span>
            </span>
          </div>

          <div
            className={`rounded-2xl sm:rounded-3xl border ${resolvedCategory.borderColor || 'border-emerald-200'} ${resolvedCategory.bgColor || 'bg-[#F2F8F5]'} p-4 sm:p-6 shadow-xs`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-xs ${resolvedCategory.iconColor || 'text-[#0D5C3A]'}`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className={`text-lg sm:text-2xl font-black tracking-tight ${resolvedCategory.textColor || 'text-[#0D5C3A]'}`}>
                      {resolvedCategory.title}
                    </h1>
                    {resolvedCategory.badge && (
                      <span
                        className={`text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full ${
                          resolvedCategory.isMain
                            ? 'bg-[#D81B60] text-white'
                            : 'bg-white/90 text-slate-700 border border-slate-200/80'
                        }`}
                      >
                        {resolvedCategory.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-3xl">
                    {resolvedCategory.desc || resolvedCategory.description}
                  </p>
                </div>
              </div>

              {/* Dynamic Topic Chips for Instant Card-Specific Chat */}
              {resolvedCategory.tags && resolvedCategory.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 mr-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#0D5C3A]" />
                    Topics:
                  </span>
                  {resolvedCategory.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTopicClick(`Tell me about ${tag} in ${resolvedCategory.title}`)}
                      className="px-2.5 py-1 rounded-full bg-white hover:bg-[#0D5C3A] text-slate-700 hover:text-white border border-slate-200 hover:border-[#0D5C3A] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Category Switcher Strip */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {clientCategories.map((cat) => {
                const isActive = cat.id === resolvedCategory.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onNavigate(`/category/${cat.id}`)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#0D5C3A] text-white shadow-xs'
                        : 'bg-white/80 text-slate-600 hover:bg-white hover:text-[#0D5C3A] border border-slate-200/80'
                    }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Card-Specific Interactive Micro-App */}
        <section className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8 py-3">
          <CategoryMicroApp
            key={`microapp-${resolvedCategory.id}`}
            categoryId={resolvedCategory.id}
            category={resolvedCategory}
            onAskAI={handleTopicClick}
          />
        </section>

        {/* Card-Specific Dynamic Chat Assistant */}
        <div id="category-ai-chat" className="scroll-mt-20">
          <FloatingHealthChatbot
            key={resolvedCategory.id}
            inline={true}
            user={user}
            activeCategory={resolvedCategory}
            customQuickPrompts={categoryQuickPrompts}
            externalPrompt={externalPrompt}
          />
        </div>
      </main>

      <Footer
        onOpenDisclaimer={onOpenDisclaimer}
        onOpenAgeGate={onOpenAgeGate}
        onNavigate={onNavigate}
      />
    </div>
  );
}
