// Button-specific chatboard configurations & contextual clinical guidance

export const CATEGORY_CHAT_CONFIGS = {
  symptoms: {
    welcomePrefix: 'Welcome to **My Symptoms** triage chat. Describe your symptoms, duration, and severity for instant red-flag checks and safe next steps.',
    quickPrompts: [
      'Severe headache with light sensitivity or neck stiffness',
      'Chest pain or tightness radiating to left arm or jaw',
      'High fever (102°F+) with shivering chills for 3 days',
      'Persistent dry cough or shortness of breath'
    ],
    considerations: [
      'Acute symptom onset, duration (>72 hours), and progression determine urgency',
      'Always screen for red flags: chest pain, breathlessness, confusion, or severe bleeding',
      'Track temperature, hydration, and pain triggers before consulting a physician'
    ],
    nextSteps: [
      'Monitor vital signs (temperature, pulse, blood pressure) every 4–6 hours',
      'Stay well hydrated with water or ORS unless fluid-restricted',
      'Seek emergency care immediately if any RED warning sign develops'
    ]
  },
  'personal-health': {
    welcomePrefix: 'Welcome to **My Personal Health** chat. Share your BP, blood sugar, HbA1c, thyroid, or preventive screening questions.',
    quickPrompts: [
      'My BP reading is 145/92 mmHg — what are safe next steps?',
      'Fasting sugar 118 mg/dL and HbA1c 6.2% — is this pre-diabetes?',
      'High TSH thyroid reading with daily fatigue',
      'Annual preventive health screening checklist for adults'
    ],
    considerations: [
      'Blood pressure ≥140/90 mmHg on repeated resting checks needs physician review',
      'Fasting glucose 100–125 mg/dL or HbA1c 5.7–6.4% indicates pre-diabetic metabolic risk',
      'Thyroid (TSH) and lipid profiles help explain fatigue and long-term cardiac risk'
    ],
    nextSteps: [
      'Record morning and evening resting BP for 5–7 days in a written log',
      'Prioritize 30 minutes of daily brisk walking and reduce refined sugars & excess salt',
      'Schedule annual fasting lipid, HbA1c, CBC, and kidney/liver panel review'
    ]
  },
  family: {
    welcomePrefix: 'Welcome to **My Family** care chat. Ask about senior parent health, seasonal flu precautions, immunity, or joint care.',
    quickPrompts: [
      'Senior parent feeling dizzy when standing up quickly',
      'How to manage seasonal flu at home and protect elderly parents',
      'Daily joint care and fall-prevention checklist for seniors',
      'Immunity and hydration tips for the whole family'
    ],
    considerations: [
      'Older adults can have atypical infection signs such as sudden confusion or weakness without high fever',
      'Orthostatic blood pressure drops or medication overlap commonly cause dizziness in seniors',
      'Home ventilation, hand hygiene, and masking protect vulnerable family members during flu season'
    ],
    nextSteps: [
      'Use a weekly pill organizer and verify hydration daily for elderly relatives',
      'Install bathroom anti-slip mats and warm night-lights to prevent falls',
      'Isolate symptomatic flu cases and monitor SpO2 (keep ≥95%)'
    ]
  },
  parenting: {
    welcomePrefix: 'Welcome to **My Parenting** pediatric chat. Ask about baby fever, teething, colic, nutrition, or child growth milestones.',
    quickPrompts: [
      'My child has a 101°F fever — when should we see a pediatrician?',
      'Safe home comfort measures for baby teething discomfort',
      'Managing evening infant colic and feeding gas safely',
      'Red-flag warning signs in pediatric fever or dehydration'
    ],
    considerations: [
      'Any fever ≥100.4°F (38°C) in an infant under 3 months requires immediate emergency pediatric evaluation',
      'Alertness, wet diapers (every 6 hours), and fluid intake matter more than the exact thermometer number',
      'Teething rarely causes fever above 100.4°F — higher fevers point to viral/bacterial illness'
    ],
    nextSteps: [
      'Offer frequent breastmilk, ORS, or clear fluids to prevent pediatric dehydration',
      'Dress the child in breathable cotton; never use ice-cold water or Aspirin in children',
      'Consult a pediatrician urgently for lethargy, fast breathing, rash, or poor feeding'
    ]
  },
  'food-nutrition': {
    welcomePrefix: 'Welcome to **My Food** nutrition chat. Ask about diabetic meal sequencing, low-sodium diets, gut microbiome, or anemia foods.',
    quickPrompts: [
      'Meal sequence tips to avoid post-lunch blood sugar spikes',
      'Low-sodium Indian food swaps for high blood pressure',
      'High-fiber and probiotic foods for better gut health',
      'Iron-rich diet ideas for fatigue and mild anemia'
    ],
    considerations: [
      'Eating fiber/salad and protein before complex carbohydrates reduces post-meal glucose spikes by up to 40%',
      'Packaged snacks, pickles, and papads carry hidden sodium that elevates blood pressure',
      'Pairing plant iron (spinach, dal, dates) with Vitamin C boosts absorption; keep tea/coffee 1 hour apart'
    ],
    nextSteps: [
      'Follow the 50% vegetables, 25% protein, 25% whole-grain/millet plate balance',
      'Target <1 tsp total added salt per day for blood pressure support',
      'Drink 2–2.5L fluids daily and take a gentle 10-minute walk after meals'
    ]
  },
  'mind-emotions': {
    welcomePrefix: 'Welcome to **My Mind** wellness chat. Ask about anxiety relief, work burnout, panic episodes, or emotional balance.',
    quickPrompts: [
      'Waking up anxious with a racing heart — how to calm down quickly?',
      'Signs of work burnout vs clinical anxiety and recovery steps',
      '5-4-3-2-1 grounding and 4-7-8 breathing for panic moments',
      'Simple daily habits to improve mental focus and calm'
    ],
    considerations: [
      'Chronic stress activates sympathetic fight-or-flight, causing racing heartbeat, chest tightness, and gut upset',
      'Slow extended exhalations (such as 4-7-8 breathing) stimulate the vagus nerve to lower heart rate',
      'Persistent low mood, hopelessness, or panic interfering with daily function warrants professional counseling'
    ],
    nextSteps: [
      'Practice 4 cycles of 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s)',
      'Use 5-4-3-2-1 sensory grounding during sudden anxiety spikes',
      'Limit late-day caffeine and protect a consistent wind-down routine'
    ]
  },
  sleep: {
    welcomePrefix: 'Welcome to **My Sleep** protocol chat. Ask about insomnia, circadian rhythm, snoring/sleep apnea, or waking up tired.',
    quickPrompts: [
      'How to fall asleep faster without medication (sleep hygiene)',
      'Loud snoring and daytime tiredness — could this be sleep apnea?',
      'Waking up at 3 AM and unable to fall back asleep',
      'Ideal bedtime schedule for 7.5 hours of restorative REM sleep'
    ],
    considerations: [
      'Each full human sleep cycle lasts ~90 minutes; 5 cycles (7.5 hours) supports optimal REM & deep sleep',
      'Loud snoring with gasping or daytime fatigue can indicate obstructive sleep apnea (OSA)',
      'Evening blue light and late meals delay natural melatonin secretion'
    ],
    nextSteps: [
      'Fix your wake-up time daily and dim screens 45–60 minutes before bed',
      'Keep your bedroom cool, dark, and quiet; avoid caffeine after 2 PM',
      'Consult a physician for a sleep evaluation if loud snoring and daytime sleepiness persist'
    ]
  },
  beauty: {
    welcomePrefix: 'Welcome to **My Beauty** dermatology chat. Ask about acne, eczema, skin barrier care, hair fall, or sun protection.',
    quickPrompts: [
      'Safe morning and night skincare routine for acne-prone skin',
      'Dry, itchy eczema patches — what ingredients repair the skin barrier?',
      'Sudden hair fall and dandruff — when should I check ferritin or thyroid?',
      'How to choose and apply broad-spectrum sunscreen properly'
    ],
    considerations: [
      'Over-exfoliating or mixing harsh DIY remedies damages the skin barrier and worsens acne/eczema',
      'Diffuse hair shedding lasting >3 months often links to low ferritin (iron), Vitamin D, B12, or thyroid shifts',
      'Broad-spectrum SPF 50 protects against UV pigmentation and premature skin barrier damage'
    ],
    nextSteps: [
      'Use a gentle pH-balanced cleanser, targeted active (one at a time), ceramide moisturizer, and daily SPF',
      'Avoid squeezing acne lesions or using unprescribed steroid creams on the face',
      'Consult a dermatologist for scarring cystic acne, oozing rashes, or patchy hair loss'
    ]
  },
  'medicine-tests': {
    welcomePrefix: 'Welcome to **My Lab Tests** decoder chat. Paste your CBC, Lipid Profile, HbA1c, Thyroid, LFT, or KFT numbers for plain-English explanations.',
    quickPrompts: [
      'My CBC shows Hemoglobin 10.5 g/dL and Platelets 130,000 — what does it mean?',
      'Explain Lipid Profile: High LDL and Triglycerides 195 mg/dL',
      'What is the difference between Fasting Glucose and HbA1c?',
      'Slightly elevated SGPT/SGOT in my LFT report — common causes'
    ],
    considerations: [
      'Single lab numbers must always be interpreted alongside symptoms, age, and clinical history',
      'HbA1c reflects 3-month average blood sugar; normal is <5.7%, pre-diabetes 5.7–6.4%, diabetes ≥6.5%',
      'Mildly elevated SGPT/SGOT often reflects fatty liver or recent viral/medication strain'
    ],
    nextSteps: [
      'Compare values against the specific reference interval printed on your lab report',
      'Repeat borderline fasting labs (glucose, lipids) after 10–12 hours overnight water-only fast',
      'Share full report trends with your physician before starting or stopping supplements'
    ]
  },
  medicines: {
    welcomePrefix: 'Welcome to **My Medicines** safety chat. Ask about dose timing, food rules, side effects, or potential drug interactions.',
    quickPrompts: [
      'Safe adult daily limit and spacing rules for Paracetamol',
      'Why should antibiotics never be stopped early or taken for viral colds?',
      'Best timing for antacids / Pantoprazole before meals',
      'When should NSAID painkillers like Ibuprofen be avoided?'
    ],
    considerations: [
      'Check active ingredients across cold/flu combo tablets to avoid accidental Paracetamol doubling',
      'PPIs (like Pantoprazole) work best 30–45 minutes before breakfast; separate iron/thyroid meds by 2–4 hours',
      'NSAIDs (Ibuprofen/Diclofenac/Aspirin) should be avoided in suspected dengue, stomach ulcers, or kidney disease'
    ],
    nextSteps: [
      'Always complete prescribed antibiotic courses and never reuse old prescriptions',
      'Take NSAIDs only after food and at the lowest effective dose for the shortest duration',
      'Seek urgent medical help for medication rash, lip/face swelling, or breathing difficulty'
    ]
  }
};

export function getCategoryChatConfig(categoryId) {
  const id = (categoryId || '').toLowerCase();
  if (id === 'medicines-tests') return CATEGORY_CHAT_CONFIGS['medicine-tests'];
  return CATEGORY_CHAT_CONFIGS[id] || null;
}
