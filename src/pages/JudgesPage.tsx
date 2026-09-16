import React, { useState } from 'react';
import { useYear } from '../context/YearContext';
import { 
  Scale, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Sparkles
} from 'lucide-react';

export const JudgesPage: React.FC = () => {
  const { year, config, data } = useYear();
  const judgesData = data.judges;
  const [activeTab, setActiveTab] = useState<'All' | 'Industry' | 'Academic'>('All');

  const industryList = judgesData.filter((j) => j.category === 'Industry');
  const academicList = judgesData.filter((j) => j.category === 'Academic');

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono">
            <Scale className="w-3.5 h-3.5" />
            <span>Jury & Evaluation Panel</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            {config.label} Judges
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            An esteemed panel of industry experts and academic professionals evaluating projects on innovation, technical depth, and real-world impact.
          </p>
        </div>
        {/* INDUSTRY SECTION */}
        {(activeTab === 'All' || activeTab === 'Industry') && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <span className="p-1.5 rounded-none bg-cyan-500/10 text-cyan-400">
                <Briefcase className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Alumini Jury Panel</h2>
                <p className="text-xs text-slate-400">Technology leaders and domain experts from leading companies</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryList.map((judge) => (
                <div
                  key={judge.id}
                  className="rounded-none bg-gradient-to-b from-[#0F0F0F] to-[#050505] border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-lg"
                >
                  <div className="text-center space-y-3">
                    <img
                      src={judge.photo}
                      alt={judge.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-none mx-auto object-cover border-2 border-slate-700 shadow-md"
                    />
                    <div>
                      <h3 className="text-base font-heading font-bold text-white">{judge.name}</h3>
                      <p className="text-xs font-semibold text-cyan-400 mt-1">{judge.role}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{judge.organization}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400">
                      <Sparkles className="w-3 h-3" />
                      <span>{judge.domain}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      {judge.contactEmail && (
                        <a
                          href={`mailto:${judge.contactEmail}`}
                          className="p-2 rounded-none bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
                          title={judge.contactEmail}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                      {judge.linkedin && (
                        <a
                          href={judge.linkedin}
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
