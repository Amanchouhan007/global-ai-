import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ListCheck,
  Search,
  AlertTriangle,
  ShieldCheck,
  XCircle,
  Users,
  CheckSquare,
  Lightbulb,
  Clock,
  ArrowRight,
  Brain,
  Heart,
  Thermometer,
  Activity,
  Layers,
  ChevronRight,
  Home,
  Check,
  Stethoscope
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Verified Multi-Card Clinical Database representing the 1,000+ Cards Engine
const CLINICAL_CARDS_CATALOG = {
  'H-032': {
    id: 'H-032',
    category: 'Symptoms',
    subcategory: 'Headache',
    title: 'Severe Headache',
    question: 'What could be the reason for a very severe headache, and when should I be worried?',
    image: '/assets/severe-headache-retina-sharp.png',
    atAGlance: 'A sudden, very intense or worsening headache can be a sign of a serious problem and needs prompt medical attention.',
    icon: Brain,
    illustration: '/assets/migraine-head-retina-sharp.png',
    quickAnswer: 'Most severe headaches are due to migraine, high blood pressure, sinus problems, or stress. But a sudden, "worst-ever" headache, a new severe headache after age 50, head injury, or headache with fever, neck stiffness, weakness, or confusion can be serious. These need urgent medical assessment.',
    commonCauses: [
      'Migraine (often one-sided, throbbing, with light/sound sensitivity)',
      'Tension headache (tight band-like pain around skull)',
      'Sinus headache (with blocked nose, facial heaviness, worse bending forward)',
      'High blood pressure (hypertensive urgency)',
      'Dehydration, lack of sleep, or prolonged digital screen time'
    ],
    oftenMissedCauses: [
      'Brain infection (meningitis, encephalitis with fever/neck rigidity)',
      'Bleeding around the brain (subarachnoid haemorrhage - "thunderclap")',
      'Brain clot (cerebral venous sinus thrombosis)',
      'Temporal arteritis (age > 50, throbbing pain near temple, scalp tenderness)',
      'Eye problems like acute angle-closure glaucoma (eye pain, blurred halos)'
    ],
    emergencyRed: [
      'Sudden, very severe "worst-ever" thunderclap headache',
      'Headache following blunt head injury or trauma',
      'Accompanied by high fever and stiff neck (unable to touch chin to chest)',
      'With focal weakness, slurred speech, or seizures',
      'With acute confusion, delirium, or loss of consciousness'
    ],
    doctorSoonYellow: [
      'New onset severe headache after age 50',
      'Headache getting progressively worse day by day',
      'Headache with persistent unremitting vomiting',
      'Headache accompanied by vision blurriness or blind spots'
    ],
    safeSteps: [
      'Rest in a quiet, dark, well-ventilated room.',
      'Stay well hydrated with cool water or electrolytes.',
      'Use a simple pain reliever (e.g. paracetamol) if safely taken before.',
      'Check your resting blood pressure if you have chronic hypertension.'
    ],
    doNotDo: [
      'Do not ignore a sudden, very severe "thunderclap" headache.',
      'Do not take repeated or excessively high doses of painkillers.',
      'Do not self-medicate for prolonged periods without medical review.',
      'Do not drive or operate machinery if you feel dizzy or have blurred vision.'
    ],
    specialGroups: 'Children, pregnant women, older adults (> 50), and individuals with immunosuppression or chronic illness require early in-person physician evaluation.',
    drPratapInsight: '"The pattern of a headache often gives the primary clue. A new, sudden, or qualitatively different headache should never be brushed aside."',
    practiceStory: 'A 42-year-old woman presented with sudden, severe headache after heavy work and elevated blood pressure. Early treatment and blood pressure regulation provided rapid, safe relief.',
    checklistItems: [
      { id: 'severePain', label: 'Sudden very severe pain', red: true },
      { id: 'fever', label: 'Fever', red: false },
      { id: 'neckStiffness', label: 'Neck stiffness', red: true },
      { id: 'vomiting', label: 'Vomiting', red: false },
      { id: 'visionChange', label: 'Vision change', red: true },
      { id: 'headInjury', label: 'Head injury', red: true }
    ]
  },
  'H-001': {
    id: 'H-001',
    category: 'Symptoms',
    subcategory: 'Chest Pain',
    title: 'Severe Chest Pain & Pressure',
    question: 'What causes acute crushing chest pain, and when is it a cardiac emergency?',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80',
    atAGlance: 'Crushing or radiating chest discomfort is a potential cardiac emergency requiring immediate triage within the golden hour.',
    icon: Heart,
    quickAnswer: 'Acute chest tightness, pressure, or heaviness radiating to the left arm, jaw, neck, or back requires immediate clinical evaluation to rule out acute coronary syndrome or pulmonary embolism. Never delay urgent medical care.',
    commonCauses: [
      'Myocardial ischemia / Angina (cardiac oxygen demand imbalance)',
      'Gastroesophageal reflux (severe acid burning simulating cardiac pain)',
      'Musculoskeletal chest wall strain / Costochondritis',
      'Acute anxiety, hyperventilation, or panic episode',
      'Pleurisy (sharp chest pain exacerbated by deep inhalation)'
    ],
    oftenMissedCauses: [
      'Aortic dissection (tearing pain radiating directly between shoulder blades)',
      'Pulmonary embolism (sudden pleuritic pain with calf swelling / long travel)',
      'Pericarditis (chest pain relieved by leaning forward)',
      'Esophageal spasm or spontaneous pneumothorax'
    ],
    emergencyRed: [
      'Crushing, squeezing chest pain lasting > 5 minutes',
      'Pain radiating to left arm, neck, jaw, or epigastrium',
      'Accompanied by cold diaphoresis (profuse sweating) or dyspnea',
      'Fainting, acute dizziness, or profound hypotension',
      'Lips or nail beds turning pale or bluish (cyanosis)'
    ],
    doctorSoonYellow: [
      'Brief chest twinges lasting only 2–3 seconds triggered by position',
      'Burning sensation in epigastrium after spicy meals relieved by antacid',
      'Tender spot on ribs reproduced by pressing directly with finger'
    ],
    safeSteps: [
      'Stop all physical exertion immediately; sit or rest semi-reclined.',
      'Loosen any tight clothing around neck and waist.',
      'Call national emergency ambulatory services (108 / 112 in India, 911 in US).',
      'Take prescribed sublingual nitrates only if explicitly instructed by physician.'
    ],
    doNotDo: [
      'Do not attempt to drive yourself to the emergency hospital.',
      'Do not assume chest tightness is "just gas" if accompanied by sweating.',
      'Do not consume heavy meals or vigorous painkillers before clinical evaluation.'
    ],
    specialGroups: 'Diabetic patients and post-menopausal women frequently experience "silent" atypical heart attacks presenting only as nausea, unusual fatigue, or breathlessness.',
    drPratapInsight: '"In cardiology, time is muscle. When in doubt regarding chest heaviness with diaphoresis, always escalate directly to the emergency room."',
    practiceStory: 'A 54-year-old shopkeeper brushed off chest tightness as acidity. An alert family member brought him to triage where an immediate ECG caught an evolving STEMI, saving heart function.',
    checklistItems: [
      { id: 'crushingPain', label: 'Crushing chest heaviness', red: true },
      { id: 'radiation', label: 'Pain radiating to arm/jaw', red: true },
      { id: 'sweating', label: 'Cold sweating / dizziness', red: true },
      { id: 'shortBreath', label: 'Shortness of breath', red: true },
      { id: 'acidBurn', label: 'Burning sensation in throat', red: false },
      { id: 'sharpBreath', label: 'Pain worse on deep breath', red: false }
    ]
  },
  'H-014': {
    id: 'H-014',
    category: 'Symptoms',
    subcategory: 'Fever',
    title: 'High Fever & Shivering Chills',
    question: 'What does high fever with rigors indicate, and when is blood testing required?',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
    atAGlance: 'Fever exceeding 102°F or lasting beyond 72 hours requires systematic infectious screening and hydration vigilance.',
    icon: Thermometer,
    quickAnswer: 'Fever is the immune system\'s physiologic response to infection. High spikes accompanied by severe chills, rash, or persistent vomiting require professional clinical investigation for vector-borne diseases, bacterial infections, or viral syndromes.',
    commonCauses: [
      'Viral upper respiratory infection (Influenza, RSV, Common cold)',
      'Vector-borne infections (Dengue, Malaria, Chikungunya)',
      'Urinary tract infection (UTI with burning micturition)',
      'Enteric fever (Typhoid with step-ladder fever pattern)',
      'Acute gastroenteritis / food-borne infection'
    ],
    oftenMissedCauses: [
      'Pyelonephritis (kidney infection with flank pain)',
      'Deep abscess or occult dental / ear infection',
      'Adverse drug reaction (drug-induced hyperthermia)',
      'Rheumatologic / autoimmune inflammatory flares'
    ],
    emergencyRed: [
      'Temperature exceeding 103.5°F (39.7°C) unresponsive to antipyretics',
      'Petechial dark purple pinpoint skin rash that does not blanch',
      'Severe lethargy, disorientation, confusion, or convulsions',
      'Inability to retain any liquids due to persistent vomiting',
      'Platelet drop warning: bleeding gums or dark black stools'
    ],
    doctorSoonYellow: [
      'Fever lasting more than 3 consecutive days (> 72 hours)',
      'High fever in infant under 3 months of age',
      'Accompanied by productive yellow-green cough or ear pain'
    ],
    safeSteps: [
      'Maintain continuous oral rehydration with ORS, coconut water, or clear broth.',
      'Apply lukewarm water sponge compresses to forehead, neck, and axillae.',
      'Take age-appropriate Paracetamol as directed by your clinician.',
      'Rest in a cool, well-ventilated room with lightweight cotton clothing.'
    ],
    doNotDo: [
      'Do not take Aspirin or Mefenamic acid in suspected dengue (bleeding risk).',
      'Do not start leftover antibiotics without a doctor\'s laboratory prescription.',
      'Do not use ice-cold water baths (induces shivering and raises core temperature).'
    ],
    specialGroups: 'Infants under 6 months, immunocompromised patients, and elderly citizens require urgent clinical evaluation even for low-grade fevers.',
    drPratapInsight: '"Treat the patient, not just the thermometer. Monitoring fluid intake, urine output, and alertness is often more vital than the exact fever number."',
    practiceStory: 'A 28-year-old engineer experienced sudden high fever with bone pain. Prompt CBC monitoring flagged an early platelet drop from dengue, managed safely with structured outpatient fluid replacement.',
    checklistItems: [
      { id: 'tempHigh', label: 'Temperature above 102°F', red: false },
      { id: 'chills', label: 'Severe shivering / rigors', red: false },
      { id: 'rash', label: 'Skin rash or purple spots', red: true },
      { id: 'confusion', label: 'Delirium or severe lethargy', red: true },
      { id: 'bleeding', label: 'Bleeding gums or nosebleed', red: true },
      { id: 'vomiting', label: 'Unable to retain liquids', red: true }
    ]
  },
  'H-045': {
    id: 'H-045',
    category: 'Symptoms',
    subcategory: 'Digestive',
    title: 'Acute Abdominal Pain & Gastritis',
    question: 'How to distinguish benign acidity from acute surgical stomach emergencies?',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80',
    atAGlance: 'Localized severe stomach pain with abdominal wall rigidity warrants immediate surgical assessment.',
    icon: Activity,
    quickAnswer: 'While majority of stomach aches stem from indigestion, gas, or mild gastritis, sharp localized pain in the lower right abdomen, severe vomiting with blood, or pain radiating to the back can signal appendicitis, pancreatitis, or gallstones.',
    commonCauses: [
      'Acute gastritis or peptic ulcer disease (burning epigastric pain)',
      'Food poisoning / Viral gastroenteritis with cramps and diarrhea',
      'Gas accumulation / Irritable bowel syndrome (IBS)',
      'Constipation and colonic distension',
      'Menstrual cramps / Pelvic congestion in women'
    ],
    oftenMissedCauses: [
      'Appendicitis (pain starting around navel shifting to right lower abdomen)',
      'Cholecystitis / Gallstones (severe right upper quadrant pain after fatty food)',
      'Renal colic / Kidney stones (severe spasming pain from flank to groin)',
      'Pancreatitis (intense upper stomach pain boring straight into the back)'
    ],
    emergencyRed: [
      'Rigid, rock-hard abdomen sensitive to the slightest touch',
      'Pain localized sharply in the right lower abdomen (McBurney point)',
      'Vomiting bright red blood or "coffee-ground" dark emesis',
      'Black tarry stools (melena) indicating gastrointestinal bleeding',
      'Severe pain accompanied by high fever, dizziness, or fainting'
    ],
    doctorSoonYellow: [
      'Dull stomach ache persisting beyond 24 hours',
      'Pain waking you up from deep sleep at night',
      'Unintentional noticeable weight loss over past month'
    ],
    safeSteps: [
      'Rest in a comfortable position, often lying on one side with knees bent.',
      'Sip small amounts of plain warm water or diluted electrolyte solution.',
      'Avoid solid, spicy, greasy, or dairy foods until pain settles.',
      'Apply a warm heating pad gently across abdomen if cramping is mild.'
    ],
    doNotDo: [
      'Do not take NSAID painkillers like Ibuprofen (worsens stomach lining ulcers).',
      'Do not consume strong laxatives if severe appendiceal pain is suspected.',
      'Do not eat heavy meals before being evaluated by a doctor.'
    ],
    specialGroups: 'Women of childbearing age with sudden severe one-sided lower abdominal pain must be triaged immediately to rule out ectopic pregnancy.',
    drPratapInsight: '"Never mask undiagnosed acute abdominal pain with heavy painkillers before a doctor has palpated the abdomen for peritoneal signs."',
    practiceStory: 'A college student mistook appendicitis for acidity. Because she avoided painkillers and sought prompt evaluation, laparoscopy was performed smoothly before perforation.',
    checklistItems: [
      { id: 'rightLower', label: 'Sharp right lower abdomen pain', red: true },
      { id: 'rigidBelly', label: 'Rigid / hard abdomen', red: true },
      { id: 'bloodVomit', label: 'Vomiting blood or coffee-grounds', red: true },
      { id: 'blackStool', label: 'Black tarry stools', red: true },
      { id: 'burningAcid', label: 'Burning pain after spicy food', red: false },
      { id: 'gasBloat', label: 'Bloating with flatulence', red: false }
    ]
  }
};

