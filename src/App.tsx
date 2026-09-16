import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { YearProvider } from './context/YearContext';
import { CURRENT_YEAR } from './config/years';

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
import { JudgesPage } from './pages/JudgesPage';

function YearLayout() {
  const location = useLocation();
  const { year } = useParams<{ year: string }>();
  const isHome = location.pathname === `/${year}/`;
  const isGallery = location.pathname === `/${year}/gallery`;

  return (
    <YearProvider>
      <div className="min-h-screen flex flex-col bg-black text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
        <Navbar />
        <main className={`flex-1 ${isHome || isGallery ? '' : 'pt-28 sm:pt-32'}`}>
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
            <Route path="/judges" element={<JudgesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!isGallery && <Footer />}
      </div>
    </YearProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to={`/${CURRENT_YEAR}/`} replace />} />
        <Route path="/:year/*" element={<YearLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
