import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ChatAssistantSection from './components/ChatAssistantSection';
import SymptomSearch from './components/SymptomSearch';
import ExploreCategories from './components/ExploreCategories';
import HealthCardShowcase from './components/HealthCardShowcase';
import HowItWorksSection from './components/HowItWorksSection';
import DoctorProfileSection from './components/DoctorProfileSection';
import DemoVideoSection from './components/DemoVideoSection';
import RiskLevelsSection from './components/RiskLevelsSection';
import DPDPSection from './components/DPDPSection';
import FAQSection from './components/FAQSection';
import FeedbackCard from './components/FeedbackCard';
import DisclaimerModal from './components/DisclaimerModal';
import DraggableDisclaimerBox from './components/DraggableDisclaimerBox';
import AgeVerificationModal from './components/AgeVerificationModal';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import AdminLayout from './admin/components/AdminLayout';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function MainRouter() {
  const { user } = useAuth();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState(false);

  const isUserAdmin = () => {
    if (user && user.role === 'admin') return true;
    try {
      const s = localStorage.getItem('globalhealth_auth');
      return Boolean(s && JSON.parse(s).role === 'admin');
    } catch {
      return false;
    }
  };

  const [authNotice, setAuthNotice] = useState(() => {
    if (window.location.hash.startsWith('#admin')) {
      try {
        const s = localStorage.getItem('globalhealth_auth');
        if (!s || JSON.parse(s).role !== 'admin') {
          return 'Admin access restricted. Please sign in with administrator credentials.';
        }
      } catch {
        return 'Admin access restricted. Please sign in with administrator credentials.';
      }
    }
    return '';
  });

  const [currentPath, setCurrentPath] = useState(() => {
    if (window.location.hash.startsWith('#admin')) {
      try {
        const s = localStorage.getItem('globalhealth_auth');
        if (s && JSON.parse(s).role === 'admin') return '/admin/dashboard';
      } catch { /* fallback */ }
      return '/login';
    }
    if (window.location.hash.startsWith('#user')) return '/user/dashboard';
    if (window.location.hash.startsWith('#login')) return '/login';
    return window.location.pathname || '/';
  });

  const [adminScreen, setAdminScreen] = useState(() => {
    if (window.location.hash.startsWith('#admin/')) {
      return window.location.hash.replace('#admin/', '');
    }
    return 'dashboard';
  });

  const [initialSymptom, setInitialSymptom] = useState('');
  const [initialCategory, setInitialCategory] = useState(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // On root page load or refresh, start at top (y=0) and clear any accidental anchor hash
    if (window.location.pathname === '/' && (!window.location.hash || (!window.location.hash.startsWith('#admin') && !window.location.hash.startsWith('#user') && !window.location.hash.startsWith('#login')))) {
      if (window.location.hash) {
        try {
          history.replaceState(null, '', '/');
        } catch (e) {}
      }
      window.scrollTo(0, 0);
    }
    if (window.location.hash.startsWith('#admin') && !isUserAdmin()) {
      window.history.replaceState({}, '', '/login');
      setCurrentPath('/login');
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path.startsWith('/admin') || hash.startsWith('#admin')) {
        if (isUserAdmin()) {
          setCurrentPath('/admin/dashboard');
          const parts = (hash.startsWith('#admin/') ? hash : path).split('/');
          if (parts[parts.length - 1] && parts[parts.length - 1] !== 'dashboard' && parts[parts.length - 1] !== 'admin') {
            setAdminScreen(parts[parts.length - 1]);
          }
          setAuthNotice('');
        } else {
          setAuthNotice('Admin access restricted. Please sign in with administrator credentials.');
          setCurrentPath('/login');
          try {
            window.history.replaceState({}, '', '/login');
          } catch (e) {}
        }
      } else if (path.startsWith('/user') || hash.startsWith('#user')) {
        setCurrentPath('/user/dashboard');
      } else if (path.startsWith('/login') || hash.startsWith('#login')) {
        setCurrentPath('/login');
      } else {
        setAuthNotice('');
        setCurrentPath(path || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [user]);

  const navigate = (path) => {
    if (path === '/') {
      try {
        window.history.pushState({}, '', '/');
      } catch (e) {}
      setCurrentPath('/');
      setInitialSymptom('');
      setInitialCategory(null);
      setAuthNotice('');
      window.scrollTo(0, 0);
    } else if (path.startsWith('/admin')) {
      if (isUserAdmin()) {
        try {
          window.history.pushState({}, '', path);
        } catch (e) {}
        setCurrentPath('/admin/dashboard');
        setAuthNotice('');
        window.scrollTo(0, 0);
      } else {
        setAuthNotice('Admin access restricted. Please sign in with administrator credentials.');
        try {
          window.history.pushState({}, '', '/login');
        } catch (e) {}
        setCurrentPath('/login');
        window.scrollTo(0, 0);
      }
    } else if (path.startsWith('/user')) {
      try {
        window.history.pushState({}, '', path);
      } catch (e) {}
      setCurrentPath('/user/dashboard');
      window.scrollTo(0, 0);
    } else {
      try {
        window.history.pushState({}, '', path);
      } catch (e) {}
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  const handleSearch = (symptom) => {
    setInitialSymptom(symptom);
    navigate('/user/dashboard');
  };

  const handleSelectCategory = (category) => {
    setInitialCategory(category);
    navigate('/user/dashboard');
  };

  // Route: Login Page
  if (currentPath === '/login' || window.location.hash === '#login') {
    return <LoginPage onNavigate={navigate} notice={authNotice} />;
  }

  // Route: Complete 6-Screen Admin Panel (Role Protected)
  if (currentPath === '/admin/dashboard' || currentPath.startsWith('/admin') || window.location.hash.startsWith('#admin')) {
    if (isUserAdmin()) {
      return (
        <AdminLayout
          activeScreen={adminScreen}
          setActiveScreen={(screen) => {
            setAdminScreen(screen);
            window.location.hash = `#admin/${screen}`;
          }}
          onExitToLanding={() => navigate('/')}
        />
      );
    }
    // Redirect unauthenticated or non-admin to login
    return <LoginPage onNavigate={navigate} notice={authNotice || "Admin access restricted. Please sign in with administrator credentials."} />;
  }

  // Route: User Dashboard
  if (currentPath === '/user/dashboard' || window.location.hash.startsWith('#user')) {
    return (
      <UserDashboard
        onNavigate={navigate}
        initialSymptom={initialSymptom}
        initialCategory={initialCategory}
      />
    );
  }

  // Default Route: Health Orbit Pro™ Redesigned Landing Page
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8FAF9] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-200">
      {/* 1. Header / Navigation Bar matching reference Image 1 */}
      <Header onNavigate={navigate} onOpenDisclaimer={() => setShowDisclaimer(true)} />

      {/* Main Page Layout */}
      <main>
        {/* 1. Hero: brand, heading, description and complete doctor banner */}
        <Hero
          onStartAssessment={() => navigate('/user/dashboard')}
          onExploreCategories={() => {
            const el = document.getElementById('categories');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />

        {/* 2. Symptom Search: main clinical search bar directly under hero matching reference */}
        <SymptomSearch onSearch={handleSearch} />

        {/* 3. Explore by Category: 10 clinical cards with My Symptoms (1,000+ Health Cards) highlighted */}
        <ExploreCategories onSelectCategory={handleSelectCategory} />

        {/* 4. Existing Chat Assistant: dedicated, spacious landing page section visible upon scrolling */}
        <ChatAssistantSection
          user={user}
          onStartAssessment={(q) => handleSearch(q || '')}
        />

        {/* 5. Health Cards and clinical guidance */}
        <div id="health-cards" className="py-12 bg-white border-y border-emerald-950/10 scroll-mt-20 overflow-hidden">
          <HealthCardShowcase onStartAssessment={() => navigate('/user/dashboard')} />
        </div>

        {/* 6. How It Works */}
        <HowItWorksSection onStartAssessment={() => navigate('/user/dashboard')} />

        {/* 7. Doctor Profile */}
        <DoctorProfileSection onStartAssessment={() => navigate('/user/dashboard')} />

        {/* 8. Multilingual Demo Videos (All 6 Languages: EN, HI, MR, GU, BN, AR) */}
        <DemoVideoSection />

        {/* 9. Risk Levels: Red, Yellow & Green Clinical Triage */}
        <RiskLevelsSection onStartAssessment={() => navigate('/user/dashboard')} />

        {/* 10. Privacy / DPDP: Digital Personal Data Protection Act 2023 */}
        <DPDPSection />

        {/* 11. FAQ: Frequently Asked Questions */}
        <FAQSection />

        {/* 12. Feedback and Footer */}
        <div id="patient-feedback" className="py-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <FeedbackCard />
        </div>
      </main>

      {/* 12. Footer Integration */}
      <Footer 
        onOpenDisclaimer={() => setShowDisclaimer(true)}
        onOpenAgeGate={() => setShowAgeGate(true)}
        onNavigate={navigate}
      />

      {/* 13. Attractive DPDP 2023 Draggable Box on Landing Page */}
      <DraggableDisclaimerBox 
        isOpenExternal={showDisclaimer}
        onCloseExternal={() => setShowDisclaimer(false)}
      />

      <AgeVerificationModal 
        isOpenManual={showAgeGate}
        onCloseManual={() => setShowAgeGate(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <MainRouter />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
