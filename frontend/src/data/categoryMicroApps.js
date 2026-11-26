// Structured clinical data for the 10 Category Card Micro-Apps

export const LAB_PANELS = [
  {
    id: 'cbc',
    name: 'CBC Panel',
    subtitle: 'Complete Blood Count',
    markers: [
      { key: 'hb', label: 'Hemoglobin (g/dL)', unit: 'g/dL', min: 12.0, max: 17.5, defaultVal: 13.8, lowNote: 'Low Hb may indicate anemia or iron/B12 deficiency.', highNote: 'Elevated Hb can occur with dehydration or polycythemia.' },
      { key: 'wbc', label: 'WBC Count (cells/µL)', unit: '/µL', min: 4000, max: 11000, defaultVal: 7200, lowNote: 'Low WBC can be seen in viral infections or bone marrow suppression.', highNote: 'High WBC often reflects infection or acute inflammation.' },
      { key: 'platelets', label: 'Platelets (/µL)', unit: '/µL', min: 150000, max: 450000, defaultVal: 240000, lowNote: 'Low platelets (<100,000) require monitoring in viral fevers like dengue.', highNote: 'Elevated platelets can be reactive to inflammation or iron deficiency.' }
    ]
  },
  {
    id: 'lipid',
    name: 'Lipid Profile',
    subtitle: 'Cholesterol & Triglycerides',
    markers: [
      { key: 'totalChol', label: 'Total Cholesterol (mg/dL)', unit: 'mg/dL', min: 0, max: 200, defaultVal: 182, lowNote: 'Within desirable range.', highNote: 'Above 200 mg/dL increases long-term cardiovascular risk.' },
      { key: 'ldl', label: 'LDL "Bad" Cholesterol (mg/dL)', unit: 'mg/dL', min: 0, max: 100, defaultVal: 96, lowNote: 'Optimal LDL level.', highNote: 'Above 100 mg/dL (or >70 with diabetes/heart risk) merits lifestyle/doctor review.' },
      { key: 'hdl', label: 'HDL "Good" Cholesterol (mg/dL)', unit: 'mg/dL', min: 40, max: 100, defaultVal: 48, lowNote: 'Low HDL (<40 mg/dL) reduces protective cholesterol clearance.', highNote: 'Healthy protective HDL.' },
      { key: 'trig', label: 'Triglycerides (mg/dL)', unit: 'mg/dL', min: 0, max: 150, defaultVal: 134, lowNote: 'Normal triglycerides.', highNote: 'High triglycerides (>150 mg/dL) respond well to reducing refined carbs & sugars.' }
    ]
  },
  {
    id: 'glycemic',
    name: 'HbA1c & Glucose',
    subtitle: 'Metabolic Sugar Control',
    markers: [
      { key: 'fbs', label: 'Fasting Blood Sugar (mg/dL)', unit: 'mg/dL', min: 70, max: 99, defaultVal: 94, lowNote: 'Below 70 mg/dL may indicate hypoglycemia — check symptoms.', highNote: '100–125 mg/dL = Pre-diabetes; ≥126 mg/dL = Diabetes range.' },
      { key: 'hba1c', label: 'HbA1c (%)', unit: '%', min: 4.0, max: 5.6, defaultVal: 5.4, lowNote: 'Normal 3-month average glucose.', highNote: '5.7–6.4% = Pre-diabetes; ≥6.5% = Diabetes range.' }
    ]
  },
  {
    id: 'lftkft',
    name: 'LFT / KFT',
    subtitle: 'Liver & Kidney Function',
    markers: [
      { key: 'sgpt', label: 'ALT / SGPT (U/L)', unit: 'U/L', min: 7, max: 56, defaultVal: 28, lowNote: 'Within normal range.', highNote: 'Elevated SGPT may indicate fatty liver, viral hepatitis, or drug strain.' },
      { key: 'sgot', label: 'AST / SGOT (U/L)', unit: 'U/L', min: 10, max: 40, defaultVal: 24, lowNote: 'Within normal range.', highNote: 'Elevated SGOT warrants liver and muscle evaluation.' },
      { key: 'creat', label: 'Serum Creatinine (mg/dL)', unit: 'mg/dL', min: 0.6, max: 1.3, defaultVal: 0.9, lowNote: 'Within normal range.', highNote: 'Elevated creatinine (>1.3 mg/dL) requires hydration check and kidney eGFR review.' }
    ]
  }
];

