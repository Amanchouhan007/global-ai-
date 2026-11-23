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
  StopCircle
} from 'lucide-react';

export default function SymptomSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState(null); // 'listening' | 'success' | 'error' | null
  const [voiceMessage, setVoiceMessage] = useState(null);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Check speech recognition availability
  const SpeechRecognition = typeof window !== 'undefined'
    ? (window.SpeechRecognition || window.webkitSpeechRecognition)
    : null;

  // Cleanup speech recognition on unmount
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

  // Close upload modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showUploadModal) {
        setShowUploadModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showUploadModal]);

  // Voice Search Handler using native browser Web Speech API
  const handleVoice = () => {
    if (!SpeechRecognition) {
      setVoiceStatus('error');
      setVoiceMessage('Speech recognition is not supported in this browser. Please use Google Chrome, Microsoft Edge, or Safari, or type your symptom.');
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
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceStatus('listening');
        setVoiceMessage('Listening... Speak your symptom clearly (e.g. "mild fever and dry cough for 3 days").');
      };

      recognition.onresult = (event) => {
        const transcript = event.results && event.results[0] && event.results[0][0] && event.results[0][0].transcript;
        if (transcript) {
          setSearchTerm(transcript);
          setVoiceStatus('success');
          setVoiceMessage(`Recognized: "${transcript}". Review or edit, then click Check a Symptom.`);
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        setVoiceStatus('error');
        if (event.error === 'not-allowed') {
          setVoiceMessage('Microphone access was denied. Please allow microphone permissions in your browser settings to use voice search.');
        } else if (event.error === 'no-speech') {
          setVoiceMessage('No speech was detected. Click Voice Search to try again or type your symptom.');
        } else {
          setVoiceMessage('Voice input could not be recognized. Please type your symptom in the search box.');
        }
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

  const handleCancelVoice = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    setVoiceStatus(null);
    setVoiceMessage(null);
  };

  // Report File Validation (PDF, DOCX, TXT max 10MB)
  const validateAndSetFile = (file) => {
    setUploadError(null);
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    const allowed = ['pdf', 'docx', 'txt'];

    if (!allowed.includes(ext)) {
      setUploadError(`File format ".${ext}" is not supported. Please select a PDF, DOCX, or TXT medical document.`);
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB limit
    if (file.size > MAX_SIZE) {
      setUploadError(`File "${file.name}" exceeds the 10 MB size limit.`);
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

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Check symptoms safely on GlobalHealthAI: https://globalhealthai.org');
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
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
    <div id="search-section" className="relative z-20 max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 -mt-6 sm:-mt-8 scroll-mt-24">
      <div className="flex flex-col lg:flex-row items-center gap-2.5 sm:gap-3 w-full">

        {/* Main Search Bar with embedded orange button */}
        <form
          onSubmit={handleSubmit}
          className="relative flex-1 w-full bg-white dark:bg-[#0F1C36] rounded-full border border-blue-200/90 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-slate-600 focus-within:border-[#1677E8] dark:focus-within:border-blue-500 focus-within:shadow-md transition-all p-1.5 pl-4 sm:pl-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5 flex-1 mr-2 min-w-0">
            <Search className="w-4 sm:w-4.5 h-4 sm:h-4.5 text-[#1d6fd8] dark:text-blue-400 shrink-0 stroke-[2.3]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What symptom are you worried about? e.g. cough, headache, stomach pain ..."
              className="w-full text-xs sm:text-[13px] font-medium text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full cursor-pointer"
                title="Clear input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Orange Check a Symptom Button */}
          <button
            type="submit"
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white text-xs sm:text-[13px] font-bold shadow-xs transition-all shrink-0 cursor-pointer active:scale-98"
          >
            <span>Check<span className="hidden xs:inline"> a Symptom</span></span>
            <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* 3 Companion Action Buttons: Voice Search, Upload Report, Share (WhatsApp) */}
        <div className="grid grid-cols-3 gap-1.5 sm:flex sm:items-center sm:gap-2.5 w-full sm:w-auto">

          {/* Voice Search with Real Speech Recognition */}
          <button
            type="button"
            onClick={handleVoice}
            title={isListening ? 'Stop listening' : 'Start voice search'}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl border shadow-2xs font-bold text-[11px] sm:text-xs transition-all cursor-pointer min-w-0 ${
              isListening
                ? 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 animate-pulse ring-2 ring-red-400/30'
                : 'bg-white dark:bg-[#0F1C36] border-blue-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-800 text-[#0f2d59] dark:text-slate-100'
            }`}
          >
            {isListening ? (
              <>
                <StopCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />
                <span className="truncate">Stop Voice</span>
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5 text-[#1d6fd8] dark:text-blue-400 shrink-0" />
                <span className="truncate">Voice Search</span>
              </>
            )}
          </button>

          {/* Upload Report Button (Opens Document Upload Modal) */}
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl border shadow-2xs font-bold text-[11px] sm:text-xs cursor-pointer transition-all min-w-0 ${
              selectedFile
                ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-700 text-[#1677E8] dark:text-blue-300'
                : 'bg-white dark:bg-[#0F1C36] border-blue-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-800 text-[#0f2d59] dark:text-slate-100'
            }`}
            title="Attach a prescription or lab report"
          >
            {selectedFile ? (
              <>
                <FileText className="w-3.5 h-3.5 text-[#1677E8] dark:text-blue-400 shrink-0" />
                <span className="truncate">Report Attached</span>
              </>
            ) : (
              <>
                <Camera className="w-3.5 h-3.5 text-[#1d6fd8] dark:text-blue-400 shrink-0" />
                <span className="truncate">Upload</span>
              </>
            )}
          </button>

          {/* Share (WhatsApp) */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-[#0F1C36] border border-blue-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 shadow-2xs text-[#0f2d59] dark:text-slate-100 font-bold text-[11px] sm:text-xs transition-all cursor-pointer min-w-0"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#25D366] fill-current shrink-0">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.18-.544-1.785-.738-2.91-2.55-2.998-2.668-.088-.118-.724-.963-.724-1.836 0-.873.456-1.302.618-1.478.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.005.253-.042.395.3.144.348.49 1.196.534 1.285.044.089.073.192.015.309-.059.118-.088.192-.176.295-.088.103-.186.23-.265.31-.088.088-.18.184-.077.361.103.177.458.756.983 1.224.675.602 1.244.788 1.421.876.176.089.279.074.382-.044.103-.118.442-.515.559-.692.118-.176.236-.147.397-.088.162.059 1.026.484 1.202.572.176.089.294.133.338.206.044.074.044.428-.1 1.033z" />
            </svg>
            <span className="truncate">Share</span>
          </button>

        </div>

      </div>

      {/* Voice Status & Message Banner */}
      {voiceMessage && (
        <div className={`mt-2 p-2.5 sm:p-3 rounded-2xl border text-xs flex items-center justify-between gap-2 transition-all ${
          voiceStatus === 'listening'
            ? 'bg-blue-50/90 dark:bg-blue-950/70 border-blue-200 dark:border-blue-800 text-[#08165B] dark:text-blue-200'
            : voiceStatus === 'error'
            ? 'bg-amber-50/90 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
            : 'bg-emerald-50/90 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
        }`}>
          <div className="flex items-center gap-2 min-w-0">
            {voiceStatus === 'listening' ? (
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
            ) : voiceStatus === 'error' ? (
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            )}
            <span className="truncate font-medium">{voiceMessage}</span>
          </div>

          {isListening ? (
            <button
              type="button"
              onClick={handleCancelVoice}
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline shrink-0 px-2 py-0.5 rounded cursor-pointer"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setVoiceMessage(null); setVoiceStatus(null); }}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer shrink-0"
              title="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Report Upload Modal (Phase 1 Frontend Only) */}
      {showUploadModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[#0F1C36] rounded-3xl shadow-2xl border border-blue-100 dark:border-slate-700 p-5 sm:p-7 space-y-4 sm:space-y-5 text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#1677E8] dark:text-blue-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 id="upload-modal-title" className="text-base sm:text-lg font-black text-[#08165B] dark:text-white leading-tight">
                    Attach Clinical Report or Document
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Select a lab report, blood test, or physician prescription (PDF, DOCX, TXT).
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drag & Drop File Area */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[170px] ${
                isDragging
                  ? 'border-[#1677E8] bg-blue-50/70 dark:bg-blue-950/40'
                  : 'border-blue-200/80 dark:border-slate-700 hover:border-[#1677E8] dark:hover:border-blue-400 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-[#1677E8] dark:text-blue-400 flex items-center justify-center mb-2.5 shadow-2xs">
                <UploadCloud className="w-6 h-6 stroke-[2]" />
              </div>

              <p className="text-xs sm:text-sm font-bold text-[#08165B] dark:text-white">
                Click to browse or drag & drop document here
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Supported formats: <strong>PDF, DOCX, TXT</strong> • Maximum file size: <strong>10 MB</strong>
              </p>
            </div>

            {/* Error Message */}
            {uploadError && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Selected File Details */}
            {selectedFile && (
              <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#1677E8] text-white flex items-center justify-center font-black text-[10px] shrink-0">
                    {selectedFile.ext}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#08165B] dark:text-white truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400">
                      File Size: {selectedFile.size} • Status: Ready to attach
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer shrink-0"
                  title="Remove selected file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Clear Clinical Disclaimer Required by Audit Rules */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#08165B] dark:text-blue-300">
                <Info className="w-3.5 h-3.5 text-[#1677E8] dark:text-blue-400 shrink-0" />
                <span>Frontend Preview Notice</span>
              </div>
              <p className="leading-relaxed">
                Real-time OCR extraction and medical document analysis is not connected yet. Files selected in this view are validated locally in your browser and are never uploaded, stored, or analyzed on external servers.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
              {selectedFile && (
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1677E8] hover:bg-[#08165B] text-white shadow-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
