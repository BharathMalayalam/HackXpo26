import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  ChevronDown, 
  Menu, 
  X, 
  Info, 
  Users, 
  Video, 
  Trophy, 
  Award, 
  Mail,
  FolderGit2,
  Image as ImageIcon,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [moreHover, setMoreHover] = useState(false);
  const [moreMobileOpen, setMoreMobileOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setMoreHover(false);
    setMoreMobileOpen(false);
  }, [location.pathname]);

  const handleMouseEnterMore = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setMoreHover(true);
  };

  const handleMouseLeaveMore = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setMoreHover(false);
    }, 150);
  };

  // Remaining sections inside MORE dropdown
  const moreItems = [
    { path: '/about', label: 'About', icon: Info, desc: 'Event vision & institutional background' },
    { path: '/teams', label: 'Teams', icon: Users, desc: '2nd & 3rd year project teams' },
    { path: '/videos', label: 'Videos', icon: Video, desc: 'Keynotes & project demo recordings' },
    { path: '/winners', label: 'Winners', icon: Trophy, desc: 'Awardees, runners-up & best pitch' },
    { path: '/coordinators', label: 'Coordinators', icon: Award, desc: 'Faculty convenors & student leads' },
    { path: '/contact', label: 'Contact', icon: Mail, desc: 'Reach out to the HackXpo committee' },
  ];

  const isHomeActive = location.pathname === '/';
  const isProjectsActive = location.pathname.startsWith('/projects');
  const isGalleryActive = location.pathname.startsWith('/gallery');
  const isMentorsActive = location.pathname.startsWith('/mentors');
  const isMoreActive = moreItems.some(item => location.pathname === item.path || location.pathname.startsWith(item.path));

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07090F]/90 backdrop-blur-md border-b border-slate-700/60 shadow-lg shadow-black/40">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left Brand Identity matching the reference image layout */}
          <Link 
            to="/" 
            id="navbar-brand-link" 
            className="flex items-center gap-3.5 group select-none py-2"
          >
            {/* Custom Department Monogram / Academic Logo */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-cyan-400/60 transition-colors shadow-md">
              <div className="relative flex flex-col items-center justify-center">
                <GraduationCap className="w-5 h-5 text-cyan-400 group-hover:scale-105 transition-transform" />
                <span className="text-[11px] font-black tracking-tighter text-white -mt-0.5 font-mono">
                  IT
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#07090F] animate-pulse" />
            </div>

            {/* Department Text in two uppercase lines matching reference image */}
            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-slate-100 leading-tight">
                Department of
              </span>
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-cyan-400 leading-tight">
                Information Technology
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                GCE Erode (IRTT)
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links matching reference screenshot */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4" id="navbar-desktop-nav">
            
            {/* 1. HOME */}
            <Link
              to="/"
              id="nav-link-home"
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-all duration-150 rounded-md ${
                isHomeActive
                  ? 'text-white bg-slate-800/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {isHomeActive && <span className="text-cyan-400 text-xs">■</span>}
              <span>Home</span>
            </Link>

            {/* 2. PROJECT */}
            <Link
              to="/projects"
              id="nav-link-project"
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-all duration-150 rounded-md ${
                isProjectsActive
                  ? 'text-white bg-slate-800/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {isProjectsActive && <span className="text-cyan-400 text-xs">■</span>}
              <span>Project</span>
            </Link>

            {/* 3. GALLERY */}
            <Link
              to="/gallery"
              id="nav-link-gallery"
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-all duration-150 rounded-md ${
                isGalleryActive
                  ? 'text-white bg-slate-800/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {isGalleryActive && <span className="text-cyan-400 text-xs">■</span>}
              <span>Gallery</span>
            </Link>

            {/* 4. MENTORS */}
            <Link
              to="/mentors"
              id="nav-link-mentors"
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-all duration-150 rounded-md ${
                isMentorsActive
                  ? 'text-white bg-slate-800/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {isMentorsActive && <span className="text-cyan-400 text-xs">■</span>}
              <span>Mentors</span>
            </Link>

            {/* 5. MORE with HOVER DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnterMore}
              onMouseLeave={handleMouseLeaveMore}
            >
              <button
                type="button"
                id="nav-link-more-btn"
                className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-all duration-150 rounded-md cursor-pointer ${
                  isMoreActive || moreHover
                    ? 'text-white bg-slate-800/80 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
                aria-expanded={moreHover}
              >
                {isMoreActive && <span className="text-cyan-400 text-xs">■</span>}
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreHover ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {/* Hover Dropdown Menu */}
              {moreHover && (
                <div 
                  id="nav-more-dropdown-menu"
                  className="absolute right-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="rounded-2xl bg-[#090D17] border border-slate-700/90 shadow-2xl shadow-black/80 overflow-hidden p-2 backdrop-blur-xl">
                    <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 border-b border-slate-800 mb-1 flex items-center justify-between">
                      <span>Event Sections</span>
                      <span className="text-cyan-400">HackXpo ’26</span>
                    </div>

                    <div className="space-y-1">
                      {moreItems.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                              isCurrent
                                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                                : 'text-slate-200 hover:bg-slate-800/70 hover:text-white'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${isCurrent ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="navbar-mobile-toggle-btn"
              aria-label="Toggle Navigation"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#07090F]/98 border-b border-slate-700 backdrop-blur-2xl px-5 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2">
            
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                isHomeActive ? 'bg-slate-800 text-white border border-slate-600' : 'bg-slate-900/60 text-slate-300'
              }`}
            >
              {isHomeActive && <span className="text-cyan-400 text-xs">■</span>}
              <span>Home</span>
            </Link>

            <Link
              to="/projects"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                isProjectsActive ? 'bg-slate-800 text-white border border-slate-600' : 'bg-slate-900/60 text-slate-300'
              }`}
            >
              {isProjectsActive && <span className="text-cyan-400 text-xs">■</span>}
              <span>Project</span>
            </Link>

            <Link
              to="/gallery"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                isGalleryActive ? 'bg-slate-800 text-white border border-slate-600' : 'bg-slate-900/60 text-slate-300'
              }`}
            >
              {isGalleryActive && <span className="text-cyan-400 text-xs">■</span>}
              <span>Gallery</span>
            </Link>

            <Link
              to="/mentors"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                isMentorsActive ? 'bg-slate-800 text-white border border-slate-600' : 'bg-slate-900/60 text-slate-300'
              }`}
            >
              {isMentorsActive && <span className="text-cyan-400 text-xs">■</span>}
              <span>Mentors</span>
            </Link>

          </div>

          {/* Mobile "More" Accordion */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => setMoreMobileOpen(!moreMobileOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/90 text-xs font-bold uppercase tracking-wider text-slate-200 border border-slate-800"
            >
              <div className="flex items-center gap-2">
                {isMoreActive && <span className="text-cyan-400 text-xs">■</span>}
                <span>More Sections</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${moreMobileOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreMobileOpen && (
              <div className="grid grid-cols-2 gap-2 mt-2 pl-1">
                {moreItems.map(item => {
                  const Icon = item.icon;
                  const isCurrent = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                        isCurrent ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/30' : 'bg-slate-900/50 text-slate-300'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
