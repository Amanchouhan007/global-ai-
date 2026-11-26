import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  Mic,
  Camera,
  FileText,
  X,
  AlertCircle,
  CheckCircle2,
  UploadCloud,
  Trash2,
  Info,
  Sparkles,
  MousePointerClick
} from 'lucide-react';
import { BRAND } from '../config/brand';
import { useLanguage } from '../context/LanguageContext';

export default function SymptomSearch({ onSearch }) {
  const { t, currentLang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState(null);
  const [voiceMessage, setVoiceMessage] = useState(null);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const SpeechRecognition = typeof window !== 'undefined'
    ? (window.SpeechRecognition || window.webkitSpeechRecognition)
    : null;

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showUploadModal) {
        setShowUploadModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showUploadModal]);

  const handleVoice = () => {
    if (!SpeechRecognition) {
      setVoiceStatus('error');
      setVoiceMessage('Speech recognition is not supported in this browser. Please type your symptom in the search box.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
      setVoiceStatus(null);
      setVoiceMessage(null);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceStatus('listening');
        setVoiceMessage('Listening... Speak your symptom clearly (e.g. "severe headache with neck stiffness").');
      };

      recognition.onresult = (event) => {
        const transcript = event.results && event.results[0] && event.results[0][0] && event.results[0][0].transcript;
        if (transcript) {
          setSearchTerm(transcript);
          setVoiceStatus('success');
          setVoiceMessage(`Recognized: "${transcript}". Click Get Clinical Insights to evaluate.`);
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        setVoiceStatus('error');
        setVoiceMessage('Voice input could not be recognized. Please type your symptom.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceStatus('error');
      setVoiceMessage('Microphone could not be initialized. Please type your symptom.');
    }
  };

  const validateAndSetFile = (file) => {
    setUploadError(null);
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    const allowed = ['pdf', 'docx', 'txt', 'jpg', 'jpeg', 'png'];

    if (!allowed.includes(ext)) {
      setUploadError(`File format ".${ext}" is not supported. Please select PDF, DOCX, TXT, or Image.`);
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError(`File exceeds the 10 MB size limit.`);
      return;
    }

    const formattedSize = file.size >= 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    setSelectedFile({
      name: file.name,
      size: formattedSize,
      ext: ext.toUpperCase()
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <section id="search-section" className="relative z-20 pt-3 pb-6 sm:pt-4 sm:pb-8 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      
      {/* Container: Matches Client Reference Image 1 with premium polish */}
      <div className="bg-[#FFF6F9] rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 border border-pink-200/90 shadow-[0_8px_30px_rgba(216,27,96,0.06)] space-y-4 sm:space-y-4.5">
        
        {/* Banner Sub-header: Dr. Pratap's Clinical Insights with divider and subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 px-1 text-left">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-pink-200 text-[#D81B60] flex items-center justify-center shrink-0 shadow-2xs">
              <FileText className="w-5 h-5 stroke-[2.3]" />
            </div>

            <h2 className="text-base sm:text-lg lg:text-xl font-black text-[#8B0000] tracking-tight">
              {t('insights', 'title', BRAND.clinicalInsightsTitle)}
            </h2>
          </div>

          <div className="hidden sm:block w-[1.5px] h-6 bg-pink-300 shrink-0" />

          <p className="text-xs sm:text-sm md:text-[15px] text-slate-700 font-semibold leading-relaxed">
            {t('insights', 'subtitle', BRAND.clinicalInsightsSubtitle)}
          </p>
        </div>

        {/* The Search Bar Row with Companion Voice & Report Buttons */}
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-3.5">
          
          {/* Main White Pill Input */}
          <div className="flex-1 flex items-center bg-white rounded-full px-5 sm:px-7 py-3 sm:py-3.5 border-2 border-pink-200/90 hover:border-pink-300 focus-within:border-[#D81B60] focus-within:ring-4 focus-within:ring-pink-100 shadow-xs transition-all gap-3">
            <Search className="w-5 h-5 text-[#D81B60] shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('insights', 'placeholder', 'Paste your Google or AI health answer here, or type your symptom...')}
              className="w-full text-xs sm:text-sm md:text-base font-medium text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Solid Pink Button inside / beside pill */}
            <button
              type="submit"
              className="hidden sm:inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#D81B60] to-[#BE185D] hover:from-[#BE185D] hover:to-[#9D174D] text-white text-xs sm:text-sm md:text-[15px] font-bold shadow-xs transition-all cursor-pointer shrink-0 active:scale-98"
            >
              <span>{t('insights', 'submitBtn', 'Get Clinical Insights')}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Submit Button if screen < sm */}
          <button
            type="submit"
            className="sm:hidden flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#D81B60] text-white text-sm font-bold shadow-xs cursor-pointer active:scale-98"
          >
            <span>{t('insights', 'submitBtn', 'Get Clinical Insights')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Companion Buttons: Grid on mobile, flex on desktop */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Voice Search Companion Button */}
            <button
              type="button"
              onClick={handleVoice}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full border transition-all cursor-pointer text-xs sm:text-sm font-bold shrink-0 ${
                isListening
                  ? 'bg-red-500 text-white border-red-600 animate-pulse'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-pink-300 hover:bg-pink-50/50 shadow-2xs'
              }`}
            >
              <Mic className="w-4 h-4 text-[#D81B60]" />
              <span>{t('insights', 'voiceSearch', 'Voice Search')}</span>
            </button>

            {/* Upload Report Companion Button */}
            <button
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white text-slate-800 border border-slate-200 hover:border-pink-300 hover:bg-pink-50/50 transition-all cursor-pointer text-xs sm:text-sm font-bold shrink-0 shadow-2xs"
            >
              <Camera className="w-4 h-4 text-[#D81B60]" />
              <span>{t('insights', 'uploadReport', 'Upload Report')}</span>
            </button>
          </div>

        </form>

        {/* Voice Feedback Message */}
        {voiceMessage && (
          <div className="p-3 rounded-2xl bg-pink-100/70 border border-pink-200 text-xs sm:text-sm text-[#9F1239] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D81B60] shrink-0" />
              <span className="font-semibold">{voiceMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setVoiceMessage(null)}
              className="text-xs font-bold underline cursor-pointer ml-3 shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Suggested Clinical Inquiries (Interactive One-Click Chips) */}
        <div className="pt-2 text-left space-y-2 border-t border-pink-200/60">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Sparkles className="w-3.5 h-3.5 text-[#D81B60]" />
            <span>{t('insights', 'frequentTitle', 'Frequent Clinical Inquiries (Click to Evaluate):')}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {((currentLang === 'HI' ? [
              { query: 'गर्दन में अकड़न के साथ गंभीर सिरदर्द', urgency: 'आपातकालीन ट्राइएज', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'खांसी के साथ 3 दिनों से अधिक लगातार तेज बुखार', urgency: '24–48 घंटे में डॉक्टर', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'सांस फूलने के साथ सीने में अचानक जकड़न', urgency: 'कार्डियक ट्राइएज', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'रात में बच्चे को घरघराहट और खांसी होना', urgency: 'बाल रोग परामर्श', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'भोजन के बाद एसिडिटी और पेट में जलन', urgency: 'घरेलू देखभाल प्रोटोकॉल', tagColor: 'bg-emerald-100 text-[#0D5C3A] border-emerald-200' }
            ] : currentLang === 'MR' ? [
              { query: 'मानेत ताठरपणासह तीव्र डोकेदुखी', urgency: 'तातडीचा ट्राइएज', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'खोbaselineसह ३ दिवसांहून अधिक ताप', urgency: '२४–४८ तासांत डॉक्टर', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'श्वास लागणे व छातीत अचानक जडपणा', urgency: 'हृदयरोग ट्राइएज', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'रात्री मुलास श्वास घेताना घरघर व खोकला', urgency: 'बालरोग तपासणी', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'जेवणानंतर पोटात जळजळ व ॲसिडिटी', urgency: 'घरगुती काळजी प्रोटोकॉल', tagColor: 'bg-emerald-100 text-[#0D5C3A] border-emerald-200' }
            ] : currentLang === 'GU' ? [
              { query: 'ગરદનમાં જકડન સાથે તીવ્ર માથાનો દુખાવો', urgency: 'ઇમરજન્સી ટ્રાયેજ', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'ખાંસી સાથે ૩ દિવસથી વધુ સતત તાવ', urgency: '૨૪-૪૮ કલાકમાં ડૉક્ટર', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'શ્વાસ લેવામાં તકલીફ સાથે છાતીમાં ભીંચાણ', urgency: 'કાર્ડિયાક ટ્રાયેજ', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'રાત્રે બાળકને ખાંસી અને શ્વાસમાં ઘરઘરાટી', urgency: 'બાળરોગ સંભાળ', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'જમ્યા પછી એસિડિટી અને પેટમાં બળતરા', urgency: 'ઘરેલું સંભાળ પ્રોટોકોલ', tagColor: 'bg-emerald-100 text-[#0D5C3A] border-emerald-200' }
            ] : currentLang === 'BN' ? [
              { query: 'ঘাড়ে শক্তভাব সহ তীব্র মাথাব্যথা', urgency: 'জরুরি ট্রায়াজ', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'কাশির সাথে ৩ দিনের বেশি জ্বর', urgency: '২৪–৪৮ ঘণ্টায় ডাক্তার', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'শ্বাসকষ্ট সহ হঠাৎ বুকে চাপ অনুভূত হওয়া', urgency: 'কার্ডিয়াক ট্রায়াজ', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'রাতে শিশুর শ্বাসকষ্ট ও কাশি', urgency: 'শিশু স্বাস্থ্য সেবা', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'খাওয়ার পর বুক ও পেট জ্বালাপোড়া (অ্যাসিডিটি)', urgency: 'ঘরোয়া সেবা প্রোটোকল', tagColor: 'bg-emerald-100 text-[#0D5C3A] border-emerald-200' }
            ] : currentLang === 'AR' ? [
              { query: 'صداع حاد مع تيبس في الرقبة', urgency: 'فرز طارئ', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'حمى مستمرة لأكثر من 3 أيام مع سعال', urgency: 'استشارة طبيب خلال 24-48 ساعة', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'ضيق مفاجئ في الصدر مع صعوبة التنفس', urgency: 'فرز قلبي طارئ', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'سعال وصعوبة تنفس لدى الطفل ليلاً', urgency: 'رعاية أطفال', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'حموضة وحرقة في المعدة بعد تناول الطعام', urgency: 'رعاية منزلية آمنة', tagColor: 'bg-emerald-100 text-[#0D5C3A] border-emerald-200' }
            ] : [
              { query: 'Severe headache with stiff neck', urgency: 'Emergency Triage', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'Persistent high fever > 3 days with cough', urgency: 'Doctor in 24–48h', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'Sudden chest tightness with breathlessness', urgency: 'Cardiac Triage', tagColor: 'bg-red-100 text-red-800 border-red-200' },
              { query: 'Child wheezing and coughing at night', urgency: 'Pediatric Care', tagColor: 'bg-amber-100 text-amber-900 border-amber-200' },
              { query: 'Acid reflux and stomach burning after food', urgency: 'Self-Care Protocol', tagColor: 'bg-emerald-100 text-[#0D5C3A] border-emerald-200' }
            ])).map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSearchTerm(item.query);
                  if (onSearch) onSearch(item.query);
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-pink-50 border border-slate-200 hover:border-pink-300 text-xs text-slate-800 font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
              >
                <span>{item.query}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${item.tagColor}`}>
                  {item.urgency}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#D81B60] transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* 3 Core Output Pillars Demonstrated */}
        <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-pink-200/60 text-left">
          <div className="p-3.5 rounded-2xl bg-white/90 border border-pink-100 shadow-2xs space-y-1">
            <div className="flex items-center gap-2 text-xs font-black text-slate-900">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span>1. Instant Risk Stratification</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Maps inputs across 1,000+ conditions into Red (ER), Yellow (Doctor 24–48h), or Green (Self-Care).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 border border-pink-100 shadow-2xs space-y-1">
            <div className="flex items-center gap-2 text-xs font-black text-slate-900">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>2. 100-Word Plain Summary</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Translates complex diagnosis into calm, actionable steps without confusing medical jargon.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 border border-pink-100 shadow-2xs space-y-1">
            <div className="flex items-center gap-2 text-xs font-black text-slate-900">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>3. Doctor Visit Preparation</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Generates tailored questions for your physician and an offline tracking checklist.
            </p>
          </div>
        </div>

      </div>

      {/* Upload Medical Document Modal */}
      {showUploadModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#0F1C36] rounded-3xl shadow-2xl border border-pink-200 dark:border-slate-800 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pink-50 dark:bg-slate-800 text-[#D81B60] flex items-center justify-center">
                  <UploadCloud className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Upload Lab / Medical Report
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    PDF, DOCX, TXT, or Image (Max 10 MB)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drag and Drop Zone */}
            {!selectedFile ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-pink-200 dark:border-slate-700 rounded-2xl p-6 text-center cursor-pointer hover:bg-pink-50/40 transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Camera className="w-8 h-8 text-[#D81B60] mx-auto mb-2" />
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Click or drag medical report here
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Blood tests, discharge summaries, or doctor prescriptions
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-pink-50/60 dark:bg-slate-800/60 border border-pink-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-[#D81B60] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                    {selectedFile.ext}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-[10.5px] text-slate-500">
                      {selectedFile.size}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {uploadError && (
              <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{uploadError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!selectedFile}
                onClick={() => {
                  setShowUploadModal(false);
                  if (onSearch && selectedFile) {
                    onSearch(`Clinical insights from uploaded report: ${selectedFile.name}`);
                  }
                }}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedFile
                    ? 'bg-[#D81B60] text-white cursor-pointer shadow-xs'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Assess Report
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
