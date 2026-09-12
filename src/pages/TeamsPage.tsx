import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { teamsData } from '../data/teams';
import { AcademicYear } from '../types';
import { 
  Users, 
  Search, 
  Sparkles, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle, 
  Layers 
} from 'lucide-react';

export const TeamsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<'All' | AcademicYear>('All');

  const filteredTeams = useMemo(() => {
    return teamsData.filter((team) => {
      if (selectedYear !== 'All' && team.year !== selectedYear) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTeam = team.teamName.toLowerCase().includes(q);
        const matchesProject = team.projectTitle.toLowerCase().includes(q);
        const matchesLead = team.leadName.toLowerCase().includes(q);
        const matchesMembers = team.members.some((m) => m.name.toLowerCase().includes(q));
        if (!matchesTeam && !matchesProject && !matchesLead && !matchesMembers) return false;
      }
      return true;
    });
  }, [selectedYear, searchQuery]);

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 py-12 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>Talent Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Participating Teams & Student Builders
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Meet the developers, systems architects, and machine learning researchers from the 2nd and 3rd Year classes of Information Technology.
          </p>
        </div>

        {/* Search and Cohort Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-none bg-slate-900/80 border border-slate-800">
          {/* Search Box */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team name, student, or project..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-none text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Year Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-none bg-slate-950 border border-slate-800 self-stretch sm:self-auto justify-center">
            <button
              onClick={() => setSelectedYear('All')}
              className={`px-3 py-1.5 rounded-none text-xs font-semibold transition-all ${
                selectedYear === 'All' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Teams ({teamsData.length})
            </button>
            <button
              onClick={() => setSelectedYear('3rd Year')}
              className={`px-3 py-1.5 rounded-none text-xs font-semibold transition-all ${
                selectedYear === '3rd Year' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              3rd Year ({teamsData.filter(t => t.year === '3rd Year').length})
            </button>
            <button
              onClick={() => setSelectedYear('2nd Year')}
              className={`px-3 py-1.5 rounded-none text-xs font-semibold transition-all ${
                selectedYear === '2nd Year' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-purple-300'
              }`}
            >
              2nd Year ({teamsData.filter(t => t.year === '2nd Year').length})
            </button>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTeams.map((team) => {
            const is3rdYear = team.year === '3rd Year';

            return (
              <div
                key={team.id}
                className="rounded-none bg-[#090D18] border border-slate-800/90 overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                {/* Team Top Header with Photo */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-950">
                  <img
                    src={team.teamPhoto}
                    alt={team.teamName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-[#090D18]/70 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-none text-xs font-mono font-bold uppercase tracking-wider border backdrop-blur-md ${
                      is3rdYear 
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                        : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    }`}>
                      {team.year}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-none bg-slate-900/90 text-slate-300 border border-slate-700/60 backdrop-blur-md">
                      {team.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                      {team.teamName}
                    </h3>
                    <p className="text-xs text-cyan-400 font-mono mt-0.5 truncate">
                      Project: {team.projectTitle}
                    </p>
                  </div>
                </div>

                {/* Team Meta & Mentorship info */}
                <div className="px-6 py-3 bg-slate-900/50 border-y border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Lead: <strong className="text-white">{team.leadName}</strong></span>
                  <div className="flex items-center gap-1.5 text-purple-300">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[160px]">{team.mentorName}</span>
                  </div>
                </div>

                {/* Nested Student Member Rows */}
                <div className="p-6 space-y-3 flex-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2">
                    Team Members ({team.members.length}):
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {team.members.map((member, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-none bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            referrerPolicy="no-referrer"
                            className="w-9 h-9 rounded-none object-cover border border-slate-700 shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="text-xs font-semibold text-white truncate">{member.name}</h5>
                            <p className="text-[11px] text-slate-400 truncate">{member.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {member.github && (
                            <a
                              href={member.github}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 text-slate-400 hover:text-white"
                              aria-label="GitHub"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 text-slate-400 hover:text-cyan-400"
                              aria-label="LinkedIn"
                            >
                              <Linkedin className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="p-4 sm:px-6 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">Department of IT</span>
                  <Link
                    to={`/projects/${team.projectId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>View Full Project Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
