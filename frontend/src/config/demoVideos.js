/**
 * Central Demo Video Configuration - Health Orbit Pro™
 * High-definition multilingual AI avatar walkthrough & platform onboarding scripts.
 * Supports all 6 platform languages: Hindi, English, Marathi, Gujarati, Bengali, Arabic.
 */

export const ONBOARDING_SCENES = [
  {
    id: 1,
    title: 'Welcome & Mission',
    startTime: 0,
    endTime: 18,
    type: 'avatar_full',
    screenshot: '/assets/avatar_doctor_clinic_16x9.png',
    badge: 'Founder Welcome'
  },
  {
    id: 2,
    title: 'AI Symptom Checker',
    startTime: 18,
    endTime: 38,
    type: 'site_pip',
    screenshot: '/assets/video_scenes/scene2_symptom_checker.png',
    badge: 'Clinical Chat Assistant'
  },
  {
    id: 3,
    title: '1,000+ Health Cards',
    startTime: 38,
    endTime: 56,
    type: 'site_pip',
    screenshot: '/assets/video_scenes/scene3_health_cards.png',
    badge: 'Evidence-Based Library'
  },
  {
    id: 4,
    title: 'Personal & Family Health',
    startTime: 56,
    endTime: 74,
    type: 'site_pip',
    screenshot: '/assets/video_scenes/scene4_how_it_works.png',
    badge: 'Life-Stage Care'
  },
  {
    id: 5,
    title: 'Multilingual Selection',
    startTime: 74,
    endTime: 88,
    type: 'site_pip',
    screenshot: '/assets/video_scenes/scene1_hero_nav.png',
    badge: '6 Indian & Regional Languages'
  },
  {
    id: 6,
    title: 'DPDP Privacy & Clinical Safety',
    startTime: 88,
    endTime: 104,
    type: 'site_pip',
    screenshot: '/assets/video_scenes/scene5_dpdp_privacy.png',
    badge: 'DPDP Act 2023 & Triage'
  },
  {
    id: 7,
    title: 'Closing Guidance',
    startTime: 104,
    endTime: 115,
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
    title: 'हेल्थ ऑर्बिट प्रो™ — प्लेटफ़ॉर्म अवलोकन और लक्षण जाँच (हिंदी)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:55 min',
    description: 'डॉ. प्रताप मधुकर द्वारा हेल्थ ऑर्बिट प्रो का संपूर्ण वीडियो परिचय — लक्षण जाँच, हेल्थ कार्ड्स और क्लिनिकल सुरक्षा।',
    scriptLines: [
      { start: 0, end: 8, text: 'नमस्कार! Health Orbit Pro में आपका स्वागत है।' },
      { start: 8, end: 18, text: 'हमारा उद्देश्य मानव अनुभव, आर्टिफिशियल इंटेलिजेंस और मेडिकल जानकारी को एक साथ लाकर आपको स्वास्थ्य संबंधी बेहतर निर्णय लेने में सहायता करना है।' },
      { start: 18, end: 38, text: 'यदि आपको कोई स्वास्थ्य संबंधी परेशानी है, तो हमारे AI Symptom Checker में अपने लक्षण दर्ज करें और आसान भाषा में प्रारंभिक स्वास्थ्य मार्गदर्शन प्राप्त करें।' },
      { start: 38, end: 56, text: 'Health Cards की सहायता से आप विभिन्न बीमारियों, दवाइयों, लैब टेस्ट, खानपान और स्वास्थ्य संबंधी विषयों की जानकारी प्राप्त कर सकते हैं।' },
      { start: 56, end: 74, text: 'Personal Health और Family Health के माध्यम से महिलाओं, पुरुषों, बच्चों, युवाओं और वरिष्ठ नागरिकों के स्वास्थ्य से संबंधित जानकारी आसानी से खोज सकते हैं।' },
      { start: 74, end: 88, text: 'आप अपनी पसंदीदा भाषा का चयन करके स्वास्थ्य संबंधी जानकारी अपनी मातृभाषा में समझ सकते हैं।' },
      { start: 88, end: 104, text: 'ध्यान रखें, यह प्लेटफॉर्म स्वास्थ्य शिक्षा और प्रारंभिक मार्गदर्शन के लिए है। यह डॉक्टर की सलाह, मेडिकल जांच या उपचार का विकल्प नहीं है।' },
      { start: 104, end: 110, text: 'Health Orbit Pro — Where Human Experience Meets AI.' },
      { start: 110, end: 115, text: 'धन्यवाद! स्वस्थ रहें, सुरक्षित रहें।' }
    ]
  },
  EN: {
    code: 'EN',
    language: 'English',
    nativeName: 'English',
    locale: 'en-IN',
    dir: 'ltr',
    videoSrc: '/assets/videos/doctor-welcome-en.mp4',
    title: 'Health Orbit Pro™ — Platform Walkthrough & Clinical Triage (English)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:52 min',
    description: 'Dr. Pratap Madhukar introduces Health Orbit Pro — AI symptom triage, 1,000+ health cards, and patient privacy.',
    scriptLines: [
      { start: 0, end: 8, text: 'Hello and welcome to Health Orbit Pro!' },
      { start: 8, end: 18, text: 'Our mission is to bring together human clinical insight, artificial intelligence, and evidence-based medicine to empower you with clearer health decisions.' },
      { start: 18, end: 38, text: 'If you are experiencing any health concerns, simply describe your symptoms in our AI Symptom Checker for plain-language triage and initial guidance.' },
      { start: 38, end: 56, text: 'With our comprehensive Health Cards, explore verified information on conditions, medications, diagnostic lab tests, nutrition, and prevention.' },
      { start: 56, end: 74, text: 'Through Personal and Family Health portals, access specialized guidance curated for women, men, children, young adults, and senior citizens.' },
      { start: 74, end: 88, text: 'You can easily select your preferred language at any time to understand all medical guidance in your mother tongue.' },
      { start: 88, end: 104, text: 'Please note: this platform provides educational triage and guidance. It does not replace professional medical advice, clinical diagnosis, or emergency care.' },
      { start: 104, end: 110, text: 'Health Orbit Pro — Where Human Experience Meets AI.' },
      { start: 110, end: 115, text: 'Thank you! Stay healthy, stay safe.' }
    ]
  },
  MR: {
    code: 'MR',
    language: 'Marathi',
    nativeName: 'मराठी',
    locale: 'mr-IN',
    dir: 'ltr',
    videoSrc: '/assets/videos/doctor-welcome-mr.mp4',
    title: 'हेल्थ ऑर्बिट प्रो™ — प्लॅटफॉर्म मार्गदर्शन आणि लक्षण तपासणी (मराठी)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:54 min',
    description: 'डॉ. प्रताप मधुकर यांच्याकडून संपूर्ण मार्गदर्शन — लक्षण तपासणी, हेल्थ कार्ड्स आणि कौटुंबिक आरोग्य सुरक्षा.',
    scriptLines: [
      { start: 0, end: 8, text: 'नमस्कार! Health Orbit Pro मध्ये आपले मनःपूर्वक स्वागत आहे.' },
      { start: 8, end: 18, text: 'मानवी वैद्यकीय अनुभव, कृत्रिम बुद्धिमत्ता आणि अचूक माहिती एकत्र आणून योग्य आरोग्य निर्णय घेण्यास मदत करणे हा आमचा मुख्य उद्देश आहे.' },
      { start: 18, end: 38, text: 'आरोग्याची कोणतीही अडचण असल्यास, आमच्या AI सिम्प्टम चेकरमध्ये लक्षणे नोंदवा आणि सोप्या भाषेत प्राथमिक मार्गदर्शन मिळवा.' },
      { start: 38, end: 56, text: 'हेल्थ कार्ड्सच्या साहाय्याने विविध आजार, औषधे, लॅब चाचण्या आणि आहाराविषयी सविस्तर माहिती मिळवा.' },
      { start: 56, end: 74, text: 'पर्सनल आणि फॅमिली हेल्थद्वारे महिला, पुरुष, मुले आणि ज्येष्ठ नागरिकांच्या आरोग्याची माहिती सहज शोधा.' },
      { start: 74, end: 88, text: 'आपण आपल्या आवडीची भाषा निवडून सर्व माहिती आपल्या मातृभाषेत समजून घेऊ शकता.' },
      { start: 88, end: 104, text: 'लक्षात ठेवा, हे व्यासपीठ वैद्यकीय शिक्षणासाठी आहे. हा प्रत्यक्ष डॉक्टरांचा सल्ला किंवा उपचारांचा पर्याय नाही.' },
      { start: 104, end: 110, text: 'Health Orbit Pro — Where Human Experience Meets AI.' },
      { start: 110, end: 115, text: 'धन्यवाद! निरोगी राहा, सुरक्षित राहा.' }
    ]
  },
  GU: {
    code: 'GU',
    language: 'Gujarati',
    nativeName: 'ગુજરાતી',
    locale: 'gu-IN',
    dir: 'ltr',
    videoSrc: '/assets/videos/doctor-welcome-gu.mp4',
    title: 'હેલ્થ ઓર્બિટ પ્રો™ — પ્લેટફોર્મ વિહંગાવલોકન અને લક્ષણ તપાસ (ગુજરાતી)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:55 min',
    description: 'ડૉ. પ્રતાપ મધુકર દ્વારા હેલ્થ ઓર્બિટ પ્રોનો પરિચય — AI લક્ષણ તપાસ, હેલ્થ કાર્ડ્સ અને પારિવારિક સ્વાસ્થ્ય.',
    scriptLines: [
      { start: 0, end: 8, text: 'નમસ્કાર! Health Orbit Pro માં આપનું હાર્દિક સ્વાગત છે.' },
      { start: 8, end: 18, text: 'માનવીય તબીબી અનુભવ, આર્ટિફિશિયલ ઇન્ટેલિજન્સ અને પુરાવા-આધારિત જ્ઞાન સાથે સ્વાસ્થ્ય સંબંધિત શ્રેષ્ઠ નિર્ણયો લેવામાં સહાય કરીએ છીએ.' },
      { start: 18, end: 38, text: 'જો આપને કોઈ સ્વાસ્થ્ય સંબંધી તકલીફ હોય, તો અમારા AI સિમ્પટમ ચેકરમાં લક્ષણો દાખલ કરો અને સરળ ભાષામાં માર્ગદર્શન મેળવો.' },
      { start: 38, end: 56, text: 'હેલ્થ કાર્ડ્સની મદદથી આપ રોગો, દવાઓ, લેબ પરીક્ષણો અને આહારની વિસ્તૃત માહિતી મેળવી શકો છો.' },
      { start: 56, end: 74, text: 'પર્સનલ અને ફેમિલી હેલ્થ દ્વારા મહિલાઓ, પુરુષો, બાળકો અને વરિષ્ઠ નાગરિકો માટે વિશેષ માર્ગદર્શન મેળવો.' },
      { start: 74, end: 88, text: 'આપ પોતાની મનપસંદ ભાષા પસંદ કરીને બધી માહિતી પોતાની માતૃભાષામાં સમજી શકો છો.' },
      { start: 88, end: 104, text: 'ધ્યાન રાખો, આ પ્લેટફોર્મ સ્વાસ્થ્ય શિક્ષણ માટે છે. તે ડૉક્ટરની સલાહ, તપાસ કે સારવારનો વિકલ્પ નથી.' },
      { start: 104, end: 110, text: 'Health Orbit Pro — Where Human Experience Meets AI.' },
      { start: 110, end: 115, text: 'આભાર! સ્વસ્થ રહો, સુરક્ષિત રહો.' }
    ]
  },
  BN: {
    code: 'BN',
    language: 'Bengali',
    nativeName: 'বাংলা',
    locale: 'bn-IN',
    dir: 'ltr',
    videoSrc: '/assets/videos/doctor-welcome-bn.mp4',
    title: 'হেল্থ অরবিট প্রো™ — প্ল্যাটফর্ম নির্দেশিকা ও উপসর্গ মূল্যায়ন (বাংলা)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:53 min',
    description: 'ডাঃ প্রতাপ মধুকারের পরিচিতি — এআই লক্ষণ মূল্যায়ন, ১০০০+ হেলথ কার্ড এবং পারিবারিক স্বাস্থ্য সুরক্ষা।',
    scriptLines: [
      { start: 0, end: 8, text: 'নমস্কার! Health Orbit Pro-তে আপনাকে স্বাগতম।' },
      { start: 8, end: 18, text: 'চিকিৎসকদের মানবিক অভিজ্ঞতা, কৃত্রিম বুদ্ধিমত্তা এবং চিকিৎসাতথ্য একত্রিত করে সঠিক স্বাস্থ্য সিদ্ধান্ত নিতে সহায়তা করাই আমাদের লক্ষ্য।' },
      { start: 18, end: 38, text: 'শারীরিক উপসর্গ থাকলে, আমাদের AI সিম্পটম চেকারে তা উল্লেখ করুন এবং সহজ বাংলায় প্রাথমিক স্বাস্থ্য পরামর্শ পান।' },
      { start: 38, end: 56, text: 'হেলথ কার্ডসের মাধ্যমে বিভিন্ন রোগ, ওষুধ, ল্যাব টেস্ট ও পুষ্টি সংক্রান্ত নির্ভরযোগ্য তথ্য জেনে নিন।' },
      { start: 56, end: 74, text: 'পার্সোনাল ও ফ্যামিলি হেলথ বিভাগের মাধ্যমে নারী, পুরুষ, শিশু ও প্রবীণদের স্বাস্থ্য তথ্য সহজে সন্ধান করুন।' },
      { start: 74, end: 88, text: 'আপনি আপনার সুবিধাজনক ভাষা নির্বাচন করে মাতৃভাষায় সব তথ্য বুঝতে পারবেন।' },
      { start: 88, end: 104, text: 'মনে রাখবেন, এই প্ল্যাটফর্মটি স্বাস্থ্য শিক্ষার জন্য। এটি ডাক্তারের পরামর্শ বা চিকিৎসার বিকল্প নয়।' },
      { start: 104, end: 110, text: 'Health Orbit Pro — Where Human Experience Meets AI.' },
      { start: 110, end: 115, text: 'ধন্যবাদ! সুস্থ থাকুন, নিরাপদ থাকুন।' }
    ]
  },
  AR: {
    code: 'AR',
    language: 'Arabic',
    nativeName: 'العربية',
    locale: 'ar-SA',
    dir: 'rtl',
    videoSrc: '/assets/videos/doctor-welcome-ar.mp4',
    title: 'هيلث أوربت برو™ — جولة المنصة وتقييم الأعراض (العربية)',
    available: true,
    thumbnail: '/assets/avatar_doctor_clinic_16x9.png',
    duration: '1:56 min',
    description: 'جولة تعريفية بالذكاء الاصطناعي مع الدكتور براتاب مادوکار — تقييم الأعراض، البطاقات الصحية، والرعاية الأسرية.',
    scriptLines: [
      { start: 0, end: 8, text: 'مرحباً بكم في Health Orbit Pro!' },
      { start: 8, end: 18, text: 'هدفنا الجمع بين الخبرة الطبية والذكاء الاصطناعي لمساعدتكم في اتخاذ قرارات صحية أوضح وأكثر أماناً.' },
      { start: 18, end: 38, text: 'إذا كنتم تعانون من أي أعراض، استخدموا فاحص الأعراض بالذكاء الاصطناعي للحصول على توجيه أولي مبسط.' },
      { start: 38, end: 56, text: 'استكشفوا البطاقات الصحية لمعرفة معلومات موثوقة حول الحالات المرضية، الأدوية، والتحاليل المخبرية.' },
      { start: 56, end: 74, text: 'تتيح أقسام صحة الأسرة إرشادات مخصصة لصحة المرأة، الرجل، الأطفال، والمسنين بكل سهولة.' },
      { start: 74, end: 88, text: 'يمكنكم تغيير اللغة في أي وقت لمتابعة كافة الإرشادات بلغتكم المفضلة.' },
      { start: 88, end: 104, text: 'يرجى الملاحظة: هذه المنصة مخصصة للتثقيف الصحي وليست بديلاً عن الاستشارة الطبية المباشرة.' },
      { start: 104, end: 110, text: 'Health Orbit Pro — Where Human Experience Meets AI.' },
      { start: 110, end: 115, text: 'شكراً لكم! دمتم بصحة وأمان.' }
    ]
  }
};

/**
 * Robust helper to retrieve video config across case variations ('en', 'EN', 'Hi', etc.)
 */
export function getVideoData(langCode) {
  if (!langCode) return DEMO_VIDEOS.HI;
  const upper = String(langCode).toUpperCase();
  return DEMO_VIDEOS[upper] || DEMO_VIDEOS.HI;
}
