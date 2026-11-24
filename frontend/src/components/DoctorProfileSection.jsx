import React from 'react';
import {
  Award,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  HeartHandshake
} from 'lucide-react';
import { FOUNDER_INFO } from '../config/company';

export default function DoctorProfileSection({ onStartAssessment }) {
  return (
    <section id="founder" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-emerald-950/10 scroll-mt-24">
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clinical Leadership & Founder Spotlight Card */}
        <div className="bg-gradient-to-br from-[#0D5C3A] via-[#0E6B44] to-[#09432A] rounded-3xl p-7 sm:p-12 lg:p-14 text-white shadow-2xl relative overflow-hidden">

          {/* Subtle background decoration */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

            {/* Left: Doctor Photo Card */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl bg-slate-900">
                <img
                  src="/assets/dr_pratap_founder_square.jpg"
                  alt={FOUNDER_INFO.name}
                  className="w-full h-full object-cover object-center"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                  loading="eager"
                />
              </div>

              <div className="mt-5 space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 text-xs sm:text-sm font-bold">
                  <Award className="w-4 h-4" />
                  <span>Chief Medical Mentor</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{FOUNDER_INFO.name}</h3>
                <p className="text-base sm:text-lg text-emerald-100 font-semibold">{FOUNDER_INFO.role}</p>
                <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                  {FOUNDER_INFO.credentials} • {FOUNDER_INFO.experience}
                </p>
              </div>
            </div>

            {/* Right: Message & Clinical Principles */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-black text-emerald-200 uppercase tracking-wider block">
                  A Clinical Message from the Founder
                </span>
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-100 leading-relaxed italic">
                  "{FOUNDER_INFO.quote}"
                </blockquote>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/15">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs space-y-1">
                  <span className="text-xs text-emerald-200 font-bold uppercase">Evidence Base</span>
                  <p className="text-sm font-bold text-white">ICMR & WHO Protocols</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs space-y-1">
                  <span className="text-xs text-emerald-200 font-bold uppercase">Clinical Review</span>
                  <p className="text-sm font-bold text-white">1,000+ Validated Cards</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs space-y-1">
                  <span className="text-xs text-emerald-200 font-bold uppercase">Multilingual</span>
                  <p className="text-sm font-bold text-white">6 Indian & Regional Languages</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onStartAssessment ? onStartAssessment() : (window.location.pathname = '/user/dashboard')}
                  className="px-8 py-4 rounded-full bg-[#FDE047] hover:bg-[#facc15] text-slate-900 font-black text-sm sm:text-base shadow-lg transition-all cursor-pointer inline-flex items-center gap-2.5 active:scale-98"
                >
                  <span>Start Assessment with Clinical Guidance</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
