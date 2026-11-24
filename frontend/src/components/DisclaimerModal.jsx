import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, X, PhoneCall, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BRAND } from '../config/brand';
import { COMPANY_INFO, FOUNDER_INFO } from '../config/company';

/**
 * All 6 Regional and International Languages for Clinical Safety Notice
 * Strictly isolated so switching language INSIDE this modal translates ONLY the modal content,
 * preserving the global landing page language selected outside.
 */
const DISCLAIMER_LOCALIZATIONS = {
  EN: {
    badge: 'Clinical Safety & Governance Notice',
    title: 'Clinical & Healthcare Disclaimer',
    bannerText: 'Global & regional medical information. Not a substitute for professional clinical advice.',
    body: `${BRAND.name}™ provides educational symptom guidance and clinical risk triage. It is not a licensed hospital, medical diagnostic laboratory, or substitute for in-person consultation with a qualified doctor. If you are experiencing a life-threatening emergency, call ${COMPANY_INFO.emergencyNumbers.india} / 112 (India) or ${COMPANY_INFO.emergencyNumbers.usa} (US) immediately.`,
    principlesHeading: 'Core Principles of Triage Guidance:',
    p1Title: 'Educational Nature:',
    p1Text: `Content on ${BRAND.name}™ is developed under the clinical leadership of ${FOUNDER_INFO.name} (${FOUNDER_INFO.experience}) to help users articulate their symptoms and prepare for physician visits.`,
    p2Title: 'No Doctor-Patient Relationship:',
    p2Text: 'Using this website, reading health cards, or submitting feedback does not establish a legal, contractual, or clinical doctor-patient relationship.',
    p3Title: 'No Prescription or Dispensing:',
    p3Text: 'The platform does not prescribe medication, adjust dosages, or sell pharmaceuticals. Never discontinue prescribed medicine without physician approval.',
    p4Title: 'Emergency Escalation:',
    p4Text: `If experiencing sudden crushing chest pain, difficulty breathing, slurred speech, sudden facial drooping, or worst-ever headache, call ${COMPANY_INFO.emergencyNumbers.india} / 112 (India) or ${COMPANY_INFO.emergencyNumbers.usa} (US) immediately.`,
    emergencyTitle: 'Emergency Ambulatory Escalation',
    emergencySubtitle: `National Emergency Services: 108 / 112 (India) | 911 (USA)`,
    dialBtn: 'Dial 108',
    protocolBadge: 'DPDP 2023 & Clinical Safety Protocol',
    ackBtn: 'I Understand & Acknowledge'
  },
  HI: {
    badge: 'नैदानिक सुरक्षा एवं शासन सूचना',
    title: 'नैदानिक एवं स्वास्थ्य अस्वीकरण',
    bannerText: 'स्वास्थ्य शिक्षा व मार्गदर्शन। यह पेशेवर चिकित्सीय सलाह का विकल्प नहीं है।',
    body: `${BRAND.name}™ शैक्षिक लक्षण मार्गदर्शन और नैदानिक जोखिम वर्गीकरण प्रदान करता है। यह अस्पताल, प्रयोगशाला या डॉक्टर के व्यक्तिगत परामर्श का विकल्प नहीं है। आपात स्थिति में तुरंत ${COMPANY_INFO.emergencyNumbers.india} या 112 पर कॉल करें।`,
    principlesHeading: 'लक्षण वर्गीकरण एवं मार्गदर्शन के मुख्य सिद्धांत:',
    p1Title: 'शैक्षिक स्वरूप:',
    p1Text: `${BRAND.name}™ की सामग्री ${FOUNDER_INFO.name} (${FOUNDER_INFO.experience}) के चिकित्सीय मार्गदर्शन में विकसित की गई है, ताकि नागरिक अपने लक्षणों को समझ सकें और डॉक्टर से परामर्श हेतु तैयार हो सकें।`,
    p2Title: 'डॉक्टर-मरीज संबंध नहीं:',
    p2Text: 'इस वेबसाइट का उपयोग करना, स्वास्थ्य कार्ड पढ़ना या प्रतिक्रिया भेजना कोई कानूनी, संविदात्मक या चिकित्सीय डॉक्टर-मरीज संबंध स्थापित नहीं करता है।',
    p3Title: 'दवा परामर्श या वितरण नहीं:',
    p3Text: 'यह प्लेटफ़ॉर्म दवाएं नहीं लिखता, खुराक में बदलाव नहीं करता और न ही दवाएं बेचता है। डॉक्टर की सलाह के बिना कभी भी निर्धारित दवा बंद न करें।',
    p4Title: 'आपातकालीन सहायता:',
    p4Text: `सीने में तेज दर्द, सांस लेने में अत्यधिक कठिनाई, बोलने में लड़खड़ाहट या गंभीर सिरदर्द की स्थिति में तुरंत ${COMPANY_INFO.emergencyNumbers.india} / 112 (भारत) पर कॉल करें।`,
    emergencyTitle: 'आपातकालीन एम्बुलेंस सेवा',
    emergencySubtitle: 'राष्ट्रीय आपातकालीन सेवा: 108 / 112 (भारत) | 911 (अमेरिका)',
    dialBtn: '108 डायल करें',
    protocolBadge: 'DPDP अधिनियम 2023 एवं नैदानिक सुरक्षा प्रोटोकॉल',
    ackBtn: 'मैं समझता/समझती हूँ और स्वीकार करता/करती हूँ'
  },
  MR: {
    badge: 'वैद्यकीय सुरक्षितता व नियमन सूचना',
    title: 'वैद्यकीय व आरोग्य अस्वीकरण',
    bannerText: 'आरोग्य शिक्षण व मार्गदर्शन. हा व्यावसायिक वैद्यकीय सल्ल्याचा पर्याय नाही.',
    body: `${BRAND.name}™ शैक्षणिक लक्षण मार्गदर्शन व वैद्यकीय जोखीम वर्गीकरण प्रदान करते. हे रुग्णालय, प्रयोगशाळा किंवा डॉक्टरांच्या प्रत्यक्ष सल्ल्याचा पर्याय नाही. आणीबाणीच्या परिस्थितीत त्वरित ${COMPANY_INFO.emergencyNumbers.india} किंवा 112 वर संपर्क साधा.`,
    principlesHeading: 'मार्गदर्शनाची मुख्य तत्त्वे:',
    p1Title: 'शैक्षणिक स्वरूप:',
    p1Text: `${BRAND.name}™ मधील माहिती ${FOUNDER_INFO.name} (${FOUNDER_INFO.experience}) यांच्या मार्गदर्शनाखाली तयार केली आहे, जेणेकरून नागरिकांना त्यांची लक्षणे समजून डॉक्टरांशी चर्चा करणे सोपे जावे.`,
    p2Title: 'डॉक्टर-रुग्ण संबंध नाही:',
    p2Text: 'या वेबसाइटचा वापर करणे किंवा आरोग्य कार्ड वाचणे याने कोणताही कायदेशीर किंवा वैद्यकीय डॉक्टर-रुग्ण संबंध प्रस्थापित होत नाही.',
    p3Title: 'औषध लिहून देणे नाही:',
    p3Text: 'हे व्यासपीठ औषधे लिहून देत नाही किंवा डोस बदलत नाही. डॉक्टरांच्या सल्ल्याशिवाय सुरू असलेली औषधे कधीही बंद करू नका.',
    p4Title: 'तातडीची आणीबाणी:',
    p4Text: `छातीत तीव्र वेदना, श्वास घेण्यास त्रास, बोलण्यात अडखळणे किंवा अचानक तीव्र डोकेदुखी असल्यास ताबडतोब ${COMPANY_INFO.emergencyNumbers.india} / 112 (भारत) वर कॉल करा.`,
    emergencyTitle: 'तातडीची रुग्णवाहिका सेवा',
    emergencySubtitle: 'राष्ट्रीय आणीबाणी सेवा: 108 / 112 (भारत) | 911 (अमेरिका)',
    dialBtn: '108 डायल करा',
    protocolBadge: 'DPDP कायदा 2023 व वैद्यकीय सुरक्षितता प्रोटोकॉल',
    ackBtn: 'मला समजले आहे व मी मान्य करतो/करते'
  },
  GU: {
    badge: 'ક્લિનિકલ સુરક્ષા અને શાસન સૂચના',
    title: 'ક્લિનિકલ અને હેલ્થકેર ડિસ્ક્લેમર',
    bannerText: 'આરોગ્ય શિક્ષણ અને માર્ગદર્શન. આ વ્યાવસાયિક તબીબી સલાહનો વિકલ્પ નથી.',
    body: `${BRAND.name}™ શૈક્ષણિક લક્ષણ માર્ગદર્શન અને ક્લિનિકલ જોખમ મૂલ્યાંકન પૂરું પાડે છે. તે હોસ્પિટલ કે ડૉક્ટરના રૂબરૂ પરામર્શનો વિકલ્પ નથી. કટોકટીમાં તરત ${COMPANY_INFO.emergencyNumbers.india} અથવા 112 પર કૉલ કરો.`,
    principlesHeading: 'લક્ષણ માર્ગદર્શનના મુખ્ય સિદ્ધાંતો:',
    p1Title: 'શૈક્ષણિક સ્વરૂપ:',
    p1Text: `${BRAND.name}™ નું કન્ટેન્ટ ${FOUNDER_INFO.name} (${FOUNDER_INFO.experience}) ના તબીબી માર્ગદર્શન હેઠળ તૈયાર કરાયું છે, જેથી નાગરિકો લક્ષણો સમજી શકે.`,
    p2Title: 'ડૉક્ટર-દર્દી સંબંધ નથી:',
    p2Text: 'આ વેબસાઇટનો ઉપયોગ કરવાથી કે કાર્ડ વાંચવાથી કોઈ કાનૂની અથવા તબીબી ડૉક્ટર-દર્દી સંબંધ બનતો નથી.',
    p3Title: 'દવા પ્રિસ્ક્રિપ્શન નહીં:',
    p3Text: 'આ પ્લેટફોર્મ દવા લખી આપતું નથી કે ડોઝ બદલતું નથી. ડૉક્ટરની મંજૂરી વિના ચાલુ દવા ક્યારેય બંધ ન કરો.',
    p4Title: 'ઇમરજન્સી સેવા:',
    p4Text: `છાતીમાં અસહ્ય દુખાવો, શ્વાસ લેવામાં તકલીફ અથવા અચાનક ગંભીર લક્ષણો જણાય તો તુરંત ${COMPANY_INFO.emergencyNumbers.india} / 112 (ભારત) પર કૉલ કરો.`,
    emergencyTitle: 'ઇમરજન્સી એમ્બ્યુલન્સ સેવા',
    emergencySubtitle: 'રાષ્ટ્રીય કટોકટી સેવા: 108 / 112 (ભારત) | 911 (અમેરિકા)',
    dialBtn: '108 ડાયલ કરો',
    protocolBadge: 'DPDP એક્ટ 2023 અને ક્લિનિકલ સુરક્ષા પ્રોટોકોલ',
    ackBtn: 'હું સમજું છું અને સ્વીકારું છું'
  },
  BN: {
    badge: 'ক্লিনিক্যাল সুরক্ষা ও গভর্নেন্স বিজ্ঞপ্তি',
    title: 'ক্লিনিক্যাল ও স্বাস্থ্য দাবিত্যাগ',
    bannerText: 'স্বাস্থ্য সচেতনতা ও তথ্যমূলক নির্দেশিকা। এটি পেশাদার চিকিৎসার বিকল্প নয়।',
    body: `${BRAND.name}™ শিক্ষামূলক উপসর্গ নির্দেশিকা প্রদান করে। এটি কোনো রোগ নির্ণয় বা চিকিৎসকের বিকল্প নয়। জরুরি পরিস্থিতিতে অবিলম্বে ${COMPANY_INFO.emergencyNumbers.india} বা ১১২ নম্বরে যোগাযোগ করুন।`,
    principlesHeading: 'উপসর্গ নির্দেশিকার মূল নীতিসমূহ:',
    p1Title: 'শিক্ষামূলক চরিত্র:',
    p1Text: `${BRAND.name}™ এর সমস্ত তথ্য ${FOUNDER_INFO.name} (${FOUNDER_INFO.experience})-এর তত্ত্বাবধানে প্রস্তুত করা হয়েছে।`,
    p2Title: 'ডাক্তার-রোগী সম্পর্ক নয়:',
    p2Text: 'এই ওয়েবসাইট ব্যবহার করা বা কার্ড পড়া কোনো আইনি বা ক্লিনিক্যাল ডাক্তার-রোগী সম্পর্ক তৈরি করে না।',
    p3Title: 'প্রেসক্রিপশন বা ওষুধ প্রদান নয়:',
    p3Text: 'এই প্ল্যাটফর্ম কোনো ওষুধ প্রেসক্রাইব বা বিক্রি করে না। চিকিৎসকের অনুমতি ছাড়া কোনো প্রেসক্রাইব করা ওষুধ বন্ধ করবেন না।',
    p4Title: 'জরুরি পরিস্থিতি:',
    p4Text: `বুকে তীব্র ব্যথা, শ্বাসকষ্ট বা প্যারালাইসিসের লক্ষণে অবিলম্বে ${COMPANY_INFO.emergencyNumbers.india} / ১১২ (ভারত) বা ${COMPANY_INFO.emergencyNumbers.usa} (ইউএসএ) নম্বরে ফোন করুন।`,
    emergencyTitle: 'জরুরি অ্যাম্বুলেন্স সহায়তা',
    emergencySubtitle: 'জাতীয় জরুরি পরিষেবা: ১০৮ / ১১২ (ভারত) | ৯১১ (আমেরিকা)',
    dialBtn: '১০৮ ডায়াল করুন',
    protocolBadge: 'DPDP আইন ২০২৩ ও ক্লিনিক্যাল সুরক্ষা প্রোটোকল',
    ackBtn: 'আমি বুঝেছি এবং স্বীকার করছি'
  },
  AR: {
    badge: 'إشعار السلامة السريرية والحوكمة الطبية',
    title: 'إخلاء المسؤولية الطبية والرعاية الصحية',
    bannerText: 'دليل تثقيفي للأعراض الطبية. لا يغني عن الاستشارة الطبية المتخصصة.',
    body: `توفر ${BRAND.name}™ إرشادات تثقيفية للأعراض وتصنيفاً للمخاطر السريرية تحت إشراف د. براتاب مادهوكار (${FOUNDER_INFO.experience}). في حالات الطوارئ اتصل بـ ${COMPANY_INFO.emergencyNumbers.india} أو 112 فوراً.`,
    principlesHeading: 'المبادئ الأساسية للتوجيه السريري:',
    p1Title: 'طبيعة تثقيفية:',
    p1Text: `تم تطوير المحتوى تحت إشراف الدكتور ${FOUNDER_INFO.name} (${FOUNDER_INFO.experience}) لمساعدة المستخدمين على توضيح أعراضهم والتحضير لمراجعة الطبيب.`,
    p2Title: 'لا توجد علاقة طبيب ومريض:',
    p2Text: 'استخدام هذا الموقع أو قراءة البطاقات الصحية لا ينشئ علاقة قانونية أو سريرية بين الطبيب والمريض.',
    p3Title: 'لا وصفات طبية أو صرف أدوية:',
    p3Text: 'المنصة لا تصف أدوية ولا تعدل الجرعات. لا تتوقف أبداً عن تناول الدواء الموصوف لك دون موافقة طبيبك.',
    p4Title: 'التصعيد لحالات الطوارئ:',
    p4Text: `عند الشعور بألم حاد في الصدر أو صعوبة في التنفس أو ثقل في النطق، اتصل بـ ${COMPANY_INFO.emergencyNumbers.india} / 112 (الهند) أو ${COMPANY_INFO.emergencyNumbers.usa} فوراً.`,
    emergencyTitle: 'خدمة الإسعاف والطوارئ',
    emergencySubtitle: 'خدمات الطوارئ الوطنية: 108 / 112 (الهند) | 911 (الولايات المتحدة)',
    dialBtn: 'اتصل بـ 108',
    protocolBadge: 'قانون DPDP لعام 2023 وبروتوكول السلامة السريرية',
    ackBtn: 'أوافق وأفهم الشروط'
  }
};

