import { Brain, Heart, Thermometer, Activity } from 'lucide-react';

export const CLINICAL_CARDS_CATALOG_MULTILINGUAL = {
  EN: {
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
  },
  HI: {
    'H-032': {
      id: 'H-032',
      category: 'लक्षण',
      subcategory: 'सिरदर्द',
      title: 'तीव्र सिरदर्द',
      question: 'अत्यधिक तीव्र सिरदर्द का क्या कारण हो सकता है, और मुझे कब चिंतित होना चाहिए?',
      image: '/assets/severe-headache-retina-sharp.png',
      atAGlance: 'अचानक, अत्यधिक तीव्र या बढ़ता हुआ सिरदर्द किसी गंभीर समस्या का संकेत हो सकता है और इसके लिए तत्काल चिकित्सकीय परामर्श की आवश्यकता होती है।',
      icon: Brain,
      illustration: '/assets/migraine-head-retina-sharp.png',
      quickAnswer: 'अधिकांश गंभीर सिरदर्द माइग्रेन, उच्च रक्तचाप, साइनस या तनाव के कारण होते हैं। लेकिन अचानक होने वाला "अब तक का सबसे बुरा" सिरदर्द, 50 वर्ष की आयु के बाद नया सिरदर्द, सिर की चोट, या बुखार, गर्दन में अकड़न, कमजोरी के साथ सिरदर्द गंभीर हो सकता है। इसके लिए तत्काल आपातकालीन मूल्यांकन की आवश्यकता है।',
      commonCauses: [
        'माइग्रेन (अक्सर एक तरफा, धड़कता हुआ दर्द, प्रकाश/ध्वनि के प्रति संवेदनशीलता)',
        'तनाव सिरदर्द (खोपड़ी के चारों ओर तंग पट्टी जैसा खिंचाव)',
        'साइनस सिरदर्द (नाक बंद, चेहरे पर भारीपन, आगे झुकने पर दर्द बढ़ना)',
        'उच्च रक्तचाप (हाइपरटेंसिव आपात स्थिति)',
        'निर्जलीकरण, नींद की कमी, या लंबे समय तक स्क्रीन देखना'
      ],
      oftenMissedCauses: [
        'मस्तिष्क संक्रमण (मेनिन्जाइटिस, बुखार/गर्दन की जकड़न के साथ एन्सेफलाइटिस)',
        'मस्तिष्क के आसपास रक्तस्राव (सबराचनोइड रक्तस्राव - "थंडरक्लैप सिरदर्द")',
        'मस्तिष्क में थक्का (सेरेब्रल वेनस साइनस थ्रोम्बोसिस)',
        'टेम्पोरल आर्टराइटिस (50 वर्ष से अधिक आयु, कनपटी के पास धड़कता दर्द, सिर की संवेदनशीलता)',
        'आंखों की समस्याएं जैसे तीव्र कोण-बंद ग्लूकोमा (आंखों में दर्द, धुंधलापन)'
      ],
      emergencyRed: [
        'अचानक, अत्यधिक गंभीर "अब तक का सबसे बुरा" थंडरक्लैप सिरदर्द',
        'सिर पर चोट या आघात के बाद सिरदर्द',
        'तेज बुखार और गर्दन में अकड़न के साथ (ठोड़ी को छाती से छूने में असमर्थ)',
        'शरीर के एक हिस्से में कमजोरी, लड़खड़ाती आवाज, या दौरे पड़ना',
        'तीव्र भ्रम, बेहोशी या चेतना की हानि'
      ],
      doctorSoonYellow: [
        '50 वर्ष की आयु के बाद पहली बार गंभीर सिरदर्द होना',
        'दिन-प्रतिदिन लगातार बढ़ता हुआ सिरदर्द',
        'लगातार अनियंत्रित उल्टी के साथ सिरदर्द',
        'दृष्टि में धुंधलापन या काले धब्बे दिखाई देना'
      ],
      safeSteps: [
        'एक शांत, अंधेरे और हवादार कमरे में आराम करें।',
        'ठंडे पानी या इलेक्ट्रोलाइट्स के साथ पर्याप्त जलयोजन (हाइड्रेशन) बनाए रखें।',
        'यदि पहले सुरक्षित रूप से लिया हो तो सामान्य दर्द निवारक (जैसे पैरासिटामोल) लें।',
        'यदि आपको पुराना उच्च रक्तचाप है तो अपना विश्राम रक्तचाप (BP) जांचें।'
      ],
      doNotDo: [
        'अचानक, अत्यधिक गंभीर "थंडरक्लैप" सिरदर्द को नजरअंदाज न करें।',
        'बार-बार या अत्यधिक मात्रा में दर्द निवारक दवाएं न लें।',
        'चिकित्सीय परामर्श के बिना लंबे समय तक स्वयं दवा न लें।',
        'यदि चक्कर आ रहे हों या दृष्टि धुंधली हो तो वाहन न चलाएं।'
      ],
      specialGroups: 'बच्चे, गर्भवती महिलाएं, बुजुर्ग (50+ वर्ष), और कमजोर प्रतिरक्षा प्रणाली वाले व्यक्तियों को तत्काल व्यक्तिगत चिकित्सक मूल्यांकन की आवश्यकता होती है।',
      drPratapInsight: '"सिरदर्द का पैटर्न अक्सर प्राथमिक सुराग देता है। अचानक, नया या पहले से भिन्न सिरदर्द कभी भी नजरअंदाज नहीं किया जाना चाहिए।"',
      practiceStory: 'एक 42 वर्षीय महिला भारी काम के बाद अत्यधिक सिरदर्द और उच्च रक्तचाप के साथ आई। त्वरित जांच और रक्तचाप नियंत्रण से उन्हें शीघ्र और सुरक्षित राहत मिली।',
      checklistItems: [
        { id: 'severePain', label: 'अचानक अत्यधिक तीव्र दर्द', red: true },
        { id: 'fever', label: 'बुखार', red: false },
        { id: 'neckStiffness', label: 'गर्दन में अकड़न', red: true },
        { id: 'vomiting', label: 'उल्टी', red: false },
        { id: 'visionChange', label: 'दृष्टि में बदलाव / धुंधलापन', red: true },
        { id: 'headInjury', label: 'सिर में चोट', red: true }
      ]
    },
    'H-001': {
      id: 'H-001',
      category: 'लक्षण',
      subcategory: 'सीने में दर्द',
      title: 'तीव्र सीने में दर्द और दबाव',
      question: 'अचानक सीने में तेज दबाव का क्या कारण है, और यह कब हृदय आपातकाल होता है?',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80',
      atAGlance: 'सीने में भारी दबाव या दर्द जो बाएं हाथ या जबड़े तक फैले, एक संभावित हृदय आपातकाल है जिसके लिए तत्काल सहायता चाहिए।',
      icon: Heart,
      quickAnswer: 'सीने में जकड़न, भारी दबाव जो बाएं हाथ, जबड़े, गर्दन या पीठ तक फैले, उसके लिए तुरंत ईसीजी और कार्डियक जांच आवश्यक है। आपातकालीन सहायता में कभी देरी न करें।',
      commonCauses: [
        'मायोकार्डियल इस्किमिया / एनजाइना (हृदय की मांसपेशियों में रक्त प्रवाह की कमी)',
        'गैस्ट्रोएसोफेगल रिफ्लक्स (गंभीर एसिडिटी जो दिल के दर्द जैसी लगती है)',
        'सीने की मांसपेशियों में खिंचाव / कोस्टोकॉन्ड्राइटिस',
        'घबराहट, एंग्जायटी या पैनिक अटैक',
        'प्लूरिसी (गहरी सांस लेने पर सीने में तेज चुभन)'
      ],
      oftenMissedCauses: [
        'एओर्टिक विच्छेदन (कंधों के बीच पीठ में चीरने जैसा असहनीय दर्द)',
        'पल्मोनरी एम्बोलिज्म (पैरों में सूजन या लंबी यात्रा के बाद अचानक सांस फूलना और दर्द)',
        'पेरीकार्डिटिस (आगे झुकने पर राहत मिलने वाला सीने का दर्द)',
        'एसोफेजियल ऐंठन या न्यूमोथोरैक्स'
      ],
      emergencyRed: [
        'सीने में भारी जकड़न या दर्द जो 5 मिनट से अधिक रहे',
        'दर्द जो बाएं हाथ, गर्दन, जबड़े या पेट के ऊपरी हिस्से तक फैले',
        'अत्यधिक ठंडा पसीना आना और सांस लेने में भारी कठिनाई',
        'बेहोशी, अत्यधिक चक्कर आना या रक्तचाप में भारी गिरावट',
        'होंठ या नाखून नीले या पीले पड़ना (सायनोसिस)'
      ],
      doctorSoonYellow: [
        'स्थिति बदलने पर कुछ सेकंड के लिए होने वाली सीने की चुभन',
        'मसालेदार भोजन के बाद सीने में जलन जो एंटासिड से ठीक हो जाए',
        'पसलियों पर उंगली से दबाने पर दर्द महसूस होना'
      ],
      safeSteps: [
        'सभी शारीरिक गतिविधियां तुरंत रोकें; आराम से अर्ध-बैठी स्थिति में बैठें।',
        'गले और कमर के आसपास के तंग कपड़े ढीले करें।',
        'तुरंत आपातकालीन एम्बुलेंस सेवा (108 / 112) को कॉल करें।',
        'निर्धारित नाइट्रेट दवा तभी लें जब डॉक्टर ने पहले स्पष्ट निर्देश दिया हो।'
      ],
      doNotDo: [
        'स्वयं गाड़ी चलाकर अस्पताल जाने का प्रयास न करें।',
        'पसीने और घबराहट के साथ सीने के दर्द को "केवल गैस" न समझें।',
        'डॉक्टर द्वारा जांचे जाने से पहले भारी भोजन या पेनकिलर न लें।'
      ],
      specialGroups: 'मधुमेह रोगियों और महिलाओं में दिल का दौरा अक्सर बिना सीने के दर्द के केवल उल्टी, अत्यधिक थकान या सांस फूलने के रूप में प्रकट हो सकता है।',
      drPratapInsight: '"कार्डियोलॉजी में समय ही जीवन है। सीने में भारीपन और पसीने के मामले में कभी जोखिम न लें, सीधे आपातकालीन कक्ष में जाएं।"',
      practiceStory: 'एक 54 वर्षीय व्यक्ति ने सीने के दर्द को सामान्य एसिडिटी समझा। सतर्क परिवार ने उन्हें तुरंत ट्राइएज पहुंचाया जहां ईसीजी ने प्रारंभिक हार्ट अटैक पकड़ लिया और जान बच गई।',
      checklistItems: [
        { id: 'crushingPain', label: 'सीने में भारी दबाव और जकड़न', red: true },
        { id: 'radiation', label: 'दर्द बाएं हाथ या जबड़े तक फैलना', red: true },
        { id: 'sweating', label: 'ठंडा पसीना और चक्कर आना', red: true },
        { id: 'shortBreath', label: 'सांस लेने में अत्यधिक कठिनाई', red: true },
        { id: 'acidBurn', label: 'गले और सीने में जलन', red: false },
        { id: 'sharpBreath', label: 'गहरी सांस लेने पर चुभन', red: false }
      ]
    },
    'H-014': {
      id: 'H-014',
      category: 'लक्षण',
      subcategory: 'बुखार',
      title: 'तेज बुखार और कंपकंपी',
      question: 'कंपकंपी के साथ तेज बुखार क्या संकेत देता है, और रक्त परीक्षण कब आवश्यक है?',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
      atAGlance: '102°F से अधिक बुखार या 72 घंटे से अधिक समय तक रहने वाले बुखार के लिए सटीक जांच और जलयोजन जरूरी है।',
      icon: Thermometer,
      quickAnswer: 'बुखार संक्रमण के खिलाफ प्रतिरक्षा प्रणाली की स्वाभाविक प्रतिक्रिया है। तेज कंपकंपी, त्वचा पर दाने या लगातार उल्टी के साथ आने वाले बुखार के लिए डेंगू, मलेरिया या जीवाणु संक्रमण की जांच आवश्यक है।',
      commonCauses: [
        'वायरल श्वसन संक्रमण (इन्फ्लूएंजा, फ्लू, सामान्य सर्दी)',
        'मच्छर जनित संक्रमण (डेंगू, मलेरिया, चिकनगुनिया)',
        'मूत्र मार्ग में संक्रमण (UTI - पेशाब में जलन)',
        'टाइफाइड (आंत्र ज्वर - सीढ़ीनुमा बुखार)',
        'तीव्र आंत्रशोथ / भोजन विषाक्तता (फूड पॉइजनिंग)'
      ],
      oftenMissedCauses: [
        'पायलोनेफ्राइटिस (पीठ और कमर के दर्द के साथ गुर्दे का संक्रमण)',
        'गहरा फोड़ा या दांत / कान का छिपा हुआ संक्रमण',
        'दवा की प्रतिकूल प्रतिक्रिया (दवा-प्रेरित बुखार)',
        'ऑटोइम्यून / रूमेटोलॉजिक सूजन'
      ],
      emergencyRed: [
        'तापमान 103.5°F (39.7°C) से अधिक होना जो दवा से न घटे',
        'त्वचा पर गहरे बैंगनी रंग के छोटे-छोटे दाने जो दबाने पर फीके न पड़ें',
        'अत्यधिक सुस्ती, भ्रम, बेहोशी या दौरे पड़ना',
        'लगातार उल्टी के कारण पानी या तरल पदार्थ न पचना',
        'प्लेटलेट गिरने के संकेत: मसूड़ों से खून आना या काला मल'
      ],
      doctorSoonYellow: [
        'बुखार लगातार 3 दिनों (72 घंटे) से अधिक समय तक बना रहना',
        '3 महीने से कम उम्र के शिशु में तेज बुखार',
        'खांसी में पीला-हरा बलगम आना या कान में तेज दर्द'
      ],
      safeSteps: [
        'ओआरएस (ORS), नारियल पानी और पतले सूप के साथ जलयोजन बनाए रखें।',
        'माथे, गर्दन और बगलों पर गुनगुने पानी की पट्टियां रखें।',
        'डॉक्टर द्वारा निर्देशित आयु-उपयुक्त पैरासिटामोल लें।',
        'हल्के सूती कपड़े पहनें और ठंडे, हवादार कमरे में विश्राम करें।'
      ],
      doNotDo: [
        'डेंगू के संदेह में एस्पिरिन या ब्रूफेन न लें (रक्तस्राव का खतरा बढ़ता है)।',
        'डॉक्टर के पर्चे के बिना बची हुई एंटीबायोटिक्स शुरू न करें।',
        'बर्फ के ठंडे पानी से न नहलाएं (इससे कंपकंपी और तापमान बढ़ सकता है)।'
      ],
      specialGroups: '6 महीने से छोटे शिशुओं, बुजुर्गों और कमजोर प्रतिरक्षा वाले मरीजों में हल्के बुखार में भी तत्काल डॉक्टर से मिलना चाहिए।',
      drPratapInsight: '"सिर्फ थर्मामीटर का इलाज न करें, मरीज को देखें। तरल पदार्थ का सेवन, पेशाब की मात्रा और सतर्कता बुखार के नंबर से ज्यादा महत्वपूर्ण हैं।"',
      practiceStory: 'एक 28 वर्षीय युवा को तेज बुखार और हड्डियों में दर्द हुआ। समय पर सीबीसी टेस्ट ने डेंगू में गिरती प्लेटलेट्स को पकड़ लिया और सुरक्षित रूप से उपचार किया गया।',
      checklistItems: [
        { id: 'tempHigh', label: '102°F से अधिक बुखार', red: false },
        { id: 'chills', label: 'तेज कंपकंपी और ठंड लगना', red: false },
        { id: 'rash', label: 'त्वचा पर लाल-बैंगनी चकत्ते', red: true },
        { id: 'confusion', label: 'अत्यधिक सुस्ती या भ्रम', red: true },
        { id: 'bleeding', label: 'मसूड़ों या नाक से खून आना', red: true },
        { id: 'vomiting', label: 'तरल पदार्थ पीने में असमर्थ', red: true }
      ]
    },
    'H-045': {
      id: 'H-045',
      category: 'लक्षण',
      subcategory: 'पाचन',
      title: 'तीव्र पेट दर्द और गैस्ट्राइटिस',
      question: 'सामान्य एसिडिटी और पेट की सर्जिकल आपात स्थिति में अंतर कैसे करें?',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80',
      atAGlance: 'पेट में अत्यधिक दर्द और पेट की दीवार का पत्थर जैसा कड़ा होना तत्काल सर्जिकल जांच का संकेत है।',
      icon: Activity,
      quickAnswer: 'अधिकांश पेट दर्द अपच, गैस या हल्की गैस्ट्राइटिस से होते हैं, लेकिन नाभि के नीचे दाईं ओर तेज दर्द, खून की उल्टी या पीठ में जाता दर्द अपेंडिसाइटिस, पैन्क्रियाटाइटिस या पित्त की पथरी का संकेत हो सकता है।',
      commonCauses: [
        'तीव्र गैस्ट्राइटिस या पेप्टिक अल्सर (पेट के ऊपरी हिस्से में जलन)',
        'फूड पॉइजनिंग / वायरल आंत्रशोथ (मरोड़ और दस्त के साथ)',
        'गैस का जमाव / इरिटेबल बोवेल सिंड्रोम (IBS)',
        'कब्ज और आंतों का खिंचाव',
        'मासिक धर्म में ऐंठन / महिलाओं में पेल्विक दर्द'
      ],
      oftenMissedCauses: [
        'अपेंडिसाइटिस (दर्द जो नाभि के पास शुरू होकर पेट के निचले दाएं हिस्से में जाए)',
        'कोलेसिस्टिटिस / पित्ताशय की पथरी (तले-भुने भोजन के बाद ऊपरी दाएं हिस्से में तेज दर्द)',
        'गुर्दे की पथरी (पीठ से जांघ तक जाने वाला असहनीय ऐंठन वाला दर्द)',
        'पैन्क्रियाटाइटिस (पेट के ऊपरी हिस्से से सीधे पीठ में छेद जैसा दर्द)'
      ],
      emergencyRed: [
        'पेट छूने पर पत्थर जैसा कड़ा और अत्यधिक संवेदनशील होना',
        'पेट के निचले दाएं हिस्से में तेज नुकीला दर्द होना',
        'चमकीले लाल खून या कॉफी के रंग जैसी उल्टी होना',
        'काला तार जैसा मल (मेलेना) जो आंतरिक रक्तस्राव का संकेत है',
        'तेज दर्द के साथ तेज बुखार, चक्कर या बेहोशी आना'
      ],
      doctorSoonYellow: [
        'हल्का पेट दर्द जो 24 घंटे से अधिक समय तक बना रहे',
        'दर्द जो रात में गहरी नींद से जगा दे',
        'पिछले महीने में बिना प्रयास के अचानक वजन कम होना'
      ],
      safeSteps: [
        'घुटने मोड़कर एक करवट लेटकर आरामदायक स्थिति में आराम करें।',
        'हल्का गर्म पानी या पतला इलेक्ट्रोलाइट घोल घूंट-घूंट पिएं।',
        'दर्द ठीक होने तक ठोस, मसालेदार और चिकनाई युक्त भोजन से बचें।',
        'हल्की ऐंठन होने पर पेट पर गर्म पानी की थैली धीरे से रखें।'
      ],
      doNotDo: [
        'आइबुप्रोफेन या कॉम्बिफ्लेम जैसी दर्द निवारक दवाएं न लें (अल्सर बिगड़ सकता है)।',
        'अपेंडिक्स का संदेह होने पर जुलाब या पेट साफ करने की दवाएं न लें।',
        'डॉक्टर द्वारा जांच किए जाने से पहले भारी भोजन न करें।'
      ],
      specialGroups: 'प्रजनन आयु की महिलाओं में पेट के निचले हिस्से में अचानक तेज एकतरफा दर्द होने पर एक्टोपिक गर्भावस्था की जांच तुरंत करानी चाहिए।',
      drPratapInsight: '"डॉक्टर द्वारा पेट की जांच किए जाने से पहले कभी भी भारी दर्द निवारक दवाओं से पेट के दर्द को न दबाएं।"',
      practiceStory: 'एक कॉलेज छात्रा ने अपेंडिसाइटिस को सामान्य गैस समझा। उन्होंने दर्द निवारक नहीं लिया और समय पर डॉक्टर से जांच कराई, जिससे अपेंडिक्स फटने से पहले ही सुरक्षित सर्जरी हो सकी।',
      checklistItems: [
        { id: 'rightLower', label: 'निचले दाएं पेट में तेज दर्द', red: true },
        { id: 'rigidBelly', label: 'पेट का कड़ा या पत्थर जैसा होना', red: true },
        { id: 'bloodVomit', label: 'उल्टी में खून आना', red: true },
        { id: 'blackStool', label: 'काला या टार जैसा मल', red: true },
        { id: 'burningAcid', label: 'मसालेदार खाने के बाद जलन', red: false },
        { id: 'gasBloat', label: 'पेट फूलना और गैस', red: false }
      ]
    }
  }
};

