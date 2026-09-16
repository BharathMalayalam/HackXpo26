import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useYear } from '../context/YearContext';

const wallPattern = [
  { left: '2%', top: '5%', width: '18%', height: '200px', rotate: -9 },
  { left: '21%', top: '8%', width: '22%', height: '260px', rotate: 7 },
  { left: '45%', top: '4%', width: '18%', height: '230px', rotate: -6 },
  { left: '66%', top: '7%', width: '20%', height: '240px', rotate: 8 },
  { left: '82%', top: '10%', width: '12%', height: '170px', rotate: -4 },
  { left: '10%', top: '31%', width: '18%', height: '210px', rotate: 6 },
  { left: '31%', top: '38%', width: '24%', height: '310px', rotate: -7 },
  { left: '58%', top: '32%', width: '19%', height: '240px', rotate: 5 },
  { left: '79%', top: '35%', width: '16%', height: '210px', rotate: -5 },
  { left: '16%', top: '60%', width: '20%', height: '230px', rotate: -3 },
  { left: '40%', top: '66%', width: '22%', height: '240px', rotate: 8 },
  { left: '66%', top: '62%', width: '20%', height: '220px', rotate: -6 },
  { left: '88%', top: '57%', width: '8%', height: '130px', rotate: 4 },
  { left: '49%', top: '18%', width: '12%', height: '150px', rotate: 5 },
  { left: '70%', top: '18%', width: '12%', height: '170px', rotate: -8 },
  { left: '25%', top: '18%', width: '10%', height: '150px', rotate: 4 },
] as const;