export default function DisclaimerModal({ isOpen, onClose }) {
  const { currentLang: globalLang, supportedLanguages } = useLanguage();

  // Local state strictly scoped to this modal:
  // Switching language here translates ONLY this modal's content, leaving outer landing page intact
  const [modalLang, setModalLang] = useState(() => globalLang || 'EN');

  // Synchronize initial modal language when modal is newly opened
  useEffect(() => {
    if (isOpen) {
      setModalLang(globalLang || 'EN');
    }
  }, [isOpen, globalLang]);

  if (!isOpen) return null;

  const currentStrings = DISCLAIMER_LOCALIZATIONS[modalLang] || DISCLAIMER_LOCALIZATIONS.EN;
  const isRtl = modalLang === 'AR';

  const handleAcknowledge = () => {
    try {
      localStorage.setItem('healthorbit_disclaimer_ack', 'true');
    } catch {
      // ignore
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        dir={isRtl ? 'rtl' : 'ltr'}
        className="w-full max-w-[96vw] sm:max-w-xl md:max-w-2xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col my-auto transition-all duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
      >
        {/* Header with Title & Local Language Tabs */}
        <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-amber-600 via-rose-600 to-rose-700 text-white shrink-0 relative">
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-3.5 sm:top-4 ${isRtl ? 'left-3.5 sm:left-4' : 'right-3.5 sm:right-4'} p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer`}
            aria-label="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-2.5 sm:gap-3 mb-2 pr-8">
            <div className="p-1.5 sm:p-2 rounded-xl bg-white/20 backdrop-blur-xs shrink-0">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <span className="text-[9.5px] sm:text-[10px] font-black tracking-widest uppercase text-amber-200 block">
                {currentStrings.badge}
              </span>
              <h2 id="disclaimer-title" className="text-base sm:text-lg md:text-xl font-black text-white leading-tight">
                {currentStrings.title}
              </h2>
            </div>
          </div>

          {/* 6-Language Switcher Tabs — changes ONLY this modal's internal language */}
          <div className="mt-3 flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 text-[11px] sm:text-xs scrollbar-thin">
            {supportedLanguages.map((lang) => {
              const isActive = modalLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setModalLang(lang.code)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 select-none ${
                    isActive
                      ? 'bg-white text-rose-800 shadow-sm scale-100'
                      : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                >
                  {lang.nativeName} ({lang.code})
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body (Scrollable, fully responsive on mobile & desktop) */}
        <div className="p-4 sm:p-5 md:p-6 overflow-y-auto space-y-3.5 sm:space-y-4 text-xs sm:text-[13px] md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          
          {/* Banner Notice Box */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-semibold text-xs sm:text-[13px] leading-relaxed">
            {currentStrings.bannerText}
          </div>

          {/* Description Paragraph */}
          <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
            {currentStrings.body}
          </p>

          {/* Core Principles */}
          <div className="space-y-2 sm:space-y-2.5 pt-1 sm:pt-2">
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-[11px] sm:text-xs">
              {currentStrings.principlesHeading}
            </h4>
            <ul className="space-y-2 text-xs sm:text-[12.5px] leading-snug">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">1.</span>
                <span><strong>{currentStrings.p1Title}</strong> {currentStrings.p1Text}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">2.</span>
                <span><strong>{currentStrings.p2Title}</strong> {currentStrings.p2Text}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">3.</span>
                <span><strong>{currentStrings.p3Title}</strong> {currentStrings.p3Text}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0 mt-0.5">4.</span>
                <span><strong>{currentStrings.p4Title}</strong> {currentStrings.p4Text}</span>
              </li>
            </ul>
          </div>

          {/* Emergency Alert Escalation Box */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 rounded-xl bg-rose-600 text-white shrink-0">
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-900 dark:text-rose-200 block">
                  {currentStrings.emergencyTitle}
                </span>
                <span className="text-[10.5px] sm:text-[11px] text-rose-700 dark:text-rose-300">
                  {currentStrings.emergencySubtitle}
                </span>
              </div>
            </div>
            <a 
              href={`tel:${COMPANY_INFO.emergencyNumbers.india}`}
              className="w-full xs:w-auto text-center px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold shrink-0 transition-all cursor-pointer shadow-xs"
            >
              {currentStrings.dialBtn}
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 md:p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex flex-col xs:flex-row items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <div className="text-[10.5px] sm:text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 w-full xs:w-auto justify-center xs:justify-start">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{currentStrings.protocolBadge}</span>
          </div>

          <button
            type="button"
            onClick={handleAcknowledge}
            className="w-full xs:w-auto px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{currentStrings.ackBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
