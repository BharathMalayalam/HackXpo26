import React from 'react';
import { Link } from 'react-router-dom';
import { useYear } from '../context/YearContext';
import { 
  Building2, 
  Terminal, 
  Users, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { year, config } = useYear();

  return (
    <section id="about-section" className="relative py-16 sm:py-24 bg-black/90 backdrop-blur-sm text-slate-100 border-t border-slate-800/80 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Two-Column Section Layout: Left = Department of IT HackXpo Title & Description, Right = Poster */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* ================= LEFT SIDE: TITLE & DESCRIPTION ================= */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Tag / Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>Government College of Engineering, Erode</span>
            </div>

            {/* Main Title as requested: Department of IT HackXpo */}
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight leading-[1.15]">
              Department of IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400">HackXpo'{year}</span>
            </h2>

            {/* Narrative Descriptions */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                {config.label} is the flagship annual technical innovation sprint organized by the <strong className="text-white font-semibold">Department of Information Technology</strong> at <strong className="text-white font-semibold">Government College of Engineering, Erode (formerly IRTT)</strong>. Conceived as an intensive 36-hour continuous hackathon and engineering exhibition, the platform brings together our talented 2nd and 3rd-year undergraduate cohorts to transform theoretical compute principles into production-ready software and hardware systems.
              </p>
            </div>

            {/* Key Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-none bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold mb-1">
                  <Terminal className="w-4 h-4" />
                  <span>36-Hour Hackathon</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Non-stop sprint pushing limits of architectural design, edge AI, cloud scalability, and algorithmic speed.
                </p>
              </div>

              <div className="p-4 rounded-none bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase font-bold mb-1">
                  <Users className="w-4 h-4" />
                  <span>2nd & 3rd Year Synergy</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Collaborative cohort engineering where senior students share systems insights with junior builders.
                </p>
              </div>
            </div>

            {/* Institutional Legacy Mini Strip */}
            <div className="p-4 rounded-none bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block">Host Institution</span>
                <span className="text-xs sm:text-sm font-semibold text-white">GCE Erode • Est. 1984</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-none bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-mono">
                  Anna University Affiliated
                </span>
              </div>
            </div>

            {/* Action buttons on left */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={`/${year}/projects`}
                id="about-explore-projects-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
              >
                <span>View Cohort Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={`/${year}/mentors`}
                id="about-explore-mentors-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none font-semibold text-xs sm:text-sm text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all"
              >
                <span>Meet Mentors & Jury</span>
              </Link>
            </div>

          </div>

          {/* ================= RIGHT SIDE: POSTER OF THE EVENT ================= */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="w-full max-w-md mx-auto">
              
              {/* Poster Header Indicator */}
              <div className="flex items-center justify-between px-2 pb-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Official Event Poster
                </span>
              </div>

              {/* Poster Image */}
              <div className="rounded-none overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-950/40">
                <img
                  src="/Final_page-0001.jpg"
                  alt={`HackXpo'${year} Official Event Poster`}
                  className="w-full h-auto object-contain"
                />
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
