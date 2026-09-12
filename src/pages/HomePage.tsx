import React from 'react';
import { AboutSection } from '../components/AboutSection';

export const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* 
        FULL-SCREEN BACKGROUND VIDEO (Viewport-Covering & Layered Behind All Content)
        - fixed position covering 100vw and 100vh
        - muted audio, autoPlay, loop, playsInline
        - reduced opacity (opacity-30 / opacity-40)
        - dark gradient overlays to ensure optimal contrast and readability across the entire page
      */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none -z-10 bg-[#06080F]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-35 filter contrast-125 brightness-90"
          poster="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-computer-hardware-technology-31422-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Ambient Dark Atmospheric Overlays to preserve legibility throughout scrolling */}
        <div className="absolute inset-0 bg-[#06080F]/75 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06080F]/80 via-[#06080F]/65 to-[#06080F]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.14),transparent_60%)]" />
        <div className="absolute -left-24 top-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px]" />
        <div className="absolute right-10 bottom-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px]" />
      </div>

      {/* 1. HERO VIEWPORT SECTION */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-end border-b border-slate-800/80">
        {/* HackXpo'26 placed in bottom corner */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 pt-32">
          <div className="flex flex-col items-start">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tight text-white uppercase select-none leading-none drop-shadow-[0_0_45px_rgba(6,182,212,0.4)]">
              HACK<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500">XPO</span><span className="text-purple-400">’26</span>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION (Two Sides: Left = Department of IT HackXpo Title & Description, Right = Poster of the event) */}
      <AboutSection />

    </div>
  );
};
