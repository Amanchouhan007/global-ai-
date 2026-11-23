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
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function MainRouter() {
  const { user } = useAuth();

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
