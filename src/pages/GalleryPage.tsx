

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { galleryData } from '../data/gallery';
import { GalleryItem } from '../types';

const categoryOptions = ['ALL', 'EVENTS', 'PROJECTS', 'WORKSHOPS', 'STUDENTS', 'MEMORIES'] as const;
type CategoryFilter = (typeof categoryOptions)[number];

const storyStages = [
  { id: '01', label: 'ARRIVAL', caption: 'The energy of the first pulse.' },
  { id: '02', label: 'INNOVATION', caption: 'Ideas turn into prototypes.' },
  { id: '03', label: 'COLLABORATION', caption: 'Teams build together.' },
  { id: '04', label: 'SHOWCASE', caption: 'Solutions meet the crowd.' },
  { id: '05', label: 'CELEBRATION', caption: 'The memories lock in.' },
] as const;

const memoryPattern = [
  { left: '4%', top: '8%', width: '28%', height: '210px', rotate: -9 },
  { left: '33%', top: '4%', width: '25%', height: '230px', rotate: 7 },
  { left: '62%', top: '9%', width: '30%', height: '200px', rotate: -4 },
  { left: '15%', top: '34%', width: '24%', height: '220px', rotate: 6 },
  { left: '46%', top: '35%', width: '34%', height: '260px', rotate: -7 },
  { left: '75%', top: '35%', width: '20%', height: '190px', rotate: 9 },
  { left: '9%', top: '60%', width: '26%', height: '230px', rotate: 3 },
  { left: '40%', top: '68%', width: '29%', height: '220px', rotate: -5 },
  { left: '72%', top: '59%', width: '22%', height: '200px', rotate: 6 },
  { left: '58%', top: '15%', width: '18%', height: '160px', rotate: -2 },
  { left: '22%', top: '14%', width: '16%', height: '150px', rotate: 5 },
  { left: '82%', top: '16%', width: '12%', height: '140px', rotate: -6 },
] as const;

