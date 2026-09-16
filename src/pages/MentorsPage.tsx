import React, { useEffect, useState } from 'react';
import { studentMentorsData } from '../data/mentors';
import { 
  Users, 
  Linkedin,
  Maximize2,
  X
} from 'lucide-react';

export const MentorsPage: React.FC = () => {
  const [isFullView, setIsFullView] = useState(false);

  useEffect(() => {
    if (!isFullView) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullView(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullView]);

  return (
    <div className={`mentors-page min-h-screen text-slate-100 pt-10 pb-12 tech-grid-bg ${isFullView ? 'mentors-page--fullscreen' : ''}`}>
      <div className="mentors-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Page Header */}
        <div className="mentors-showcase-header relative text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>Student Mentors</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Student Mentor Showcase
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Peer leaders from HackXpo '26 guiding their teams through architecture decisions, code reviews, and sprint planning.
          </p>
        </div>      
        {/* Mentors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {studentMentorsData.map((mentor, idx) => (
            <div
              key={idx}
              className="mentor-card group relative rounded-none overflow-hidden bg-[#0A0A0A] border border-slate-800/60 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)]"
            >
              {/* Top Accent Bar */}
              <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />
              <div className="p-5 flex flex-col items-center text-center">
                {/* Photo with ring glow */}
                <div className="relative mb-4">
                  <div className="relative w-20 h-20 rounded-none overflow-hidden border-2 border-slate-700/80 group-hover:border-cyan-400/60 transition-all duration-500">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Year Badge on photo */}
                </div>

                {/* Name */}
                <h3 className="mt-3 text-sm font-heading font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 leading-tight">
                  {mentor.name}
                </h3>

                {/* Designation */}
                <p className="mt-1 text-[11px] text-cyan-400/80 font-medium">
                  {mentor.designation}
                </p>

                {/* Divider */}
                <div className="w-8 h-px bg-slate-800 my-3" />

                {/* Team Name */}
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-none bg-slate-800/60 text-slate-300 border border-slate-700/50">
                  {mentor.teamName}
                </span>

                {/* Project Name */}
                <p className="mt-2 text-[10px] text-slate-500 leading-relaxed line-clamp-2 min-h-[28px]">
                  {mentor.projectName}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="px-5 pb-5">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-none bg-slate-800/50 hover:bg-slate-800 text-[11px] font-medium text-slate-400 hover:text-cyan-300 border border-slate-700/40 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <Linkedin className="w-3 h-3" />
                  <span>Connect</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mentorship Philosophy Callout */}
        <div className="p-8 rounded-none bg-slate-900/40 border border-slate-800 text-center max-w-4xl mx-auto space-y-3">
          <Users className="w-8 h-8 text-cyan-400 mx-auto" />
          <h3 className="text-xl font-heading font-bold text-white">Mentorship at HackXpo '26</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Each team is assigned a senior student mentor who conducts weekly syncs, guiding problem definition, algorithmic complexity, hardware selection, and pitch presentation fidelity.
          </p>
        </div>

      </div>
    </div>
  );
};
