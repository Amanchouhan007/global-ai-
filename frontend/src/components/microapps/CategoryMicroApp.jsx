import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  Heart,
  Users,
  Baby,
  Apple,
  Brain,
  Bed,
  Sparkles,
  FlaskConical,
  Pill,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Droplets,
  Clock,
  Send,
  ShieldCheck,
  Thermometer
} from 'lucide-react';
import HealthCardShowcase from '../HealthCardShowcase';
import {
  LAB_PANELS,
  MEDICINE_GUIDE_LIST,
  NUTRITION_PLANS,
  FAMILY_PROFILES,
  BEAUTY_CONCERNS
} from '../../data/categoryMicroApps';

function AskAIButton({ label = 'Analyze with Dr. Pratap AI', onClick, variant = 'emerald' }) {
  const styles =
    variant === 'pink'
      ? 'bg-gradient-to-r from-[#D81B60] to-[#BE185D] hover:from-[#BE185D] hover:to-[#9D174D]'
      : 'bg-[#0D5C3A] hover:bg-[#0A4A2E]';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all cursor-pointer ${styles}`}
    >
      <Send className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}

/* 1. MY SYMPTOMS MICRO-APP */
function SymptomsMicroApp({ onAskAI }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/80 dark:border-pink-900/50 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D81B60] animate-pulse" />
          <span className="text-xs sm:text-sm font-black text-[#BE185D] dark:text-pink-300">
            Interactive Symptom Triage & Clinical Health Cards Micro-App
          </span>
        </div>
        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
          Select a card, check your symptoms, and prepare your visit summary
        </span>
      </div>

      <HealthCardShowcase
        showCardSelector={true}
        onPrepareVisit={(symptomSummary) =>
          onAskAI(`Please evaluate my symptom card summary and guide safe next steps: ${symptomSummary}`)
        }
      />
    </div>
  );
}

/* 2. MY PERSONAL HEALTH MICRO-APP (Live Vitals, BP, Sugar, BMI Checker) */
function PersonalHealthMicroApp({ onAskAI }) {
  const [sys, setSys] = useState(124);
  const [dia, setDia] = useState(80);
  const [fbs, setFbs] = useState(96);
  const [hba1c, setHba1c] = useState(5.5);
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(68);

  const bpStatus = useMemo(() => {
    const s = Number(sys) || 0;
    const d = Number(dia) || 0;
    if (s >= 180 || d >= 120) return { label: 'Hypertensive Crisis (Seek Urgent Care)', tone: 'red' };
    if (s >= 140 || d >= 90) return { label: 'Stage 2 High BP (Consult Doctor Soon)', tone: 'amber' };
    if ((s >= 130 && s <= 139) || (d >= 80 && d <= 89)) return { label: 'Elevated / Stage 1 BP', tone: 'amber' };
    if (s > 0 && s < 90 && d > 0 && d < 60) return { label: 'Low Blood Pressure (Hypotension)', tone: 'amber' };
    return { label: 'Normal Blood Pressure', tone: 'green' };
  }, [sys, dia]);

  const sugarStatus = useMemo(() => {
    const f = Number(fbs) || 0;
    const a = Number(hba1c) || 0;
    if (f >= 126 || a >= 6.5) return { label: 'Diabetes Range (Physician Review Needed)', tone: 'amber' };
    if (f >= 100 || a >= 5.7) return { label: 'Pre-Diabetes / Impaired Range', tone: 'amber' };
    if (f > 0 && f < 70) return { label: 'Low Fasting Sugar (Hypoglycemia Risk)', tone: 'red' };
    return { label: 'Normal Glycemic Range', tone: 'green' };
  }, [fbs, hba1c]);

  const bmiInfo = useMemo(() => {
    const hM = (Number(heightCm) || 170) / 100;
    const w = Number(weightKg) || 68;
    const val = hM > 0 ? +(w / (hM * hM)).toFixed(1) : 0;
    let cat = 'Healthy Weight';
    let tone = 'green';
    if (val < 18.5) { cat = 'Underweight'; tone = 'amber'; }
    else if (val >= 25 && val < 30) { cat = 'Overweight (Asian cutoff ≥23)'; tone = 'amber'; }
    else if (val >= 30) { cat = 'Obesity Range'; tone = 'amber'; }
    return { val, cat, tone };
  }, [heightCm, weightKg]);

  const badgeClass = (tone) =>
    tone === 'red'
      ? 'bg-rose-50 text-rose-700 border-rose-200'
      : tone === 'amber'
      ? 'bg-amber-50 text-amber-800 border-amber-200'
      : 'bg-emerald-50 text-emerald-800 border-emerald-200';

  return (
    <div className="bg-white dark:bg-[#0F1C36] rounded-3xl border border-emerald-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#0D5C3A]" />
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Vitals & Metabolic Risk Micro-App
          </h3>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#0D5C3A] border border-emerald-200">
          Live Clinical Calculator
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Blood Pressure Box */}
        <div className="p-4 rounded-2xl bg-[#F4F9F6] dark:bg-slate-900/60 border border-emerald-100 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#0D5C3A] uppercase">Blood Pressure</span>
            <span className="text-xs font-bold text-slate-500">mmHg</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              Systolic (Top)
              <input
                type="number"
                value={sys}
                onChange={(e) => setSys(e.target.value)}
                className="mt-1 w-full px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
              />
            </label>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              Diastolic (Bottom)
              <input
                type="number"
                value={dia}
                onChange={(e) => setDia(e.target.value)}
                className="mt-1 w-full px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
              />
            </label>
          </div>
          <div className={`px-3 py-2 rounded-xl border text-xs font-bold ${badgeClass(bpStatus.tone)}`}>
            {sys}/{dia} mmHg — {bpStatus.label}
          </div>
        </div>

        {/* Blood Sugar / HbA1c Box */}
        <div className="p-4 rounded-2xl bg-[#F4F9F6] dark:bg-slate-900/60 border border-emerald-100 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#0D5C3A] uppercase">Sugar & HbA1c</span>
            <span className="text-xs font-bold text-slate-500">Metabolic</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              Fasting (mg/dL)
              <input
                type="number"
                value={fbs}
                onChange={(e) => setFbs(e.target.value)}
                className="mt-1 w-full px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
              />
            </label>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              HbA1c (%)
              <input
                type="number"
                step="0.1"
                value={hba1c}
                onChange={(e) => setHba1c(e.target.value)}
                className="mt-1 w-full px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
              />
            </label>
          </div>
          <div className={`px-3 py-2 rounded-xl border text-xs font-bold ${badgeClass(sugarStatus.tone)}`}>
            {sugarStatus.label}
          </div>
        </div>

        {/* BMI Box */}
        <div className="p-4 rounded-2xl bg-[#F4F9F6] dark:bg-slate-900/60 border border-emerald-100 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#0D5C3A] uppercase">Body Mass Index</span>
            <span className="text-xs font-bold text-slate-500">BMI: {bmiInfo.val}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              Height (cm)
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="mt-1 w-full px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
              />
            </label>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              Weight (kg)
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="mt-1 w-full px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
              />
            </label>
          </div>
          <div className={`px-3 py-2 rounded-xl border text-xs font-bold ${badgeClass(bmiInfo.tone)}`}>
            BMI {bmiInfo.val} — {bmiInfo.cat}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Educational reference only. Confirm readings with calibrated clinic devices.
        </p>
        <AskAIButton
          label="Interpret My Vitals with AI"
          onClick={() =>
            onAskAI(
              `My vitals are BP ${sys}/${dia} mmHg (${bpStatus.label}), Fasting Sugar ${fbs} mg/dL, HbA1c ${hba1c}% (${sugarStatus.label}), and BMI ${bmiInfo.val} (${bmiInfo.cat}). What preventive steps should I take?`
            )
          }
        />
      </div>
    </div>
  );
}

/* 3. MY FAMILY MICRO-APP */
function FamilyMicroApp({ onAskAI }) {
  const [profileKey, setProfileKey] = useState('senior');
  const [checked, setChecked] = useState({});
  const active = FAMILY_PROFILES[profileKey];

  const completedCount = active.checklist.filter((c) => checked[`${profileKey}_${c.id}`]).length;

  return (
    <div className="bg-white dark:bg-[#0F1C36] rounded-3xl border border-emerald-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#0D5C3A]" />
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Multigenerational Family Care Micro-App
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(FAMILY_PROFILES).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => setProfileKey(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                profileKey === key
                  ? 'bg-[#0D5C3A] text-white'
                  : 'bg-[#F2F8F5] text-slate-700 hover:bg-emerald-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-[#F4F9F6] dark:bg-slate-900/60 border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-xs font-black text-[#0D5C3A] uppercase">Focus Area</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-100">{active.focus}</div>
        </div>
        <span className="px-3 py-1 rounded-full bg-white text-[#0D5C3A] border border-emerald-200 text-xs font-black">
          {completedCount} / {active.checklist.length} Checked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {active.checklist.map((item) => {
          const k = `${profileKey}_${item.id}`;
          const isDone = Boolean(checked[k]);
          return (
            <label
              key={k}
              className={`flex items-start gap-2.5 p-3 rounded-2xl border cursor-pointer transition-all ${
                isDone
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-emerald-300'
              }`}
            >
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => setChecked((prev) => ({ ...prev, [k]: !prev[k] }))}
                className="mt-0.5 w-4 h-4 rounded text-[#0D5C3A]"
              />
              <span className="text-xs sm:text-sm font-semibold leading-snug">{item.text}</span>
            </label>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-500">
          Tailored guidance for {active.label}
        </span>
        <AskAIButton
          label={`Ask AI for ${active.label}`}
          onClick={() => onAskAI(active.prompt)}
        />
      </div>
    </div>
  );
}

/* 4. MY PARENTING MICRO-APP (Pediatric Fever & Red-Flag Triage) */
function ParentingMicroApp({ onAskAI }) {
  const [ageGroup, setAgeGroup] = useState('1-5y');
  const [tempF, setTempF] = useState(100.4);
  const [flags, setFlags] = useState({
    lethargy: false,
    breathing: false,
    rash: false,
    dehydration: false
  });

  const tempC = (((Number(tempF) || 98.6) - 32) * (5 / 9)).toFixed(1);
  const hasAnyFlag = Object.values(flags).some(Boolean);

  const triage = useMemo(() => {
    const t = Number(tempF) || 98.6;
    if (hasAnyFlag || (ageGroup === 'under3m' && t >= 100.4) || t >= 104) {
      return {
        level: 'RED — Urgent Pediatric / ER Evaluation Now',
        box: 'bg-rose-50 border-rose-300 text-rose-800',
        note:
          ageGroup === 'under3m' && t >= 100.4
            ? 'Any fever ≥100.4°F (38°C) in an infant under 3 months requires immediate emergency pediatric assessment.'
            : 'Red-flag symptoms or very high fever require immediate in-person pediatric evaluation.'
      };
    }
    if (t >= 102 || ageGroup === '3-12m') {
      return {
        level: 'YELLOW — Consult Pediatrician Today',
        box: 'bg-amber-50 border-amber-300 text-amber-900',
        note: 'Keep the child hydrated with breastmilk/ORS/fluids, dress in light cotton, and schedule a pediatrician visit.'
      };
    }
    if (t >= 99.5) {
      return {
        level: 'GREEN — Home Comfort, Hydration & Monitoring',
        box: 'bg-emerald-50 border-emerald-300 text-emerald-900',
        note: 'Monitor alertness, urine output (wet diapers), and fluid intake. Use lukewarm sponging only if comfortable.'
      };
    }
    return {
      level: 'NORMAL — Afebrile Baseline',
      box: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      note: 'Temperature is within normal range. Continue routine age-appropriate hydration and nutrition.'
    };
  }, [ageGroup, tempF, hasAnyFlag]);

  return (
    <div className="bg-white dark:bg-[#0F1C36] rounded-3xl border border-teal-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Baby className="w-5 h-5 text-[#0F766E]" />
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Pediatric Fever & Child Care Micro-App
          </h3>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-[#0F766E] border border-teal-200">
          Parent Safety Triage
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-[#F4F9F6] space-y-3 border border-teal-100">
          <div className="text-xs font-black text-[#0F766E] uppercase">1. Child Age Group</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'under3m', label: 'Under 3 Months' },
              { id: '3-12m', label: '3–12 Months' },
              { id: '1-5y', label: '1–5 Years' },
              { id: '5y+', label: '5+ Years' }
            ].map((ag) => (
              <button
                key={ag.id}
                type="button"
                onClick={() => setAgeGroup(ag.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  ageGroup === ag.id
                    ? 'bg-[#0F766E] text-white border-[#0F766E]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
                }`}
              >
                {ag.label}
              </button>
            ))}
          </div>

          <div className="pt-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5 text-[#0F766E]" /> Temperature</span>
              <span className="text-[#0F766E] font-black">{tempF}°F ({tempC}°C)</span>
            </div>
            <input
              type="range"
              min="97.5"
              max="105.0"
              step="0.2"
              value={tempF}
              onChange={(e) => setTempF(e.target.value)}
              className="w-full accent-[#0F766E] cursor-pointer"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#F4F9F6] space-y-2.5 border border-teal-100">
          <div className="text-xs font-black text-[#0F766E] uppercase">2. Warning Sign Check</div>
          {[
            { key: 'lethargy', label: 'Unusual drowsiness, limpness, or inconsolable crying' },
            { key: 'breathing', label: 'Fast breathing, chest indrawing, or grunting' },
            { key: 'rash', label: 'Non-blanching purple/red rash spots' },
            { key: 'dehydration', label: 'Refusing all fluids or no wet diaper for 6+ hours' }
          ].map((f) => (
            <label key={f.key} className="flex items-start gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={flags[f.key]}
                onChange={() => setFlags((prev) => ({ ...prev, [f.key]: !prev[f.key] }))}
                className="mt-0.5 w-4 h-4 rounded text-rose-600"
              />
              <span>{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={`p-4 rounded-2xl border ${triage.box} space-y-1`}>
        <div className="text-xs sm:text-sm font-black">{triage.level}</div>
        <p className="text-xs font-medium leading-relaxed">{triage.note}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="text-xs text-slate-500">Never give Aspirin to children under 18.</span>
        <AskAIButton
          label="Get Pediatric Guidance from AI"
          onClick={() =>
            onAskAI(
              `Child age group ${ageGroup}, temperature ${tempF}°F (${tempC}°C). ${
                hasAnyFlag ? 'Warning signs present.' : 'No emergency red flags checked.'
              } Status: ${triage.level}. What safe home steps and pediatric advice apply?`
            )
          }
        />
      </div>
    </div>
  );
}

/* 5. MY FOOD MICRO-APP */
function FoodMicroApp({ onAskAI }) {
  const [goal, setGoal] = useState('diabetic');
  const [glasses, setGlasses] = useState(5);
  const plan = NUTRITION_PLANS[goal];

  return (
    <div className="bg-white dark:bg-[#0F1C36] rounded-3xl border border-emerald-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Apple className="w-5 h-5 text-[#0D5C3A]" />
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Therapeutic Meal Planner & Nutrition Micro-App
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(NUTRITION_PLANS).map(([k, v]) => (
            <button
              key={k}
              type="button"
              onClick={() => setGoal(k)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                goal === k ? 'bg-[#0D5C3A] text-white' : 'bg-[#F2F8F5] text-slate-700 hover:bg-emerald-100'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-[#F4F9F6] border border-emerald-100 space-y-1.5">
        <div className="text-xs font-black text-[#0D5C3A] uppercase">{plan.badge} — Plate Rule</div>
        <div className="text-sm font-bold text-slate-800">{plan.plateRule}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {plan.swaps.map((s, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] font-bold text-rose-600 line-through">{s.from}</div>
            <div className="text-xs font-extrabold text-[#0D5C3A]">→ {s.to}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-bold text-slate-800">Daily Hydration Tracker: {glasses} / 8 glasses</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setGlasses((g) => Math.max(0, g - 1))}
            className="w-7 h-7 rounded-lg bg-white border border-sky-200 font-black text-slate-700 cursor-pointer"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => setGlasses((g) => Math.min(12, g + 1))}
            className="w-7 h-7 rounded-lg bg-sky-600 text-white font-black cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="text-xs text-slate-600 font-medium">Tip: {plan.tip}</span>
        <AskAIButton
          label={`Build ${plan.label} Meal Plan`}
          onClick={() =>
            onAskAI(`Create a practical 1-day Indian meal plan for ${plan.label} (${plan.plateRule}).`)
          }
        />
      </div>
    </div>
  );
}

/* 6. MY MIND MICRO-APP (Interactive 4-7-8 Breathing Timer + Stress Check) */
function MindMicroApp({ onAskAI }) {
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [stressScore, setStressScore] = useState({ sleep: 1, worry: 1, focus: 1 });

  const phases = [
    { name: 'Inhale Gently', duration: 4, color: 'bg-emerald-600' },
    { name: 'Hold Softly', duration: 7, color: 'bg-teal-600' },
    { name: 'Exhale Slowly', duration: 8, color: 'bg-indigo-600' }
  ];

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;
        setPhaseIdx((p) => {
          const next = (p + 1) % phases.length;
          setSecondsLeft(phases[next].duration);
          return next;
        });
        return 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  const totalCheck = stressScore.sleep + stressScore.worry + stressScore.focus;
  const currentPhase = phases[phaseIdx];

  return (
    <div className="bg-white dark:bg-[#0F1C36] rounded-3xl border border-emerald-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#0D5C3A]" />
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Calm Breathing & Stress Check-In Micro-App
          </h3>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#0D5C3A] border border-emerald-200">
          4-7-8 Nervous System Reset
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Breathing Timer */}
        <div className="p-4 rounded-2xl bg-[#F4F9F6] border border-emerald-100 flex flex-col items-center justify-center text-center space-y-3">
          <div className={`w-28 h-28 rounded-full ${currentPhase.color} text-white flex flex-col items-center justify-center shadow-md transition-colors duration-500`}>
            <span className="text-2xl font-black">{secondsLeft}s</span>
            <span className="text-[11px] font-bold uppercase tracking-wide">{currentPhase.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#0D5C3A] text-white text-xs font-bold cursor-pointer"
            >
              {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{running ? 'Pause' : 'Start 4-7-8'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRunning(false);
                setPhaseIdx(0);
                setSecondsLeft(4);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Stress Check-in */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="text-xs font-black text-slate-800 uppercase">Quick Stress & Burnout Check (0–3)</div>
          {[
            { key: 'worry', label: 'Feeling overwhelmed or racing thoughts' },
            { key: 'sleep', label: 'Restlessness or waking up tense' },
            { key: 'focus', label: 'Mental fatigue / difficulty focusing' }
          ].map((q) => (
            <div key={q.key} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{q.label}</span>
                <span className="font-black text-[#0D5C3A]">{stressScore[q.key]}/3</span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                value={stressScore[q.key]}
                onChange={(e) => setStressScore((p) => ({ ...p, [q.key]: Number(e.target.value) }))}
                className="w-full accent-[#0D5C3A] cursor-pointer"
              />
            </div>
          ))}
          <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-xs font-bold text-[#0D5C3A]">
            Check-In Level: {totalCheck >= 7 ? 'High Strain — Consider talking with a clinician' : totalCheck >= 4 ? 'Moderate Stress — Practice daily wind-down' : 'Mild / Balanced'}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="text-xs text-slate-500">5-4-3-2-1 Grounding: Name 5 things you see, 4 touch, 3 hear.</span>
        <AskAIButton
          label="Get Coping Guide from AI"
          onClick={() =>
            onAskAI(
              `My quick stress check score is ${totalCheck}/9. Give me practical, evidence-based grounding and burnout recovery steps.`
            )
          }
        />
      </div>
    </div>
  );
}

/* 7. MY SLEEP MICRO-APP (Circadian 90-min Cycle Calculator & Apnea Check) */
function SleepMicroApp({ onAskAI }) {
  const [wakeTime, setWakeTime] = useState('06:30');
  const [apneaFlags, setApneaFlags] = useState({ snoring: false, tired: false, gasp: false });

  const bedtimes = useMemo(() => {
    const [hh, mm] = (wakeTime || '06:30').split(':').map(Number);
    const wakeMins = (hh || 6) * 60 + (mm || 30);
    return [6, 5, 4].map((cycles) => {
      const fallAsleepBuffer = 15;
      let bedMins = wakeMins - cycles * 90 - fallAsleepBuffer;
      while (bedMins < 0) bedMins += 1440;
      const bH = Math.floor(bedMins / 60) % 24;
      const bM = bedMins % 60;
      const ampm = bH >= 12 ? 'PM' : 'AM';
      const dispH = bH % 12 === 0 ? 12 : bH % 12;
      return {
        cycles,
        hours: (cycles * 1.5).toFixed(1),
        time: `${dispH}:${String(bM).padStart(2, '0')} ${ampm}`
      };
    });
  }, [wakeTime]);

  const apneaCount = Object.values(apneaFlags).filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-[#0F1C36] rounded-3xl border border-teal-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Bed className="w-5 h-5 text-[#0F766E]" />
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Circadian Bedtime Calculator & Sleep Apnea Micro-App
          </h3>
        </div>
        <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Clock className="w-4 h-4 text-[#0F766E]" />
          <span>Wake-up Time:</span>
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="px-2.5 py-1 rounded-xl border border-slate-200 bg-white font-bold text-slate-900"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {bedtimes.map((b) => (
          <div
            key={b.cycles}
            className={`p-4 rounded-2xl border text-center ${
              b.cycles === 5 ? 'bg-teal-50 border-teal-300' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-[11px] font-black text-[#0F766E] uppercase">
              {b.cycles} REM Cycles ({b.hours} hrs) {b.cycles === 5 ? '• Optimal' : ''}
            </div>
            <div className="text-xl font-black text-slate-900 mt-1">{b.time}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Includes 15m wind-down</div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-[#F4F9F6] border border-teal-100 space-y-2">
        <div className="text-xs font-black text-[#0F766E] uppercase">Quick Snoring / Sleep Apnea Screen</div>
        <div className="flex flex-wrap gap-3">
          {[
            { k: 'snoring', l: 'Loud habitual snoring' },
            { k: 'tired', l: 'Daytime fatigue despite 7+ hrs in bed' },
            { k: 'gasp', l: 'Waking up gasping or morning headache' }
          ].map((item) => (
            <label key={item.k} className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={apneaFlags[item.k]}
                onChange={() => setApneaFlags((p) => ({ ...p, [item.k]: !p[item.k] }))}
                className="w-4 h-4 rounded text-[#0F766E]"
              />
              <span>{item.l}</span>
            </label>
          ))}
        </div>
        {apneaCount >= 2 && (
          <div className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
            2+ apnea indicators noted — consider consulting a physician for a sleep study evaluation.
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="text-xs text-slate-500">Dim blue screens 45 minutes before target bedtime.</span>
        <AskAIButton
          label="Get Sleep Protocol from AI"
          onClick={() =>
            onAskAI(
              `My wake time is ${wakeTime} (optimal bedtime ${bedtimes[1].time}) and I checked ${apneaCount} snoring/fatigue flags. Suggest a circadian sleep protocol.`
            )
          }
        />
      </div>
    </div>
  );
}

/* 8. MY BEAUTY MICRO-APP (Dermatology & Barrier Routine Builder) */
function BeautyMicroApp({ onAskAI }) {
  const [concernKey, setConcernKey] = useState('acne');
  const data = BEAUTY_CONCERNS[concernKey];

  return (
    <div className="bg-white dark:bg-[#0F1C36] rounded-3xl border border-pink-200/80 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#0D5C3A]" />
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Clinical Dermatology & Skin Barrier Micro-App
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(BEAUTY_CONCERNS).map(([k, v]) => (
            <button
              key={k}
              type="button"
              onClick={() => setConcernKey(k)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                concernKey === k ? 'bg-[#0D5C3A] text-white' : 'bg-[#F4F9F6] text-slate-700 hover:bg-emerald-100'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-emerald-200 space-y-2">
          <div className="text-xs font-black text-[#0D5C3A] uppercase">Evidence-Backed Actives</div>
          <ul className="space-y-1 text-xs font-semibold text-slate-700">
            {data.safeIngredients.map((i) => (
              <li key={i} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />{i}</li>
            ))}
          </ul>
          <div className="pt-2 border-t border-emerald-200/70 text-xs text-slate-700">
            <span className="font-black text-[#0D5C3A]">AM:</span> {data.amRoutine}
          </div>
          <div className="text-xs text-slate-700">
            <span className="font-black text-[#0D5C3A]">PM:</span> {data.pmRoutine}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFF1F2] border border-rose-200 space-y-2">
          <div className="text-xs font-black text-rose-800 uppercase">Irritants & Mistakes to Avoid</div>
          <ul className="space-y-1 text-xs font-semibold text-slate-700">
            {data.avoid.map((i) => (
              <li key={i} className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />{i}</li>
            ))}
          </ul>
          <div className="mt-2 p-2.5 rounded-xl bg-white border border-rose-200 text-[11.5px] font-bold text-rose-800">
            When to See a Dermatologist: {data.redFlag}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="text-xs text-slate-500">Patch-test any new active on inner forearm for 24–48 hours.</span>
        <AskAIButton
          label={`Ask Dermatology AI (${data.label})`}
          onClick={() => onAskAI(`Suggest a safe clinical routine and precautions for ${data.label}.`)}
        />
      </div>
    </div>
  );
}

/* 9. MY LAB TESTS MICRO-APP (Interactive Biomarker Decoder) */
function LabTestsMicroApp({ onAskAI }) {
  const [panelId, setPanelId] = useState('cbc');
  const [values, setValues] = useState(() => {
    const map = {};
    LAB_PANELS.forEach((p) => {
      p.markers.forEach((m) => {
        map[m.key] = m.defaultVal;
      });
    });
    return map;
  });

  const activePanel = LAB_PANELS.find((p) => p.id === panelId) || LAB_PANELS[0];

  const getStatus = (marker, val) => {
    const num = Number(val);
    if (Number.isNaN(num)) return { tag: 'Enter value', cls: 'bg-slate-100 text-slate-600', note: '' };
    if (num < marker.min) return { tag: 'Low', cls: 'bg-amber-100 text-amber-800 border-amber-300', note: marker.lowNote };
    if (num > marker.max) return { tag: 'High', cls: 'bg-rose-100 text-rose-800 border-rose-300', note: marker.highNote };
    return { tag: 'Normal', cls: 'bg-emerald-100 text-emerald-800 border-emerald-300', note: 'Within standard adult reference range.' };
  };

  return (
    <div className="bg-white dark:bg-[#0F1C36] rounded-3xl border border-emerald-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-[#0D5C3A]" />
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Interactive Lab Report Decoder Micro-App
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {LAB_PANELS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPanelId(p.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                panelId === p.id ? 'bg-[#0D5C3A] text-white' : 'bg-[#F2F8F5] text-slate-700 hover:bg-emerald-100'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activePanel.markers.map((m) => {
          const val = values[m.key];
          const status = getStatus(m, val);
          return (
            <div key={m.key} className="p-3.5 rounded-2xl bg-[#F4F9F6] border border-emerald-100 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-slate-800">{m.label}</span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-full border ${status.cls}`}>
                  {status.tag}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="any"
                  value={val}
                  onChange={(e) => setValues((prev) => ({ ...prev, [m.key]: e.target.value }))}
                  className="w-32 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900"
                />
                <span className="text-[11px] font-semibold text-slate-500">
                  Ref: {m.min}–{m.max} {m.unit}
                </span>
              </div>
              <p className="text-[11.5px] text-slate-600 leading-snug">{status.note}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="text-xs text-slate-500">Reference intervals can vary slightly by laboratory methodology.</span>
        <AskAIButton
          label={`Explain My ${activePanel.name} with AI`}
          onClick={() => {
            const summary = activePanel.markers
              .map((m) => `${m.label}: ${values[m.key]} ${m.unit} (${getStatus(m, values[m.key]).tag})`)
              .join(', ');
            onAskAI(`Please decode my ${activePanel.name} lab values: ${summary}. What follow-up questions should I ask my doctor?`);
          }}
        />
      </div>
    </div>
  );
}

/* 10. MY MEDICINES MICRO-APP (Drug Safety, Timing & Interaction Guide) */
function MedicinesMicroApp({ onAskAI }) {
  const [medId, setMedId] = useState(MEDICINE_GUIDE_LIST[0].id);
  const med = MEDICINE_GUIDE_LIST.find((m) => m.id === medId) || MEDICINE_GUIDE_LIST[0];

  return (
    <div className="bg-white dark:bg-[#0F1C36] rounded-3xl border border-emerald-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-[#0D5C3A]" />
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Medication Safety & Timing Micro-App
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {MEDICINE_GUIDE_LIST.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMedId(m.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                medId === m.id ? 'bg-[#0D5C3A] text-white' : 'bg-[#F2F8F5] text-slate-700 hover:bg-emerald-100'
              }`}
            >
              {m.name.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-[#F4F9F6] border border-emerald-100 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-black text-[#0D5C3A] uppercase">{med.category}</div>
            <div className="text-base font-black text-slate-900">{med.name}</div>
          </div>
          <ShieldCheck className="w-5 h-5 text-[#0D5C3A]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white border border-emerald-100">
            <span className="font-black text-[#0D5C3A] block mb-0.5">Recommended Timing</span>
            <span className="text-slate-700 font-medium">{med.timing}</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-emerald-100">
            <span className="font-black text-[#0D5C3A] block mb-0.5">Adult Safety Limit</span>
            <span className="text-slate-700 font-medium">{med.maxDaily}</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
          <span className="font-black block mb-0.5">Clinical Precaution</span>
          {med.caution}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-black text-rose-700 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Avoid if:
          </span>
          {med.avoidIf.map((a) => (
            <span key={a} className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-semibold">
              {a}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="text-xs text-slate-500">Never alter or stop prescribed chronic medicines without your doctor.</span>
        <AskAIButton
          label={`Check ${med.name.split('(')[0].trim()} Interactions with AI`}
          onClick={() =>
            onAskAI(`Explain safe usage rules, food timing, and drug interactions for ${med.name}.`)
          }
        />
      </div>
    </div>
  );
}

/* FALLBACK MICRO-APP FOR ADDITIONAL PORTAL CATEGORIES */
function GenericCategoryMicroApp({ category, onAskAI }) {
  const [notes, setNotes] = useState('');
  return (
    <div className="bg-white dark:bg-[#0F1C36] rounded-3xl border border-emerald-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Activity className="w-5 h-5 text-[#0D5C3A]" />
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
          {category?.title || 'Clinical Guidance'} Interactive Micro-App
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-slate-600">
        {category?.desc || category?.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={`Describe your question for ${category?.title || 'this specialty'}...`}
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
        />
        <AskAIButton
          label="Ask Dr. Pratap AI"
          onClick={() =>
            onAskAI(notes.trim() || category?.examplePrompt || `Guide me on ${category?.title}`)
          }
        />
      </div>
    </div>
  );
}

export default function CategoryMicroApp({ categoryId, category, onAskAI }) {
  const normalizedId = (categoryId || '').toLowerCase();

  switch (normalizedId) {
    case 'symptoms':
      return <SymptomsMicroApp onAskAI={onAskAI} />;
    case 'personal-health':
    case 'chronic-conditions':
      return <PersonalHealthMicroApp onAskAI={onAskAI} />;
    case 'family':
    case 'special-care':
      return <FamilyMicroApp onAskAI={onAskAI} />;
    case 'parenting':
      return <ParentingMicroApp onAskAI={onAskAI} />;
    case 'food-nutrition':
      return <FoodMicroApp onAskAI={onAskAI} />;
    case 'mind-emotions':
      return <MindMicroApp onAskAI={onAskAI} />;
    case 'sleep':
      return <SleepMicroApp onAskAI={onAskAI} />;
    case 'beauty':
      return <BeautyMicroApp onAskAI={onAskAI} />;
    case 'medicine-tests':
    case 'medicines-tests':
      return <LabTestsMicroApp onAskAI={onAskAI} />;
    case 'medicines':
      return <MedicinesMicroApp onAskAI={onAskAI} />;
    default:
      return <GenericCategoryMicroApp category={category} onAskAI={onAskAI} />;
  }
}
