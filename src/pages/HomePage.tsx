import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { useYear } from '../context/YearContext';

export const HomePage: React.FC = () => {
  const { year, config } = useYear();
  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden bg-black">
      
      {/* 1. HERO VIEWPORT SECTION (Exact to Screencast Reference Video) */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end border-b border-slate-800/80">
        
        {/* Full-screen Background Video in Grayscale / Monochrome */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-90 scale-105"
            poster="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop"
          >
            <source src="/videos/hero-section-bg.mp4" type="video/mp4" />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4"
              type="video/mp4"
            />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-computer-hardware-technology-31422-large.mp4"
              type="video/mp4"
            />
          </video>

          {/* Dark gradient overlay for text readability as in reference */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/50" />
        </div>

        {/* BOTTOM LEFT CORNER TITLE (Exact to Screencast Reference) */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-10 sm:pb-14 z-20">
          <div className="flex flex-col items-start text-left select-none">
            
            {/* Title with square bullet */}
            <div className="flex items-left gap-3 sm:gap-4">
              <span 
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-white shrink-0 inline-block shadow-md"
                style={{ borderRadius: '0px' }} 
              />
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight text-white uppercase leading-none drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
                HACKXPO'{year}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-bold tracking-[0.18em] text-slate-200 uppercase pl-6.5 sm:pl-8 md:pl-9 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              DEPARTMENT OF INFORMATION TECHNOLOGY • GOVERNMENT COLLEGE OF ENGINEERING, ERODE
            </p>
          </div>
        </div>

      </section>

      {/* 2. ABOUT SECTION */}
      <AboutSection />

    </div>
  );
};
