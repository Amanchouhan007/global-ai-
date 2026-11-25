import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  GripVertical,
  ChevronDown,
  ChevronUp,
  X,
  Lock,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Mail,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { BRAND } from '../config/brand';
import { COMPANY_INFO, FOUNDER_INFO } from '../config/company';
import { useLanguage } from '../context/LanguageContext';

/**
 * DraggableDisclaimerBox - DPDP Act 2023 Compliant Clinical Governance & Safety Box
 * Interactive, smooth-draggable floating widget positioned on the landing page.
 * Provides instant transparency into local-first privacy, emergency triage limitations,
 * and user statutory rights under the Indian DPDP Act 2023.
 */
export default function DraggableDisclaimerBox({
  isOpenExternal,
  onCloseExternal
}) {
  const { currentLang, t } = useLanguage();
  const boxRef = useRef(null);

  // Expanded / Collapsed state
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [erasureStatus, setErasureStatus] = useState('');

  // Position state (defaults to bottom-left on desktop, bottom-center on mobile)
  const [position, setPosition] = useState({ x: 24, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });
  const didDragRef = useRef(false);

  // Initialize position to bottom-left once mounted
  useEffect(() => {
    const initY = Math.max(80, window.innerHeight - (isExpanded ? 520 : 180));
    const initX = window.innerWidth < 640 ? 12 : 24;
    setPosition({ x: initX, y: initY });
  }, []);

  // When triggered from header disclaimer button, automatically un-dismiss and expand
  useEffect(() => {
    if (isOpenExternal) {
      setIsDismissed(false);
      setIsExpanded(true);
    }
  }, [isOpenExternal]);

  // Adjust Y position when expanding so the box never clips past the bottom viewport
  useEffect(() => {
    if (isExpanded) {
      setPosition(prev => {
        const estimatedHeight = 520;
        const maxAllowedY = Math.max(76, window.innerHeight - estimatedHeight - 20);
        if (prev.y > maxAllowedY) {
          return { ...prev, y: maxAllowedY };
        }
        return prev;
      });
    }
  }, [isExpanded]);

  // Dragging logic with mouse and touch support
  const handleStartDrag = (clientX, clientY) => {
    setIsDragging(true);
    didDragRef.current = false;
    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      posX: position.x,
      posY: position.y
    };
  };

  const handleMouseDown = (e) => {
    // Only drag when clicking the header handle, not inside buttons or inputs
    if (e.target.closest('button') || e.target.closest('a')) return;
    handleStartDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    const touch = e.touches[0];
    handleStartDrag(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        didDragRef.current = true;
      }

      const newX = dragStartRef.current.posX + deltaX;
      const newY = dragStartRef.current.posY + deltaY;

      // Constrain within viewport boundaries
      const maxW = window.innerWidth - (boxRef.current?.offsetWidth || 340) - 10;
      const maxH = window.innerHeight - (boxRef.current?.offsetHeight || 120) - 10;

      setPosition({
        x: Math.max(10, Math.min(newX, maxW)),
        y: Math.max(70, Math.min(newY, maxH))
      });
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartRef.current.mouseX;
      const deltaY = touch.clientY - dragStartRef.current.mouseY;
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        didDragRef.current = true;
      }

      const newX = dragStartRef.current.posX + deltaX;
      const newY = dragStartRef.current.posY + deltaY;

      const maxW = window.innerWidth - (boxRef.current?.offsetWidth || 340) - 10;
      const maxH = window.innerHeight - (boxRef.current?.offsetHeight || 120) - 10;

      setPosition({
        x: Math.max(10, Math.min(newX, maxW)),
        y: Math.max(70, Math.min(newY, maxH))
      });
    };

    const handleEndDrag = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEndDrag);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleEndDrag);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEndDrag);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEndDrag);
    };
  }, [isDragging]);

  // DPDP Right to Erasure action
  const handlePurgeSessionData = (e) => {
    e.stopPropagation();
    try {
      localStorage.removeItem('healthorbit_search_history');
      localStorage.removeItem('healthorbit_feedback_history');
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('healthorbit_checklist_') || key.startsWith('healthorbit_notes_')) {
          localStorage.removeItem(key);
        }
      });
      setErasureStatus('All local search and card caches purged from your browser.');
      setTimeout(() => setErasureStatus(''), 4500);
    } catch (err) {
      console.error('Purge error:', err);
    }
  };

  if (isDismissed) {
    // Compact re-open pill floating on bottom-left
    return (
      <button
        type="button"
        onClick={() => {
          setIsDismissed(false);
          setIsExpanded(true);
        }}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0D5C3A] hover:bg-[#0A4D30] text-white text-xs font-bold shadow-xl border border-emerald-400/30 transition-transform hover:scale-105 cursor-pointer select-none"
        title="Open DPDP Disclaimer"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-300" />
        <span>DPDP Disclaimer</span>
      </button>
    );
  }

  return (
    <div
      ref={boxRef}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none'
      }}
      className={`fixed z-40 transition-shadow select-none ${
        isExpanded ? 'w-[92vw] sm:w-[420px] max-w-[440px]' : 'w-[90vw] sm:w-[360px]'
      }`}
    >
      <div
        className={`rounded-2xl border shadow-2xl backdrop-blur-md transition-colors overflow-hidden ${
          isDragging
            ? 'shadow-emerald-950/40 ring-2 ring-emerald-500 bg-white/95'
            : 'shadow-[0_16px_40px_rgba(13,92,58,0.18)] bg-white/95'
        } border-emerald-900/15`}
      >
        {/* DRAGGABLE HEADER BAR */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={(e) => {
            if (!isExpanded && !didDragRef.current && !e.target.closest('button')) {
              setIsExpanded(true);
            }
          }}
          className={`flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-[#0D5C3A] to-[#0A4D30] text-white ${!isExpanded ? 'cursor-pointer' : 'cursor-grab'} active:cursor-grabbing border-b border-emerald-800`}
          title={!isExpanded ? 'Click to open DPDP terms or drag anywhere' : 'Drag this box anywhere on your screen'}
        >
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-emerald-300 shrink-0 opacity-80" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="text-xs font-black tracking-tight">{t('draggableDisclaimer', 'gripTitle', 'DPDP & Clinical Safety')}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Drag hint badge */}
            <span className="hidden sm:inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/15 text-emerald-200">
              {t('draggableDisclaimer', 'dragMe', 'Drag Me')}
            </span>

            {/* Expand / Minimize Toggle */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-lg hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer"
              title={isExpanded ? 'Collapse' : 'Expand'}
              aria-label="Toggle details"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={() => {
                setIsDismissed(true);
                if (onCloseExternal) onCloseExternal();
              }}
              className="p-1 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Minimize to pill"
              aria-label="Minimize"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* COLLAPSED SUMMARY VIEW */}
        {!isExpanded && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsExpanded(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsExpanded(true);
              }
            }}
            className="p-3 text-xs space-y-2 bg-gradient-to-b from-[#F4F9F6] to-white cursor-pointer hover:from-[#EBF5F0] transition-colors"
            title="Click to read full DPDP & Clinical Safety terms"
          >
            <div className="flex items-start gap-2 text-slate-700">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="leading-snug text-[11px] text-slate-600 font-medium">
                {t('draggableDisclaimer', 'summary', `Educational Triage Only: Under ${FOUNDER_INFO.name} (${FOUNDER_INFO.experience}). Zero server tracking under India's DPDP Act 2023.`)}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-emerald-950/10">
              <span className="text-[10px] font-bold text-rose-600">
                {t('draggableDisclaimer', 'emergency', 'Emergency: Call 108 / 112')}
              </span>
              <span className="text-[11px] font-black text-[#0D5C3A] hover:underline">
                {t('draggableDisclaimer', 'readTerms', 'Read DPDP Terms →')}
              </span>
            </div>
          </div>
        )}

        {/* EXPANDED RICH DPDP COMPLIANCE CARD */}
        {isExpanded && (
          <div className="p-4 text-xs space-y-3.5 max-h-[70vh] overflow-y-auto bg-white">
            
            {/* Status Message if Purged */}
            {erasureStatus && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{erasureStatus}</span>
              </div>
            )}

            {/* Core 1: Clinical Triage Disclaimer */}
            <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 space-y-1">
              <div className="flex items-center gap-1.5 font-black text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Clinical Scope & Educational Nature</span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-amber-900/90 font-medium">
                {BRAND.name}™ is a clinical guidance and triage platform developed under the medical supervision of {FOUNDER_INFO.name} ({FOUNDER_INFO.experience}). It does <strong>not</strong> establish a doctor-patient relationship and is <strong>not an emergency hospital service</strong>.
              </p>
              <p className="text-[10.5px] font-bold text-red-600 pt-0.5">
                In acute emergencies (chest pain, breathing distress, sudden weakness), immediately dial 108 or 112.
              </p>
            </div>

            {/* Core 2: Indian DPDP Act 2023 Statutory Guarantees */}
            <div className="p-3 rounded-xl bg-[#F4F9F6] border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5 font-black text-xs text-[#0D5C3A]">
                <Lock className="w-4 h-4 text-[#0D5C3A] shrink-0" />
                <span>DPDP Act 2023 • Local-First Architecture</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-700 leading-snug">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0D5C3A] font-bold">✓</span>
                  <span><strong>Zero Server Profiling:</strong> Your symptom queries and card notes remain in your device session. They are never sold or sent to ad brokers.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0D5C3A] font-bold">✓</span>
                  <span><strong>Purpose Limitation:</strong> Language preferences and anonymous feedback are used solely for UI rendering.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0D5C3A] font-bold">✓</span>
                  <span><strong>Statutory 48h Grievance Redressal:</strong> Dedicated Data Protection Officer reachable at <a href={`mailto:${COMPANY_INFO.grievanceEmail}`} className="text-[#0D5C3A] font-bold underline">{COMPANY_INFO.grievanceEmail}</a>.</span>
                </li>
              </ul>
            </div>

            {/* Core 3: Action Buttons (Right to Erasure & Acknowledge) */}
            <div className="pt-1 flex flex-col gap-2">
              <button
                type="button"
                onClick={handlePurgeSessionData}
                className="w-full py-2 px-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Immediately erase all local symptom search caches"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>{t('draggableDisclaimer', 'purgeBtn', 'DPDP Right to Erasure: Purge Local Session Data')}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  if (onCloseExternal) onCloseExternal();
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#0D5C3A] hover:bg-[#0A4D30] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                {t('draggableDisclaimer', 'ackBtn', 'Acknowledge & Collapse (Keep Draggable)')}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