export default function HealthCardShowcase({ 
  query = '', 
  onPrepareVisit, 
  initialCardId = null,
  showCardSelector = true 
}) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('answer');
  const [selectedCardId, setSelectedCardId] = useState(() => {
    if (initialCardId && CLINICAL_CARDS_CATALOG[initialCardId]) return initialCardId;
    return 'H-032';
  });

  // Automatically match the card based on the symptom query
  useEffect(() => {
    if (!query) return;
    const q = query.toLowerCase();
    if (q.includes('chest') || q.includes('heart') || q.includes('angina') || q.includes('arm pain')) {
      setSelectedCardId('H-001');
    } else if (q.includes('fever') || q.includes('chills') || q.includes('temperature') || q.includes('infection')) {
      setSelectedCardId('H-014');
    } else if (q.includes('stomach') || q.includes('abdomen') || q.includes('acidity') || q.includes('gastric') || q.includes('cramp')) {
      setSelectedCardId('H-045');
    } else if (q.includes('headache') || q.includes('migraine') || q.includes('head pain')) {
      setSelectedCardId('H-032');
    }
  }, [query]);

  const activeCard = CLINICAL_CARDS_CATALOG[selectedCardId] || CLINICAL_CARDS_CATALOG['H-032'];
  const [checkedSymptoms, setCheckedSymptoms] = useState({});

  // Reset checklist when card changes
  useEffect(() => {
    const initialCheck = {};
    activeCard.checklistItems.forEach(item => {
      initialCheck[item.id] = false;
    });
    setCheckedSymptoms(initialCheck);
  }, [selectedCardId]);

  const tabs = [
    { id: 'answer', label: 'Answer', icon: BookOpen },
    { id: 'common', label: 'Common Causes', icon: ListCheck },
    { id: 'missed', label: 'Often-Missed Causes', icon: Search },
    { id: 'warning', label: 'Warning Signs', icon: AlertTriangle },
    { id: 'steps', label: 'Safe Steps Now', icon: ShieldCheck },
    { id: 'donot', label: 'Do Not Do', icon: XCircle },
    { id: 'groups', label: 'Special Groups', icon: Users },
    { id: 'mycheck', label: 'My Check', icon: CheckSquare }
  ];

  const handleCheckboxToggle = (key) => {
    setCheckedSymptoms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const hasRedFlagChecked = activeCard.checklistItems.some(
    item => item.red && checkedSymptoms[item.id]
  );

  const handlePrepareDoctorVisit = () => {
    const selectedLabels = activeCard.checklistItems
      .filter(item => checkedSymptoms[item.id])
      .map(item => item.label);

    const symptomString = selectedLabels.length > 0
      ? `${activeCard.title} [${activeCard.id}] with flagged symptoms: ${selectedLabels.join(', ')}`
      : `${activeCard.title} [${activeCard.id}] clinical inquiry`;

    if (onPrepareVisit) {
      onPrepareVisit(symptomString);
    } else {
      alert(`Doctor Visit Summary Prepared:\n${symptomString}\n\nClinical Urgency: ${hasRedFlagChecked ? 'EMERGENCY RED FLAG' : 'ROUTINE EVALUATION'}`);
    }
  };

  const CardIcon = activeCard.icon || Brain;

  return (
    <div className="w-full space-y-4 animate-fadeIn">
      
      {/* 1,000+ Cards Engine Switcher Shelf */}
      {showCardSelector && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              1,000+ Clinically Reviewed Health Cards
            </span>
            <span className="text-[11px] text-slate-400">
              (Card Engine H-001 to H-1000)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {Object.values(CLINICAL_CARDS_CATALOG).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCardId(c.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCardId === c.id
                    ? 'bg-[#0D5C3A] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-[#0D5C3A]'
                }`}
              >
                {c.id}: {c.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Health Card matching Client Reference Image 2 */}
      <div className="bg-[#F4FAF8] dark:bg-[#0D1E18] rounded-3xl p-3.5 sm:p-5 lg:p-6 border border-emerald-200/80 dark:border-emerald-900/50 shadow-md space-y-4 max-w-full overflow-hidden">
        
        {/* Breadcrumb Path matching reference */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 flex-wrap">
          <Home className="w-3.5 h-3.5 text-[#0D5C3A]" />
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="hover:text-[#0D5C3A] cursor-pointer">{activeCard.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="hover:text-[#0D5C3A] cursor-pointer">{activeCard.subcategory}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#0D5C3A] dark:text-emerald-400 font-bold">{activeCard.title}</span>
        </div>

        {/* Hero Banner: Illustration/Photo + Title + At a Glance Box matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white dark:bg-[#0F1C36] rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          
          {/* Clinical Visual Image matching Image 2 */}
          <div className="md:col-span-3">
            <div className="relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden bg-slate-100 border border-emerald-100 shadow-2xs">
              <img
                src={activeCard.image}
                srcSet={`${activeCard.image} 1x, ${activeCard.image} 2x`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 240px, 320px"
                alt={activeCard.title}
                className="w-full h-full object-cover object-center"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                loading="eager"
              />
              <div className="absolute inset-0 bg-emerald-900/5 pointer-events-none" />
            </div>
          </div>

          {/* Center Title & Clinical Question */}
          <div className="md:col-span-5 space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] dark:bg-emerald-950/60 text-[#166534] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <span>Health Card {activeCard.id}</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0D5C3A] dark:text-emerald-400 tracking-tight">
              {activeCard.title}
            </h2>

            <p className="text-xs sm:text-sm font-bold text-[#9F1239] dark:text-rose-400 leading-snug">
              {activeCard.question}
            </p>
          </div>

          {/* Right: Head Anatomy Illustration + At a Glance Pink Box matching Image 2 */}
          <div className="md:col-span-4 flex items-center gap-3">
            {activeCard.illustration ? (
              <div className="shrink-0 hidden sm:flex items-center justify-center w-16 h-20">
                <img
                  src={activeCard.illustration}
                  srcSet={`${activeCard.illustration} 1x, ${activeCard.illustration} 2x`}
                  alt="Anatomy illustration"
                  className="w-full h-full object-contain"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                  loading="eager"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950 text-[#D81B60] hidden sm:flex items-center justify-center shrink-0">
                <CardIcon className="w-5 h-5 stroke-[2.2]" />
              </div>
            )}

            <div className="flex-1 bg-[#FFF1F5] dark:bg-[#280E1C] p-3.5 sm:p-4 rounded-2xl border border-pink-200 dark:border-pink-900/50 space-y-1.5 text-left shadow-2xs">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-[#9F1239] dark:text-rose-300 uppercase tracking-wider">At a Glance</span>
              </div>
              <p className="text-[11.5px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {activeCard.atAGlance}
              </p>
            </div>
          </div>

        </div>

        {/* Interactive Tab Navigation Bar matching Image 2 */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0D5C3A] text-white shadow-xs'
                    : 'bg-white dark:bg-[#0F1C36] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Panels matching Image 2 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Left Column: Quick Answer (Image 2 Left Box) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#0F1C36] rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-extrabold text-[#0D5C3A] dark:text-emerald-400">Quick Answer</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeCard.quickAnswer}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Reviewed by Dr Pratap Madhukar • 38 Yrs Experience</span>
            </div>
          </div>

          {/* Right Column: Grid of Causes & Warnings (Image 2 2x2 Grid) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Common Causes Card (Top-Left) */}
            <div className="bg-[#FFF9F5] dark:bg-[#1E140F] rounded-2xl p-4 border border-amber-200/80 dark:border-amber-900/50 shadow-2xs text-left">
              <div className="flex items-center gap-2 mb-2 text-rose-800 dark:text-amber-400 font-extrabold text-sm">
                <ListCheck className="w-4 h-4 text-rose-600 dark:text-amber-400" />
                <span>Common Causes</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeCard.commonCauses.map((cause, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold shrink-0">•</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Often-Missed Causes Card (Top-Right) */}
            <div className="bg-[#F8F9FE] dark:bg-[#11162B] rounded-2xl p-4 border border-blue-200/80 dark:border-blue-900/50 shadow-2xs text-left">
              <div className="flex items-center gap-2 mb-2 text-blue-800 dark:text-blue-300 font-extrabold text-sm">
                <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Often-Missed Causes</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeCard.oftenMissedCauses.map((cause, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning Signs Card with Red & Yellow splits (Bottom-Left) */}
            <div className="bg-[#FFF5F5] dark:bg-[#250F14] rounded-2xl p-4 border border-red-200 dark:border-red-900/60 shadow-2xs text-left">
              <div className="flex items-center gap-2 mb-2 text-red-800 dark:text-red-300 font-extrabold text-sm">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Warning Signs – Seek Urgent Care</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {/* Emergency Red Box */}
                <div className="p-2.5 rounded-xl bg-[#DC2626] text-white space-y-1">
                  <span className="block text-[11px] font-black uppercase tracking-wider">
                    Emergency – Go to ER Now
                  </span>
                  <ul className="space-y-1 text-[11px] leading-snug">
                    {activeCard.emergencyRed.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Yellow See Doctor Soon Box */}
                <div className="p-2.5 rounded-xl bg-[#FEF3C7] dark:bg-[#3D2C0A] text-slate-900 dark:text-amber-200 space-y-1 border border-amber-300 dark:border-amber-700">
                  <span className="block text-[11px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-100">
                    See a Doctor Soon (24–48h)
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-800 dark:text-amber-200 leading-snug">
                    {activeCard.doctorSoonYellow.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Safe Steps & Do Not Do (Bottom-Right Split) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Safe Steps Now (Green) */}
              <div className="p-3.5 rounded-2xl bg-[#F0FDF4] dark:bg-[#0A2312] border border-emerald-200 dark:border-emerald-900/60 text-left">
                <div className="flex items-center gap-1.5 mb-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Safe Steps Now</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-200 leading-snug">
                  {activeCard.safeSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Do Not Do (Red) */}
              <div className="p-3.5 rounded-2xl bg-[#FFF1F2] dark:bg-[#280E13] border border-rose-200 dark:border-rose-900/60 text-left">
                <div className="flex items-center gap-1.5 mb-1.5 text-rose-800 dark:text-rose-300 font-bold text-xs">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Do Not Do</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-200 leading-snug">
                  {activeCard.doNotDo.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Clinical Insights Bar (Image 2 Bottom Row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Age & Special Groups */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0F1C36] border border-slate-200 dark:border-slate-800 shadow-2xs flex items-start gap-2.5 text-left">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-900 dark:text-white">Age & Special Groups</span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug mt-0.5">
                {activeCard.specialGroups}
              </p>
            </div>
          </div>

          {/* Dr. Pratap's Special Insight */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0F1C36] border border-slate-200 dark:border-slate-800 shadow-2xs flex items-start gap-2.5 text-left">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-purple-900 dark:text-purple-300">Dr. Pratap's Special Insight</span>
              <p className="text-[11px] italic text-slate-600 dark:text-slate-300 leading-snug mt-0.5">
                {activeCard.drPratapInsight}
              </p>
            </div>
          </div>

          {/* Practice Story */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0F1C36] border border-slate-200 dark:border-slate-800 shadow-2xs flex items-start gap-2.5 text-left">
            <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-teal-900 dark:text-teal-300">Practice Story</span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug mt-0.5">
                {activeCard.practiceStory}
              </p>
            </div>
          </div>

        </div>

        {/* Interactive Symptom Checklist & Prepare for Doctor Visit Bar matching Image 2 */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0F1C36] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 shrink-0">
            <CheckSquare className="w-4 h-4 text-[#0D5C3A] dark:text-emerald-400" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              My Symptoms (Check if you have):
            </span>
          </div>

          {/* Interactive Checkbox Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
            {activeCard.checklistItems.map((item) => (
              <label 
                key={item.id}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                  checkedSymptoms[item.id]
                    ? item.red
                      ? 'bg-rose-100 border-rose-400 text-rose-900 font-bold dark:bg-rose-950 dark:border-rose-700 dark:text-rose-200'
                      : 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold dark:bg-emerald-950 dark:border-emerald-700 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={Boolean(checkedSymptoms[item.id])}
                  onChange={() => handleCheckboxToggle(item.id)}
                  className="w-3.5 h-3.5 rounded text-[#0D5C3A] focus:ring-[#0D5C3A]"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          {/* Prepare for Doctor Visit Action Button matching Image 2 */}
          <button
            type="button"
            onClick={handlePrepareDoctorVisit}
            className={`w-full lg:w-auto px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer ${
              hasRedFlagChecked
                ? 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 animate-pulse'
                : 'bg-gradient-to-r from-[#D81B60] to-[#BE185D] hover:from-[#BE185D] hover:to-[#9D174D]'
            }`}
          >
            <span>Prepare for Doctor Visit</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

        </div>

      </div>

    </div>
  );
}
