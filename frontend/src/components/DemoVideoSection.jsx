import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Clock,
  Sparkles,
  Bot,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Layers,
  Globe,
  Subtitles,
  AlertCircle
} from 'lucide-react';
import { DEMO_VIDEOS, ONBOARDING_SCENES, getVideoData } from '../config/demoVideos';
import { useLanguage } from '../context/LanguageContext';
import { FOUNDER_INFO } from '../config/company';

/**
 * DemoVideoSection - Photorealistic AI Talking-Avatar Video Player for Health Orbit Pro™
 * 
 * Features:
 * - HTML5 <video> streaming architecture with native H.264/AAC browser compatibility.
 * - Dr. Pratap Madhukar authentic clinic photograph poster before playback.
 * - Language-aware video source routing (doctor-welcome-en.mp4, hi, mr, gu, bn, ar).
 * - Immediate stop and cleanup of audio/video on language switch.
 * - Real-time synchronized subtitles with Arabic RTL support.
 * - Interactive chapter scrubber synced directly to video currentTime.
 * - Resilient error boundary and loading states for missing/pending render assets.
 * - AI avatar disclosure and DPDP Act 2023 / Emergency 108/112 compliance notices.
 */
export default function DemoVideoSection() {
  const { currentLang, setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(() => (currentLang ? String(currentLang).toUpperCase() : 'HI'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(115);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const videoData = getVideoData(selectedLang);

  // Synchronize with global navbar language
  useEffect(() => {
    if (currentLang) {
      const upper = String(currentLang).toUpperCase();
      if (DEMO_VIDEOS[upper] && upper !== selectedLang) {
        handleLangChange(upper);
      }
    }
  }, [currentLang]);

  // Current scene identification based on currentTime
  const activeScene = ONBOARDING_SCENES.find(
    s => currentTime >= s.startTime && currentTime < s.endTime
  ) || ONBOARDING_SCENES[0];

  // Current subtitle text
  const currentSubtitleObj = videoData.scriptLines?.find(
    l => currentTime >= l.start && currentTime < l.end
  );
  const currentSubtitle = currentSubtitleObj?.text || '';

  // Language change handler
  const handleLangChange = (code) => {
    const upper = String(code).toUpperCase();
    if (!DEMO_VIDEOS[upper]) return;

    // Stop current video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setVideoError(false);
    setSelectedLang(upper);

    if (setLanguage && upper !== currentLang) {
      setLanguage(upper);
    }
  };

  // Video playback controls
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoError) {
      // In case video file is not yet rendered, simulate timeline playback for review
      setIsPlaying(!isPlaying);
      return;
    }

    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Playback error or file pending:', err);
        setVideoError(true);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (newTime) => {
    setCurrentTime(newTime);
    if (videoRef.current && !videoError) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleReplay = () => {
    handleSeek(0);
    if (videoRef.current && !videoError) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Fallback timer when video file is pending render
  useEffect(() => {
    let interval = null;
    if (videoError && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [videoError, isPlaying, duration, playbackSpeed]);

  const handleTimeUpdate = () => {
    if (videoRef.current && !videoError) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    setIsLoading(false);
    setVideoError(false);
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 115);
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.muted = isMuted;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setVideoError(true);
  };

  // Format MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="resources" className="py-12 sm:py-18 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 relative">
      <div id="demo-videos" className="absolute -top-20 left-0"></div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-emerald-950/10 shadow-[0_12px_40px_rgba(13,92,58,0.06)] space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-slate-100 pb-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF5F0] text-[#0D5C3A] text-xs sm:text-sm font-bold border border-emerald-200">
              <Sparkles className="w-4 h-4 text-[#0D5C3A]" />
              <span>AI Avatar Clinical Walkthrough • 6 Languages</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Watch Health Orbit Pro™ Welcome & Onboarding Video
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">
              Join Senior Physician <strong>{FOUNDER_INFO.name}</strong> for a photorealistic clinical walkthrough of symptoms triage, health cards, and patient privacy.
            </p>
          </div>

          {/* 6 Language Selection Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {Object.entries(DEMO_VIDEOS).map(([code, data]) => (
              <button
                key={code}
                type="button"
                onClick={() => handleLangChange(code)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  selectedLang === code
                    ? 'bg-[#0D5C3A] text-white shadow-md scale-102 ring-2 ring-emerald-600/30'
                    : 'bg-[#F4F9F6] text-slate-800 hover:bg-[#EBF5F0] border border-emerald-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5 opacity-80" />
                <span>{data.nativeName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= 16:9 WIDESCREEN CINEMATIC VIDEO PLAYER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Frame */}
          <div className="lg:col-span-8">
            <div
              ref={videoContainerRef}
              className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800 flex items-center justify-center select-none"
            >
              {/* Native HTML5 Video Element */}
              <video
                ref={videoRef}
                key={videoData.videoSrc}
                src={videoData.videoSrc}
                poster={videoData.thumbnail || '/assets/avatar_doctor_clinic_16x9.png'}
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onError={handleVideoError}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  videoError ? 'opacity-0 absolute pointer-events-none' : 'opacity-100'
                }`}
              />

              {/* Graceful Storyboard Scene Fallback if MP4 is awaiting rendering */}
              {videoError && (
                <div className="relative w-full h-full overflow-hidden bg-slate-900 flex items-center justify-center">
                  {activeScene.type === 'avatar_full' ? (
                    <img
                      src="/assets/avatar_doctor_clinic_16x9.png"
                      alt="Dr. Pratap Madhukar AI Clinical Avatar"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={activeScene.screenshot}
                        alt={activeScene.title}
                        className="w-full h-full object-cover object-top"
                      />
                      {/* PiP Avatar */}
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-24 sm:w-36 aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-400/90 ring-4 ring-black/40 z-20 bg-slate-900">
                        <img
                          src="/assets/avatar_doctor_clinic_16x9.png"
                          alt="Physician Avatar"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                  {/* Pending Render Notice Banner */}
                  <div className="absolute top-14 left-4 right-4 z-20 flex justify-center pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/90 backdrop-blur-md text-black text-xs font-bold shadow-lg border border-amber-300">
                      <AlertCircle className="w-3.5 h-3.5 text-black" />
                      <span>{videoData.language} AI Talking Avatar MP4 Video Engine Pending Render — Previewing Scene Storyboard</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Discreet AI-Generated Avatar Disclosure Badge (Top-Left) */}
              <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-20 flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[10px] sm:text-xs font-bold shadow-lg">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">AI-Generated Clinical Avatar • </span>
                  <span>Supervised by {FOUNDER_INFO.name}</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-black/60 text-amber-400 text-[10px] font-black border border-amber-400/30">
                  16:9 FHD
                </div>
              </div>

              {/* Active Scene Indicator (Top-Center) */}
              <div className="absolute top-4 sm:top-5 z-20 hidden md:block">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white/90 text-xs font-black tracking-wide border border-white/10 shadow-sm">
                  Scene {activeScene.id}/7: {activeScene.badge}
                </span>
              </div>

              {/* Big Center Play Button (When Paused) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-30 bg-black/40 backdrop-blur-[2px]">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0D5C3A] hover:bg-[#0A4D30] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer border-4 border-white/80"
                    aria-label="Play AI Welcome & Onboarding Video"
                  >
                    <Play className="w-10 h-10 fill-current ml-1.5" />
                  </button>

                  <div className="mt-5 text-white space-y-1.5 max-w-lg">
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-emerald-300">
                      <Clock className="w-4 h-4" />
                      <span>Duration: {videoData.duration} • 16:9 Widescreen</span>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-black drop-shadow-md">
                      {videoData.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Synchronized Real-Time Subtitles (Bottom Display) with Arabic RTL Support */}
              {showSubtitles && currentSubtitle && isPlaying && (
                <div className="absolute bottom-16 sm:bottom-20 left-4 right-4 z-20 flex justify-center pointer-events-none">
                  <div
                    dir={videoData.dir || 'ltr'}
                    className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-2xl bg-black/85 backdrop-blur-md text-white text-xs sm:text-sm md:text-base font-bold text-center max-w-2xl border border-white/15 shadow-2xl animate-fade-in leading-relaxed ${
                      videoData.dir === 'rtl' ? 'text-right' : 'text-center'
                    }`}
                  >
                    <span className="text-emerald-300 font-semibold">Dr. Pratap: </span>
                    <span>"{currentSubtitle}"</span>
                  </div>
                </div>
              )}

              {/* Player Bottom Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 sm:p-4 text-white space-y-2">
                
                {/* Timeline Scrubber */}
                <div className="w-full flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 115}
                    value={currentTime}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0D5C3A]"
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>

                    <button
                      type="button"
                      onClick={handleReplay}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white"
                      title="Replay from start"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="font-mono text-xs text-slate-300">
                      {formatTime(currentTime)} / {formatTime(duration || 115)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Subtitles Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowSubtitles(!showSubtitles)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        showSubtitles ? 'text-emerald-400 bg-white/10' : 'text-slate-400 hover:text-white'
                      }`}
                      title={showSubtitles ? 'Hide Subtitles' : 'Show Subtitles'}
                    >
                      <Subtitles className="w-4 h-4" />
                    </button>

                    {/* Speed Selector */}
                    <div className="flex items-center gap-1 bg-white/10 rounded-lg px-2 py-0.5">
                      {[0.75, 1, 1.25].map(spd => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => handleSpeedChange(spd)}
                          className={`text-[11px] font-bold px-1.5 py-0.5 rounded cursor-pointer ${
                            playbackSpeed === spd ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white"
                      title="Toggle Fullscreen"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE SCENE CHAPTERS & SCRIPT SYNOPSIS ================= */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F4F9F6] to-white border border-emerald-950/10 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#0D5C3A] uppercase tracking-wider block">
                  {t?.('videos', 'interactiveChapters', 'Interactive Chapters') || 'Interactive Chapters'} ({videoData.nativeName})
                </span>
                <span className="text-xs font-bold text-slate-500">
                  7 Scenes • {videoData.duration}
                </span>
              </div>

              {/* Scene Chapters */}
              <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                {ONBOARDING_SCENES.map((scene) => {
                  const isActive = activeScene.id === scene.id;
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => handleSeek(scene.startTime)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0D5C3A] text-white shadow-md font-bold'
                          : 'bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          isActive ? 'bg-white text-[#0D5C3A]' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {scene.id}
                        </span>
                        <div>
                          <p className="font-bold leading-tight">{scene.title}</p>
                          <p className={`text-[10px] ${isActive ? 'text-emerald-200' : 'text-slate-500'}`}>
                            {scene.badge}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] opacity-80">
                        {formatTime(scene.startTime)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-full py-3 px-4 rounded-xl bg-[#0D5C3A] hover:bg-[#0A4D30] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? (currentLang === 'HI' ? 'डेमो रोकें' : 'Pause Video Walkthrough') : `${t?.('videos', 'watchBtn', 'Watch in') || 'Watch in'} ${videoData.nativeName}`}</span>
                </button>
              </div>

              {/* Clinical Governance Disclaimer Notice */}
              <div className="pt-2 border-t border-slate-200/80">
                <p className="text-[10.5px] text-slate-600 leading-snug">
                  <strong>Clinical Advisory:</strong> For health education and triage preparation. In case of emergency or severe symptoms, call <strong>108 / 112</strong> immediately.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
