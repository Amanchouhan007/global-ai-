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
    if (window.location.hash.startsWith('#admin') && !isUserAdmin()) {
      window.location.hash = '#login';
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash.startsWith('#admin')) {
        if (isUserAdmin()) {
          setCurrentPath('/admin/dashboard');
          const parts = window.location.hash.split('/');
          if (parts[1]) setAdminScreen(parts[1]);
          setAuthNotice('');
        } else {
          setAuthNotice('Admin access restricted. Please sign in with administrator credentials.');
          setCurrentPath('/login');
          window.location.hash = '#login';
        }
      } else if (window.location.hash.startsWith('#user')) {
        setCurrentPath('/user/dashboard');
      } else if (window.location.hash.startsWith('#login')) {
        setCurrentPath('/login');
      } else {
        setAuthNotice('');
        setCurrentPath(window.location.pathname || '/');
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
      window.location.hash = '';
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      setInitialSymptom('');
      setInitialCategory(null);
      setAuthNotice('');
      window.scrollTo(0, 0);
    } else if (path.startsWith('/admin')) {
      if (isUserAdmin()) {
        window.location.hash = '#admin';
        window.history.pushState({}, '', path);
        setCurrentPath('/admin/dashboard');
        setAuthNotice('');
        window.scrollTo(0, 0);
      } else {
        setAuthNotice('Admin access restricted. Please sign in with administrator credentials.');
        window.location.hash = '#login';
        window.history.pushState({}, '', '/login');
        setCurrentPath('/login');
        window.scrollTo(0, 0);
      }
    } else if (path.startsWith('/user')) {
      window.location.hash = '#user';
      window.history.pushState({}, '', path);
      setCurrentPath('/user/dashboard');
      window.scrollTo(0, 0);
    } else {
      window.history.pushState({}, '', path);
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

        {/* 2. Interactive Clinical Chat Assistant */}
        <ChatAssistantSection
          user={user}
          onStartAssessment={(q) => handleSearch(q || '')}
        />

        {/* 3. Explore by Category: 10 clinical cards with My Symptoms (1,000+ Health Cards) highlighted */}
        <ExploreCategories onSelectCategory={handleSelectCategory} />

        {/* 4. How It Works */}
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

      {/* Modals */}
      <DisclaimerModal 
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
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
