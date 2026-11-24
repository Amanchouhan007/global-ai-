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
  HelpCircle
} from 'lucide-react';
import {
  generateHealthAssessment,
  detectEmergencyRedFlags,
  HEALTH_CATEGORIES
} from '../../data/healthKnowledgeBase';

export default function FloatingHealthChatbot({
  user,
  activeCategory,
  inline = false,
  onStartAssessment
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      timestamp: 'Just now',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'there'}! 👋 I am your Health Orbit Pro Assistant, supervised by Dr. Pratap Madhukar. Describe any symptom or ask a health question, and I will give you instant, clinically grounded triage guidance, danger-sign checks, and safe next steps.`,
      urgency: null
    }
  ]);

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
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

  // Quick prompt suggestions
  const quickPrompts = [
    'Severe right-side headache with sensitivity to bright lights',
    'Chest tightness on exertion radiating to left shoulder',
    'Mild dry cough and low-grade fever for 2 days',
    'What are red-flag emergency symptoms?',
    'What is a normal blood pressure reading?',
    'High BP reading (155/95) with temple ache'
  ];

  const handleSend = (textToSend = inputMessage) => {
    const text = (typeof textToSend === 'string' ? textToSend : inputMessage).trim();
    if (!text || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate smart clinical evaluation response using verified knowledge base
    setTimeout(() => {
      const assessment = generateHealthAssessment(text, activeCategory?.id || 'symptoms');

      let replyText = assessment.understanding || 'Thank you for sharing your symptoms. Here is the clinical assessment:';
      if (assessment.possibleExplanations && assessment.possibleExplanations.length > 0) {
        replyText += `\n\nClinical Considerations:\n• ` + assessment.possibleExplanations.slice(0, 3).join('\n• ');
      }
      if (assessment.nextSteps && assessment.nextSteps.length > 0) {
        replyText += `\n\nSafe Next Steps:\n• ` + assessment.nextSteps.slice(0, 3).join('\n• ');
      }
      if (assessment.whenToSeekHelp) {
        replyText += `\n\nGuidance: ${assessment.whenToSeekHelp}`;
      }

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        urgency: assessment.urgency,
        urgencyLabel: assessment.urgencyLabel,
        sources: assessment.sources || ['ICMR/WHO Clinical Practice Guidelines', 'GlobalHealth Peer-Reviewed Protocols'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
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

  // Render message item (shared between inline and floating modes)
  const renderMessages = () => (
    <div
      ref={chatContainerRef}
      className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm bg-slate-50/70"
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
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                isAi ? 'bg-[#D81B60] text-white' : 'bg-[#0D5C3A] text-white'
              }`}>
                {isAi ? <Bot className="w-4 h-4 stroke-[2.3]" /> : <UserIcon className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-3.5 sm:p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  isAi
                    ? 'bg-white text-slate-800 border border-emerald-950/10 shadow-xs rounded-tl-xs'
                    : 'bg-[#0D5C3A] text-white shadow-xs rounded-tr-xs'
                }`}
              >
                {/* AI Header with Clinical Urgency Badge */}
                {isAi && (
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2 flex-wrap">
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

                <div className="text-xs sm:text-[13.5px] leading-relaxed">{msg.text}</div>

                {/* Grounded Citation */}
                {isAi && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0D5C3A] shrink-0" />
                    <span>Grounded in verified clinical research PDFs and ICMR/WHO guidelines</span>
                  </div>
                )}
              </div>
            </div>

            <span className="text-[9.5px] text-slate-400 mt-1 px-10">
              {msg.timestamp}
            </span>
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-emerald-950/10 shadow-xs max-w-[130px]">
          <span className="text-xs font-bold text-slate-400">Evaluating</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] animate-bounce"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] animate-bounce [animation-delay:0.4s]"></span>
        </div>
      )}
    </div>
  );

  // Render quick prompts chips
  const renderQuickPrompts = () => (
    <div className="px-4 py-3 bg-white border-t border-slate-100 shrink-0">
      <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Ask a common clinical question or tap to test:</span>
      </div>
      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(q)}
            className="text-left text-[11px] sm:text-xs px-3 py-1.5 rounded-full bg-[#F2F8F5] hover:bg-[#EBF5F0] text-[#0D5C3A] hover:text-[#0A4D30] border border-emerald-200/80 transition-colors cursor-pointer font-medium shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );

  // Render chat input form
  const renderInputBar = () => (
    <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-slate-50 rounded-2xl border border-emerald-950/15 p-2 focus-within:border-[#0D5C3A] focus-within:ring-2 focus-within:ring-emerald-100 transition-all"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Dr. Pratap AI: Describe any symptom or health query..."
          className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim() || isTyping}
          className="px-4 py-2 rounded-xl bg-[#0D5C3A] hover:bg-[#0A4D30] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs"
          title="Send message"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      <div className="text-center text-[10px] text-slate-500 mt-2">
        Physician-supervised triage & evidence guidance • In life-threatening emergencies, call <span className="font-bold text-rose-600">102 / 112</span>
      </div>
    </div>
  );

  // =========================================================================
  // 1. INLINE MODE: DEDICATED, SPACIOUS LANDING PAGE SECTION
  // =========================================================================
  if (inline) {
    return (
      <section id="chat-assistant" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#F8FAF9] via-white to-[#F2F8F5] border-y border-emerald-950/10 scroll-mt-20">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF5F0] border border-emerald-200 text-xs sm:text-sm font-bold text-[#0D5C3A] shadow-2xs">
              <Bot className="w-4 h-4 text-[#0D5C3A]" />
              <span>AI Co-Intelligence Clinical Chat Engine</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Interactive Clinical Chat Assistant
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-slate-600 font-medium leading-relaxed">
              Experience physician-supervised symptom dialogue. Type your symptoms below or select any prompt to see evidence-based clinical triage, emergency red-flag detection, and safe next steps.
            </p>
          </div>

          {/* Spacious Dedicated Chat Interface Container */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl sm:rounded-4xl border border-emerald-950/15 shadow-[0_20px_50px_rgba(13,92,58,0.08)] overflow-hidden flex flex-col h-[580px] sm:h-[620px]">
            
            {/* Top Bar */}
            <div className="bg-[#0E281F] text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0 shadow-xs flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-[#D81B60] flex items-center justify-center shrink-0 shadow-sm">
                  <Stethoscope className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0E281F]"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-black tracking-tight">
                      Dr. Pratap AI Clinical Assistant
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/40">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-200/80 font-medium">
                    Supervised by Dr. Pratap Madhukar • 38 Years Clinical Experience
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
                  title="Clear conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Chat</span>
                </button>
                <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold border border-white/10">
                  100% Free Public Access
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
        </div>
      </section>
    );
  }

  // =========================================================================
  // 2. FLOATING POPUP MODE: FOR DASHBOARD & FLOATING TRIGGER
  // =========================================================================
  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#0D5C3A] hover:bg-[#0A4D30] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/40"
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
            {isOpen ? 'Close Chat' : 'Health AI Chat'}
          </span>
        </button>
      </div>

      {/* Floating Modal Window */}
      {isOpen && (
        <div
          className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 w-[360px] sm:w-[410px] max-w-[calc(100vw-1.5rem)] h-[540px] max-h-[82vh] rounded-3xl shadow-2xl border border-emerald-200/90 bg-white flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{
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
                    Live
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
    </>
  );
}