export const MEDICINE_GUIDE_LIST = [
  {
    id: 'paracetamol',
    name: 'Paracetamol (Acetaminophen)',
    category: 'Fever & Pain Reliever',
    timing: 'Every 6–8 hours as needed (can be taken with or without food)',
    maxDaily: 'Adults: max 3,000–4,000 mg/day (typically max 4×500 mg or 3×650 mg unless doctor advises)',
    caution: 'Avoid combining multiple cold/flu tablets that also contain paracetamol. Avoid alcohol and use caution in liver disease.',
    avoidIf: ['Severe liver disease', 'Already took another combo fever/cold tablet within 4 hours']
  },
  {
    id: 'antibiotics',
    name: 'Antibiotics (e.g., Amoxicillin, Azithromycin)',
    category: 'Bacterial Infection Therapy',
    timing: 'Strictly follow prescribed interval (some before food, some after)',
    maxDaily: 'Only exact prescribed dose — never double a missed dose',
    caution: 'Antibiotics do NOT treat viral colds, flu, or dengue. Stopping early causes antibiotic resistance.',
    avoidIf: ['Unprescribed self-medication from old prescriptions', 'Known penicillin/sulfa rash or allergy']
  },
  {
    id: 'antacids',
    name: 'Antacids & PPIs (Pantoprazole, Omeprazole)',
    category: 'Acidity & Gastric Protection',
    timing: 'PPIs work best 30–45 minutes BEFORE breakfast on an empty stomach; liquid antacids after meals',
    maxDaily: 'Short-term OTC use up to 14 days unless prescribed for chronic GERD/ulcer',
    caution: 'Separate iron, calcium, and thyroid tablets by at least 2–4 hours from antacids for proper absorption.',
    avoidIf: ['Crushing chest pain / sweating (rule out cardiac cause first)', 'Unexplained weight loss or black stools']
  },
  {
    id: 'nsaids',
    name: 'NSAIDs (Ibuprofen, Diclofenac, Aspirin)',
    category: 'Anti-inflammatory Painkillers',
    timing: 'Always take AFTER food with a full glass of water',
    maxDaily: 'Lowest effective dose for shortest duration (3–5 days without doctor review)',
    caution: 'Avoid in suspected dengue fever (bleeding risk), stomach ulcers, kidney disease, or late pregnancy.',
    avoidIf: ['Suspected dengue / low platelets', 'Active gastric ulcer or kidney impairment']
  }
];

export const NUTRITION_PLANS = {
  'diabetic': {
    label: 'Diabetic / Low-GI',
    badge: 'Glycemic Control',
    plateRule: '50% Non-starchy Veggies → 25% Protein (Dal/Paneer/Eggs) → 25% Complex Carbs (Millets/Brown Rice)',
    swaps: [
      { from: 'White Rice / Maida', to: 'Hand-pounded Rice, Jowar, Bajra, or Oats' },
      { from: 'Sweetened Tea / Juice', to: 'Whole Fruit with Fiber + Unsweetened Cinnamon/Green Tea' },
      { from: 'Carb-first Breakfast', to: '10g Protein + Salad before carbs (reduces spike up to 40%)' }
    ],
    tip: 'Walk gently for 10–15 minutes after dinner to improve post-meal insulin sensitivity.'
  },
  'low-sodium': {
    label: 'Low-Sodium BP',
    badge: 'DASH Heart Care',
    plateRule: 'Target < 1,500–2,000 mg sodium/day (< 1 tsp total added salt across all meals)',
    swaps: [
      { from: 'Pickles, Papad & Packaged Namkeen', to: 'Roasted Makhana, Lemon-Herb Seasoning, Unsalted Nuts' },
      { from: 'Table Salt Sprinkling', to: 'Ginger, Garlic, Black Pepper, Jeera & Fresh Coriander' },
      { from: 'Processed Cheese / Sauces', to: 'Fresh Homemade Curd / Hung Curd Dip' }
    ],
    tip: 'Include potassium-rich foods like banana, spinach, and coconut water unless restricted for kidney care.'
  },
  'gut-health': {
    label: 'Gut & High-Fiber',
    badge: 'Microbiome Support',
    plateRule: '25–30g daily dietary fiber + fermented probiotic food + 2.5L water',
    swaps: [
      { from: 'Refined Biscuits & Bakery', to: 'Soaked Chia/Flaxseeds, Guava, Papaya, Oats' },
      { from: 'Heavy Late-Night Fried Meals', to: 'Khichdi with Ghee, Steamed Vegetables & Buttermilk (Chaas)' },
      { from: 'Soda / Carbonated Drinks', to: 'Homemade Kanji, Jeera Water, or Plain Kefir/Curd' }
    ],
    tip: 'Increase fiber gradually over 7–10 days while raising water intake to avoid bloating.'
  },
  'anemia': {
    label: 'Iron & Energy',
    badge: 'Hemoglobin Support',
    plateRule: 'Pair Iron-rich foods with Vitamin C (Amla/Lemon) & separate Tea/Coffee by 1 hour',
    swaps: [
      { from: 'Tea immediately after meals', to: 'Lemon water with meals; Tea 60 minutes later' },
      { from: 'Low-protein snacks', to: 'Roasted Chana, Dates, Spinach-Dal, Sesame (Til), Pomegranate' },
      { from: 'Processed flour', to: 'Sprouted Moong, Ragi & Garden Cress (Aliv) seeds' }
    ],
    tip: 'Calcium and dairy slightly compete with iron absorption — keep iron supplements separate from milk.'
  }
};

