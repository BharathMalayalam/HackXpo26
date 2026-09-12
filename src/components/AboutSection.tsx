import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  ArrowRight,
  Maximize2,
  Sparkles,
  QrCode,
  X
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [showPosterModal, setShowPosterModal] = useState(false);

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
              Department of IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400">HackXpo'26</span>
            </h2>

            {/* Narrative Descriptions */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                HackXpo ’26 is the flagship annual technical innovation sprint organized by the <strong className="text-white font-semibold">Department of Information Technology</strong> at <strong className="text-white font-semibold">Government College of Engineering, Erode (formerly IRTT)</strong>. Conceived as an intensive 36-hour continuous hackathon and engineering exhibition, the platform brings together our talented 2nd and 3rd-year undergraduate cohorts to transform theoretical compute principles into production-ready software and hardware systems.
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
                to="/projects"
                id="about-explore-projects-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
              >
                <span>View Cohort Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/mentors"
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
                <button
                  type="button"
                  onClick={() => setShowPosterModal(true)}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to Expand</span>
                </button>
              </div>

              {/* Event Poster Card / Canvas */}
              <div 
                onClick={() => setShowPosterModal(true)}
                className="group relative rounded-none overflow-hidden cursor-pointer border border-cyan-500/30 bg-gradient-to-b from-[#0F172A] via-[#0A0E1A] to-[#04060A] shadow-2xl shadow-cyan-950/40 hover:border-cyan-400/60 hover:shadow-cyan-500/20 transition-all duration-300"
              >
                {/* Poster Subtle Glow Accents */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-none blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/15 rounded-none blur-3xl pointer-events-none" />

                {/* Inner Border Frame (Poster Style) */}
                <div className="p-6 sm:p-7 space-y-6 relative z-10 border border-slate-700/50 m-2 rounded-none bg-[#090D18]/90">
                  
                  {/* Institutional Poster Header */}
                  <div className="text-center space-y-1.5 border-b border-slate-800 pb-4">
                    <div className="inline-flex items-center justify-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-none bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                        GCE ERODE • ESTD 1984
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-slate-100 leading-tight">
                      Government College of Engineering, Erode
                    </h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                      (An Autonomous Institution Affiliated with Anna University)
                    </p>
                    <div className="pt-2">
                      <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-none bg-slate-800 text-cyan-300 border border-slate-700">
                        Department of Information Technology
                      </span>
                    </div>
                  </div>

                  {/* Main Event Headline on Poster */}
                  <div className="text-center space-y-2 py-2">
                    <span className="text-[11px] font-mono tracking-widest text-purple-400 uppercase font-semibold">
                      PRESENTS
                    </span>
                    <h3 className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-white leading-none drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                      HACK<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">XPO</span> <span className="text-purple-400">’26</span>
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 uppercase">
                      36-Hour Hackathon & Tech Exhibition
                    </p>
                    <p className="text-[11px] text-slate-400 italic">
                      "Innovate • Code • Engineer Real-World Impact"
                    </p>
                  </div>

                  {/* Poster Key Info Badges */}
                  <div className="grid grid-cols-2 gap-2.5 py-1">
                    <div className="p-3 rounded-none bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Date</span>
                        <span className="text-xs font-bold text-white">OCTOBER 2026</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-none bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Venue</span>
                        <span className="text-xs font-bold text-white">IT Campus Labs</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-none bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-blue-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Cohorts</span>
                        <span className="text-xs font-bold text-white">2nd & 3rd Year IT</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-none bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
                      <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Prizes</span>
                        <span className="text-xs font-bold text-amber-300">Awards & Grants</span>
                      </div>
                    </div>
                  </div>

                  {/* Tracks Strip */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block text-center">
                      Innovation Focus Tracks
                    </span>
                    <div className="flex flex-wrap justify-center gap-1.5 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">Edge AI</span>
                      <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">Smart IoT</span>
                      <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-500/30">Cyber Security</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">Civic Tech</span>
                    </div>
                  </div>

                  {/* Poster Footer with Scan / Convenor stamp */}
                  <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-[10px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-slate-300 font-mono font-bold block">AIT & IT Association</span>
                        <span>GCE Erode Official</span>
                      </div>
                    </div>
                    <div className="text-right font-mono text-[10px]">
                      <span className="text-emerald-400 font-bold">● 36-HOUR CODE</span>
                      <p className="text-slate-500">Live Evaluation</p>
                    </div>
                  </div>

                </div>

                {/* Hover overlay prompt */}
                <div className="absolute inset-0 bg-cyan-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-none bg-slate-900/90 text-white text-xs font-semibold border border-cyan-400/50 shadow-xl flex items-center gap-2">
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    Click to view full poster
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Poster Modal */}
      {showPosterModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowPosterModal(false)}
        >
          <div 
            className="relative w-full max-w-xl bg-[#090D18] border border-cyan-500/50 rounded-none p-6 sm:p-8 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPosterModal(false)}
              className="absolute top-4 right-4 p-2 rounded-none bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster Enlarged Content */}
            <div className="text-center space-y-2 border-b border-slate-800 pb-5">
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                GOVERNMENT COLLEGE OF ENGINEERING, ERODE (IRTT)
              </span>
              <h3 className="text-lg font-bold text-white uppercase">
                Department of Information Technology
              </h3>
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Association of Information Technologists (AIT)
              </p>
            </div>

            <div className="text-center space-y-3 py-4">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest">
                ANNUAL TECHNICAL HACKATHON & PROTOTYPE EXPO
              </span>
              <h2 className="text-5xl sm:text-6xl font-heading font-black text-white leading-tight drop-shadow-[0_0_35px_rgba(6,182,212,0.5)]">
                HACK<span className="text-cyan-400">XPO</span> <span className="text-purple-400">’26</span>
              </h2>
              <p className="text-sm font-semibold text-slate-300">
                36-Hour Continuous Engineering Marathon for 2nd & 3rd Year B.Tech IT
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-none bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-mono">Date</span>
                <span className="text-sm font-bold text-white">OCTOBER 2026</span>
              </div>
              <div className="p-3.5 rounded-none bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-mono">Duration</span>
                <span className="text-sm font-bold text-cyan-400">36 Hours Live</span>
              </div>
              <div className="p-3.5 rounded-none bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-mono">Venue</span>
                <span className="text-sm font-bold text-white">GCE Erode IT Complex</span>
              </div>
              <div className="p-3.5 rounded-none bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-mono">Eligibility</span>
                <span className="text-sm font-bold text-purple-300">2nd & 3rd Yr IT</span>
              </div>
            </div>

            <div className="p-4 rounded-none bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-white block">Key Evaluation Criteria:</span>
              <p>• Working Code & Live Prototype Runtime</p>
              <p>• Hardware/IoT Integration or Edge AI Model Quantization</p>
              <p>• Practicality in Regional & Global Problem Domains</p>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setShowPosterModal(false)}
                className="px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
