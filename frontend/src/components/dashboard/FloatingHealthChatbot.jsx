import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Mic,
  Maximize2,
  Minimize2,
  ChevronDown,
  Stethoscope,
  User as UserIcon,
  HelpCircle,
  Paperclip,
  FileText,
  Image as ImageIcon,
  Camera
} from 'lucide-react';

function WhatsAppIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.1 13.67 14.88 13.58C14.65 13.5 14.49 13.46 14.32 13.71C14.16 13.96 13.69 14.51 13.55 14.67C13.4 14.84 13.26 14.86 13.01 14.73C12.76 14.61 11.97 14.35 11.03 13.51C10.29 12.85 9.8 12.04 9.65 11.79C9.51 11.54 9.64 11.41 9.76 11.28C9.87 11.17 10.01 10.99 10.13 10.85C10.26 10.7 10.3 10.59 10.38 10.43C10.46 10.26 10.42 10.12 10.36 10C10.3 9.87 9.81 8.67 9.6 8.18C9.4 7.7 9.2 7.76 9.05 7.75C8.91 7.74 8.75 7.74 8.58 7.74C8.42 7.74 8.15 7.8 7.93 8.04C7.7 8.29 7.07 8.88 7.07 10.08C7.07 11.28 7.95 12.44 8.07 12.6C8.19 12.77 9.78 15.22 12.22 16.27C12.8 16.52 13.25 16.67 13.61 16.78C14.19 16.97 14.72 16.94 15.13 16.88C15.6 16.81 16.57 16.29 16.78 15.71C16.98 15.14 16.98 14.65 16.92 14.54C16.86 14.44 16.82 14.51 16.57 14.39Z" />
    </svg>
  );
}
import {
  detectEmergencyRedFlags,
  HEALTH_CATEGORIES
} from '../../data/healthKnowledgeBase';
import { getCategoryChatConfig } from '../../data/categoryChatConfigs';
import { useLanguage } from '../../context/LanguageContext';

