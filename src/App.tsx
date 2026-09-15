import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MoonStar, SunMedium } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { Projects2ndYearPage } from './pages/Projects2ndYearPage';
import { Projects3rdYearPage } from './pages/Projects3rdYearPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { TeamsPage } from './pages/TeamsPage';
import { MentorsPage } from './pages/MentorsPage';
import { GalleryPage } from './pages/GalleryPage';
import { VideosPage } from './pages/VideosPage';
import { WinnersPage } from './pages/WinnersPage';
import { CoordinatorsPage } from './pages/CoordinatorsPage';
import { ContactPage } from './pages/ContactPage';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isGallery = location.pathname === '/gallery';
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const savedTheme = localStorage.getItem('hackxpo-theme');
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hackxpo-theme', theme);
  }, [theme]);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-black transition-colors duration-1000 ease-in-out ${
        theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-black text-slate-100'
      }`}
    >
      <Navbar />
      <main className={`flex-1 ${isHome ? '' : 'pt-28 sm:pt-32'}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/2nd-year" element={<Projects2ndYearPage />} />
          <Route path="/projects/3rd-year" element={<Projects3rdYearPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/winners" element={<WinnersPage />} />
          <Route path="/coordinators" element={<CoordinatorsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isGallery && <Footer />}

      <button
        type="button"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        className="theme-toggle"
        data-theme={theme}
      >
        <span className="theme-toggle__track">
          <span className="theme-toggle__thumb">
            <SunMedium className="theme-toggle__icon theme-toggle__icon--sun" size={13} />
            <MoonStar className="theme-toggle__icon theme-toggle__icon--moon" size={13} />
          </span>
        </span>
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
