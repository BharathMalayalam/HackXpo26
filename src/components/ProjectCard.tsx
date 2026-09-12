import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { Github, ArrowRight, Sparkles, User, GraduationCap, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const is3rdYear = project.year === '3rd Year';

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden glass-panel glass-panel-hover transition-all duration-300 border border-slate-800/80 hover:border-cyan-500/30">
      {/* Thumbnail with overlay gradient */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-950">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-[#080B11]/40 to-transparent" />

        {/* Academic Year Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono border backdrop-blur-md ${
            is3rdYear 
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20' 
              : 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm shadow-purple-500/20'
          }`}>
            {project.year}
          </span>
          {project.featured && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <div>
          {/* Team Name */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-cyan-400/90">{project.teamName}</span>
            <span className="text-[11px] text-slate-400">{project.members.length} Members</span>
          </div>

          {/* Project Title */}
          <h3 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
            <Link to={`/projects/${project.id}`}>
              {project.title}
            </Link>
          </h3>

          {/* Tagline / Short Description */}
          <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span 
              key={idx} 
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Team Summary & Mentor */}
        <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 overflow-hidden">
              {project.members.slice(0, 3).map((member, i) => (
                <img
                  key={i}
                  src={member.avatar}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 object-cover"
                />
              ))}
            </div>
            <span className="text-[11px] text-slate-300 truncate max-w-[120px]">
              {project.members[0].name.split(' ')[0]} +{project.members.length - 1}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate max-w-[130px]" title={project.mentor.name}>
            <GraduationCap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="truncate">{project.mentor.name}</span>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          <Link
            to={`/projects/${project.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-cyan-600/90 border border-slate-700/60 hover:border-cyan-500/50 rounded-xl transition-all duration-200 group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