export default function FloatingHealthChatbot({
  user,
  activeCategory,
  inline = false,
  compact = false,
  onClose = null,
  onMessageSent = null,
  onStartAssessment,
  customQuickPrompts = null,
  externalPrompt = null
}) {
  const { currentLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const categoryTitle = activeCategory?.title || activeCategory?.name;
  const categoryConfig = getCategoryChatConfig(activeCategory?.id);

  const buildWelcomeText = () => {
    const firstName = user?.name ? user.name.split(' ')[0] : 'there';
    if (categoryConfig?.welcomePrefix) {
      return `Hello ${firstName}! 👋 ${categoryConfig.welcomePrefix}`;
    }
    if (categoryTitle) {
      return `Hello ${firstName}! 👋 Welcome to **${categoryTitle}**. ${activeCategory?.desc || activeCategory?.description || ''} Ask any question or tap a topic below for instant, clinically grounded guidance supervised by Dr. Pratap Madhukar.`;
    }
    return t('chat', 'welcome', `Hello ${firstName}! 👋 I am your Health Orbit Pro Assistant, supervised by Dr. Pratap Madhukar. Describe any symptom or ask a health question, and I will give you instant, clinically grounded triage guidance, danger-sign checks, and safe next steps.`);
  };

  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      sender: 'ai',
      timestamp: 'Just now',
      text: buildWelcomeText(),
      urgency: null
    }
  ]);

  // Dynamically update welcome message when language changes (preserve category context if set)
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && (prev[0].id === 'welcome' || prev[0].id === 'welcome-reset')) {
        return [{
          ...prev[0],
          text: buildWelcomeText()
        }];
      }
      return prev;
    });
  }, [currentLang, activeCategory?.id]);

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const uploadMenuRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (uploadMenuRef.current && !uploadMenuRef.current.contains(event.target)) {
        setShowUploadMenu(false);
      }
    };
    if (showUploadMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUploadMenu]);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const triggerFileInput = (acceptType) => {
    setShowUploadMenu(false);
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.accept = acceptType;
      fileInputRef.current.click();
    }
  };

  const handleStartCamera = async () => {
    setShowUploadMenu(false);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (fileInputRef.current) {
        fileInputRef.current.accept = 'image/*';
        fileInputRef.current.setAttribute('capture', 'environment');
        fileInputRef.current.click();
      }
      return;
    }

    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable, falling back:', err);
      setIsCameraActive(false);
      if (fileInputRef.current) {
        fileInputRef.current.accept = 'image/*';
        fileInputRef.current.setAttribute('capture', 'environment');
        fileInputRef.current.click();
      }
    }
  };

  useEffect(() => {
    if (isCameraActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraActive]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `prescription-scan-${Date.now()}.jpg`, {
            type: 'image/jpeg'
          });
          setAttachedFile(file);
        }
        stopCamera();
      },
      'image/jpeg',
      0.92
    );
  };

  const SpeechRecognition = typeof window !== 'undefined'
    ? (window.SpeechRecognition || window.webkitSpeechRecognition)
    : null;

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch { }
      }
    };
  }, []);

  const handleVoiceInput = () => {
    if (!SpeechRecognition) {
      alert('Voice dictation is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch { }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputMessage(prev => (prev ? `${prev} ${transcript}` : transcript));
        }
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const isAllowed = file.type.startsWith('image/') || file.name.match(/\.(pdf|docx?|txt)$/i);
      if (!isAllowed) {
        alert('Only images (JPG, PNG, WebP) and documents (PDF, DOC, DOCX, TXT) are allowed.');
        return;
      }
      setAttachedFile(file);
    }
    e.target.value = '';
  };

  const handleWhatsAppShare = () => {
    const conversation = messages
      .slice(-4)
      .map(m => `${m.sender === 'ai' ? 'Dr. Pratap AI' : 'Patient'}: ${m.text}`)
      .join('\n\n');

    const shareText = `*Health Orbit Pro™ - Dr. Pratap AI Clinical Consultation*\n\n${conversation}\n\n_Note: Physician-supervised clinical symptom triage._\nVisit: https://healthorbitpro.org`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const isInitialMount = useRef(true);

  const scrollChatContainer = (smooth = true) => {
    if (chatContainerRef.current) {
      if (smooth) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Only scroll internally inside the chat box when user/AI sends a message
    if (isOpen || inline) {
      scrollChatContainer(true);
    }
  }, [messages, isTyping]);

  // Quick prompt suggestions dynamically translated or tailored to active button
  const quickPrompts = customQuickPrompts && customQuickPrompts.length > 0
    ? customQuickPrompts
    : categoryConfig?.quickPrompts && categoryConfig.quickPrompts.length > 0
      ? categoryConfig.quickPrompts
      : [
        t('chat', 'quickPrompt1', 'Severe right-side headache with sensitivity to bright lights'),
        t('chat', 'quickPrompt2', 'Chest tightness on exertion radiating to left shoulder'),
        t('chat', 'quickPrompt3', 'Mild dry cough and low-grade fever for 2 days'),
        t('chat', 'quickPrompt4', 'What are red-flag emergency symptoms?'),
        t('chat', 'quickPrompt5', 'What is a normal blood pressure reading?'),
        t('chat', 'quickPrompt6', 'High BP reading (155/95) with temple ache')
      ];

  const lastExternalNonceRef = useRef(null);
  useEffect(() => {
    if (externalPrompt?.text && externalPrompt.nonce !== lastExternalNonceRef.current) {
      lastExternalNonceRef.current = externalPrompt.nonce;
      handleSend(externalPrompt.text);
    }
  }, [externalPrompt]);

  const buildUnavailableReply = (text, currentAttachment) => {
    const isEmergency = detectEmergencyRedFlags(text);
    const unavailableMessages = {
      EN: 'Live AI guidance is temporarily unavailable right now. Please try sending your question again in a moment.',
      HI: 'लाइव AI सेवा अभी अस्थायी रूप से उपलब्ध नहीं है। कृपया थोड़ी देर बाद अपना प्रश्न फिर से भेजें।',
      MR: 'थेट AI सेवा सध्या तात्पुरती उपलब्ध नाही. कृपया थोड्या वेळाने तुमचा प्रश्न पुन्हा पाठवा.',
      GU: 'લાઇવ AI સેવા હાલમાં અસ્થાયી રૂપે ઉપલબ્ધ નથી. કૃપા કરીને થોડી વાર પછી ફરી પ્રયાસ કરો.',
      BN: 'লাইভ AI পরিষেবাটি সাময়িকভাবে উপলব্ধ নয়। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
      AR: 'خدمة الذكاء الاصطناعي المباشرة غير متاحة مؤقتاً حالياً. يرجى إعادة إرسال سؤالك بعد قليل.'
    };
    const emergencyPrefix = {
      EN: 'URGENT: Your message mentions symptoms that may require immediate emergency medical care. Please call 108 / 112 (India) or 911 (US) or go to the nearest emergency room right away.\n\n',
      HI: 'आपातकालीन सूचना: आपके संदेश में गंभीर लक्षणों का उल्लेख है। कृपया तुरंत 108 / 112 (भारत) या नजदीकी आपातकालीन अस्पताल से संपर्क करें।\n\n',
      MR: 'तातडीची सूचना: तुमच्या संदेशात गंभीर लक्षणांचा उल्लेख आहे. कृपया ताबडतोब 108 / 112 (भारत) वर कॉल करा किंवा जवळच्या रुग्णालयात जा.\n\n',
      GU: 'તાત્કાલિક સૂચના: તમારા સંદેશમાં ગંભીર લક્ષણોનો ઉલ્લેખ છે. કૃપા કરીને તરત જ 108 / 112 (ભારત) પર કૉલ કરો અથવા નજીકની હોસ્પিটલમાં જાઓ.\n\n',
      BN: 'জরুরি সতর্কতা: আপনার বার্তায় গুরুতর উপসর্গের উল্লেখ রয়েছে। অনুগ্রহ করে অবিলম্বে 108 / 112 (ভারত) নম্বরে কল করুন বা নিকটস্থ জরুরি বিভাগে যান।\n\n',
      AR: 'تنبيه عاجل: تتضمن رسالتك أعراضاً قد تستدعي رعاية طبية طارئة فوراً. يرجى الاتصال برقم الطوارئ (108 / 112 في الهند أو 911 في أمريكا) أو التوجه لأقرب قسم طوارئ.\n\n'
    };

    if (currentAttachment) {
      return `${unavailableMessages[currentLang] || unavailableMessages.EN} File attachments ("${currentAttachment.name}") are not yet analyzed by live AI.`;
    }

    const baseMsg = unavailableMessages[currentLang] || unavailableMessages.EN;
    return isEmergency ? `${emergencyPrefix[currentLang] || emergencyPrefix.EN}${baseMsg}` : baseMsg;
  };

  const handleSend = async (textToSend = inputMessage) => {
    const text = (typeof textToSend === 'string' ? textToSend : inputMessage).trim();
    if ((!text && !attachedFile) || isTyping) return;

    let messageText = text;
    if (attachedFile && !text) {
      messageText = `Uploaded ${attachedFile.type.startsWith('image/') ? 'clinical image' : 'medical document'}: ${attachedFile.name}`;
    }

    const currentAttachment = attachedFile;
    const recentHistory = messages
      .filter((m) => m.id !== 'welcome' && m.id !== 'welcome-reset')
      .slice(-6)
      .map((m) => ({ sender: m.sender, text: m.text }));

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      attachment: currentAttachment ? { name: currentAttachment.name, size: currentAttachment.size, type: currentAttachment.type } : null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setAttachedFile(null);
    setIsTyping(true);
    if (onMessageSent) {
      onMessageSent(messageText);
    }

    if (currentAttachment) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: buildUnavailableReply(text, currentAttachment),
          urgency: detectEmergencyRedFlags(text) ? 'RED' : null,
          sources: [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setIsTyping(false);
      }, 300);
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: currentLang || 'EN',
          category: activeCategory?.id || 'symptoms',
          history: recentHistory
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.replyText) {
        throw new Error(data?.error || `AI request failed (${response.status})`);
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.replyText,
        urgency: data.urgency || null,
        sources: Array.isArray(data.sources) && data.sources.length > 0 ? data.sources : [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch {
      const isEmergency = detectEmergencyRedFlags(text);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: buildUnavailableReply(text, null),
        urgency: isEmergency ? 'RED' : null,
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        timestamp: 'Just now',
        text: 'Chat cleared! Feel free to ask any health question or describe new symptoms.',
        urgency: null
      }
    ]);
  };

  const isDarkBoard = Boolean(compact);

  // Safely render **bold** spans without raw markdown asterisks
  const renderFormattedText = (text) => {
    if (!text || typeof text !== 'string') return text;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={i} className="font-extrabold text-[#0B3B3A]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  // Render message item (shared between inline and floating modes)
  const renderMessages = () => (
    <div
      ref={chatContainerRef}
      className={`flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm ${isDarkBoard ? 'bg-transparent' : 'bg-slate-50/70'
        }`}
    >
      {messages.map((msg) => {
        const isAi = msg.sender === 'ai';

        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
          >
            <div className={`flex items-start gap-2.5 max-w-[92%] sm:max-w-[85%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${isAi ? 'bg-[#D81B60] text-white' : 'bg-[#0D5C3A] text-white'
                }`}>
                {isAi ? <Bot className="w-4 h-4 stroke-[2.3]" /> : <UserIcon className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-3.5 sm:p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${isAi
                  ? isDarkBoard
                    ? 'bg-white/95 text-slate-800 border border-emerald-200/85 shadow-[0_4px_18px_rgba(13,92,58,0.08)] rounded-tl-xs backdrop-blur-sm'
                    : 'bg-white text-slate-800 border border-emerald-950/10 shadow-xs rounded-tl-xs'
                  : 'bg-[#0D5C3A] text-white shadow-xs rounded-tr-xs'
                  }`}
              >
                {/* AI Header with Clinical Urgency Badge */}
                {isAi && (
                  <div className={`flex items-center justify-between gap-2 pb-2 mb-2 flex-wrap border-b ${isDarkBoard ? 'border-emerald-900/10' : 'border-slate-100'
                    }`}>
                    <span className="text-[11px] font-black text-[#D81B60] uppercase tracking-wider">
                      Dr. Pratap Clinical AI
                    </span>
                    {msg.urgency && (
                      <div>
                        {msg.urgency === 'RED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-300 text-[10.5px] font-black">
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            RED ALERT • Immediate Emergency Care
                          </span>
                        )}
                        {msg.urgency === 'YELLOW' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-[10.5px] font-black">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            YELLOW CAUTION • Consult Doctor (24–48h)
                          </span>
                        )}
                        {msg.urgency === 'GREEN' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10.5px] font-black">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            GREEN NORMAL • Home Care & Monitoring
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* User Attachment Display */}
                {msg.attachment && (
                  <div className="mb-2 p-2 rounded-xl bg-black/20 border border-white/20 flex items-center gap-2 text-xs text-white">
                    <FileText className="w-4 h-4 text-emerald-300 shrink-0" />
                    <div className="truncate flex-1 text-left">
                      <div className="font-semibold truncate text-[11px]">{msg.attachment.name}</div>
                      <div className="text-[9.5px] text-emerald-200/80">
                        {(msg.attachment.size / 1024).toFixed(1)} KB • Medical Document / Image
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-xs sm:text-[13.5px] leading-relaxed">{renderFormattedText(msg.text)}</div>

                {/* Response Sources (only when explicitly returned) */}
                {isAi && msg.sources && msg.sources.length > 0 && (
                  <div className={`mt-3 pt-2.5 border-t text-[10px] flex items-center gap-1.5 flex-wrap ${isDarkBoard ? 'border-emerald-900/10 text-slate-500' : 'border-slate-100 text-slate-500'
                    }`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0D5C3A] shrink-0" />
                    <span>{msg.sources.join(' • ')}</span>
                  </div>
                )}
              </div>
            </div>

            <span className="text-[9.5px] mt-1 px-10 text-slate-400">
              {msg.timestamp}
            </span>
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isTyping && (
        <div className={`flex items-center gap-2 p-3 rounded-2xl border shadow-xs max-w-[130px] ${isDarkBoard ? 'bg-white/95 border-emerald-200/80' : 'bg-white border-emerald-950/10'
          }`}>
          <span className="text-xs font-bold text-slate-500">{t('chat', 'evaluating', 'Evaluating')}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] animate-bounce"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] animate-bounce [animation-delay:0.4s]"></span>
        </div>
      )}
    </div>
  );

  // Render quick prompts chips (compact single-row horizontal scroll)
  const renderQuickPrompts = () => (
    <div className={`px-3 py-1.5 border-t shrink-0 ${isDarkBoard ? 'bg-white/80 backdrop-blur-sm border-emerald-100' : 'bg-white border-slate-100'
      }`}>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar whitespace-nowrap">
        <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 ${isDarkBoard ? 'text-[#0D5C3A]' : 'text-slate-400'
          }`}>
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>{t('chat', 'tryLabel', 'Try:')}</span>
        </span>
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(q)}
            className={`text-[10.5px] px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer font-medium shrink-0 ${isDarkBoard
              ? 'bg-[#F0FDF4] hover:bg-[#0D5C3A] text-[#0D5C3A] hover:text-white border-emerald-200'
              : 'bg-[#F2F8F5] hover:bg-[#EBF5F0] text-[#0D5C3A] hover:text-[#0A4D30] border-emerald-200/80'
              }`}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );

  // Render chat input form
  const renderInputBar = () => (
    <div className={`p-2 sm:p-2.5 border-t shrink-0 ${isDarkBoard ? 'bg-white/90 backdrop-blur-md border-emerald-100' : 'bg-white border-slate-200'
      }`}>
      {/* Hidden File Input for images and document files */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,.pdf,.doc,.docx,.txt"
        className="hidden"
      />

      {/* Attached file preview chip */}
      {attachedFile && (
        <div className="mb-2 flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-[#0D5C3A] animate-in fade-in">
          <div className="flex items-center gap-1.5 truncate">
            <FileText className="w-3.5 h-3.5 text-[#0D5C3A] shrink-0" />
            <span className="font-semibold truncate text-[11px]">{attachedFile.name}</span>
            <span className="text-[9.5px] text-slate-500">({(attachedFile.size / 1024).toFixed(1)} KB)</span>
          </div>
          <button
            type="button"
            onClick={() => setAttachedFile(null)}
            className="p-0.5 rounded-full hover:bg-emerald-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="Remove attachment"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className={`flex items-center gap-1.5 rounded-xl border p-1 transition-all ${isDarkBoard
          ? 'bg-[#F8FAF9] border-emerald-200/90 focus-within:border-[#0D5C3A] focus-within:ring-2 focus-within:ring-emerald-100'
          : 'bg-slate-50 border-slate-200/90 focus-within:border-[#0D5C3A] focus-within:ring-1 focus-within:ring-emerald-200'
          }`}
      >
        {/* Upload Button with ChatGPT-style Options Popup */}
        <div className="relative" ref={uploadMenuRef}>
          <button
            type="button"
            onClick={() => setShowUploadMenu(prev => !prev)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${showUploadMenu
              ? 'bg-emerald-100 text-[#0D5C3A] ring-1 ring-[#0D5C3A]'
              : 'text-slate-500 hover:text-[#0D5C3A] hover:bg-emerald-50'
              }`}
            title="Upload medical report or image"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* ChatGPT-style Popup Menu */}
          {showUploadMenu && (
            <div
              className="absolute bottom-full left-0 mb-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/95 p-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150"
              style={{
                boxShadow: '0 12px 36px -4px rgba(13, 92, 58, 0.22), 0 0 0 1px rgba(13, 92, 58, 0.08)'
              }}
            >
              <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
                <span className="text-[11px] font-black text-slate-800 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-[#0D5C3A]" />
                  <span>{t('chat', 'docChooser', 'Choose Document Type')}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowUploadMenu(false)}
                  className="p-0.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1">
                {/* Option 1: Documents & Lab Reports */}
                <button
                  type="button"
                  onClick={() => triggerFileInput('.pdf,.doc,.docx,.txt')}
                  className="w-full text-left p-2 rounded-xl hover:bg-emerald-50 flex items-center gap-2.5 transition-colors group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0D5C3A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-[#0D5C3A]">
                      {t('chat', 'docType1', 'Medical Documents & Reports')}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {t('chat', 'docType1Sub', 'PDF, DOCX, TXT (Lab reports, summaries)')}
                    </div>
                  </div>
                </button>

                {/* Option 2: Photos & Scans */}
                <button
                  type="button"
                  onClick={() => triggerFileInput('image/*')}
                  className="w-full text-left p-2 rounded-xl hover:bg-rose-50 flex items-center gap-2.5 transition-colors group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-[#D81B60] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-[#D81B60]">
                      {t('chat', 'docType2', 'Photos & Medical Images')}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {t('chat', 'docType2Sub', 'JPG, PNG, WebP (Prescriptions, skin, X-Rays)')}
                    </div>
                  </div>
                </button>

                {/* Option 3: Camera Capture */}
                <button
                  type="button"
                  onClick={handleStartCamera}
                  className="w-full text-left p-2 rounded-xl hover:bg-sky-50 flex items-center gap-2.5 transition-colors group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-sky-800">
                      {t('chat', 'docType3', 'Camera / Scan Document')}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {t('chat', 'docType3Sub', 'Click photo of prescription or medicine')}
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-1.5 pt-1.5 border-t border-slate-100 px-2 text-[9px] text-slate-400">
                {t('chat', 'privacyNotice', '🔒 Clinical privacy: Files are analyzed securely for triage guidance only.')}
              </div>
            </div>
          )}
        </div>

        {/* Voice Search Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${isListening
            ? 'text-rose-600 bg-rose-50 animate-pulse ring-1 ring-rose-400'
            : 'text-slate-500 hover:text-[#0D5C3A] hover:bg-emerald-50'
            }`}
          title={isListening ? "Listening... Click to stop" : "Voice search / speak query"}
        >
          <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce text-rose-600' : ''}`} />
        </button>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Listening... Speak now..." : t('chat', 'placeholder', "Ask Dr. Pratap AI: Describe any symptom or query...")}
          className="flex-1 min-w-0 bg-transparent px-1.5 sm:px-2 py-1 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
        />

        {/* WhatsApp Share Button */}
        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="inline-flex p-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer shrink-0"
          title="Share consultation to WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4" />
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={(!inputMessage.trim() && !attachedFile) || isTyping}
          className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0D5C3A] hover:bg-[#0A4D30] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0 shadow-xs"
          title="Send message"
        >
          <span className="inline">{t('chat', 'sendBtn', 'Send')}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      <div className="flex items-center justify-between text-[9px] text-slate-500 mt-1 px-1">
        <span>{t('chat', 'supervisionBadge', 'Physician-supervised triage & evidence guidance')}</span>
      </div>
    </div>
  );

  // Render Live Camera Viewfinder Modal
  const renderCameraModal = () => {
    if (!isCameraActive) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="relative w-full max-w-md bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-800 text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold">Scan Prescription / Medical Document</span>
            </div>
            <button
              type="button"
              onClick={stopCamera}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Close camera"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Live Video Viewfinder */}
          <div className="relative aspect-4/3 bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Framing Box */}
            <div className="absolute inset-6 border-2 border-dashed border-emerald-400/70 rounded-2xl pointer-events-none flex items-end justify-center pb-2">
              <span className="text-[10px] text-white/90 bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-xs font-medium">
                Align prescription or report in frame
              </span>
            </div>
          </div>

          {/* Shutter & Controls */}
          <div className="p-4 bg-slate-800/95 flex items-center justify-between px-6 border-t border-white/10">
            <button
              type="button"
              onClick={stopCamera}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {/* Circular Shutter Button */}
            <button
              type="button"
              onClick={capturePhoto}
              className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 border-4 border-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer group"
              title="Capture Photo"
            >
              <Camera className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => {
                stopCamera();
                if (fileInputRef.current) {
                  fileInputRef.current.accept = 'image/*';
                  fileInputRef.current.setAttribute('capture', 'environment');
                  fileInputRef.current.click();
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors cursor-pointer"
              title="Open file chooser"
            >
              Browse
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =========================================================================
  // 1. INLINE MODE: COMPACT, ELEGANT LANDING PAGE SECTION
  // =========================================================================
  if (inline) {
    const chatCard = (
      <div
        className={`w-full rounded-2xl overflow-hidden flex flex-col ${isDarkBoard
          ? 'h-[clamp(300px,74dvh,700px)] border border-emerald-200/90 shadow-[0_14px_40px_rgba(13,92,58,0.12)]'
          : 'h-[clamp(320px,55dvh,400px)] bg-white border border-emerald-950/15 shadow-lg'
          }`}
        style={
          isDarkBoard
            ? {
              background:
                'radial-gradient(circle at 8% 15%, rgba(134, 239, 172, 0.35), transparent 46%), radial-gradient(circle at 90% 85%, rgba(167, 243, 208, 0.32), transparent 50%), radial-gradient(circle at 75% 15%, rgba(253, 224, 71, 0.14), transparent 36%), linear-gradient(155deg, #F0FDF4 0%, #FFFFFF 52%, #ECFDF5 100%)'
            }
            : undefined
        }
      >
        {/* Top Bar */}
        <div className={`${isDarkBoard ? 'bg-gradient-to-r from-[#0D5C3A] via-[#0B4F32] to-[#0D5C3A] border-b border-emerald-900/15' : 'bg-[#0E281F]'} text-white px-3.5 py-2.5 flex items-center justify-between shrink-0 shadow-xs`}>
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative w-7 h-7 rounded-lg bg-[#D81B60] flex items-center justify-center shrink-0 shadow-xs">
              <Stethoscope className="w-3.5 h-3.5 text-white" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-[#0E281F]"></span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 leading-tight flex-wrap">
                <h3 className="text-xs font-black tracking-tight truncate">
                  {categoryTitle
                    ? `${t('chat', 'botName', 'Dr. Pratap AI')} • ${categoryTitle}`
                    : t('chat', 'botName', 'Dr. Pratap AI Clinical Assistant')}
                </h3>
                <span className="text-[8.5px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/40">
                  {t('chat', 'live', 'Live')}
                </span>
              </div>
              <p className="text-[9.5px] text-emerald-200/80 font-medium truncate">
                {categoryTitle
                  ? (activeCategory?.desc || activeCategory?.description || t('chat', 'botStatus', 'Supervised by Dr. Pratap Madhukar • 38 Yrs Experience'))
                  : t('chat', 'botStatus', 'Supervised by Dr. Pratap Madhukar • 38 Yrs Experience')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleClearChat}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 text-[10px] font-semibold border border-white/10 transition-colors cursor-pointer"
              title="Clear conversation"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>{t('chat', 'clear', 'Clear')}</span>
            </button>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-white/10 text-emerald-200 text-[10px] font-semibold border border-white/10">
              {t('chat', 'freeAccess', 'Free Access')}
            </span>
          </div>
        </div>

        {/* Message Stream */}
        {renderMessages()}

        {/* Quick Prompts */}
        {renderQuickPrompts()}

        {/* Input Bar */}
        {renderInputBar()}
      </div>
    );

    if (compact) {
      return (
        <>
          {chatCard}
          {renderCameraModal()}
        </>
      );
    }

    return (
      <section id="chat-assistant" className="py-6 sm:py-8 bg-gradient-to-b from-[#F8FAF9] via-white to-[#F2F8F5] border-y border-emerald-950/10 scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-3 sm:space-y-4">
          {/* Section Header */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF5F0] border border-emerald-200 text-[10.5px] font-bold text-[#0D5C3A] shadow-2xs">
              <Bot className="w-3 h-3 text-[#0D5C3A]" />
              <span>{t('chat', 'badge', 'AI Co-Intelligence Clinical Chat')}</span>
            </div>

            <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
              {t('chat', 'title', 'Interactive Clinical Chat Assistant')}
            </h2>

            <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
              {t('chat', 'subtitle', 'Physician-supervised symptom dialogue. Type your symptoms or tap a sample query.')}
            </p>
          </div>

          {chatCard}
        </div>

        {/* Live Camera Modal */}
        {renderCameraModal()}
      </section>
    );
  }

  // =========================================================================
  // 2. FLOATING POPUP MODE: FOR DASHBOARD & FLOATING TRIGGER
  // =========================================================================
  return (
    <>
      {/* Floating Trigger Button */}
      <div
        className="fixed right-3 sm:right-6 z-40 max-w-[calc(100vw-1.5rem)]"
        style={{ bottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-[#0D5C3A] hover:bg-[#0A4D30] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/40"
          aria-label="Open Health AI Chatbot"
          title="Open Health Orbit Pro Assistant"
        >
          {/* Animated online ring */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>

          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            {isOpen ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            )}
          </div>

          <span className="text-xs sm:text-sm font-black tracking-tight whitespace-nowrap">
            {isOpen ? t('chat', 'clear', 'Close') : t('chat', 'title', 'Health AI Chat')}
          </span>
        </button>
      </div>

      {/* Floating Modal Window */}
      {isOpen && (
        <div
          className="fixed right-3 sm:right-6 w-[min(410px,calc(100vw-1.5rem))] h-[min(540px,calc(100dvh-5.5rem))] rounded-3xl shadow-2xl border border-emerald-200/90 bg-white flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{
            bottom: 'max(4.5rem, calc(env(safe-area-inset-bottom) + 3.75rem))',
            boxShadow: '0 20px 50px -10px rgba(13, 92, 58, 0.28), 0 0 0 1px rgba(13, 92, 58, 0.15)'
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#0E281F] text-white flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-white/15 backdrop-blur-xs border border-white/30 flex items-center justify-center shrink-0">
                <Stethoscope className="w-4 h-4 text-emerald-300" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-white"></span>
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-black">Health Orbit Pro™</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/40">
                    {t('chat', 'live', 'Live')}
                  </span>
                </div>
                <div className="text-[10px] text-emerald-200/90 font-medium">
                  Clinically Grounded • Instant Guidance
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="p-1.5 rounded-lg hover:bg-white/15 text-emerald-300 hover:text-white transition-colors cursor-pointer"
                title="Share on WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              </button>
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Clear conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Banner */}
          {activeCategory && (
            <div className="px-3.5 py-1.5 bg-[#F2F8F5] border-b border-emerald-100 text-[11px] font-semibold text-[#0D5C3A] flex items-center justify-between">
              <span className="truncate">Active Topic: {activeCategory.name}</span>
              <span className="text-[9.5px] text-slate-400">Contextual Mode</span>
            </div>
          )}

          {/* Message Stream */}
          {renderMessages()}

          {/* Quick Prompts */}
          {renderQuickPrompts()}

          {/* Input Bar */}
          {renderInputBar()}
        </div>
      )}

      {/* Live Camera Modal */}
      {renderCameraModal()}
    </>
  );
}