// Aliases for MR, GU, BN, AR to fall back gracefully to HI/EN where localized
CLINICAL_CARDS_CATALOG_MULTILINGUAL.MR = CLINICAL_CARDS_CATALOG_MULTILINGUAL.HI;
CLINICAL_CARDS_CATALOG_MULTILINGUAL.GU = CLINICAL_CARDS_CATALOG_MULTILINGUAL.HI;
CLINICAL_CARDS_CATALOG_MULTILINGUAL.BN = CLINICAL_CARDS_CATALOG_MULTILINGUAL.HI;
CLINICAL_CARDS_CATALOG_MULTILINGUAL.AR = CLINICAL_CARDS_CATALOG_MULTILINGUAL.EN;

export function getLocalizedCard(cardId, lang = 'EN') {
  const langKey = CLINICAL_CARDS_CATALOG_MULTILINGUAL[lang] ? lang : 'EN';
  const catalog = CLINICAL_CARDS_CATALOG_MULTILINGUAL[langKey] || CLINICAL_CARDS_CATALOG_MULTILINGUAL.EN;
  return catalog[cardId] || CLINICAL_CARDS_CATALOG_MULTILINGUAL.EN[cardId] || catalog['H-032'];
}

export function getLocalizedCatalog(lang = 'EN') {
  const langKey = CLINICAL_CARDS_CATALOG_MULTILINGUAL[lang] ? lang : 'EN';
  return CLINICAL_CARDS_CATALOG_MULTILINGUAL[langKey] || CLINICAL_CARDS_CATALOG_MULTILINGUAL.EN;
}
