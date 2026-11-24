/**
 * Comprehensive 5-Language Translation Dictionary
 * Languages: English (EN), Hindi (HI), Marathi (MR), Gujarati (GU), Bengali (BN)
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'EN', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'HI', name: 'Hindi', nativeName: 'हिंदी', dir: 'ltr' },
  { code: 'MR', name: 'Marathi', nativeName: 'मराठी', dir: 'ltr' },
  { code: 'GU', name: 'Gujarati', nativeName: 'ગુજરાતી', dir: 'ltr' },
  { code: 'BN', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' },
  { code: 'AR', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' }
];

export const TRANSLATIONS = {
  EN: {
    nav: {
      home: 'Home',
      symptomChecker: 'Symptom Checker',
      categories: 'Categories',
      healthCards: 'Health Cards (1,000)',
      forDoctors: 'For Doctors',
      forPharmacists: 'For Pharmacists',
      resources: 'Resources',
      about: 'About',
      signIn: 'Sign In',
      disclaimer: 'Disclaimer'
    },
    hero: {
      badge: "India's Own Co-Intelligence Healthcare AI",
      headline: 'Where Human Experience Meets AI.',
      formulaHuman: 'Human Insight',
      formulaAI: 'Artificial Intelligence',
      formulaEvidence: 'Medical Evidence',
      formulaOutcome: 'Clearer Health Decisions',
      doctorExperience: '38 Years of Clinical Experience',
      startBtn: 'Start Symptom Assessment',
      exploreBtn: 'Explore 12 Specialties'
    },
    insights: {
      title: "Dr. Pratap's Clinical Insights",
      subtitle: 'Paste your Google or AI answer and get expert insights, latest research and a clear, practical guide.',
      placeholder: 'Paste your Google or AI health answer here, or type your symptom...',
      submitBtn: 'Get Clinical Insights',
      voiceSearch: 'Voice Search',
      uploadReport: 'Upload Report'
    },
    categories: {
      title: 'Explore by Category',
      viewAll: 'View All Categories',
      mySymptoms: 'My Symptoms',
      myPersonalHealth: 'My Personal Health',
      myFamily: 'My Family',
      myParenting: 'My Parenting',
      myFood: 'My Food',
      myMind: 'My Mind',
      mySleep: 'My Sleep',
      myBeauty: 'My Beauty',
      myLabTests: 'My Lab Tests',
      myMedicines: 'My Medicines'
    },
    disclaimer: {
      title: 'Clinical & Healthcare Disclaimer',
      bannerText: 'Global & regional medical information. Not a substitute for professional clinical advice.',
      body: 'Health Orbit Pro™ provides educational symptom guidance and clinical risk triage. It is not a licensed hospital, medical diagnostic laboratory, or substitute for in-person consultation with a qualified doctor. If you are experiencing a life-threatening emergency, call 108 / 112 (India) or 911 (US) immediately.',
      ackBtn: 'I Understand & Acknowledge'
    },
    freeAccess: {
      badge: '100% Free Public Health Intelligence',
      title: 'Accessible Family Health Without Commercial Barriers',
      desc: 'All 1,000 clinical health cards and symptom assessments are free for every citizen. No hidden subscriptions, no fees.'
    },
    dpdp: {
      badge: 'DPDP Act 2023 Aligned',
      title: 'Digital Personal Data Protection & Privacy',
      desc: 'Your health queries in guest mode remain session-isolated in your browser. We never monetize or sell personal health inquiries.',
      consentStatus: 'Current Session Consent: Active (Educational Guidance Only)',
      withdrawBtn: 'Withdraw Local Consent'
    },
    feedback: {
      title: 'Share Your Clinical Experience & Feedback',
      subtitle: 'Help Dr. Pratap and our medical review board improve health guidance accuracy.',
      typeLabel: 'Feedback Category',
      ratingLabel: 'Overall Rating',
      msgLabel: 'Your Comments or Suggestions',
      emailLabel: 'Email Address (Optional)',
      submitBtn: 'Submit Patient Feedback',
      successMsg: 'Thank you! Your feedback has been recorded for clinical quality review.'
    },
    age: {
      title: 'Age Verification & Clinical Guidance Scope',
      desc: 'Health Orbit Pro™ is designed for individuals aged 18 and older, or minors under parental/guardian supervision.',
      confirm18: 'I am 18 years of age or older',
      parental: 'I am a parent or legal guardian accessing on behalf of a minor',
      btn: 'Confirm & Continue'
    }
  },
  HI: {
    nav: {
      home: 'होम',
      symptomChecker: 'लक्षण जाँच',
      categories: 'श्रेणियाँ',
      healthCards: 'हेल्थ कार्ड्स (1,000)',
      forDoctors: 'डॉक्टरों के लिए',
      forPharmacists: 'फार्मासिस्ट के लिए',
      resources: 'संसाधन',
      about: 'परिचय',
      signIn: 'साइन इन',
      disclaimer: 'अस्वीकरण'
    },
    hero: {
      badge: 'भारत का अपना को-इंटेलिजेंस हेल्थकेयर एआई',
      headline: 'जहाँ मानवीय अनुभव और एआई का संगम होता है।',
      formulaHuman: 'मानवीय समझ',
      formulaAI: 'आर्टिफिशियल इंटेलिजेंस',
      formulaEvidence: 'चिकित्सीय प्रमाण',
      formulaOutcome: 'स्पष्ट स्वास्थ्य निर्णय',
      doctorExperience: '38 वर्षों का नैदानिक अनुभव',
      startBtn: 'लक्षण मूल्यांकन शुरू करें',
      exploreBtn: '12 विशेषज्ञताएँ देखें'
    },
    insights: {
      title: 'डॉ. प्रताप के नैदानिक अंतर्दृष्टि',
      subtitle: 'अपना गूगल या एआई उत्तर यहाँ पेस्ट करें और विशेषज्ञ अंतर्दृष्टि, नवीनतम शोध व स्पष्ट गाइड प्राप्त करें।',
      placeholder: 'अपना गूगल या एआई स्वास्थ्य उत्तर यहाँ पेस्ट करें, या लक्षण लिखें...',
      submitBtn: 'क्लिनिकल इनसाइट्स पाएँ',
      voiceSearch: 'वॉइस सर्च',
      uploadReport: 'रिपोर्ट अपलोड'
    },
    categories: {
      title: 'श्रेणी अनुसार अन्वेषण करें',
      viewAll: 'सभी श्रेणियाँ देखें',
      mySymptoms: 'मेरे लक्षण',
      myPersonalHealth: 'मेरा व्यक्तिगत स्वास्थ्य',
      myFamily: 'मेरा परिवार',
      myParenting: 'मेरी पेरेंटिंग',
      myFood: 'मेरा भोजन व पोषण',
      myMind: 'मेरा मन व तनाव',
      mySleep: 'मेरी नींद',
      myBeauty: 'मेरी सुंदरता व त्वचा',
      myLabTests: 'मेरी लैब जाँच',
      myMedicines: 'मेरी दवाइयाँ'
    },
    disclaimer: {
      title: 'नैदानिक एवं स्वास्थ्य अस्वीकरण',
      bannerText: 'स्वास्थ्य शिक्षा व मार्गदर्शन। यह पेशेवर चिकित्सकीय सलाह का विकल्प नहीं है।',
      body: 'हेल्थ ऑर्बिट प्रो™ शैक्षिक लक्षण मार्गदर्शन और नैदानिक जोखिम वर्गीकरण प्रदान करता है। यह अस्पताल, प्रयोगशाला या डॉक्टर के व्यक्तिगत परामर्श का विकल्प नहीं है। आपात स्थिति में तुरंत 108 या 112 पर कॉल करें।',
      ackBtn: 'मैं समझता/समझती हूँ और स्वीकार करता/करती हूँ'
    },
    freeAccess: {
      badge: '100% निःशुल्क सार्वजनिक स्वास्थ्य बुद्धि',
      title: 'बिना किसी व्यावसायिक बाधा के सुलभ पारिवारिक स्वास्थ्य',
      desc: 'सभी 1,000 स्वास्थ्य कार्ड और लक्षण मूल्यांकन सभी नागरिकों के लिए पूरी तरह निःशुल्क हैं। कोई छिपा शुल्क नहीं।'
    },
    dpdp: {
      badge: 'डीपीडीपी अधिनियम 2023 अनुरूप',
      title: 'डिजिटल व्यक्तिगत डेटा संरक्षण एवं गोपनीयता',
      desc: 'गेस्ट मोड में आपकी स्वास्थ्य संबंधी पूछताछ केवल आपके ब्राउज़र में सुरक्षित रहती है। हम कभी भी डेटा नहीं बेचते।',
      consentStatus: 'सत्र सहमति: सक्रिय (केवल शैक्षिक मार्गदर्शन)',
      withdrawBtn: 'सहमति वापस लें'
    },
    feedback: {
      title: 'अपना नैदानिक अनुभव व प्रतिक्रिया साझा करें',
      subtitle: 'डॉ. प्रताप और हमारे मेडिकल बोर्ड को मार्गदर्शन सटीकता बेहतर बनाने में सहायता करें।',
      typeLabel: 'प्रतिक्रिया श्रेणी',
      ratingLabel: 'समग्र रेटिंग',
      msgLabel: 'आपकी टिप्पणी या सुझाव',
      emailLabel: 'ईमेल (वैकल्पिक)',
      submitBtn: 'प्रतिक्रिया जमा करें',
      successMsg: 'धन्यवाद! आपकी प्रतिक्रिया गुणवत्ता समीक्षा के लिए दर्ज कर ली गई है।'
    },
    age: {
      title: 'आयु सत्यापन एवं मार्गदर्शन दायरा',
      desc: 'हेल्थ ऑर्बिट प्रो™ 18 वर्ष या उससे अधिक आयु के व्यक्तियों, अथवा अभिभावक की देखरेख में उपयोग के लिए है।',
      confirm18: 'मेरी आयु 18 वर्ष या उससे अधिक है',
      parental: 'मैं अभिभावक के रूप में नाबालिग की ओर से उपयोग कर रहा/रही हूँ',
      btn: 'पुष्टि करें और आगे बढ़ें'
    }
  },
  MR: {
    nav: {
      home: 'मुख्यपृष्ठ',
      symptomChecker: 'लक्षण तपासणी',
      categories: 'वर्गवारी',
      healthCards: 'हेल्थ कार्ड्स (1,000)',
      forDoctors: 'डॉक्टरांसाठी',
      forPharmacists: 'फार्मासिस्टसाठी',
      resources: 'संसाधने',
      about: 'माहिती',
      signIn: 'साइन इन',
      disclaimer: 'अस्वीकरण'
    },
    hero: {
      badge: 'भारताचे स्वतःचे सह-बुद्धिमत्ता आरोग्य एआय',
      headline: 'जेथे मानवी अनुभव आणि एआय एकत्र येतात.',
      formulaHuman: 'मानवी अनुभव',
      formulaAI: 'कृत्रिम बुद्धिमत्ता',
      formulaEvidence: 'वैद्यकीय पुरावा',
      formulaOutcome: 'स्पष्ट आरोग्य निर्णय',
      doctorExperience: '38 वर्षांचा क्लिनिकल अनुभव',
      startBtn: 'लक्षण मूल्यांकन सुरू करा',
      exploreBtn: '12 विभाग एक्सप्लोर करा'
    },
    insights: {
      title: 'डॉ. प्रताप यांचे क्लिनिकल इनसाइट्स',
      subtitle: 'आपले गुगल किंवा एआय उत्तर येथे पेस्ट करा आणि तज्ज्ञांचे मार्गदर्शन व स्पष्ट व्यावहारिक माहिती मिळवा.',
      placeholder: 'आपले गुगल किंवा एआय उत्तर येथे पेस्ट करा किंवा लक्षण लिहा...',
      submitBtn: 'क्लिनिकल इनसाइट्स मिळवा',
      voiceSearch: 'व्हॉइस सर्च',
      uploadReport: 'रिपोर्ट अपलोड'
    },
    categories: {
      title: 'वर्गवारीनुसार एक्सप्लोर करा',
      viewAll: 'सर्व वर्गवारी पहा',
      mySymptoms: 'माझी लक्षणे',
      myPersonalHealth: 'माझे वैयक्तिक आरोग्य',
      myFamily: 'माझे कुटुंब',
      myParenting: 'माझे पालकत्व',
      myFood: 'माझे अन्न व पोषण',
      myMind: 'माझे मन व भावना',
      mySleep: 'माझी झोप',
      myBeauty: 'माझे सौंदर्य व त्वचा',
      myLabTests: 'माझ्या लॅब चाचण्या',
      myMedicines: 'माझी औषधे'
    },
    disclaimer: {
      title: 'वैद्यकीय अस्वीकरण व मार्गदर्शन',
      bannerText: 'आरोग्य शिक्षण व मार्गदर्शन. हे डॉक्टरांच्या प्रत्यक्ष सल्ल्याचा पर्याय नाही.',
      body: 'हेल्थ ऑर्बिट प्रो™ शैक्षणिक लक्षण मार्गदर्शन देते. ही कोणतीही वैद्यकीय प्रयोगशाळा किंवा डॉक्टरांच्या तपासणीचा पर्याय नाही. आपत्कालीन परिस्थितीत त्वरित 108 वर संपर्क साधा.',
      ackBtn: 'मला समजले आणि मी मान्य करतो/करते'
    },
    freeAccess: {
      badge: '100% मोफत सार्वजनिक आरोग्य बुद्धिमत्ता',
      title: 'कोणत्याही व्यावसायिक अडथळ्यांशिवाय कौटुंबिक आरोग्य',
      desc: 'सर्व 1,000 आरोग्य कार्ड्स आणि लक्षण मूल्यांकन नागरिकांसाठी पूर्णपणे मोफत आहेत.'
    },
    dpdp: {
      badge: 'डीपीडीपी कायदा 2023 सुसंगत',
      title: 'डिजिटल वैयक्तिक डेटा संरक्षण व गोपनीयता',
      desc: 'गेस्ट मोडमधील आपली माहिती ब्राउझरमध्येच सुरक्षित राहते. आम्ही कधीही वैयक्तिक डेटा विकत नाही.',
      consentStatus: 'सत्र संमती: सक्रिय (केवळ शैक्षणिक मार्गदर्शन)',
      withdrawBtn: 'संमती मागे घ्या'
    },
    feedback: {
      title: 'आपला अनुभव व अभिप्राय नोंदवा',
      subtitle: 'डॉ. प्रताप आणि आमच्या वैद्यकीय मंडळाला मार्गदर्शन अधिक अचूक बनवण्यासाठी मदत करा.',
      typeLabel: 'अभिप्रायाचा प्रकार',
      ratingLabel: 'एकूण रेटिंग',
      msgLabel: 'आपल्या प्रतिक्रिया किंवा सूचना',
      emailLabel: 'ईमेल (पर्यायी)',
      submitBtn: 'अभिप्राय पाठवा',
      successMsg: 'धन्यवाद! आपला अभिप्राय गुणवत्ता तपासणीसाठी नोंदवला गेला आहे.'
    },
    age: {
      title: 'वय पडताळणी व मार्गदर्शन व्याप्ती',
      desc: 'हेल्थ ऑर्बिट प्रो™ 18 वर्षे व त्यावरील व्यक्तींसाठी अथवा पालकांच्या देखरेखीखाली वापरासाठी आहे.',
      confirm18: 'माझे वय 18 वर्षे किंवा त्याहून अधिक आहे',
      parental: 'मी पालकाच्या भूमिकेतून वापर करत आहे',
      btn: 'पुष्टी करा आणि पुढे जा'
    }
  },
  GU: {
    nav: {
      home: 'હોમ',
      symptomChecker: 'લક્ષણ તપાસ',
      categories: 'શ્રેણીઓ',
      healthCards: 'હેલ્થ કાર્ડ્સ (1,000)',
      forDoctors: 'ડૉક્ટરો માટે',
      forPharmacists: 'ફાર્માસિસ્ટ માટે',
      resources: 'સંસાધનો',
      about: 'વિશે',
      signIn: 'સાઇન ઇન',
      disclaimer: 'ડિસ્ક્લેમર'
    },
    hero: {
      badge: 'ભારતનું પોતાનું કો-ઇન્ટેલિજન્સ હેલ્થકેર AI',
      headline: 'જ્યાં માનવીય અનુભવ અને AI નું મિલન થાય છે.',
      formulaHuman: 'માનવીય સૂઝ',
      formulaAI: 'આર્ટિફિશિયલ ઇન્ટેલિજન્સ',
      formulaEvidence: 'તબીબી પુરાવા',
      formulaOutcome: 'સ્પષ્ટ આરોગ્ય નિર્ણયો',
      doctorExperience: '38 વર્ષનો ક્લિનિકલ અનુભવ',
      startBtn: 'લક્ષણ મૂલ્યાંકન શરૂ કરો',
      exploreBtn: '12 વિશેષતાઓ જુઓ'
    },
    insights: {
      title: 'ડૉ. પ્રતાપની ક્લિનિકલ ઇનસાઇટ્સ',
      subtitle: 'તમારો ગુગલ અથવા AI ઉત્તર અહીં પેસ્ટ કરો અને નિષ્ણાતોના મંતવ્યો, નવીનતમ સંશોધન મેળવો.',
      placeholder: 'તમારો ગુગલ અથવા AI આરોગ્ય જવાબ અહીં પેસ્ટ કરો, અથવા લક્ષણ લખો...',
      submitBtn: 'ક્લિનિકલ ઇનસાઇટ્સ મેળવો',
      voiceSearch: 'વૉઇસ સર્ચ',
      uploadReport: 'રિપોર્ટ અપલોડ'
    },
    categories: {
      title: 'શ્રેણી પ્રમાણે શોધો',
      viewAll: 'બધી શ્રેણીઓ જુઓ',
      mySymptoms: 'મારા લક્ષણો',
      myPersonalHealth: 'મારું અંગત સ્વાસ્થ્ય',
      myFamily: 'મારું પરિવાર',
      myParenting: 'મારી પેરેન્ટિંગ',
      myFood: 'મારો ખોરાક અને પોષણ',
      myMind: 'મારું મન અને લાગણીઓ',
      mySleep: 'મારી ઊંઘ',
      myBeauty: 'મારું સૌંદર્ય અને ત્વચા',
      myLabTests: 'મારી લેબ ટેસ્ટ',
      myMedicines: 'મારી દવાઓ'
    },
    disclaimer: {
      title: 'તબીબી અને આરોગ્ય ડિસ્ક્લેમર',
      bannerText: 'આરોગ્ય શિક્ષણ અને માર્ગદર્શન. વ્યાવસાયિક તબીબી સલાહનો વિકલ્પ નથી.',
      body: 'હેલ્થ ઓર્બિટ પ્રો™ શૈક્ષણિક લક્ષણ માર્ગદર્શન પૂરું પાડે છે. તે તબીબી નિદાન અથવા ડૉક્ટરની મુલાકાતનો વિકલ્પ નથી. કટોકટીમાં તાત્કાલિક 108 પર સંપર્ક કરો.',
      ackBtn: 'હું સમજું છું અને સ્વીકારું છું'
    },
    freeAccess: {
      badge: '100% મફત જાહેર આરોગ્ય ઇન્ટેલિજન્સ',
      title: 'કોઈપણ વ્યાપારી અવરોધ વિના સુલભ કૌટુંબિક સ્વાસ્થ્ય',
      desc: 'તમામ 1,000 હેલ્થ કાર્ડ અને લક્ષણ મૂલ્યાંકન તમામ નાગરિકો માટે તદ્દન મફત છે.'
    },
    dpdp: {
      badge: 'DPDP એક્ટ 2023 સંરેખિત',
      title: 'ડિજિટલ પર્સનલ ડેટા પ્રોટેક્શન અને ગોપનીયતા',
      desc: 'ગેસ્ટ મોડમાં તમારી માહિતી ફક્ત તમારા બ્રાઉઝરમાં સુરક્ષિત રહે છે. અમે ક્યારેય ડેટા વેચતા નથી.',
      consentStatus: 'સત્ર સંમતિ: સક્રિય (માત્ર શૈક્ષણિક માર્ગદર્શન)',
      withdrawBtn: 'સ્થાનિક સંમતિ પાછી ખેંચો'
    },
    feedback: {
      title: 'તમારો ક્લિનિકલ અનુભવ અને પ્રતિસાદ શેર કરો',
      subtitle: 'ડૉ. પ્રતાપ અને અમારા મેડિકલ બોર્ડને માર્ગદર્શનની ચોકસાઈ સુધારવામાં મદદ કરો.',
      typeLabel: 'પ્રતિસાદ શ્રેણી',
      ratingLabel: 'એકંદર રેટિંગ',
      msgLabel: 'તમારી ટિપ્પણીઓ અથવા સૂચનો',
      emailLabel: 'ઇમેઇલ (વૈકલ્પિક)',
      submitBtn: 'દર્દી પ્રતિસાદ સબમિટ કરો',
      successMsg: 'આભાર! તમારી ગુણવત્તા સમીક્ષા માટે પ્રતિસાદ નોંધવામાં આવ્યો છે.'
    },
    age: {
      title: 'ઉંમર ચકાસણી અને માર્ગદર્શન મર્યાદા',
      desc: 'હેલ્થ ઓર્બિટ પ્રો™ 18 વર્ષ કે તેથી વધુ વયના લોકો માટે અથવા વાલીઓની દેખરેખ હેઠળ વાપરવા માટે છે.',
      confirm18: 'મારી ઉંમર 18 વર્ષ કે તેથી વધુ છે',
      parental: 'હું વાલી તરીકે સગીર વતી ઉપયોગ કરું છું',
      btn: 'પુષ્ટિ કરો અને આગળ વધો'
    }
  },
  BN: {
    nav: {
      home: 'হোম',
      symptomChecker: 'উপসর্গ পরীক্ষক',
      categories: 'বিভাগসমূহ',
      healthCards: 'হেলথ কার্ড (১,০০০)',
      forDoctors: 'চিকিৎসকদের জন্য',
      forPharmacists: 'ফার্মাসিস্টদের জন্য',
      resources: 'সম্পদ',
      about: 'পরিচিতি',
      signIn: 'সাইন ইন',
      disclaimer: 'দাবিত্যাগ'
    },
    hero: {
      badge: 'ভারতের নিজস্ব কো-ইন্টেলিজেন্স হেলথকেয়ার AI',
      headline: 'যেখানে মানুষের অভিজ্ঞতা এবং AI মিলিত হয়।',
      formulaHuman: 'মানবিক অন্তর্দৃষ্টি',
      formulaAI: 'কৃত্রিম বুদ্ধিমত্তা',
      formulaEvidence: 'চিকিৎসা প্রমাণ',
      formulaOutcome: 'সুস্পষ্ট স্বাস্থ্য সিদ্ধান্ত',
      doctorExperience: '৩৮ বছরের ক্লিনিক্যাল অভিজ্ঞতা',
      startBtn: 'উপসর্গ মূল্যায়ন শুরু করুন',
      exploreBtn: '১২টি বিভাগ অন্বেষণ করুন'
    },
    insights: {
      title: 'ডাঃ প্রতাপের ক্লিনিক্যাল অন্তর্দৃষ্টি',
      subtitle: 'আপনার গুগল বা AI উত্তর এখানে পেস্ট করুন এবং বিশেষজ্ঞদের মতামত ও ব্যবহারিক গাইড পান।',
      placeholder: 'আপনার গুগল বা AI স্বাস্থ্য উত্তর এখানে পেস্ট করুন, অথবা উপসর্গ লিখুন...',
      submitBtn: 'ক্লিনিক্যাল অন্তর্দৃষ্টি পান',
      voiceSearch: 'ভয়েস সার্চ',
      uploadReport: 'রিপোর্ট আপলোড'
    },
    categories: {
      title: 'বিভাগ অনুযায়ী অন্বেষণ করুন',
      viewAll: 'সকল বিভাগ দেখুন',
      mySymptoms: 'আমার উপসর্গ',
      myPersonalHealth: 'আমার ব্যক্তিগত স্বাস্থ্য',
      myFamily: 'আমার পরিবার',
      myParenting: 'আমার প্যারেন্টিং',
      myFood: 'আমার খাদ্য ও পুষ্টি',
      myMind: 'আমার মন ও আবেগ',
      mySleep: 'আমার ঘুম',
      myBeauty: 'আমার রূপচর্চা ও ত্বক',
      myLabTests: 'আমার ল্যাব টেস্ট',
      myMedicines: 'আমার ওষুধপত্র'
    },
    disclaimer: {
      title: 'চিকিৎসা ও স্বাস্থ্য দাবিত্যাগ',
      bannerText: 'স্বাস্থ্য শিক্ষা ও উপসর্গ গাইড। পেশাদার চিকিৎসকের বিকল্প নয়।',
      body: 'হেল্থ অরবিট প্রো™ শিক্ষামূলক উপসর্গ নির্দেশনা প্রদান করে। এটি কোনো রোগ নির্ণয় বা চিকিৎসকের বিকল্প নয়। জরুরি পরিস্থিতিতে অবিলম্বে ১০৮ বা ১১২ নম্বরে যোগাযোগ করুন।',
      ackBtn: 'আমি বুঝেছি এবং স্বীকার করছি'
    },
    freeAccess: {
      badge: '১০০% বিনামূল্যে জনস্বাস্থ্য বুদ্ধিমত্তা',
      title: 'বাণিজ্যিক বাধা ছাড়া সুলভ পারিবারিক স্বাস্থ্য',
      desc: 'সমস্ত ১,০০০টি স্বাস্থ্য কার্ড এবং উপসর্গ মূল্যায়ন সাধারণ মানুষের জন্য সম্পূর্ণ বিনামূল্যে।'
    },
    dpdp: {
      badge: 'DPDP আইন ২০২৩ অনুবর্তী',
      title: 'ডিজিটাল ব্যক্তিগত ডেটা সুরক্ষা ও গোপনীয়তা',
      desc: 'গেস্ট মোডে আপনার তথ্য ব্রাউজারেই সংরক্ষিত থাকে। আমরা কখনোই ব্যক্তিগত ডেটা বিক্রি করি না।',
      consentStatus: 'সেশন সম্মতি: সক্রিয় (কেবলমাত্র শিক্ষামূলক গাইড)',
      withdrawBtn: 'স্থানীয় সম্মতি প্রত্যাহার করুন'
    },
    feedback: {
      title: 'আপনার ক্লিনিক্যাল অভিজ্ঞতা ও মতামত জানান',
      subtitle: 'ডাঃ প্রতাপ এবং আমাদের মেডিকেল বোর্ডকে তথ্যের নির্ভুলতা বাড়াতে সাহায্য করুন।',
      typeLabel: 'মতামতের বিভাগ',
      ratingLabel: 'সার্বিক রেটিং',
      msgLabel: 'আপনার মন্তব্য বা পরামর্শ',
      emailLabel: 'ইমেইল (ঐচ্ছিক)',
      submitBtn: 'প্রতিক্রিয়া জমা দিন',
      successMsg: 'ধন্যবাদ! গুণমান পর্যালোচনার জন্য আপনার প্রতিক্রিয়া নথিভুক্ত করা হয়েছে।'
    },
    age: {
      title: 'বয়স যাচাই ও নির্দেশিকা পরিধি',
      desc: 'হেল্থ অরবিট প্রো™ ১৮ বছর বা তার বেশি বয়সী ব্যক্তি, অথবা অভিভাবকের তত্ত্বাবধানে ব্যবহারের জন্য।',
      confirm18: 'আমার বয়স ১৮ বছর বা তার বেশি',
      parental: 'আমি অভিভাবক হিসেবে অপ্রাপ্তবয়স্কের পক্ষে ব্যবহার করছি',
      btn: 'নিশ্চিত করুন এবং এগিয়ে যান'
    }
  },
  AR: {
    nav: {
      home: 'الرئيسية',
      symptomChecker: 'فاحص الأعراض',
      categories: 'الأقسام الطبية',
      healthCards: 'البطاقات الصحية (1000)',
      forDoctors: 'للأطباء',
      forPharmacists: 'للصيادلة',
      resources: 'المصادر',
      about: 'حول المنصة',
      signIn: 'تسجيل الدخول',
      disclaimer: 'إخلاء المسؤولية'
    },
    hero: {
      badge: 'الذكاء الاصطناعي التشاركي للرعاية الصحية في الهند',
      headline: 'حيث تلتقي الخبرة الإنسانية بالذكاء الاصطناعي.',
      formulaHuman: 'الرؤية الإنسانية',
      formulaAI: 'الذكاء الاصطناعي',
      formulaEvidence: 'الأدلة الطبية',
      formulaOutcome: 'قرارات صحية أوضح',
      doctorExperience: '38 عاماً من الخبرة السريرية',
      startBtn: 'ابدأ تقييم الأعراض',
      exploreBtn: 'استكشف التخصصات'
    },
    insights: {
      title: 'رؤى د. براتاب السريرية',
      subtitle: 'الصق إجابة جوجل أو الذكاء الاصطناعي واحصل على رؤى متخصصة وأحدث الأبحاث ودليل عملي واضح.',
      placeholder: 'الصق إجابتك الصحية هنا، أو اكتب أعراضك...',
      submitBtn: 'الحصول على الرؤى السريرية',
      voiceSearch: 'البحث الصوتي',
      uploadReport: 'رفع التقرير'
    },
    categories: {
      title: 'استكشف حسب القسم',
      viewAll: 'عرض جميع الأقسام',
      mySymptoms: 'أعراضي',
      myPersonalHealth: 'صحتي الشخصية',
      myFamily: 'عائلتي',
      myParenting: 'تربية الأطفال',
      myFood: 'التغذية والغذاء',
      myMind: 'الصحة النفسية',
      mySleep: 'النوم والراحة',
      myBeauty: 'العناية بالبشرة',
      myLabTests: 'الفحوصات المخبرية',
      myMedicines: 'الأدوية'
    },
    disclaimer: {
      title: 'إخلاء المسؤولية الطبية',
      bannerText: 'دليل تثقيفي للأعراض. لا يغني عن الاستشارة الطبية المتخصصة.',
      body: 'توفر هيلث أوربت برو إرشادات تثقيفية للأعراض ولا تقدم تشخيصاً طبياً. في حالات الطوارئ اتصل بخدمات الإسعاف فوراً.',
      ackBtn: 'أوافق وأفهم'
    },
    freeAccess: {
      badge: 'ذكاء صحي عام مجاني 100%',
      title: 'رعاية صحية عائلية متاحة للجميع بدون حواجز تجارية',
      desc: 'جميع البطاقات الصحية البالغ عددها 1,000 بطاقة متاحة مجاناً لجميع العائلات.'
    },
    dpdp: {
      badge: 'متوافق مع قانون حماية البيانات الرقمية',
      title: 'أمان وخصوصية البيانات الشخصية الرقمية',
      desc: 'في وضع الضيف يتم حفظ بياناتك محلياً في متصفحك ولا يتم بيع أو مشاركة أي بيانات.',
      consentStatus: 'حالة الموافقة: نشط',
      withdrawBtn: 'سحب الموافقة المحلية'
    },
    feedback: {
      title: 'شاركنا تجربتك وملاحظاتك السريرية',
      subtitle: 'ساعد الدكتور براتاب وفريقنا الطبي على تحسين الدقة.',
      typeLabel: 'نوع الملاحظات',
      ratingLabel: 'التقييم العام',
      msgLabel: 'ملاحظاتك أو اقتراحاتك',
      emailLabel: 'البريد الإلكتروني (اختياري)',
      submitBtn: 'إرسال الملاحظات',
      successMsg: 'شكراً لك! تم استلام ملاحظاتك بنجاح.'
    },
    age: {
      title: 'التحقق من العمر ونطاق الإرشادات',
      desc: 'المنصة مخصصة للأفراد من عمر 18 عاماً فما فوق أو بإشراف الوالدين.',
      confirm18: 'عمري 18 عاماً أو أكثر',
      parental: 'أستخدم المنصة نيابة عن قاصر كولي أمر',
      btn: 'تأكيد ومتابعة'
    }
  }
};
