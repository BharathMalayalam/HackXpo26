import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { winnersData } from '../data/winners';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Sparkles, 
  ArrowRight, 
  Github, 
  ExternalLink, 
  Users, 
  GraduationCap,
  PartyPopper
} from 'lucide-react';

export const WinnersPage: React.FC = () => {

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  useEffect(() => {
    // Initial celebration burst
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const podium1 = winnersData.find((w) => w.rank === 1);
  const podium2 = winnersData.find((w) => w.rank === 2);
  const podium3 = winnersData.find((w) => w.rank === 3);
  const specialMentions = winnersData.filter((w) => w.rank === 'Special Mention');

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Awards Declaration</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            HackXpo ’26 Winners Podium
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Honoring exceptional engineering rigor, real-world utility, and architectural elegance delivered by 2nd & 3rd Year champions.
          </p>

          <button
            onClick={triggerConfetti}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-slate-900 border border-slate-700 text-xs font-semibold text-amber-300 hover:bg-slate-800 transition-colors shadow-md"
          >
            <PartyPopper className="w-4 h-4 text-amber-400" />
            <span>Celebrate Champions (Confetti)</span>
          </button>
        </div>

        {/* PODIUM SECTION (2nd, 1st, 3rd) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-4">
          
          {/* 2nd Place Podium Card */}
          {podium2 && (
            <div className="order-2 md:order-1 rounded-none p-6 bg-gradient-to-b from-[#0E1528] to-[#070A12] border border-cyan-500/40 shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-none bg-slate-800 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/50 shadow-md flex items-center gap-1.5">
                <Medal className="w-4 h-4 text-cyan-400" />
                <span>2nd Place</span>
              </div>

              <div className="pt-4 space-y-4">
                <div className="relative rounded-none overflow-hidden aspect-video bg-black border border-slate-800">
                  <img src={podium2.thumbnail} alt={podium2.projectName} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-400">
                    {podium2.year}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-cyan-400 font-mono">{podium2.prizePool}</span>
                  <h3 className="text-lg font-heading font-bold text-white mt-0.5">{podium2.teamName}</h3>
                  <p className="text-xs text-slate-300 font-medium mt-1">{podium2.projectName}</p>
                  <p className="text-xs text-slate-400 mt-2 italic leading-relaxed">"{podium2.citation}"</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-1.5 font-mono">Members:</span>
                  <div className="flex flex-wrap gap-1">
                    {podium2.members.map((m, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between">
                <a href={podium2.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white p-1.5">
                  <Github className="w-4 h-4" />
                </a>
                <Link to={`/projects/${podium2.projectId}`} className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  <span>Project Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 1st Place Champion Podium Card (Highlighted & Taller) */}
          {podium1 && (
            <div className="order-1 md:order-2 rounded-none p-8 bg-gradient-to-b from-[#1C170A] via-[#101322] to-[#070A12] border-2 border-amber-500/60 shadow-2xl shadow-amber-500/15 flex flex-col justify-between relative transform md:-translate-y-4">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-none bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-mono font-black border border-amber-300 shadow-xl flex items-center gap-2">
                <Crown className="w-4 h-4 fill-black" />
                <span>GRAND CHAMPIONS — 1ST</span>
              </div>

              <div className="pt-4 space-y-4">
                <div className="relative rounded-none overflow-hidden aspect-video bg-black border border-amber-500/30 shadow-lg">
                  <img src={podium1.thumbnail} alt={podium1.projectName} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-none bg-amber-500 text-black text-[10px] font-mono font-bold">
                    WINNER
                  </div>
                </div>

                <div>
                  <span className="text-sm font-black text-amber-400 font-mono tracking-wide">{podium1.prizePool}</span>
                  <h3 className="text-2xl font-heading font-black text-white mt-1">{podium1.teamName}</h3>
                  <p className="text-sm text-cyan-300 font-medium mt-1">{podium1.projectName}</p>
                  <p className="text-xs text-slate-300 mt-2 italic leading-relaxed">"{podium1.citation}"</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-1.5 font-mono">Champion Builders:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {podium1.members.map((m, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded bg-amber-950/40 text-amber-200 border border-amber-600/40 font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between">
                <a href={podium1.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white p-1.5">
                  <Github className="w-4 h-4" />
                </a>
                <Link to={`/projects/${podium1.projectId}`} className="px-4 py-2 rounded-none bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-1.5">
                  <span>Explore Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 3rd Place Podium Card */}
          {podium3 && (
            <div className="order-3 md:order-3 rounded-none p-6 bg-gradient-to-b from-[#180F26] to-[#070A12] border border-purple-500/40 shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-none bg-slate-800 text-purple-300 text-xs font-mono font-bold border border-purple-500/50 shadow-md flex items-center gap-1.5">
                <Medal className="w-4 h-4 text-purple-400" />
                <span>3rd Place</span>
              </div>

              <div className="pt-4 space-y-4">
                <div className="relative rounded-none overflow-hidden aspect-video bg-black border border-slate-800">
                  <img src={podium3.thumbnail} alt={podium3.projectName} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-purple-400">
                    {podium3.year} Junior Breakthrough
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-purple-400 font-mono">{podium3.prizePool}</span>
                  <h3 className="text-lg font-heading font-bold text-white mt-0.5">{podium3.teamName}</h3>
                  <p className="text-xs text-slate-300 font-medium mt-1">{podium3.projectName}</p>
                  <p className="text-xs text-slate-400 mt-2 italic leading-relaxed">"{podium3.citation}"</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-1.5 font-mono">Members:</span>
                  <div className="flex flex-wrap gap-1">
                    {podium3.members.map((m, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between">
                <a href={podium3.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white p-1.5">
                  <Github className="w-4 h-4" />
                </a>
                <Link to={`/projects/${podium3.projectId}`} className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">
                  <span>Project Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* SPECIAL MENTIONS SECTION */}
        <div className="space-y-6 pt-10 border-t border-slate-800">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Jury Accolades</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              Special Mentions & Domain Honors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialMentions.map((winner, idx) => (
              <div
                key={idx}
                className="p-6 rounded-none bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                      {winner.awardTitle}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{winner.year}</span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white">{winner.teamName}</h3>
                  <p className="text-xs font-semibold text-slate-300">Project: {winner.projectName}</p>
                  <p className="text-xs text-slate-400 leading-relaxed italic">"{winner.citation}"</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {winner.members.map((m, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-medium">{winner.prizePool}</span>
                  <Link
                    to={`/projects/${winner.projectId}`}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>View Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
