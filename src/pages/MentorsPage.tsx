import React, { useState } from 'react';
import { mentorsData } from '../data/mentors';
import { 
  Award, 
  GraduationCap, 
  Linkedin, 
  Briefcase, 
  BookOpen, 
  ExternalLink,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const MentorsPage: React.FC = () => {
  const [filterType, setFilterType] = useState<'All' | 'Faculty' | 'Industry'>('All');

  const filteredMentors = mentorsData.filter((m) => {
    if (filterType === 'All') return true;
    return m.type === filterType;
  });

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 py-12 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>Academic & Industry Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Mentors & Faculty Showcase
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Guidance from departmental research scholars and distinguished alumni engineers powering HackXpo ’26 teams through rigorous architecture and code reviews.
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center p-1.5 rounded-none bg-slate-900 border border-slate-800">
            <button
              onClick={() => setFilterType('All')}
              className={`px-4 py-2 rounded-none text-xs font-semibold transition-all ${
                filterType === 'All' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Mentors ({mentorsData.length})
            </button>
            <button
              onClick={() => setFilterType('Faculty')}
              className={`px-4 py-2 rounded-none text-xs font-semibold transition-all flex items-center gap-1.5 ${
                filterType === 'Faculty' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-purple-300'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Department Faculty ({mentorsData.filter(m => m.type === 'Faculty').length})</span>
            </button>
            <button
              onClick={() => setFilterType('Industry')}
              className={`px-4 py-2 rounded-none text-xs font-semibold transition-all flex items-center gap-1.5 ${
                filterType === 'Industry' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Industry & Alumni ({mentorsData.filter(m => m.type === 'Industry').length})</span>
            </button>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="group rounded-none bg-gradient-to-b from-[#0C111E] to-[#070A12] border border-slate-800/90 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Photo & Type Tag */}
                <div className="relative mb-5">
                  <div className="w-24 h-24 mx-auto rounded-none overflow-hidden border-2 border-slate-700 group-hover:border-cyan-400 transition-colors shadow-lg">
                    <img
                      src={mentor.photo}
                      alt={mentor.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-none text-[10px] font-mono font-semibold uppercase tracking-wider border shadow-md ${
                    mentor.type === 'Faculty'
                      ? 'bg-purple-950 text-purple-300 border-purple-600/50'
                      : 'bg-cyan-950 text-cyan-300 border-cyan-600/50'
                  }`}>
                    {mentor.type}
                  </span>
                </div>

                {/* Name & Designation */}
                <div className="text-center space-y-1 mt-4">
                  <h3 className="text-base font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {mentor.name}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400">
                    {mentor.designation}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {mentor.organization}
                  </p>
                </div>

                {/* Domain Pill */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
                  <span className="inline-block text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800/90 text-slate-300 border border-slate-700">
                    {mentor.domain}
                  </span>
                </div>

                {/* Bio text */}
                <p className="text-xs text-slate-300 mt-3 leading-relaxed text-center line-clamp-3">
                  {mentor.bio}
                </p>
              </div>

              {/* Bottom LinkedIn link */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center">
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Connect Profile</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mentorship Philosophy Callout */}
        <div className="p-8 rounded-none bg-slate-900/40 border border-slate-800 text-center max-w-4xl mx-auto space-y-3">
          <GraduationCap className="w-8 h-8 text-purple-400 mx-auto" />
          <h3 className="text-xl font-heading font-bold text-white">Mentorship at HackXpo ’26</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Mentors maintain scheduled hourly syncs with all participating 2nd and 3rd year teams, guiding problem definition, algorithmic complexity, hardware selection, and pitch presentation fidelity.
          </p>
        </div>

      </div>
    </div>
  );
};
