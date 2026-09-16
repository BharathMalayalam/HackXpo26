import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Youtube, 
  Globe, 
  ShieldCheck,
  ChevronRight,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black border-t border-slate-800/80 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-cyan-900/10 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/70">
          
          {/* Col 1 & 2: Institutional Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-none bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-black rounded-none flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-heading text-xl font-bold tracking-tight text-white">
                  HACK<span className="text-cyan-400">XPO</span> <span className="text-purple-400">’26</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">Official Technical Event & Project Showcase</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-300 max-w-md">
              Conducted by the <strong>Department of Information Technology</strong>, Government College of Engineering, Erode (formerly IRTT). A student innovation platform bringing industry-grade prototyping and academic research together.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>NH-544, Vasavi College Post, Chithode, Erode – 638 052, Tamil Nadu, India.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>itdept@gceerode.ac.in • hackxpo@gceerode.ac.in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+91 (0424) 2533279 / 2533379</span>
              </div>
            </div>
          </div>

          {/* Col 3: Exploration */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-none bg-cyan-400"></span>
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  About HackXpo & GCE
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  All Projects (2nd & 3rd Yr)
                </Link>
              </li>
              <li>
                <Link to="/teams" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  Student Teams
                </Link>
              </li>
              <li>
                <Link to="/winners" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  Winners Podium
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Event & People */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-none bg-purple-400"></span>
              Event & People
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/mentors" className="hover:text-purple-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                  Faculty & Mentors
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-purple-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                  Interactive Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-purple-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                  Videos & Demos
                </Link>
              </li>
              <li>
                <Link to="/coordinators" className="hover:text-purple-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                  Organizing Committee
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Institution Badge & Socials */}
          <div className="space-y-4">
            <h4 className="text-white font-heading font-semibold text-sm tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-none bg-emerald-400"></span>
              Accreditation
            </h4>
            <div className="p-3.5 rounded-none bg-slate-900/60 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Autonomous Institution</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Approved by AICTE, New Delhi • Affiliated to Anna University, Chennai.
              </p>
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-300 block mb-2">Connect With Us</span>
              <div className="flex items-center gap-2.5">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-none bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-none bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-slate-700 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-none bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-slate-700 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="http://www.gceerode.ac.in" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-none bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-purple-400 border border-slate-800 hover:border-slate-700 transition-all"
                  aria-label="College Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Department of Information Technology, Government College of Engineering, Erode. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Official Technical Event</span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">HackXpo ’26 Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
