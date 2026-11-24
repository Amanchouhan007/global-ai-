/**
 * Central Demo Video Configuration
 * Manages demo video assets and localized video URLs across 5 languages.
 */
export const DEMO_VIDEOS = {
  EN: {
    language: 'English',
    nativeName: 'English',
    title: 'Health Orbit Pro™ — Platform Walkthrough & Symptom Triage (English)',
    available: true,
    thumbnail: '/assets/founder-video.jpg',
    videoUrl: '', // Local HTML5 / YouTube embed
    duration: '2:45 min',
    description: 'Learn how to describe symptoms, interpret the Red-Yellow-Green guide, and explore clinical health cards.'
  },
  HI: {
    language: 'Hindi',
    nativeName: 'हिंदी',
    title: 'हेल्थ ऑर्बिट प्रो™ — प्लेटफ़ॉर्म अवलोकन और लक्षण जाँच (हिंदी)',
    available: true,
    thumbnail: '/assets/founder-video.jpg',
    videoUrl: '',
    duration: '2:50 min',
    description: 'लक्षणों को सरल भाषा में दर्ज करना, रेड-येलो-ग्रीन ट्राइएज समझना और डॉक्टर परामर्श की तैयारी करना सीखें।'
  },
  MR: {
    language: 'Marathi',
    nativeName: 'मराठी',
    title: 'हेल्थ ऑर्बिट प्रो™ — प्लॅटफॉर्म मार्गदर्शन आणि लक्षण तपासणी (मराठी)',
    available: true,
    thumbnail: '/assets/founder-video.jpg',
    videoUrl: '',
    duration: '2:40 min',
    description: 'आपली लक्षणे तपासणे, धोक्याचे संकेत ओळखणे आणि कुटुंबासाठी सुरक्षित वैद्यकीय मार्गदर्शन मिळवणे.'
  },
  GU: {
    language: 'Gujarati',
    nativeName: 'ગુજરાતી',
    title: 'હેલ્થ ઓર્બિટ પ્રો™ — પ્લેટફોર્મ વિહંગાવલોકન અને લક્ષણ તપાસ (ગુજરાતી)',
    available: false, // Mark pending until localized audio/video is provided
    thumbnail: '/assets/founder-video.jpg',
    videoUrl: '',
    duration: '2:45 min (Pending Recording)',
    description: 'ગુજરાતી ભાષામાં વિડિઓ ટૂંક સમયમાં ઉપલબ્ધ થશે. ક્લિનિકલ સ્ક્રીપ્ટ મંજૂર કરવામાં આવી રહી છે.'
  },
  BN: {
    language: 'Bengali',
    nativeName: 'বাংলা',
    title: 'হেল্থ অরবিট প্রো™ — প্ল্যাটফর্ম নির্দেশিকা ও উপসর্গ মূল্যায়ন (বাংলা)',
    available: false, // Mark pending until localized audio/video is provided
    thumbnail: '/assets/founder-video.jpg',
    videoUrl: '',
    duration: '2:45 min (Coming Soon)',
    description: 'বাংলা ভাষার ভিডিও সংস্করণ শীঘ্রই আসছে। চিকিৎসকীয় ডাবিং ও রিভিউ চলছে।'
  },
  AR: {
    language: 'Arabic',
    nativeName: 'العربية',
    title: 'هيلث أوربت برو™ — جولة المنصة وتقييم الأعراض (العربية)',
    available: false, // Coming soon
    thumbnail: '/assets/founder-video.jpg',
    videoUrl: '',
    duration: '2:45 min (Coming Soon)',
    description: 'النسخة العربية من الفيديو التوضيحي قادمة قريباً بعد استكمال المراجعة السريرية والتعليق الصوتي.'
  }
};