export const FAMILY_PROFILES = {
  senior: {
    label: 'Senior Parents (60+)',
    focus: 'Fall prevention, BP/sugar stability & medication timing',
    checklist: [
      { id: 'dizziness', text: 'Check for dizziness when standing up quickly (orthostatic drop)' },
      { id: 'medbox', text: 'Weekly pill organizer verified with morning/night doses' },
      { id: 'lighting', text: 'Night-lights in hallway & non-slip mat in bathroom' },
      { id: 'hydration', text: 'Consistent fluid intake (elderly thirst signals decline with age)' }
    ],
    prompt: 'Give me a daily safety, hydration, and fall-prevention checklist for senior parents aged 65+.'
  },
  adult: {
    label: 'Adult Care',
    focus: 'Annual screenings, desk posture & stress balance',
    checklist: [
      { id: 'bp', text: 'Quarterly blood pressure & annual fasting lipid/HbA1c check' },
      { id: 'movement', text: '30 minutes brisk walking + 2-minute stretch every desk hour' },
      { id: 'sleep', text: '7–8 hours consistent sleep window' },
      { id: 'vaccine', text: 'Seasonal flu & adult booster status updated' }
    ],
    prompt: 'What is the essential annual preventive screening checklist for working adults?'
  },
  flu: {
    label: 'Seasonal Flu & Immunity',
    focus: 'Home isolation hygiene, hydration & warning signs',
    checklist: [
      { id: 'temp', text: 'Monitor temperature morning & evening (flag if >102°F or >3 days)' },
      { id: 'mask', text: 'Masking & separate towel/utensils around elderly or infants' },
      { id: 'oximeter', text: 'SpO2 stays ≥95% and comfortable breathing rate' },
      { id: 'ors', text: 'Warm fluids, soups & ORS to prevent dehydration' }
    ],
    prompt: 'How should a family safely manage seasonal flu at home while protecting elderly members?'
  }
};

export const BEAUTY_CONCERNS = {
  acne: {
    label: 'Acne & Breakouts',
    safeIngredients: ['Salicylic Acid (0.5–2%)', 'Niacinamide (4–5%)', 'Benzoyl Peroxide (spot 2.5%)', 'Non-comedogenic Gel Moisturizer'],
    avoid: ['Squeezing/popping cysts', 'Heavy coconut oil on face', 'Toothpaste or lemon juice DIYs', 'Layering 3+ exfoliating acids together'],
    amRoutine: 'Gentle pH-balanced cleanser → Niacinamide serum → Oil-free moisturizer → Broad-spectrum SPF 50 sunscreen',
    pmRoutine: 'Gentle cleanser → Targeted salicylic or prescribed retinoid (pea-size, alternate nights) → Ceramide barrier moisturizer',
    redFlag: 'Deep painful nodules leaving scars or sudden severe facial acne with irregular periods warrants a dermatologist visit.'
  },
  eczema: {
    label: 'Eczema & Barrier',
    safeIngredients: ['Ceramides & Colloidal Oatmeal', 'Plain Petrolatum / Shea', 'Fragrance-free Syndet Wash', 'Glycerin & Hyaluronic Acid'],
    avoid: ['Hot steaming showers', 'Fragranced soaps & harsh scrubs', 'Wool directly on irritated skin', 'Unmonitored OTC steroid creams'],
    amRoutine: 'Lukewarm water rinse → Apply thick ceramide cream within 3 minutes on damp skin → Mineral SPF 30+',
    pmRoutine: 'Soap-free creamy cleanser → Thick barrier ointment on dry patches → Cotton breathable sleepwear',
    redFlag: 'Yellow crusting, oozing fluid, warmth, or fever suggests secondary skin infection needing medical care.'
  },
  hairfall: {
    label: 'Hair Fall & Scalp',
    safeIngredients: ['Mild Ketoconazole 1–2% (for dandruff)', 'Peptides & Caffeine Serums', 'Protein + Iron + Vitamin D rich diet'],
    avoid: ['Tight ponytails/braids (traction)', 'High-heat styling daily', 'Scalp scratching with fingernails', 'Extreme crash dieting'],
    amRoutine: 'Gentle detangling with wide-tooth comb → Protect scalp from harsh UV sun exposure',
    pmRoutine: 'Clean scalp 2–3×/week → Light non-sticky leave-in tonic → Silk/cotton clean pillowcase',
    redFlag: 'Sudden coin-shaped bald patches, scalp redness/scaling, or >100–150 hairs/day persisting >3 months needs Ferritin/TSH lab check.'
  },
  suncare: {
    label: 'Sun & Pigmentation',
    safeIngredients: ['Zinc Oxide / Broad-Spectrum SPF 50 PA++++', 'Vitamin C (10–15% morning)', 'Azelaic Acid (10%)', 'Alpha Arbutin'],
    avoid: ['Skipping sunscreen indoors near windows', 'Hydroquinone without dermatologist supervision', 'Harsh physical walnut scrubs'],
    amRoutine: 'Cleanser → Antioxidant Vitamin C serum → 2-finger rule SPF 50 sunscreen (reapply every 3–4 hrs outdoors)',
    pmRoutine: 'Double/gentle cleanse to remove SPF → Azelaic acid or niacinamide → Barrier moisturizer',
    redFlag: 'Any new or changing dark mole with asymmetric borders, bleeding, or rapid growth needs urgent dermatology exam.'
  }
};