export const GalleryPage: React.FC = () => {
  const { year, config, data } = useYear();
  const galleryData = data.gallery;
  const [showWall, setShowWall] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [tiltMap, setTiltMap] = useState<Record<string, { x: number; y: number }>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const wallItems = useMemo(
    () =>
      [...galleryData, ...galleryData, ...galleryData].map((item, index) => ({
        ...item,
        ...wallPattern[index % wallPattern.length],
        key: `${item.id}-${index}`,
      })),
    [galleryData]
  );

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
        return;
      }

      if (event.key === 'ArrowLeft') {
        setSelectedIndex(prev => prev === null ? 0 : (prev - 1 + wallItems.length) % wallItems.length);
      }

      if (event.key === 'ArrowRight') {
        setSelectedIndex(prev => prev === null ? 0 : (prev + 1) % wallItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, wallItems.length]);

  const handleTilt = (itemKey: string, clientX: number, clientY: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 10;
    setTiltMap(prev => ({ ...prev, [itemKey]: { x, y } }));
  };

  const nextImage = (direction: -1 | 1) => {
    setSelectedIndex(prev => {
      if (prev === null) return 0;
      return (prev + direction + wallItems.length) % wallItems.length;
    });
  };

  return (
    <>
      <style>{`
        .gallery-page-shell {
          margin: 0;
          padding: 0;
          width: 100%;
          box-sizing: border-box;
          background: #000000;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        .gallery-page-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at center, black 35%, transparent 100%);
          pointer-events: none;
        }

        .gallery-hero {
          position: relative;
          margin: 0;
          padding: 0;
          min-height: calc(100vh - 0px);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(90deg, rgba(2, 6, 23, 0.85), rgba(2, 6, 23, 0.55)),
            radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.18), transparent 22%),
            radial-gradient(circle at 80% 15%, rgba(168, 85, 247, 0.14), transparent 24%),
            url('${galleryData[0]?.imageUrl ?? ''}') center/cover no-repeat;
          overflow: hidden;
          box-sizing: border-box;
        }

        .gallery-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.8));
          pointer-events: none;
        }

        .gallery-hero__content {
          position: relative;
          z-index: 1;
          width: min(1200px, calc(100% - 40px));
          margin: 0;
          padding: 0 0 60px;
          box-sizing: border-box;
        }

        .gallery-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(125, 211, 252, 0.88);
          font-size: 10px;
          font-weight: 600;
          text-shadow: 0 0 18px rgba(34, 211, 238, 0.28);
        }

        .gallery-title {
          margin-top: 18px;
          font-size: clamp(3rem, 6vw, 7rem);
          line-height: 0.92;
          letter-spacing: -0.08em;
          font-weight: 700;
          color: white;
          max-width: 940px;
          text-shadow: 0 18px 36px rgba(0, 0, 0, 0.7);
        }

        .gallery-title span {
          color: #67e8f9;
        }

        .gallery-explore {
          margin-top: 28px;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          border: 1px solid rgba(148,163,184,0.28);
          background: rgba(15, 23, 42, 0.78);
          color: #f8fafc;
          padding: 14px 20px 14px 22px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          border-radius: 0;
          transition: all 0.35s ease;
          backdrop-filter: blur(8px);
          box-shadow: 0 0 0 1px rgba(15,23,42,0.8), 0 18px 40px -20px rgba(34,211,238,0.35);
        }

        .gallery-explore:hover {
          border-color: rgba(34,211,238,0.5);
          background: rgba(8,47,73,0.8);
          transform: translateY(-1px);
          box-shadow: 0 0 22px -6px rgba(34,211,238,0.2);
        }

        .gallery-explore__icon {
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 0;
          background: rgba(34,211,238,0.12);
          border: 1px solid rgba(103,232,249,0.4);
          color: #dbeafe;
        }

        .gallery-wall-stage {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background:
            radial-gradient(circle at 15% 20%, rgba(34, 211, 238, 0.15), transparent 18%),
            radial-gradient(circle at 85% 15%, rgba(168, 85, 247, 0.12), transparent 22%),
            linear-gradient(180deg, #020617 0%, #080b12 52%, #04070b 100%);
        }

        .gallery-wall-stage::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(148,163,184,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.05) 1px, transparent 1px);
          background-size: 42px 42px;
          pointer-events: none;
        }

        .gallery-wall-bar {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: flex-end;
          padding: 14px 22px 0;
        }

        .gallery-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 0;
          padding: 10px 16px;
          border: 1px solid rgba(148,163,184,0.2);
          background: rgba(15,23,42,0.74);
          color: #e2e8f0;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          box-shadow: 0 14px 30px -20px rgba(15,23,42,0.9);
        }

        .gallery-wall {
          position: relative;
          width: 100vw;
          height: 100vh;
          margin: 0;
          overflow: hidden;
        }

        .gallery-photo {
          position: absolute;
          overflow: hidden;
          border-radius: 0;
          border: 1px solid rgba(148,163,184,0.2);
          background: rgba(15, 23, 42, 0.82);
          box-shadow: 0 30px 40px -26px rgba(2,6,23,0.9), 0 0 20px -10px rgba(34,211,238,0.15);
          transition: transform 0.35s ease, box-shadow 0.35s ease, filter 0.35s ease;
          will-change: transform;
        }

        .gallery-photo img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.45s ease, filter 0.45s ease;
        }

        .gallery-photo:hover img {
          transform: scale(1.08);
          filter: brightness(1.08) saturate(1.1);
        }

        .gallery-photo::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(2,6,23,0.4));
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .gallery-photo:hover::after {
          opacity: 1;
        }

        .gallery-photo__label {
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.35s ease, transform 0.35s ease;
          z-index: 2;
          pointer-events: none;
        }

        .gallery-photo:hover .gallery-photo__label {
          opacity: 1;
          transform: translateY(0);
        }

        .gallery-photo__badge {
          border-radius: 0;
          padding: 6px 8px;
          background: rgba(2,6,23,0.78);
          border: 1px solid rgba(34,211,238,0.18);
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(191,219,254,0.95);
        }

        .gallery-photo__view {
          color: rgba(255,255,255,0.95);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .gallery-modal {
          position: fixed;
          inset: 0;
          z-index: 30;
          background: rgba(2,6,23,0.82);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
        }

        .gallery-modal__panel {
          position: relative;
          width: min(1200px, 100%);
          background: rgba(15, 23, 42, 0.92);
          border: 1px solid rgba(148,163,184,0.2);
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 40px 90px -40px rgba(2,6,23,0.9), 0 0 30px -12px rgba(34,211,238,0.18);
        }

        .gallery-modal__image {
          width: 100%;
          height: min(72vh, 760px);
          display: block;
          object-fit: cover;
          background: #020617;
        }

        .gallery-modal__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 22px 22px;
          background: rgba(15,23,42,0.78);
        }

        .gallery-modal__count {
          font-size: 11px;
          letter-spacing: 0.24em;
          font-family: 'JetBrains Mono', monospace;
          color: rgba(103,232,249,0.9);
          text-transform: uppercase;
        }

        .gallery-modal__title {
          margin-top: 8px;
          font-size: clamp(1.2rem, 2vw, 2rem);
          font-weight: 600;
          letter-spacing: -0.04em;
          color: #f8fafc;
        }

        .gallery-modal__close,
        .gallery-modal__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 0;
          border: 1px solid rgba(148,163,184,0.2);
          background: rgba(15,23,42,0.8);
          color: #e2e8f0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }

        .gallery-modal__close:hover,
        .gallery-modal__nav:hover {
          background: rgba(8,47,73,0.7);
          border-color: rgba(34,211,238,0.4);
          transform: translateY(-50%) scale(1.02);
        }

        .gallery-modal__close {
          top: 18px;
          right: 18px;
          transform: none;
        }

        .gallery-modal__close:hover {
          transform: scale(1.02);
        }

        .gallery-modal__nav--prev { left: 18px; }
        .gallery-modal__nav--next { right: 18px; }

        @media (max-width: 768px) {
          .gallery-wall {
            height: 100vh;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            padding: 12px;
          }

          .gallery-photo {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            height: 180px !important;
          }

          .gallery-photo__label {
            left: 8px;
            right: 8px;
            bottom: 8px;
          }

          .gallery-modal {
            padding: 14px;
          }

          .gallery-modal__meta {
            display: block;
            padding: 18px 16px 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * { scroll-behavior: auto !important; }
          .gallery-hero,
          .gallery-explore,
          .gallery-photo,
          .gallery-photo img,
          .gallery-modal__close,
          .gallery-modal__nav,
          .gallery-photo__label {
            transition: none !important;
          }
        }
      `}</style>

      <div className="gallery-page-shell">
        <AnimatePresence mode="wait">
          {!showWall ? (
            <motion.section
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="gallery-hero"
            >
              <div className="gallery-hero__content">
                <p className="gallery-eyebrow">{config.label}</p>
                <h1 className="gallery-title">
                <span>EVENT MEMORY</span>
                </h1>

                <button
                  type="button"
                  className="gallery-explore"
                  onClick={() => setShowWall(true)}
                >
                  Explore Memories
                  <span className="gallery-explore__icon">↓</span>
                </button>
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="wall"
              initial={{ opacity: 0, scale: 0.97, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -18 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="gallery-wall-stage"
            >
              <div className="gallery-wall">
                {wallItems.map((item, index) => {
                  const offset = tiltMap[item.key] ?? { x: 0, y: 0 };
                  return (
                    <motion.button
                      key={item.key}
                      type="button"
                      initial={{ opacity: 0, y: 20, scale: 0.92 }}
                      animate={{
                        opacity: 1,
                        x: offset.x,
                        y: offset.y,
                        rotate: item.rotate + offset.x * 0.6,
                        scale: 1,
                      }}
                      whileHover={{ scale: 1.06, y: -8, rotate: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      onMouseMove={(event) => {
                        const rect = event.currentTarget.getBoundingClientRect();
                        handleTilt(item.key, event.clientX, event.clientY, rect);
                      }}
                      onMouseLeave={() => setTiltMap(prev => ({ ...prev, [item.key]: { x: 0, y: 0 } }))}
                      onClick={() => setSelectedIndex(index)}
                      style={{
                        left: item.left,
                        top: item.top,
                        width: item.width,
                        height: item.height,
                      }}
                      className="gallery-photo"
                    >
                      <img src={item.imageUrl} alt={item.title} loading="lazy" referrerPolicy="no-referrer" />
                      <div className="gallery-photo__label">
                        <span className="gallery-photo__badge">{item.category}</span>
                        <span className="gallery-photo__view">View Moment →</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedIndex !== null && wallItems[selectedIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="gallery-modal"
              onClick={() => setSelectedIndex(null)}
            >
              <button
                type="button"
                aria-label="Close gallery image"
                className="gallery-modal__close"
                onClick={() => setSelectedIndex(null)}
              >
                <X size={18} />
              </button>

              <button
                type="button"
                aria-label="Previous gallery image"
                className="gallery-modal__nav gallery-modal__nav--prev"
                onClick={(event) => {
                  event.stopPropagation();
                  nextImage(-1);
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                aria-label="Next gallery image"
                className="gallery-modal__nav gallery-modal__nav--next"
                onClick={(event) => {
                  event.stopPropagation();
                  nextImage(1);
                }}
              >
                <ChevronRight size={18} />
              </button>

              <motion.div
                key={wallItems[selectedIndex].key}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                onClick={(event) => event.stopPropagation()}
                className="gallery-modal__panel"
              >
                <img
                  src={wallItems[selectedIndex].imageUrl}
                  alt={wallItems[selectedIndex].title}
                  className="gallery-modal__image"
                  referrerPolicy="no-referrer"
                />

                <div className="gallery-modal__meta">
                  <div>
                    <div className="gallery-modal__count">
                      {String((selectedIndex % galleryData.length) + 1).padStart(2, '0')} / {String(galleryData.length).padStart(2, '0')}
                    </div>
                    <div className="gallery-modal__title">{wallItems[selectedIndex].title}</div>
                  </div>
                  <span className="gallery-photo__badge" style={{ background: 'rgba(15,23,42,0.18)', color: '#0f172a', borderColor: 'rgba(15,23,42,0.12)' }}>
                    {wallItems[selectedIndex].category}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          onTouchStart={(event) => {
            setTouchStartX(event.touches[0]?.clientX ?? null);
            setTouchStartY(event.touches[0]?.clientY ?? null);
          }}
          onTouchEnd={(event) => {
            if (selectedIndex === null || touchStartX === null || touchStartY === null) return;
            const deltaX = event.changedTouches[0].clientX - touchStartX;
            const deltaY = event.changedTouches[0].clientY - touchStartY;

            if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
              nextImage(deltaX < 0 ? 1 : -1);
            }

            setTouchStartX(null);
            setTouchStartY(null);
          }}
        />
      </div>
    </>
  );
};
