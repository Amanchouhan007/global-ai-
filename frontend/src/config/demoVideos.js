/**
 * Central Demo Video Configuration - Health Orbit Pro™
 * Verified Full 1080p Continuous Multi-Chapter Video Engine.
 * Supports all 6 platform languages: Hindi, English, Marathi, Gujarati, Bengali, Arabic.
 */

export const ONBOARDING_SCENES = [
  {
    id: 1,
    title: 'Welcome & Mission',
    startTime: 0.0,
    endTime: 17.36,
    type: 'avatar_full',
    screenshot: '/assets/avatar_doctor_clinic_16x9.png',
    badge: 'Founder Welcome'
  },
  {
    id: 2,
    title: 'AI Symptom Checker',
    startTime: 17.36,
    endTime: 28.72,
    type: 'site_pip',
    screenshot: '/assets/video_scenes/scene2_symptom_checker.png',
    badge: 'Clinical Chat Assistant'
  },
  {
    id: 3,
    title: '1,000+ Health Cards',
    startTime: 28.72,
    endTime: 40.56,
    type: 'site_pip',
    screenshot: '/assets/video_scenes/scene3_health_cards.png',
    badge: 'Evidence-Based Library'
  },
  {
    id: 4,
    title: 'Personal & Family Health',
    startTime: 40.56,
    endTime: 52.04,
    type: 'site_pip',
    screenshot: '/assets/video_scenes/scene4_how_it_works.png',
    badge: 'Life-Stage Care'
  },
  {
    id: 5,
    title: 'Multilingual Selection',
    startTime: 52.04,
    endTime: 60.52,
    type: 'site_pip',
    screenshot: '/assets/video_scenes/scene1_hero_nav.png',
    badge: '6 Indian & Regional Languages'
  },
  {
    id: 6,
    title: 'DPDP Privacy & Clinical Safety',
    startTime: 60.52,
    endTime: 74.0,
    type: 'site_pip',
    screenshot: '/assets/video_scenes/scene5_dpdp_privacy.png',
    badge: 'DPDP Act 2023 & Triage'
  },
  {
    id: 7,
    title: 'Closing Guidance',
    startTime: 74.0,
    endTime: 83.2,
    type: 'avatar_full',
    screenshot: '/assets/avatar_doctor_clinic_16x9.png',
    badge: 'Stay Healthy & Safe'
  }
];

