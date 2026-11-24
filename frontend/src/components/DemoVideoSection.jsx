import React, { useState } from 'react';
import { Play, Pause, Globe, Video, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { DEMO_VIDEOS } from '../config/demoVideos';
import { useLanguage } from '../context/LanguageContext';

export default function DemoVideoSection() {
  const { currentLang, setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(currentLang || 'EN');
  const [isPlaying, setIsPlaying] = useState(false);

  // Synchronize with global language when switched in header
  React.useEffect(() => {
    if (currentLang && DEMO_VIDEOS[currentLang]) {
      setSelectedLang(currentLang);
    }
  }, [currentLang]);

  const videoData = DEMO_VIDEOS[selectedLang] || DEMO_VIDEOS.EN;

  const handleLangSelect = (code) => {
    setSelectedLang(code);
    setIsPlaying(false);
  };

  return (
    <section id="resources" className="py-12 sm:py-18 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 relative">
      <div id="demo-videos" className="absolute -top-20 left-0"></div>
      <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-emerald-950/10 shadow-[0_12px_40px_rgba(13,92,58,0.06)] space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-slate-100 pb-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF5F0] text-[#0D5C3A] text-xs sm:text-sm font-bold border border-emerald-200">
              <Video className="w-4 h-4 text-[#0D5C3A]" />
              <span>{t('videos', 'badge', 'Multilingual Clinical Walkthrough')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {t('videos', 'title', 'Watch Platform Demo in 6 Languages')}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">
              {t('videos', 'subtitle', 'Select your preferred language to watch the step-by-step symptom assessment walkthrough.')}
            </p>
          </div>

          {/* 6 Language Buttons matching Requirement */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {Object.entries(DEMO_VIDEOS).map(([code, data]) => (
              <button
                key={code}
                type="button"
                onClick={() => handleLangSelect(code)}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  selectedLang === code
                    ? 'bg-[#0D5C3A] text-white shadow-sm'
                    : 'bg-[#F4F9F6] text-slate-800 hover:bg-[#EBF5F0] border border-emerald-200'
                }`}
              >
                <span>{data.nativeName}</span>
                {!data.available && (
                  <span className="text-[8.5px] px-1 py-0.2 rounded bg-amber-500 text-white font-extrabold uppercase tracking-tight">
                    Coming Soon
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Video Player Display Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Video Frame */}
          <div className="lg:col-span-8">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-slate-200 flex items-center justify-center group">
              
              {/* Thumbnail Image — High-Definition with Optimized Contrast */}
              <img
                src="/assets/demo-video-thumb-hd.jpg"
                alt={videoData.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

              {/* Play / Pause Interactive Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0D5C3A] hover:bg-[#0A4D30] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs border-4 border-white/80"
                  aria-label={isPlaying ? 'Pause Demo Video' : 'Play Demo Video'}
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 fill-current" />
                  ) : (
                    <Play className="w-10 h-10 fill-current ml-1.5" />
                  )}
                </button>

                <div className="mt-5 text-white space-y-1.5 max-w-lg">
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-emerald-300">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {videoData.duration}</span>
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-black drop-shadow-md">
                    {videoData.title}
                  </h3>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                {videoData.available ? (
                  <span className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active Production Demo</span>
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Localized Recording in Production</span>
                  </span>
                )}
              </div>

              {/* Language Stamp */}
              <div className="absolute bottom-4 right-4 z-10">
                <span className="px-3 py-1 rounded-md bg-black/70 text-white text-xs font-mono tracking-widest uppercase font-bold">
                  {selectedLang} EDITION
                </span>
              </div>
            </div>
          </div>

          {/* Right Video Details Card with Interactive Chapter Outline */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#F8FAF9] border border-emerald-100 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#0D5C3A] uppercase tracking-wider block">
                  Interactive Chapters ({videoData.nativeName})
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#0D5C3A]">
                  {videoData.duration}
                </span>
              </div>

              <h4 className="text-lg font-black text-slate-900 leading-snug">
                {videoData.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {videoData.description}
              </p>

              {/* 4 Clickable Chapters */}
              <div className="pt-3 border-t border-slate-200/80 space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0D5C3A] text-[10px] font-black flex items-center justify-center">1</span>
                    <span className="font-bold text-slate-900">Entering Symptoms</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">00:00 – 00:45</span>
                </div>

                <div className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-[#0F766E] text-[10px] font-black flex items-center justify-center">2</span>
                    <span className="font-bold text-slate-900">Red-Yellow-Green Triage</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">00:45 – 01:30</span>
                </div>

                <div className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-pink-100 text-[#D81B60] text-[10px] font-black flex items-center justify-center">3</span>
                    <span className="font-bold text-slate-900">Doctor Preparation Checklist</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">01:30 – 02:15</span>
                </div>

                <div className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black flex items-center justify-center">4</span>
                    <span className="font-bold text-slate-900">100% Private Guest Mode</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">02:15 – 02:45</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-full py-3 px-4 rounded-xl bg-[#0D5C3A] hover:bg-[#0A4D30] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isPlaying ? 'Pause Demo Walkthrough' : `Watch in ${videoData.nativeName}`}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
