import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import {
  Search,
  Filter,
  Layers,
  X,
  GraduationCap,
  Code2,
  ArrowLeft
} from 'lucide-react';

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

export const Projects3rdYearPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All Tech');

  const thirdYearProjects = useMemo(() => {
    return projectsData.filter((p) => p.year === '3rd Year');
  }, []);

  const filteredProjects = useMemo(() => {
    return thirdYearProjects.filter((p) => {
      if (selectedTech !== 'All Tech' && !p.techStack.some(t => t.toLowerCase().includes(selectedTech.toLowerCase()))) return false;

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
  }, [thirdYearProjects, selectedTech, searchQuery]);

  const isFiltering = searchQuery !== '' || selectedTech !== 'All Tech';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTech('All Tech');
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 py-12 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Projects</span>
        </Link>

        {/* Page Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>3rd Year Cohort</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            3rd Year Student Projects
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Advanced research architectures, machine learning models, and complex systems engineered by <strong>3rd Year</strong> students.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="p-6 rounded-none bg-[#0A0E17]/90 border border-slate-800 backdrop-blur-md space-y-6 shadow-xl" style={{ borderRadius: '0px' }}>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project name, tech stack, or team..."
                className="w-full pl-10 pr-10 py-3 bg-slate-900/90 border border-slate-800 rounded-none text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                style={{ borderRadius: '0px' }}
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

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono px-3 py-1.5 rounded-none bg-cyan-500/10 text-cyan-300 border border-cyan-500/20" style={{ borderRadius: '0px' }}>
                {filteredProjects.length} Projects
              </span>
              {isFiltering && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-mono text-slate-400 shrink-0 flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Tech:
            </span>
            {popularTechStacks.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                style={{ borderRadius: '0px' }}
                className={`px-2.5 py-1 rounded-none text-xs font-mono shrink-0 transition-colors ${
                  selectedTech === tech
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-none border border-slate-800 space-y-4" style={{ borderRadius: '0px' }}>
            <Layers className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-xl font-heading font-bold text-white">No projects match your filter</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Try adjusting your search keywords or clearing the tech stack selector.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