export const DEMO_VIDEOS = {
  HI: {
    code: 'HI',
    language: 'Hindi',
    nativeName: 'हिंदी',
    locale: 'hi-IN',
    dir: 'ltr',
    videoSrc: '/assets/videos/doctor-welcome-hi.mp4',
    audioSrc: '/assets/audio_samples/sample_hi.mp3',
    title: 'हेल्थ ऑर्बिट प्रो™ — संपूर्ण प्लेटफ़ॉर्म व क्लिनिकल मार्गदर्शन (हिंदी)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:30 min',
    totalDurationSec: 90.8,
    description: 'डॉ. प्रताप मधुकर द्वारा हेल्थ ऑर्बिट प्रो का संपूर्ण वीडियो परिचय — लक्षण जाँच, 1000+ हेल्थ कार्ड्स और क्लिनिकल सुरक्षा।',
    chapters: [
      { id: 1, title: 'Welcome & Mission', startTime: 0.0, endTime: 20.96, duration: 20.96 },
      { id: 2, title: 'AI Symptom Checker', startTime: 20.96, endTime: 33.88, duration: 12.92 },
      { id: 3, title: '1,000+ Health Cards', startTime: 33.88, endTime: 45.48, duration: 11.6 },
      { id: 4, title: 'Personal & Family Health', startTime: 45.48, endTime: 58.4, duration: 12.92 },
      { id: 5, title: 'Multilingual Selection', startTime: 58.4, endTime: 67.4, duration: 9.0 },
      { id: 6, title: 'DPDP Privacy & Clinical Safety', startTime: 67.4, endTime: 80.84, duration: 13.44 },
      { id: 7, title: 'Closing Guidance', startTime: 80.84, endTime: 90.76, duration: 9.92 }
    ],
    scriptLines: [
      { start: 0.0, end: 20.96, text: 'नमस्कार! Health Orbit Pro में आपका स्वागत है। मैं हूँ डॉ. प्रताप मधुकर। हमारा उद्देश्य मानव अनुभव, आर्टिफिशियल इंटेलिजेंस और मेडिकल जानकारी को एक साथ लाकर आपको स्वास्थ्य संबंधी बेहतर निर्णय लेने में सहायता करना है।' },
      { start: 20.96, end: 33.88, text: 'यदि आपको कोई स्वास्थ्य संबंधी परेशानी है, तो हमारे AI Symptom Checker में अपने लक्षण दर्ज करें और आसान भाषा में प्रारंभिक स्वास्थ्य मार्गदर्शन प्राप्त करें।' },
      { start: 33.88, end: 45.48, text: 'Health Cards की सहायता से आप विभिन्न बीमारियों, दवाइयों, लैब टेस्ट, खानपान और स्वास्थ्य संबंधी विषयों की जानकारी प्राप्त कर सकते हैं।' },
      { start: 45.48, end: 58.4, text: 'Personal Health और Family Health के माध्यम से महिलाओं, पुरुषों, बच्चों, युवाओं और वरिष्ठ नागरिकों के स्वास्थ्य से संबंधित जानकारी आसानी से खोज सकते हैं।' },
      { start: 58.4, end: 67.4, text: 'आप अपनी पसंदीदा भाषा का चयन करके स्वास्थ्य संबंधी जानकारी अपनी मातृभाषा में समझ सकते हैं।' },
      { start: 67.4, end: 80.84, text: 'ध्यान रखें, यह प्लेटफॉर्म स्वास्थ्य शिक्षा और प्रारंभिक मार्गदर्शन के लिए है। यह डॉक्टर की सलाह, मेडिकल जांच या उपचार का विकल्प नहीं है।' },
      { start: 80.84, end: 90.76, text: 'Health Orbit Pro — Where Human Experience Meets AI. धन्यवाद! स्वस्थ रहें, सुरक्षित रहें।' }
    ]
  },
  EN: {
    code: 'EN',
    language: 'English',
    nativeName: 'English',
    locale: 'en-IN',
    dir: 'ltr',
    videoSrc: '/assets/videos/doctor-welcome-en.mp4',
    audioSrc: '/assets/audio_samples/sample_en.mp3',
    title: 'Health Orbit Pro™ — Platform Walkthrough & Clinical Triage (English)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:23 min',
    totalDurationSec: 83.24,
    description: 'Dr. Pratap Madhukar introduces Health Orbit Pro — AI symptom triage, 1,000+ health cards, life-stage care, and patient privacy.',
    chapters: [
      { id: 1, title: 'Welcome & Mission', startTime: 0.0, endTime: 17.36, duration: 17.36 },
      { id: 2, title: 'AI Symptom Checker', startTime: 17.36, endTime: 28.72, duration: 11.36 },
      { id: 3, title: '1,000+ Health Cards', startTime: 28.72, endTime: 40.56, duration: 11.84 },
      { id: 4, title: 'Personal & Family Health', startTime: 40.56, endTime: 52.04, duration: 11.48 },
      { id: 5, title: 'Multilingual Selection', startTime: 52.04, endTime: 60.52, duration: 8.48 },
      { id: 6, title: 'DPDP Privacy & Clinical Safety', startTime: 60.52, endTime: 74.0, duration: 13.48 },
      { id: 7, title: 'Closing Guidance', startTime: 74.0, endTime: 83.2, duration: 9.2 }
    ],
    scriptLines: [
      { start: 0.0, end: 17.36, text: 'Hello and welcome to Health Orbit Pro! I am Dr. Pratap Madhukar. Our mission is to bring together human clinical insight, artificial intelligence, and evidence-based medicine to empower you with clearer health decisions.' },
      { start: 17.36, end: 28.72, text: 'If you are experiencing any health concerns, simply describe your symptoms in our AI Symptom Checker for plain-language triage and initial guidance.' },
      { start: 28.72, end: 40.56, text: 'With our comprehensive Health Cards, explore verified information on conditions, medications, diagnostic lab tests, nutrition, and prevention.' },
      { start: 40.56, end: 52.04, text: 'Through Personal and Family Health portals, access specialized guidance curated for women, men, children, young adults, and senior citizens.' },
      { start: 52.04, end: 60.52, text: 'You can easily select your preferred language at any time to understand all medical guidance in your mother tongue.' },
      { start: 60.52, end: 74.0, text: 'Please note: this platform provides educational triage and guidance. It does not replace professional medical advice, clinical diagnosis, or emergency care.' },
      { start: 74.0, end: 83.2, text: 'Health Orbit Pro — Where Human Experience Meets AI. Thank you! Stay healthy, stay safe.' }
    ]
  },
  MR: {
    code: 'MR',
    language: 'Marathi',
    nativeName: 'मराठी',
    locale: 'mr-IN',
    dir: 'ltr',
    videoSrc: '/assets/videos/doctor-welcome-mr.mp4',
    audioSrc: '/assets/audio_samples/sample_mr.mp3',
    title: 'हेल्थ ऑर्बिट प्रो™ — प्लॅटफॉर्म मार्गदर्शन आणि लक्षण तपासणी (मराठी)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:16 min',
    totalDurationSec: 76.88,
    description: 'डॉ. प्रताप मधुकर यांच्याकडून संपूर्ण मार्गदर्शन — लक्षण तपासणी, हेल्थ कार्ड्स आणि कौटुंबिक आरोग्य सुरक्षा.',
    chapters: [
      { id: 1, title: 'Welcome & Mission', startTime: 0.0, endTime: 20.88, duration: 20.88 },
      { id: 2, title: 'AI Symptom Checker', startTime: 20.88, endTime: 31.28, duration: 10.4 },
      { id: 3, title: '1,000+ Health Cards', startTime: 31.28, endTime: 40.0, duration: 8.72 },
      { id: 4, title: 'Personal & Family Health', startTime: 40.0, endTime: 49.08, duration: 9.08 },
      { id: 5, title: 'Multilingual Selection', startTime: 49.08, endTime: 56.28, duration: 7.2 },
      { id: 6, title: 'DPDP Privacy & Clinical Safety', startTime: 56.28, endTime: 67.04, duration: 10.76 },
      { id: 7, title: 'Closing Guidance', startTime: 67.04, endTime: 76.84, duration: 9.8 }
    ],
    scriptLines: [
      { start: 0.0, end: 20.88, text: 'नमस्कार! Health Orbit Pro मध्ये आपले मनःपूर्वक स्वागत आहे. मी डॉ. प्रताप मधुकर. मानवी वैद्यकीय अनुभव, कृत्रिम बुद्धिमत्ता आणि अचूक माहिती एकत्र आणून योग्य आरोग्य निर्णय घेण्यास मदत करणे हा आमचा मुख्य उद्देश आहे.' },
      { start: 20.88, end: 31.28, text: 'आरोग्याची कोणतीही अडचण असल्यास, आमच्या AI सिम्प्टम चेकरमध्ये लक्षणे नोंदवा आणि सोप्या भाषेत प्राथमिक मार्गदर्शन मिळवा.' },
      { start: 31.28, end: 40.0, text: 'हेल्थ कार्ड्सच्या साहाय्याने विविध आजार, औषधे, लॅब चाचण्या आणि आहाराविषयी सविस्तर माहिती मिळवा.' },
      { start: 40.0, end: 49.08, text: 'पर्सनल आणि फॅमिली हेल्थद्वारे महिला, पुरुष, मुले आणि ज्येष्ठ नागरिकांच्या आरोग्याची माहिती सहज शोधा.' },
      { start: 49.08, end: 56.28, text: 'आपण आपल्या आवडीची भाषा निवडून सर्व माहिती आपल्या मातृभाषेत समजून घेऊ शकता.' },
      { start: 56.28, end: 67.04, text: 'लक्षात ठेवा, हे व्यासपीठ वैद्यकीय शिक्षणासाठी आहे. हा प्रत्यक्ष डॉक्टरांचा सल्ला किंवा उपचारांचा पर्याय नाही.' },
      { start: 67.04, end: 76.84, text: 'Health Orbit Pro — Where Human Experience Meets AI. धन्यवाद! निरोगी राहा, सुरक्षित राहा.' }
    ]
  },
  GU: {
    code: 'GU',
    language: 'Gujarati',
    nativeName: 'ગુજરાતી',
    locale: 'gu-IN',
    dir: 'ltr',
    videoSrc: '/assets/videos/doctor-welcome-gu.mp4',
    audioSrc: '/assets/audio_samples/sample_gu.mp3',
    title: 'હેલ્થ ઓર્બિટ પ્રો™ — પ્લેટફોર્મ વિહંગાવલોકન અને લક્ષણ તપાસ (ગુજરાતી)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:17 min',
    totalDurationSec: 77.12,
    description: 'ડૉ. પ્રતાપ મધુકર દ્વારા હેલ્થ ઓર્બિટ પ્રોનો પરિચય — AI લક્ષણ તપાસ, હેલ્થ કાર્ડ્સ અને પારિવારિક સ્વાસ્થ્ય.',
    chapters: [
      { id: 1, title: 'Welcome & Mission', startTime: 0.0, endTime: 20.6, duration: 20.6 },
      { id: 2, title: 'AI Symptom Checker', startTime: 20.6, endTime: 31.44, duration: 10.84 },
      { id: 3, title: '1,000+ Health Cards', startTime: 31.44, endTime: 40.24, duration: 8.8 },
      { id: 4, title: 'Personal & Family Health', startTime: 40.24, endTime: 49.24, duration: 9.0 },
      { id: 5, title: 'Multilingual Selection', startTime: 49.24, endTime: 57.16, duration: 7.92 },
      { id: 6, title: 'DPDP Privacy & Clinical Safety', startTime: 57.16, endTime: 67.64, duration: 10.48 },
      { id: 7, title: 'Closing Guidance', startTime: 67.64, endTime: 77.08, duration: 9.44 }
    ],
    scriptLines: [
      { start: 0.0, end: 20.6, text: 'નમસ્કાર! Health Orbit Pro માં આપનું હાર્દિક સ્વાગત છે. હું ડૉ. પ્રતાપ મધુકર છું. માનવીય તબીબી અનુભવ, આર્ટિફિશિયલ ઇન્ટેલિજન્સ અને પુરાવા-આધારિત જ્ઞાન સાથે સ્વાસ્થ્ય સંબંધિત શ્રેષ્ઠ નિર્ણયો લેવામાં સહાય કરીએ છીએ.' },
      { start: 20.6, end: 31.44, text: 'જો આપને કોઈ સ્વાસ્થ્ય સંબંધી તકલીફ હોય, તો અમારા AI સિમ્પટમ ચેકરમાં લક્ષણો દાખલ કરો અને સરળ ભાષામાં માર્ગદર્શન મેળવો.' },
      { start: 31.44, end: 40.24, text: 'હેલ્થ કાર્ડ્સની મદદથી આપ રોગો, દવાઓ, લેબ પરીક્ષણો અને આહારની વિસ્તૃત માહિતી મેળવી શકો છો.' },
      { start: 40.24, end: 49.24, text: 'પર્સનલ અને ફેમિલી હેલ્થ દ્વારા મહિલાઓ, પુરુષો, બાળકો અને વરિષ્ઠ નાગરિકો માટે વિશેષ માર્ગદર્શન મેળવો.' },
      { start: 49.24, end: 57.16, text: 'આપ પોતાની મનપસંદ ભાષા પસંદ કરીને બધી માહિતી પોતાની માતૃભાષામાં સમજી શકો છો.' },
      { start: 57.16, end: 67.64, text: 'ધ્યાન રાખો, આ પ્લેટફોર્મ સ્વાસ્થ્ય શિક્ષણ માટે છે. તે ડૉક્ટરની સલાહ, તપાસ કે સારવારનો વિકલ્પ નથી.' },
      { start: 67.64, end: 77.08, text: 'Health Orbit Pro — Where Human Experience Meets AI. આભાર! સ્વસ્થ રહો, સુરક્ષિત રહો.' }
    ]
  },
  BN: {
    code: 'BN',
    language: 'Bengali',
    nativeName: 'বাংলা',
    locale: 'bn-IN',
    dir: 'ltr',
    videoSrc: '/assets/videos/doctor-welcome-bn.mp4',
    audioSrc: '/assets/audio_samples/sample_bn.mp3',
    title: 'হেল্থ অরবিট প্রো™ — প্ল্যাটফর্ম নির্দেশিকা ও উপসর্গ মূল্যায়ন (বাংলা)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:05 min',
    totalDurationSec: 65.12,
    description: 'ডাঃ প্রতাপ মধুকারের পরিচিতি — এআই লক্ষণ মূল্যায়ন, ১০০০+ হেলথ কার্ড এবং পারিবারিক স্বাস্থ্য সুরক্ষা।',
    chapters: [
      { id: 1, title: 'Welcome & Mission', startTime: 0.0, endTime: 17.6, duration: 17.6 },
      { id: 2, title: 'AI Symptom Checker', startTime: 17.6, endTime: 26.92, duration: 9.32 },
      { id: 3, title: '1,000+ Health Cards', startTime: 26.92, endTime: 34.6, duration: 7.68 },
      { id: 4, title: 'Personal & Family Health', startTime: 34.6, endTime: 42.04, duration: 7.44 },
      { id: 5, title: 'Multilingual Selection', startTime: 42.04, endTime: 48.12, duration: 6.08 },
      { id: 6, title: 'DPDP Privacy & Clinical Safety', startTime: 48.12, endTime: 56.36, duration: 8.24 },
      { id: 7, title: 'Closing Guidance', startTime: 56.36, endTime: 65.08, duration: 8.72 }
    ],
    scriptLines: [
      { start: 0.0, end: 17.6, text: 'নমস্কার! Health Orbit Pro-তে আপনাকে স্বাগতম। আমি ডাঃ প্রতাপ মধুকার। চিকিৎসকদের মানবিক অভিজ্ঞতা, কৃত্রিম বুদ্ধিমত্তা এবং চিকিৎসাতথ্য একত্রিত করে সঠিক স্বাস্থ্য সিদ্ধান্ত নিতে সহায়তা করাই আমাদের লক্ষ্য।' },
      { start: 17.6, end: 26.92, text: 'শারীরিক উপসর্গ থাকলে, আমাদের AI সিম্পটম চেকারে তা উল্লেখ করুন এবং সহজ বাংলায় প্রাথমিক স্বাস্থ্য পরামর্শ পান।' },
      { start: 26.92, end: 34.6, text: 'হেলথ কার্ডসের মাধ্যমে বিভিন্ন রোগ, ওষুধ, ল্যাব টেস্ট ও পুষ্টি সংক্রান্ত নির্ভরযোগ্য তথ্য জেনে নিন।' },
      { start: 34.6, end: 42.04, text: 'পার্সোনাল ও ফ্যামিলি হেলথ বিভাগের মাধ্যমে নারী, पुरुष, শিশু ও প্রবীণদের স্বাস্থ্য তথ্য সহজে সন্ধান করুন।' },
      { start: 42.04, end: 48.12, text: 'আপনি আপনার সুবিধাজনক ভাষা নির্বাচন করে মাতৃভাষায় সব তথ্য বুঝতে পারবেন।' },
      { start: 48.12, end: 56.36, text: 'মনে রাখবেন, এই প্ল্যাটফর্মটি স্বাস্থ্য শিক্ষার জন্য। এটি ডাক্তারের পরামর্শ বা চিকিৎসার বিকল্প নয়।' },
      { start: 56.36, end: 65.08, text: 'Health Orbit Pro — Where Human Experience Meets AI. ধন্যবাদ! সুস্থ থাকুন, নিরাপদ থাকুন।' }
    ]
  },
  AR: {
    code: 'AR',
    language: 'Arabic',
    nativeName: 'العربية',
    locale: 'ar-SA',
    dir: 'rtl',
    videoSrc: '/assets/videos/doctor-welcome-ar.mp4',
    audioSrc: '/assets/audio_samples/sample_ar.mp3',
    title: 'هيلث أوربت برو™ — جولة المنصة وتقييم الأعراض (العربية)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:09 min',
    totalDurationSec: 69.88,
    description: 'جولة تعريفية بالذكاء الاصطناعي مع الدكتور براتاب مادوکار — تقييم الأعراض، البطاقات الصحية، والرعاية الأسرية.',
    chapters: [
      { id: 1, title: 'Welcome & Mission', startTime: 0.0, endTime: 15.36, duration: 15.36 },
      { id: 2, title: 'AI Symptom Checker', startTime: 15.36, endTime: 24.92, duration: 9.56 },
      { id: 3, title: '1,000+ Health Cards', startTime: 24.92, endTime: 34.4, duration: 9.48 },
      { id: 4, title: 'Personal & Family Health', startTime: 34.4, endTime: 44.36, duration: 9.96 },
      { id: 5, title: 'Multilingual Selection', startTime: 44.36, endTime: 51.4, duration: 7.04 },
      { id: 6, title: 'DPDP Privacy & Clinical Safety', startTime: 51.4, endTime: 60.4, duration: 9.0 },
      { id: 7, title: 'Closing Guidance', startTime: 60.4, endTime: 69.84, duration: 9.44 }
    ],
    scriptLines: [
      { start: 0.0, end: 15.36, text: 'مرحباً بكم في Health Orbit Pro! أنا الدكتور براتاب مادوکار. نجمع بين الخبرة الطبية والذكاء الاصطناعي لمساعدتكم في اتخاذ قرارات صحية أوضح وأكثر أماناً.' },
      { start: 15.36, end: 24.92, text: 'إذا كنتم تعانون من أي أعراض، استخدموا فاحص الأعراض بالذكاء الاصطناعي للحصول على توجيه أولي مبسط.' },
      { start: 24.92, end: 34.4, text: 'استكشفوا البطاقات الصحية لمعرفة معلومات موثوقة حول الحالات المرضية، الأدوية، والتحاليل المخبرية.' },
      { start: 34.4, end: 44.36, text: 'تتيح أقسام صحة الأسرة إرشادات مخصصة لصحة المرأة، الرجل، الأطفال، والمسنين بكل سهولة.' },
      { start: 44.36, end: 51.4, text: 'يمكنكم تغيير اللغة في أي وقت لمتابعة كافة الإرشادات بلغتكم المفضلة.' },
      { start: 51.4, end: 60.4, text: 'يرجى الملاحظة: هذه المنصة مخصصة للتثقيف الصحي وليست بديلاً عن الاستشارة الطبية المباشرة.' },
      { start: 60.4, end: 69.84, text: 'Health Orbit Pro — Where Human Experience Meets AI. شكراً لكم! دمتم بصحة وأمان.' }
    ]
  },
};

/**
 * Robust helper to retrieve video config across case variations ('en', 'EN', 'Hi', etc.)
 */
export function getVideoData(langCode) {
  if (!langCode) return DEMO_VIDEOS.HI;
  const upper = String(langCode).toUpperCase();
  return DEMO_VIDEOS[upper] || DEMO_VIDEOS.HI;
}