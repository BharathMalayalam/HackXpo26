import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Sparkles, 
  GraduationCap, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Code2, 
  User, 
  Linkedin, 
  Mail,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { LightboxModal } from '../components/LightboxModal';
import { GalleryItem } from '../types';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryItem | null>(null);

  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-slate-100 flex flex-col items-center justify-center p-6 tech-grid-bg">
        <div className="text-center space-y-4 max-w-md">
          <span className="text-4xl font-mono text-cyan-400">404</span>
          <h1 className="text-2xl font-heading font-bold text-white">Project Not Found</h1>
          <p className="text-sm text-slate-400">
            The requested project identifier could not be located in the HackXpo ’26 registry.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-cyan-500 text-black font-semibold text-sm hover:bg-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  const is3rdYear = project.year === '3rd Year';

  // Convert project gallery images to GalleryItem format for lightbox
  const galleryItems: GalleryItem[] = project.galleryImages.map((url, idx) => ({
    id: `proj-img-${idx}`,
    title: `${project.title} — Screenshot ${idx + 1}`,
    category: 'Project Demos',
    imageUrl: url,
    caption: `System architecture & live interface screenshot for ${project.title}`
  }));

  // Other projects in same year
  const siblingProjects = projectsData.filter((p) => p.year === project.year && p.id !== project.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-black text-slate-100 py-8 sm:py-12 tech-grid-bg">
      
      {/* Lightbox for screenshots */}
      <LightboxModal
        item={selectedGalleryImage}
        items={galleryItems}
        onClose={() => setSelectedGalleryImage(null)}
        onSelect={(item) => setSelectedGalleryImage(item)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Project Index</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>HackXpo ’26</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-400">{project.year}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white truncate max-w-[140px] sm:max-w-xs">{project.teamName}</span>
          </div>
        </div>

        {/* HERO BANNER BLOCK */}
        <div className="relative rounded-none overflow-hidden border border-slate-800 bg-[#090D18] shadow-2xl" style={{ borderRadius: '0px' }}>
          <div className="relative h-72 sm:h-96 w-full overflow-hidden">
            <img 
              src={project.bannerImage} 
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-[#090D18]/80 to-transparent" />
            
            {/* Header Content on Banner */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
              <div className="space-y-4 max-w-4xl">
                
                {/* Year + Category Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`px-3 py-1 rounded-none text-xs font-mono font-bold uppercase tracking-wider border ${
                    is3rdYear 
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20' 
                      : 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm shadow-purple-500/20'
                  }`}>
                    {project.year} Innovation
                  </span>
                  <span className="px-3 py-1 rounded-none text-xs font-mono bg-slate-900/80 text-slate-300 border border-slate-700/80">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-none text-xs font-mono bg-blue-900/30 text-blue-300 border border-blue-700/40">
                    Team: {project.teamName}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-tight">
                  {project.title}
                </h1>
                <p className="text-sm sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
                  {project.tagline}
                </p>

                {/* Direct Action Links (GitHub + Live Demo) */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none font-semibold text-xs sm:text-sm text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Prototype</span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none font-semibold text-xs sm:text-sm text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Source Repository</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* MAIN BODY: 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT 8 COLS: Detailed Technical Specs */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview / Abstract */}
            <div className="p-6 sm:p-8 rounded-none bg-slate-900/60 border border-slate-800 space-y-3" style={{ borderRadius: '0px' }}>
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Executive Summary</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem Statement */}
            <div className="p-6 sm:p-8 rounded-none bg-slate-900/60 border border-slate-800 space-y-3" style={{ borderRadius: '0px' }}>
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-none bg-red-400" />
                <span>Problem Statement</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            {/* Solution Architecture */}
            <div className="p-6 sm:p-8 rounded-none bg-slate-900/60 border border-slate-800 space-y-4" style={{ borderRadius: '0px' }}>
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                <span>Solution Architecture & Engineering Workflow</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.solutionArchitecture}
              </p>

              {/* Key Features */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider text-cyan-400">
                  Core Capabilities & Innovations:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Screenshots & System Interface Gallery */}
            <div className="p-6 sm:p-8 rounded-none bg-slate-900/60 border border-slate-800 space-y-4" style={{ borderRadius: '0px' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <span>Screenshots & System Interfaces</span>
                </h2>
                <span className="text-xs font-mono text-slate-400">Click to expand</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {galleryItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedGalleryImage(item)}
                    className="group relative rounded-none overflow-hidden aspect-video border border-slate-800 cursor-pointer bg-black"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 4 COLS: Team, Mentor & Meta sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Tech Stack Box */}
            <div className="p-6 rounded-none bg-slate-900/60 border border-slate-800 space-y-3" style={{ borderRadius: '0px' }}>
              <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider text-cyan-400 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>Technologies & Frameworks</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-none text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Team Members List */}
            <div className="p-6 rounded-none bg-slate-900/60 border border-slate-800 space-y-4" style={{ borderRadius: '0px' }}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider text-purple-400">
                  Student Team ({project.members.length})
                </h3>
                <span className="text-xs font-mono text-slate-400">{project.year}</span>
              </div>

              <div className="space-y-3 divide-y divide-slate-800/80">
                {project.members.map((member, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-none object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-white">{member.name}</h4>
                        <p className="text-xs text-slate-400">{member.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-none text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          aria-label="GitHub Profile"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-none text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                          aria-label="LinkedIn Profile"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Faculty Mentor Spotlight Card */}
            <div className="p-6 rounded-none bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 space-y-3" style={{ borderRadius: '0px' }}>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                Faculty Mentor
              </span>
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={project.mentor.avatar}
                  alt={project.mentor.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-none object-cover border border-purple-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{project.mentor.name}</h4>
                  <p className="text-xs text-slate-400">{project.mentor.designation}</p>
                </div>
              </div>
            </div>

            {/* Sibling Projects Shortcut */}
            {siblingProjects.length > 0 && (
              <div className="p-6 rounded-none bg-slate-900/60 border border-slate-800 space-y-3" style={{ borderRadius: '0px' }}>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  More {project.year} Projects
                </h3>
                <div className="space-y-2">
                  {siblingProjects.map((sib) => (
                    <Link
                      key={sib.id}
                      to={`/projects/${sib.id}`}
                      className="block p-3 rounded-none bg-slate-900 hover:bg-slate-850 hover:border-cyan-500/30 border border-slate-800 transition-all group"
                    >
                      <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                        {sib.title}
                      </h5>
                      <span className="text-[11px] text-slate-400 font-mono">{sib.teamName}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
