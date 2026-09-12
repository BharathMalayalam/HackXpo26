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
  const [projectHover, setProjectHover] = useState(false);
  const [projectMobileOpen, setProjectMobileOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const projectDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setMoreHover(false);
    setMoreMobileOpen(false);
    setProjectHover(false);
    setProjectMobileOpen(false);
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

  const handleMouseEnterProject = () => {
    if (projectDropdownTimeoutRef.current) clearTimeout(projectDropdownTimeoutRef.current);
    setProjectHover(true);
  };

  const handleMouseLeaveProject = () => {
    projectDropdownTimeoutRef.current = setTimeout(() => {
      setProjectHover(false);
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
    <header 
      id="floating-navbar"
      className="fixed top-4 sm:top-5 inset-x-4 sm:inset-x-8 max-w-7xl mx-auto z-50 bg-black/65 backdrop-blur-md border border-white/20 shadow-2xl shadow-black/80 transition-all rounded-none"
      style={{ borderRadius: '0px' }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Left Brand Identity matching the reference image layout */}
          <Link 
            to="/" 
            id="navbar-brand-link" 
            className="flex items-center gap-3 group select-none py-2"
          >
            {/* Custom Department Monogram / Academic Logo */}
            <div 
              className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-black/80 border border-white/25 group-hover:border-white transition-colors shadow-md"
              style={{ borderRadius: '0px' }}
            >
              <div className="relative flex flex-col items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-black tracking-tighter text-white font-mono">
                  GCEE
                </span>
              </div>
              <div 
                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-none border border-black animate-pulse" 
                style={{ borderRadius: '0px' }}
              />
            </div>

            {/* Department Text in two uppercase lines matching reference image */}
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-cyan-400 leading-tight">
                HackXpo ’26
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] uppercase font-mono tracking-widest text-slate-300/80 leading-none mt-0.5">
               Department of Information Technology
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links matching reference screenshot */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="navbar-desktop-nav">
            
            {/* 1. HOME */}
            <Link
              to="/"
              id="nav-link-home"
              style={{ borderRadius: '0px' }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-all duration-150 rounded-none ${
                isHomeActive
                  ? 'text-white bg-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {isHomeActive && <span className="text-white text-xs">▪</span>}
              <span>Home</span>
            </Link>

            {/* 2. PROJECT with HOVER DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnterProject}
              onMouseLeave={handleMouseLeaveProject}
            >
              <Link
                to="/projects"
                id="nav-link-project"
                style={{ borderRadius: '0px' }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-all duration-150 rounded-none ${
                  isProjectsActive || projectHover
                    ? 'text-white bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isProjectsActive && <span className="text-white text-xs">▪</span>}
                <span>Project</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${projectHover ? 'rotate-180 text-white' : 'text-slate-400'}`} />
              </Link>

              {/* Hover Dropdown Menu */}
              {projectHover && (
                <div 
                  id="nav-project-dropdown-menu"
                  className="absolute left-0 top-full pt-2 w-52 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div 
                    className="rounded-none bg-[#090909] border border-slate-700/90 shadow-2xl shadow-black/80 overflow-hidden p-2 backdrop-blur-xl"
                    style={{ borderRadius: '0px' }}
                  >
                    <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 border-b border-slate-800 mb-1 flex items-center justify-between">
                      <span>Browse Projects</span>
                      <span className="text-cyan-400">HackXpo '26</span>
                    </div>

                    <div className="space-y-1">
                      <Link
                        to="/projects"
                        style={{ borderRadius: '0px' }}
                        className={`flex items-start gap-3 p-2.5 rounded-none transition-all ${
                          location.pathname === '/projects'
                            ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                            : 'text-slate-200 hover:bg-slate-800/70 hover:text-white'
                        }`}
                      >
                        <div 
                          style={{ borderRadius: '0px' }}
                          className={`p-2 rounded-none ${location.pathname === '/projects' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400'}`}
                        >
                          <Layers className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold uppercase tracking-wider">All Projects</span>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">View all 2nd & 3rd year</p>
                        </div>
                      </Link>

                      <Link
                        to="/projects/3rd-year"
                        style={{ borderRadius: '0px' }}
                        className={`flex items-start gap-3 p-2.5 rounded-none transition-all ${
                          location.pathname === '/projects/3rd-year'
                            ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                            : 'text-slate-200 hover:bg-slate-800/70 hover:text-white'
                        }`}
                      >
                        <div 
                          style={{ borderRadius: '0px' }}
                          className={`p-2 rounded-none ${location.pathname === '/projects/3rd-year' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400'}`}
                        >
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold uppercase tracking-wider">3rd Year</span>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">Advanced research & ML systems</p>
                        </div>
                      </Link>

                      <Link
                        to="/projects/2nd-year"
                        style={{ borderRadius: '0px' }}
                        className={`flex items-start gap-3 p-2.5 rounded-none transition-all ${
                          location.pathname === '/projects/2nd-year'
                            ? 'bg-purple-950/60 text-purple-300 border border-purple-500/30'
                            : 'text-slate-200 hover:bg-slate-800/70 hover:text-white'
                        }`}
                      >
                        <div 
                          style={{ borderRadius: '0px' }}
                          className={`p-2 rounded-none ${location.pathname === '/projects/2nd-year' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800/80 text-slate-400'}`}
                        >
                          <FolderGit2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold uppercase tracking-wider">2nd Year</span>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">Full-stack prototypes & campus tech</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. GALLERY */}
            <Link
              to="/gallery"
              id="nav-link-gallery"
              style={{ borderRadius: '0px' }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-all duration-150 rounded-none ${
                isGalleryActive
                  ? 'text-white bg-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {isGalleryActive && <span className="text-white text-xs">▪</span>}
              <span>Gallery</span>
            </Link>

            {/* 4. MENTORS */}
            <Link
              to="/mentors"
              id="nav-link-mentors"
              style={{ borderRadius: '0px' }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-all duration-150 rounded-none ${
                isMentorsActive
                  ? 'text-white bg-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {isMentorsActive && <span className="text-white text-xs">▪</span>}
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
                style={{ borderRadius: '0px' }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-all duration-150 rounded-none cursor-pointer ${
                  isMoreActive || moreHover
                    ? 'text-white bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                aria-expanded={moreHover}
              >
                {isMoreActive && <span className="text-white text-xs">▪</span>}
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreHover ? 'rotate-180 text-white' : 'text-slate-400'}`} />
              </button>

              {/* Hover Dropdown Menu */}
              {moreHover && (
                <div 
                  id="nav-more-dropdown-menu"
                  className="absolute right-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div 
                    className="rounded-none bg-[#090909] border border-slate-700/90 shadow-2xl shadow-black/80 overflow-hidden p-2 backdrop-blur-xl"
                    style={{ borderRadius: '0px' }}
                  >
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
                            style={{ borderRadius: '0px' }}
                            className={`flex items-start gap-3 p-2.5 rounded-none transition-all ${
                              isCurrent
                                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                                : 'text-slate-200 hover:bg-slate-800/70 hover:text-white'
                            }`}
                          >
                            <div 
                              style={{ borderRadius: '0px' }}
                              className={`p-2 rounded-none ${isCurrent ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400'}`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                {isCurrent && <span className="w-1.5 h-1.5 rounded-none bg-cyan-400"></span>}
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
              style={{ borderRadius: '0px' }}
              className="p-2 rounded-none bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div 
          style={{ borderRadius: '0px' }}
          className="lg:hidden bg-[#070707]/98 border-t border-slate-700 backdrop-blur-2xl px-5 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200 rounded-none"
        >
          <div className="grid grid-cols-2 gap-2">
            
            <Link
              to="/"
              style={{ borderRadius: '0px' }}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider ${
                isHomeActive ? 'bg-slate-800 text-white border border-slate-600' : 'bg-slate-900/60 text-slate-300'
              }`}
            >
              {isHomeActive && <span className="text-cyan-400 text-xs">■</span>}
              <span>Home</span>
            </Link>

            {/* Mobile Project Accordion */}
            <div>
              <button
                onClick={() => setProjectMobileOpen(!projectMobileOpen)}
                style={{ borderRadius: '0px' }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider ${
                  isProjectsActive || projectMobileOpen ? 'bg-slate-800 text-white border border-slate-600' : 'bg-slate-900/60 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isProjectsActive && <span className="text-cyan-400 text-xs">■</span>}
                  <span>Project</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${projectMobileOpen ? 'rotate-180' : ''}`} />
              </button>

              {projectMobileOpen && (
                <div className="grid grid-cols-1 gap-2 mt-2 pl-1">
                  <Link
                    to="/projects"
                    style={{ borderRadius: '0px' }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-none text-xs font-medium ${
                      location.pathname === '/projects' ? 'bg-slate-800 text-white border border-slate-600' : 'bg-slate-900/50 text-slate-300'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>All Projects</span>
                  </Link>
                  <Link
                    to="/projects/3rd-year"
                    style={{ borderRadius: '0px' }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-none text-xs font-medium ${
                      location.pathname === '/projects/3rd-year' ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/30' : 'bg-slate-900/50 text-slate-300'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>3rd Year</span>
                  </Link>
                  <Link
                    to="/projects/2nd-year"
                    style={{ borderRadius: '0px' }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-none text-xs font-medium ${
                      location.pathname === '/projects/2nd-year' ? 'bg-purple-950/70 text-purple-300 border border-purple-500/30' : 'bg-slate-900/50 text-slate-300'
                    }`}
                  >
                    <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>2nd Year</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/gallery"
              style={{ borderRadius: '0px' }}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider ${
                isGalleryActive ? 'bg-slate-800 text-white border border-slate-600' : 'bg-slate-900/60 text-slate-300'
              }`}
            >
              {isGalleryActive && <span className="text-cyan-400 text-xs">■</span>}
              <span>Gallery</span>
            </Link>

            <Link
              to="/mentors"
              style={{ borderRadius: '0px' }}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider ${
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
              style={{ borderRadius: '0px' }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-none bg-slate-900/90 text-xs font-bold uppercase tracking-wider text-slate-200 border border-slate-800"
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
                      style={{ borderRadius: '0px' }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-none text-xs font-medium ${
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