export const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('ALL');
  const [activeStory, setActiveStory] = useState(0);
  const [momentIndex, setMomentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [photoOffsets, setPhotoOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const filmStripRef = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragStartScrollLeft = useRef<number | null>(null);

  const visibleItems = useMemo(() => {
    if (activeFilter === 'ALL') return galleryData;
    return galleryData.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    setMomentIndex(0);
  }, [activeFilter]);

  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= visibleItems.length) {
      setLightboxIndex(Math.max(0, visibleItems.length - 1));
    }
  }, [lightboxIndex, visibleItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
        return;
      }
      if (event.key === 'ArrowLeft') {
        setLightboxIndex(prev => prev === null ? 0 : (prev - 1 + visibleItems.length) % visibleItems.length);
      }
      if (event.key === 'ArrowRight') {
        setLightboxIndex(prev => prev === null ? 0 : (prev + 1) % visibleItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, visibleItems.length]);

  const handleExplore = () => {
    document.getElementById('memory-wall')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const wallItems = useMemo(
    () => visibleItems.map((item, index) => ({ ...item, ...memoryPattern[index % memoryPattern.length] })),
    [visibleItems]
  );

  const filmItems = useMemo(() => [...galleryData, ...galleryData], []);

  const updateTilt = (itemId: string, clientX: number, clientY: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 10;
    setPhotoOffsets(prev => ({ ...prev, [itemId]: { x, y } }));
  };

  const nextMoment = (dir: -1 | 1) => {
    setMomentIndex(prev => (prev + dir + visibleItems.length) % visibleItems.length);
  };

  const filmPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    dragStartScrollLeft.current = filmStripRef.current?.scrollLeft ?? 0;
  };

  const filmPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null || dragStartScrollLeft.current === null || !filmStripRef.current) return;
    const delta = event.clientX - dragStartX.current;
    filmStripRef.current.scrollLeft = dragStartScrollLeft.current - delta;
  };

  const filmPointerUp = () => {
    dragStartX.current = null;
    dragStartScrollLeft.current = null;
  };

  const activeMoment = visibleItems[momentIndex] ?? visibleItems[0];

  return (
    <>
      <style>{`
        .gallery-shell {
          background:
            radial-gradient(circle at top, rgba(59,130,246,0.18), transparent 35%),
            linear-gradient(180deg, #06070b 0%, #090b12 36%, #0b0d13 100%);
          overflow-x: hidden;
        }

        .memory-wall-grid {
          position: relative;
          min-height: 980px;
          overflow: hidden;
        }

        .memory-photo {
          position: absolute;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(15,17,21,0.9);
          box-shadow: 0 30px 60px -25px rgba(2,6,23,0.8), 0 0 0 1px rgba(255,255,255,0.04);
          transform-style: preserve-3d;
        }

        .memory-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .memory-photo:hover img {
          transform: scale(1.08);
        }

        @keyframes film-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .film-track {
          display: flex;
          gap: 18px;
          width: max-content;
          animation: film-scroll 36s linear infinite;
        }

        .film-track:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .memory-wall-grid {
            min-height: auto;
            display: grid;
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .memory-photo {
            position: relative;
            width: 100% !important;
            left: auto !important;
            top: auto !important;
            height: 260px !important;
          }

          .story-rail {
            padding-left: 0;
          }

          .story-rail::before {
            left: 12px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .film-track { animation: none; }
          * { scroll-behavior: auto !important; }
        }
      `}</style>

      <div className="gallery-shell min-h-screen text-white">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(2,6,23,0.8), rgba(2,6,23,0.4)), url(${galleryData[0].imageUrl})`,
              transform: 'scale(1.08)',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.4)_55%,rgba(2,6,23,0.78)_100%)]" />

          <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 lg:px-10 lg:pb-20 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.36em] text-cyan-300/80">HackXpo '26</p>
              <h1 className="text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-8xl">
                WHERE IDEAS <span className="text-cyan-300">BECAME REAL</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm text-slate-300 sm:text-base">
                A living memory wall of prototypes, people, late nights, and the moments that shaped HACKXPO '26.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleExplore}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:border-cyan-400/60 hover:bg-cyan-400/10"
                >
                  Explore memories
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200 transition group-hover:translate-y-1">
                    <ArrowDown size={14} />
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="memory-wall" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">Memory wall</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">The spirit of HACKXPO</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categoryOptions.map(option => (
                <button
                  key={option}
                  onClick={() => setActiveFilter(option)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition ${
                    activeFilter === option
                      ? 'border-cyan-400/70 bg-cyan-400/15 text-white'
                      : 'border-white/10 bg-white/3 text-slate-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="memory-wall-grid">
            {wallItems.map((item, index) => {
              const offset = photoOffsets[item.id] ?? { x: 0, y: 0 };

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIndex(visibleItems.findIndex(entry => entry.id === item.id))}
                  onMouseMove={event => updateTilt(item.id, event.clientX, event.clientY, event.currentTarget.getBoundingClientRect())}
                  onMouseLeave={() => setPhotoOffsets(prev => ({ ...prev, [item.id]: { x: 0, y: 0 } }))}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
                  animate={{
                    x: offset.x,
                    y: offset.y,
                    rotate: item.rotate + offset.x * 0.4,
                  }}
                  whileHover={{ scale: 1.04, y: -8, rotate: 0 }}
                  style={{
                    left: item.left,
                    top: item.top,
                    width: item.width,
                    height: item.height,
                  }}
                  className="memory-photo group"
                >
                  <img src={item.imageUrl} alt={item.title} loading="lazy" referrerPolicy="no-referrer" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-300">{item.category}</p>
                    <div className="mt-3 flex items-center justify-between gap-3 text-left">
                      <div>
                        <p className="text-base font-medium text-white">{item.title}</p>
                        <p className="text-[11px] text-slate-300">{item.description}</p>
                      </div>
                      <span className="text-sm text-white">VIEW MOMENT →</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-300/80">The HackXpo story</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">THE HACKXPO STORY</h2>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="story-rail relative pl-6 sm:pl-8">
              {storyStages.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  data-story-stage
                  onViewportEnter={() => setActiveStory(index)}
                  viewport={{ once: false, amount: 0.7 }}
                  className="relative mb-10 last:mb-0"
                >
                  <div className={`absolute left-[-20px] top-1.5 h-3 w-3 rounded-full border ${activeStory === index ? 'border-cyan-200 bg-cyan-300 shadow-[0_0_25px_rgba(103,232,249,0.9)]' : 'border-slate-500 bg-slate-900'} `} />
                  <div className={`absolute left-[-11px] top-0 h-full w-px ${activeStory >= index ? 'bg-cyan-400/70' : 'bg-slate-700'}`} />
                  <div className={`rounded-2xl border p-4 transition ${activeStory === index ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/5 bg-white/[0.02]'}`}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300">{stage.id}</p>
                    <h3 className="mt-3 text-2xl font-medium text-white">{stage.label}</h3>
                    <p className="mt-2 text-sm text-slate-300">{stage.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={storyStages[activeStory].id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]"
            >
              <div className="relative h-[420px] w-full sm:h-[520px]">
                <img
                  src={galleryData[(activeStory * 2 + 1) % galleryData.length]?.imageUrl || galleryData[0].imageUrl}
                  alt={storyStages[activeStory].label}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300">{storyStages[activeStory].id} • {storyStages[activeStory].label}</p>
                  <p className="mt-4 max-w-md text-lg text-slate-100 sm:text-2xl">{storyStages[activeStory].caption}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mb-8 flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">Photo of the moment</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">ONE MEMORY, SHARPER</h2>
            </div>
            <div className="hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-300 sm:flex">
              <button
                onClick={() => nextMoment(-1)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-2 transition hover:border-cyan-400/60 hover:text-white"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <span className="font-mono text-cyan-300">{String(momentIndex + 1).padStart(2, '0')} / {String(visibleItems.length).padStart(2, '0')}</span>
              <button
                onClick={() => nextMoment(1)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-2 transition hover:border-cyan-400/60 hover:text-white"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]"
            onTouchStart={event => {
              setTouchStartX(event.touches[0]?.clientX ?? null);
              setTouchStartY(event.touches[0]?.clientY ?? null);
            }}
            onTouchEnd={event => {
              if (touchStartX === null || touchStartY === null) return;
              const dx = event.changedTouches[0].clientX - touchStartX;
              const dy = event.changedTouches[0].clientY - touchStartY;
              if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                nextMoment(dx < 0 ? 1 : -1);
              }
              setTouchStartX(null);
              setTouchStartY(null);
            }}
          >
            <motion.div
              key={activeMoment.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={activeMoment.imageUrl}
                alt={activeMoment.title}
                className="h-[420px] w-full object-cover sm:h-[560px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-300">{activeMoment.category}</p>
                    <h3 className="mt-3 text-2xl font-medium text-white sm:text-4xl">{activeMoment.title}</h3>
                  </div>
                  <button
                    onClick={() => setLightboxIndex(momentIndex)}
                    className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white transition hover:border-cyan-400/50 hover:bg-cyan-400/10"
                  >
                    View fullscreen
                  </button>
                </div>
                <p className="mt-3 max-w-xl text-sm text-slate-200">{activeMoment.description}</p>
              </div>
            </motion.div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-300 sm:hidden">
            <button onClick={() => nextMoment(-1)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-2">
              <ChevronLeft size={14} /> Prev
            </button>
            <span className="font-mono text-cyan-300">{String(momentIndex + 1).padStart(2, '0')} / {String(visibleItems.length).padStart(2, '0')}</span>
            <button onClick={() => nextMoment(1)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-2">
              Next <ChevronRight size={14} />
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mb-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">Memories in motion</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">A ROLLING WINDOW OF MOMENTS</h2>
          </div>

          <div
            ref={filmStripRef}
            onPointerDown={filmPointerDown}
            onPointerMove={filmPointerMove}
            onPointerUp={filmPointerUp}
            onPointerLeave={filmPointerUp}
            className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.02] p-4"
          >
            <div className="film-track py-2">
              {filmItems.map((item, index) => (
                <button
                  key={`${item.id}-${index}`}
                  type="button"
                  onClick={() => setLightboxIndex(galleryData.findIndex(entry => entry.id === item.id))}
                  className="group relative h-52 w-72 flex-shrink-0 overflow-hidden rounded-[18px] border border-white/10 bg-slate-900/80 transition hover:border-cyan-400/50"
                >
                  <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-300">{item.category}</p>
                    <p className="mt-2 text-sm font-medium text-white">{item.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {lightboxIndex !== null && visibleItems[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-[#05070d]/95 backdrop-blur-lg"
              onClick={() => setLightboxIndex(null)}
            >
              <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 py-8 sm:px-8">
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-cyan-400/60 hover:bg-cyan-400/10"
                  aria-label="Close gallery item"
                >
                  <X size={18} />
                </button>

                <button
                  onClick={() => setLightboxIndex(prev => prev === null ? 0 : (prev - 1 + visibleItems.length) % visibleItems.length)}
                  className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-cyan-400/60 hover:bg-cyan-400/10 sm:flex"
                  aria-label="Previous gallery item"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setLightboxIndex(prev => prev === null ? 0 : (prev + 1) % visibleItems.length)}
                  className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-cyan-400/60 hover:bg-cyan-400/10 sm:flex"
                  aria-label="Next gallery item"
                >
                  <ChevronRight size={18} />
                </button>

                <motion.div
                  key={visibleItems[lightboxIndex].id}
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  onClick={event => event.stopPropagation()}
                  className="relative mx-auto w-full max-w-5xl"
                >
                  <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/80 shadow-[0_35px_100px_rgba(0,0,0,0.7)]">
                    <img
                      src={visibleItems[lightboxIndex].imageUrl}
                      alt={visibleItems[lightboxIndex].title}
                      className="max-h-[70vh] w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="mt-5 flex flex-col gap-2 text-center sm:mt-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300">
                      {String(lightboxIndex + 1).padStart(2, '0')} / {String(visibleItems.length).padStart(2, '0')}
                    </div>
                    <h3 className="text-2xl font-medium text-white">{visibleItems[lightboxIndex].title}</h3>
                    <p className="text-sm text-slate-300">{visibleItems[lightboxIndex].description}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
