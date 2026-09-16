import React, { useState } from 'react';
import { useYear } from '../context/YearContext';
import { 
  Users, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Github, 
  ShieldCheck, 
  Sparkles,
  Award
} from 'lucide-react';

export const CoordinatorsPage: React.FC = () => {
  const { year, config, data } = useYear();
  const coordinatorsData = data.coordinators;
  const [activeTab, setActiveTab] = useState<'All' | 'Faculty' | 'Student'>('All');

  const facultyList = coordinatorsData.filter((c) => c.category === 'Faculty Coordinator');
  const studentList = coordinatorsData.filter((c) => c.category === 'Student Committee');

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>Organizing Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            {config.label} Organizing Committee
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            The dedicated team of department faculty conveners and student organizing leads orchestrating infrastructure, technical evaluation, and event execution.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center p-1.5 rounded-none bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('All')}
              className={`px-4 py-2 rounded-none text-xs font-semibold transition-all ${
                activeTab === 'All' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Leadership ({coordinatorsData.length})
            </button>
            <button
              onClick={() => setActiveTab('Faculty')}
              className={`px-4 py-2 rounded-none text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'Faculty' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-purple-300'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Faculty Conveners ({facultyList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('Student')}
              className={`px-4 py-2 rounded-none text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'Student' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Student Committee ({studentList.length})</span>
            </button>
          </div>
        </div>

        {/* FACULTY SECTION */}
        {(activeTab === 'All' || activeTab === 'Faculty') && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="p-1.5 rounded-none bg-purple-500/10 text-purple-400">
                <GraduationCap className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Faculty Conveners & Advisory Board</h2>
                <p className="text-xs text-slate-400">Department of Information Technology, Government College of Engineering, Erode</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facultyList.map((coordinator) => (
                <div
                  key={coordinator.id}
                  className="rounded-none bg-gradient-to-b from-[#0F0F0F] to-[#050505] border border-slate-800 p-6 flex flex-col justify-between hover:border-purple-500/40 transition-all shadow-lg"
                >
                  <div className="text-center space-y-3">
                    <img
                      src={coordinator.photo}
                      alt={coordinator.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-none mx-auto object-cover border-2 border-slate-700 shadow-md"
                    />
                    <div>
                      <h3 className="text-base font-heading font-bold text-white">{coordinator.name}</h3>
                      <p className="text-xs font-semibold text-purple-400 mt-1">{coordinator.role}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{coordinator.department}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-center gap-2">
                    {coordinator.contactEmail && (
                      <a
                        href={`mailto:${coordinator.contactEmail}`}
                        className="p-2 rounded-none bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-purple-300 transition-colors"
                        title={coordinator.contactEmail}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {coordinator.linkedin && (
                      <a
                        href={coordinator.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-none bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENT COMMITTEE SECTION */}
        {(activeTab === 'All' || activeTab === 'Student') && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="p-1.5 rounded-none bg-cyan-500/10 text-cyan-400">
                <Users className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Student Organizing Committee</h2>
                <p className="text-xs text-slate-400">Undergraduate student leadership driving operations, logistics, design & developer relations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentList.map((coordinator) => (
                <div
                  key={coordinator.id}
                  className="rounded-none bg-gradient-to-b from-[#0C0C0C] to-[#050505] border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={coordinator.photo}
                      alt={coordinator.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-none object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                        {coordinator.year}
                      </span>
                      <h3 className="text-base font-heading font-bold text-white mt-1 truncate">{coordinator.name}</h3>
                      <p className="text-xs font-semibold text-cyan-400">{coordinator.role}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{coordinator.department}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">Organizing Wing</span>
                    <div className="flex items-center gap-2">
                      {coordinator.contactEmail && (
                        <a
                          href={`mailto:${coordinator.contactEmail}`}
                          className="p-1.5 text-slate-400 hover:text-white"
                          title={coordinator.contactEmail}
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {coordinator.github && (
                        <a
                          href={coordinator.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-white"
                          aria-label="GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {coordinator.linkedin && (
                        <a
                          href={coordinator.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-cyan-400"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
