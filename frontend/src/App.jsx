import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SymptomSearch from './components/SymptomSearch';
import ExploreCategories from './components/ExploreCategories';
import MiddleRow from './components/MiddleRow';
import BottomRow from './components/BottomRow';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import AdminLayout from './admin/components/AdminLayout';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function MainRouter() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (window.location.hash.startsWith('#admin')) return '/admin/dashboard';
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
    const handlePopState = () => {
      if (window.location.hash.startsWith('#admin')) {
        setCurrentPath('/admin/dashboard');
        const parts = window.location.hash.split('/');
        if (parts[1]) setAdminScreen(parts[1]);
      } else if (window.location.hash.startsWith('#user')) {
        setCurrentPath('/user/dashboard');
      } else if (window.location.hash.startsWith('#login')) {
        setCurrentPath('/login');
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path) => {
    if (path === '/') {
      window.location.hash = '';
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      setInitialSymptom('');
      setInitialCategory(null);
      window.scrollTo(0, 0);
    } else if (path.startsWith('/admin')) {
      window.location.hash = '#admin';
      window.history.pushState({}, '', path);
      setCurrentPath('/admin/dashboard');
      window.scrollTo(0, 0);
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
    return <LoginPage onNavigate={navigate} />;
  }

  // Route: Complete 6-Screen Admin Panel
  if (currentPath === '/admin/dashboard' || currentPath.startsWith('/admin') || window.location.hash.startsWith('#admin')) {
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

  // Default Route: Existing Landing Page (Preserved 100% exactly)
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f3f8fd] dark:bg-[#080D1A] text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-100 selection:text-blue-900 transition-colors duration-200">
      {/* 1. Header / Navigation Bar with Admin & Sign In options */}
      <Header onNavigate={navigate} />

      {/* Main Page Layout matching reference */}
      <main>
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Symptom Search Bar Row */}
        <SymptomSearch onSearch={handleSearch} />

        {/* 4. Explore by Category (12 Cards) */}
        <ExploreCategories onSelectCategory={handleSelectCategory} />

        {/* 5. Middle Row: A Message from Founder + How GlobalHealthAI Helps You */}
        <MiddleRow />

        {/* 6. Bottom Row: Red-Yellow-Green Guide + Popular Health Tools */}
        <BottomRow />
      </main>

      {/* 7. Footer Integration */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}
