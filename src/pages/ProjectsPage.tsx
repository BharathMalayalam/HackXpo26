import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useYear } from '../context/YearContext';
import { ProjectCard } from '../components/ProjectCard';
import { AcademicYear } from '../types';
import { 
  Search, 
  Filter, 
  Layers, 
  Sparkles, 
  X, 
  GraduationCap, 
  BookOpen, 
  Code2,
  Check
} from 'lucide-react';

const allCategories = [
  'All',
  'AI & Sustainable AgriTech',
  'IoT & Smart Energy',
  'Web3 & Cybersecurity',
  'Computer Vision & Smart Cities',
  'Full-Stack Web & Campus Tech',
  'Social Impact & AI',
  'Cybersecurity & Networks',
  'Accessibility & Computer Vision'
];

const popularTechStacks = [
  'All Tech',
  'PyTorch',
  'React',
  'FastAPI',
  'YOLOv11',
  'Solidity',
  'MediaPipe',
  'PostgreSQL',
  'MQTT',
  'Docker'
];

export const ProjectsPage: React.FC = () => {
  const { year, config, data } = useYear();
  const projectsData = data.projects;

  const [searchParams, setSearchParams] = useSearchParams();
  const initialYearParam = searchParams.get('year') as AcademicYear | null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<'All' | AcademicYear>(
    initialYearParam === '2nd Year' || initialYearParam === '3rd Year' ? initialYearParam : 'All'
  );
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All Tech');

  // Handle year switch and update URL
  const handleYearChange = (year: 'All' | AcademicYear) => {
    setSelectedYear(year);
    if (year === 'All') {
      searchParams.delete('year');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ year });
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedYear('All');
    setSelectedCategory('All');
    setSelectedTech('All Tech');
    searchParams.delete('year');
    setSearchParams(searchParams);
  };

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      // Year filter
      if (selectedYear !== 'All' && p.year !== selectedYear) return false;

      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Tech Stack filter
      if (selectedTech !== 'All Tech' && !p.techStack.some(t => t.toLowerCase().includes(selectedTech.toLowerCase()))) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesTeam = p.teamName.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesTagline = p.tagline.toLowerCase().includes(q);
        const matchesTech = p.techStack.some(t => t.toLowerCase().includes(q));
        const matchesMembers = p.members.some(m => m.name.toLowerCase().includes(q));

        if (!matchesTitle && !matchesTeam && !matchesDesc && !matchesTagline && !matchesTech && !matchesMembers) {
          return false;
        }
      }

      return true;
    });
  }, [selectedYear, selectedCategory, selectedTech, searchQuery, projectsData]);

  // Explicitly separate for 3rd Year and 2nd Year views
  const thirdYearList = useMemo(() => {
    return filteredProjects.filter((p) => p.year === '3rd Year');
  }, [filteredProjects]);

  const secondYearList = useMemo(() => {
    return filteredProjects.filter((p) => p.year === '2nd Year');
  }, [filteredProjects]);

  const isFiltering = searchQuery !== '' || selectedYear !== 'All' || selectedCategory !== 'All' || selectedTech !== 'All Tech';

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Page Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>Academic Cohort Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            {config.label} Project Index
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Explore working prototypes, production code repositories, and system architecture blueprints engineered by <strong>2nd Year and 3rd Year</strong> students.
          </p>
        </div>

        {/* Search & Filter Control Station */}
        <div className="p-6 rounded-none bg-[#0A0A0A]/90 border border-slate-800 backdrop-blur-md space-y-6 shadow-xl" style={{ borderRadius: '0px' }}>
          
          {/* Top Row: Search Input + Academic Year Tabs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project name, tech stack, team, or student author..."
                className="w-full pl-10 pr-10 py-3 bg-slate-900/90 border border-slate-800 rounded-none text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Academic Year Tab Buttons */}
            <div className="flex items-center p-1.5 rounded-none bg-slate-900 border border-slate-800 shrink-0" style={{ borderRadius: '0px' }}>
              <button
                onClick={() => handleYearChange('All')}
                className={`px-4 py-2 rounded-none text-xs font-semibold transition-all ${
                  selectedYear === 'All' 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Projects ({projectsData.length})
              </button>
              <button
                onClick={() => handleYearChange('3rd Year')}
                className={`px-4 py-2 rounded-none text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedYear === '3rd Year' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                <span className="w-2 h-2 rounded-none bg-cyan-400" />
                3rd Year ({projectsData.filter(p => p.year === '3rd Year').length})
              </button>
              <button
                onClick={() => handleYearChange('2nd Year')}
                className={`px-4 py-2 rounded-none text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedYear === '2nd Year' 
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                    : 'text-slate-400 hover:text-purple-300'
                }`}
              >
                <span className="w-2 h-2 rounded-none bg-purple-400" />
                2nd Year ({projectsData.filter(p => p.year === '2nd Year').length})
              </button>
            </div>

          </div>

          {/* Secondary Filter Row: Tech Stacks & Categories */}
        </div>

        {/* RESULTS SECTION */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-none border border-slate-800 space-y-4" style={{ borderRadius: '0px' }}>
            <Layers className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-xl font-heading font-bold text-white">No projects match your filter</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Try adjusting your search keywords, clearing the tech stack selector, or switching the academic year filter.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-none bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold transition-colors"
              style={{ borderRadius: '0px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* 3RD YEAR PROJECTS SECTION (Shown if 'All' or '3rd Year' is active) */}
            {(selectedYear === 'All' || selectedYear === '3rd Year') && thirdYearList.length > 0 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-none bg-cyan-400 shadow-sm shadow-cyan-400/50" />
                    <div>
                      <h2 className="text-2xl font-heading font-bold text-white">
                        3rd Year Student Projects
                      </h2>
                      <p className="text-xs text-slate-400">
                        Advanced research architectures, machine learning models, and complex systems
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-none bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 self-start sm:self-auto">
                    {thirdYearList.length} Projects
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {thirdYearList.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* 2ND YEAR PROJECTS SECTION (Shown if 'All' or '2nd Year' is active) */}
            {(selectedYear === 'All' || selectedYear === '2nd Year') && secondYearList.length > 0 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-none bg-purple-400 shadow-sm shadow-purple-400/50" />
                    <div>
                      <h2 className="text-2xl font-heading font-bold text-white">
                        2nd Year Student Projects
                      </h2>
                      <p className="text-xs text-slate-400">
                        Full-stack rapid prototypes, accessibility tools, and campus digital solutions
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-none bg-purple-500/10 text-purple-300 border border-purple-500/20 self-start sm:self-auto">
                    {secondYearList.length} Projects
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {secondYearList.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
