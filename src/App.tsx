import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const [isSwitching, setIsSwitching] = useState(false);
  const [switchTarget, setSwitchTarget] = useState<'light' | 'dark' | null>(null);
  const isHome = location.pathname === '/';
  const isGallery = location.pathname === '/gallery';

  const handleThemeToggle = () => {
    if (isSwitching) return;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    toggleTheme();
    setSwitchTarget(nextTheme);
    setIsSwitching(true);

    window.setTimeout(() => {
      setIsSwitching(false);
      setSwitchTarget(null);
    }, 1600);
  };

  return (
    <>
      <div className="theme-toggle-corner">
        <ThemeToggle onToggle={handleThemeToggle} isSwitching={isSwitching} />
      </div>
      <div
        className={`theme-shell ${theme === 'dark' ? 'theme-shell--dark' : 'theme-shell--light'} ${isSwitching && switchTarget ? `theme-shell--switching-to-${switchTarget}` : ''}`}
        data-theme={theme}
      >
        <div className="theme-shell__bg" aria-hidden="true" />
        <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-black relative z-10">
          <Navbar />
          <main className={`flex-1 ${isHome ? '' : isGallery ? 'pt-0' : 'pt-16 sm:pt-20'}`}>
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
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
