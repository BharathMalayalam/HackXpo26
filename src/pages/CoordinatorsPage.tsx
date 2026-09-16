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
  Award,
  Zap,
  Building2,
  Crown,
  Star,
  Trophy
} from 'lucide-react';

export const CoordinatorsPage: React.FC = () => {
  const { year, config, data } = useYear();
  const coordinatorsData = data.coordinators;
  const [activeTab, setActiveTab] = useState<'All' | 'Faculty' | 'Student'>('All');

  const facultyList = coordinatorsData.filter((c) => c.category === 'Faculty Coordinator');
  const studentList = coordinatorsData.filter((c) => c.category === 'Student Committee');
  
  const chiefConvener = facultyList.find((c) => c.coordinatorType === 'ait');
  const technicalCoordinator = facultyList.find((c) => c.coordinatorType === 'expo');

  const thirdYearStudents = studentList.filter((s) => s.year === '3rd Year');
  const secondYearStudents = studentList.filter((s) => s.year === '2nd Year');

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 tech-grid-bg relative overflow-hidden">
      {/* Ambient Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>Organizing Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              {config.label}
            </span>
            <span className="text-white ml-3">Organizing Committee</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            The dedicated team of department faculty conveners and student organizing leads orchestrating infrastructure, technical evaluation, and event execution.
          </p>
        </div>

        {/* Tab Switcher */}
        {/* FACULTY SECTION */}
        {(activeTab === 'All' || activeTab === 'Faculty') && (
          <div className="space-y-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b border-slate-800/60 pb-4">
              <span className="p-2.5 rounded-none bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <GraduationCap className="w-6 h-6" />
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-bold text-white">Faculty Conveners</h2>
                <p className="text-xs text-slate-400 mt-0.5">Department of Information Technology, Government College of Engineering, Erode</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-none bg-purple-500/10 border border-purple-500/20">
                <span className="text-xs font-mono text-purple-300">{facultyList.length} Members</span>
              </div>
            </div>

            {/* Faculty Cards - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Chief Convener - Featured Card */}
              {chiefConvener && (
                <div className="group relative">
                  {/* Top Accent Bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600" />
                  
                  <div className="relative rounded-none bg-gradient-to-b from-[#1a1528] via-[#0F0F0F] to-[#050505] border-2 border-purple-500/40 p-8 transition-all duration-500 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/15">
                    {/* Badge */}
                    <div className="absolute -top-4 left-8 flex items-center gap-1.5 px-3 py-1 rounded-none bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-500/30">
                      <Crown className="w-3.5 h-3.5" />
                      <span>Expo Coordinator</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-4">
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={chiefConvener.photo}
                          alt={chiefConvener.name}
                          referrerPolicy="no-referrer"
                          className="w-28 h-28 rounded-none object-cover border-2 border-purple-500/40 shadow-xl shadow-purple-500/20 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-center sm:text-left space-y-3">
                        <div>
                          <h3 className="text-xl font-heading font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                            {chiefConvener.name}
                          </h3>
                          <p className="text-sm font-semibold text-purple-400 mt-1">{chiefConvener.role}</p>
                        </div>
                        
                        <div className="flex items-center justify-center sm:justify-start gap-2 px-3 py-1.5 rounded-none bg-slate-900/60 border border-slate-800/60 w-fit">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-[11px] text-slate-300 font-medium">{chiefConvener.department}</span>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                          {chiefConvener.contactEmail && (
                            <a
                              href={`mailto:${chiefConvener.contactEmail}`}
                              className="group/link flex items-center gap-2 px-4 py-2 rounded-none bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-purple-500/30 text-slate-400 hover:text-purple-300 transition-all duration-300"
                              title={chiefConvener.contactEmail}
                            >
                              <Mail className="w-4 h-4" />
                              <span className="text-xs font-medium hidden sm:inline">Email</span>
                            </a>
                          )}
                          {chiefConvener.linkedin && (
                            <a
                              href={chiefConvener.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="group/link flex items-center gap-2 px-4 py-2 rounded-none bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-400 transition-all duration-300"
                              aria-label="LinkedIn"
                            >
                              <Linkedin className="w-4 h-4" />
                              <span className="text-xs font-medium hidden sm:inline">LinkedIn</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Coordinator - Standard Elevated Card */}
              {technicalCoordinator && (
                <div className="group relative">
                  {/* Top Accent Bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
                  
                  <div className="relative rounded-none bg-gradient-to-b from-[#1C170A] via-[#0F0F0F] to-[#050505] border-2 border-amber-500/40 p-8 transition-all duration-500 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/15">
                    {/* Badge */}
                    <div className="absolute -top-4 left-8 flex items-center gap-1.5 px-3 py-1 rounded-none bg-amber-500 text-black text-xs font-bold shadow-lg shadow-amber-500/30">
                      <Zap className="w-3.5 h-3.5" />
                      <span>AIT Coordinator</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-4">
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={technicalCoordinator.photo}
                          alt={technicalCoordinator.name}
                          referrerPolicy="no-referrer"
                          className="w-28 h-28 rounded-none object-cover border-2 border-amber-500/40 shadow-xl shadow-amber-500/20 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-center sm:text-left space-y-3">
                        <div>
                          <h3 className="text-xl font-heading font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                            {technicalCoordinator.name}
                          </h3>
                          <p className="text-sm font-semibold text-amber-400 mt-1">{technicalCoordinator.role}</p>
                        </div>
                        
                        <div className="flex items-center justify-center sm:justify-start gap-2 px-3 py-1.5 rounded-none bg-slate-900/60 border border-slate-800/60 w-fit">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-[11px] text-slate-300 font-medium">{technicalCoordinator.department}</span>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                          {technicalCoordinator.contactEmail && (
                            <a
                              href={`mailto:${technicalCoordinator.contactEmail}`}
                              className="group/link flex items-center gap-2 px-4 py-2 rounded-none bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-amber-500/30 text-slate-400 hover:text-amber-300 transition-all duration-300"
                              title={technicalCoordinator.contactEmail}
                            >
                              <Mail className="w-4 h-4" />
                              <span className="text-xs font-medium hidden sm:inline">Email</span>
                            </a>
                          )}
                          {technicalCoordinator.linkedin && (
                            <a
                              href={technicalCoordinator.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="group/link flex items-center gap-2 px-4 py-2 rounded-none bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-400 transition-all duration-300"
                              aria-label="LinkedIn"
                            >
                              <Linkedin className="w-4 h-4" />
                              <span className="text-xs font-medium hidden sm:inline">LinkedIn</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Faculty Philosophy Callout */}
            <div className="p-6 sm:p-8 rounded-none bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">Faculty Advisory</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our faculty conveners bring decades of academic excellence and industry insight to HACKXPO, 
                ensuring the event maintains the highest standards of technical evaluation and institutional integrity.
              </p>
            </div>
          </div>
        )}

        {/* STUDENT COMMITTEE SECTION */}
        {(activeTab === 'All' || activeTab === 'Student') && (
          <div className="space-y-10 pt-4">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b border-slate-800/60 pb-4">
              <span className="p-2.5 rounded-none bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Users className="w-6 h-6" />
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-bold text-white">Student Organizing Committee</h2>
                <p className="text-xs text-slate-400 mt-0.5">Undergraduate student leadership driving operations, logistics, design & developer relations</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-none bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-xs font-mono text-cyan-300">{studentList.length} Members</span>
              </div>
            </div>

            {/* 3rd Year Students */}
            {thirdYearStudents.length > 0 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {thirdYearStudents.map((coordinator) => (
                    <div key={coordinator.id} className="group relative">
                      {/* Top Accent Bar */}
                      <div className="h-1 w-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-600" />
                      
                      <div className="rounded-none bg-gradient-to-b from-[#0C0C0C] to-[#050505] border border-slate-800/60 p-6 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)]">
                        <div className="flex items-start gap-4">
                          <img
                            src={coordinator.photo}
                            alt={coordinator.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-none object-cover border border-slate-700/60 shrink-0 group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                              {coordinator.year}
                            </span>
                            <h3 className="text-base font-heading font-bold text-white mt-1.5 truncate group-hover:text-cyan-300 transition-colors duration-300">
                              {coordinator.name}
                            </h3>
                            <p className="text-xs font-semibold text-cyan-400">{coordinator.role}</p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{coordinator.department}</p>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-mono text-[10px]">Organizing Wing</span>
                          <div className="flex items-center gap-2">
                            {coordinator.contactEmail && (
                              <a
                                href={`mailto:${coordinator.contactEmail}`}
                                className="p-1.5 text-slate-400 hover:text-white transition-colors duration-200"
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
                                className="p-1.5 text-slate-400 hover:text-white transition-colors duration-200"
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
                                className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                                aria-label="LinkedIn"
                              >
                                <Linkedin className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2nd Year Students */}
            {secondYearStudents.length > 0 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {secondYearStudents.map((coordinator) => (
                    <div key={coordinator.id} className="group relative">
                      {/* Top Accent Bar */}
                      <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600" />
                      
                      <div className="rounded-none bg-gradient-to-b from-[#0C0C0C] to-[#050505] border border-slate-800/60 p-6 flex flex-col justify-between transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]">
                        <div className="flex items-start gap-4">
                          <img
                            src={coordinator.photo}
                            alt={coordinator.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-none object-cover border border-slate-700/60 shrink-0 group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-purple-950/80 text-purple-300 border border-purple-800/40">
                              {coordinator.year}
                            </span>
                            <h3 className="text-base font-heading font-bold text-white mt-1.5 truncate group-hover:text-purple-300 transition-colors duration-300">
                              {coordinator.name}
                            </h3>
                            <p className="text-xs font-semibold text-purple-400">{coordinator.role}</p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{coordinator.department}</p>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-mono text-[10px]">Organizing Wing</span>
                          <div className="flex items-center gap-2">
                            {coordinator.contactEmail && (
                              <a
                                href={`mailto:${coordinator.contactEmail}`}
                                className="p-1.5 text-slate-400 hover:text-white transition-colors duration-200"
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
                                className="p-1.5 text-slate-400 hover:text-white transition-colors duration-200"
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
                                className="p-1.5 text-slate-400 hover:text-purple-400 transition-colors duration-200"
                                aria-label="LinkedIn"
                              >
                                <Linkedin className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Committee Mission Callout */}
            <div className="p-6 sm:p-8 rounded-none bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Award className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-300">Student Leadership</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our student committee members are handpicked from across the department, bringing fresh perspectives 
                and energetic execution to every aspect of HACKXPO — from technical infrastructure to participant experience.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};