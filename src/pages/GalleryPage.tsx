

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { galleryData } from '../data/gallery';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const ROW_COUNT   = 3;
const TOTAL_COLS  = 20;                           // slots in the infinite loop
const SLOT_ANGLE  = (2 * Math.PI) / TOTAL_COLS;  // radians per slot
const ROW_DIRS: (-1 | 1)[] = [1, -1, 1];

// Physics — deliberately slow and cinematic
const FRICTION         = 0.915;    // velocity decay per frame
const SNAP_SPEED       = 0.08;     // lerp factor toward nearest slot
const SNAP_THRESHOLD   = 0.0015;   // start snapping below this velocity
const SCROLL_SENS      = 0.00055;  // wheel delta → velocity
const KEY_IMPULSE      = 0.022;    // velocity per arrow-key press
const DRAG_SENS        = 0.0009;   // pointer-px → velocity

// Entrance
const ENT_STAGGER      = 48;   // ms delay per column-distance from center
const ENT_ROW_STAGGER  = 85;   // ms extra per row index
const ENT_DURATION     = 580;  // ms for each card blur→sharp
const ENT_NAV_EXTRA    = 380;  // ms after last card → nav appears

const REDUCED = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Types ────────────────────────────────────────────────────────────────────
interface CS {
  visible: boolean;
  x: number;         // translateX (px) — linear, fills screen
  ry: number;        // rotateY (deg) — subtle curve illusion
  scale: number;
  opacity: number;
  mBlur: number;     // motion blur on <img> layer only
  eOp: number;       // entrance opacity
  eBlur: number;     // entrance blur
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const easeOut3   = (t: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);
const normAngle  = (a: number) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
const signedAngle = (a: number) => { const n = normAngle(a); return n > Math.PI ? n - 2 * Math.PI : n; };

// ─── Component ────────────────────────────────────────────────────────────────
export const GalleryPage: React.FC = () => {

  // Viewport-relative card dimensions — recomputed on resize
  const dimRef = useRef({ cardW: 0, cardH: 0, gapX: 0, gapY: 0, slotPx: 0 });

  const computeDims = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Rows fill the full viewport height
    const gapY  = Math.max(6, Math.round(vh * 0.016));
    const cardH = Math.round((vh - gapY * (ROW_COUNT + 1)) / ROW_COUNT);
    const cardW = Math.round(cardH * 1.72);   // ~16:9.3 aspect
    const gapX  = Math.max(6, Math.round(vw * 0.007));
    const slotPx = cardW + gapX;

    dimRef.current = { cardW, cardH, gapX, gapY, slotPx };
  }, []);

  // Row item arrays (looped)
  const rows = useMemo<GalleryItem[][]>(() =>
    Array.from({ length: ROW_COUNT }, (_, r) =>
      Array.from({ length: TOTAL_COLS }, (_, c) =>
        galleryData[(r * TOTAL_COLS + c) % galleryData.length]
      )
    ), []);

  // Physics refs (mutable, live outside React state)
  const anglesRef   = useRef<number[]>(Array(ROW_COUNT).fill(0));
  const velRef      = useRef<number[]>(Array(ROW_COUNT).fill(0));
  const rafRef      = useRef<number>(0);
  const hiddenRef   = useRef(false);
  const expandedRef = useRef(false);

  // Entrance
  const entStartRef = useRef<number | null>(null);
  const entDoneRef  = useRef(REDUCED);

  // Drag
  const dragRef = useRef({ active: false, lastX: 0 });

  // Computed card states written each frame
  const csRef = useRef<CS[][][]>([]);

  // React state (minimal — only triggers re-render)
  const [, bump]      = useState(0);
  const tickRef       = useRef(0);
  const [expanded,    setExpanded]   = useState<GalleryItem | null>(null);
  const [navVisible,  setNavVisible] = useState(REDUCED);
  const [stageScale,  setStageScale] = useState(REDUCED ? 1 : 0.52);

  // Entrance total duration
  const entTotalMs = useMemo(() => {
    const center = Math.floor(TOTAL_COLS / 2);
    let max = 0;
    for (let r = 0; r < ROW_COUNT; r++)
      for (let c = 0; c < TOTAL_COLS; c++)
        max = Math.max(max,
          Math.abs(c - center) * ENT_STAGGER + r * ENT_ROW_STAGGER + ENT_DURATION);
    return max;
  }, []);

  // Init + resize
  useEffect(() => {
    computeDims();
    const ro = new ResizeObserver(computeDims);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [computeDims]);

  // Dolly-in
  useEffect(() => {
    if (REDUCED) { setNavVisible(true); return; }
    const t = setTimeout(() => setStageScale(1), 80);
    return () => clearTimeout(t);
  }, []);

  // ── RAF loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    let lastT = 0;

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      const dt = Math.min(now - lastT, 50);
      lastT = now;
      if (hiddenRef.current) return;

      // Entrance timer
      let entT = Infinity;
      if (!REDUCED) {
        if (entStartRef.current === null) entStartRef.current = now;
        entT = now - entStartRef.current;
        if (!entDoneRef.current && entT >= entTotalMs + ENT_NAV_EXTRA) {
          entDoneRef.current = true;
          setNavVisible(true);
        }
      }

      // Physics
      if (!expandedRef.current) {
        for (let r = 0; r < ROW_COUNT; r++) {
          let v = velRef.current[r] * Math.pow(FRICTION, dt / 16.67);

          if (Math.abs(v) < SNAP_THRESHOLD) {
            const nearest = Math.round(anglesRef.current[r] / SLOT_ANGLE) * SLOT_ANGLE;
            const diff    = nearest - anglesRef.current[r];
            anglesRef.current[r] += diff * SNAP_SPEED;
            if (Math.abs(diff) < 0.0004) { anglesRef.current[r] = nearest; v = 0; }
          }

          velRef.current[r] = v;
          anglesRef.current[r] += v;
        }
      }

      // Card state computation
      const { cardW, slotPx } = dimRef.current;
      const halfVw = window.innerWidth / 2;
      const center = Math.floor(TOTAL_COLS / 2);

      const newCS: CS[][][] = Array.from({ length: ROW_COUNT }, (_, r) =>
        Array.from({ length: TOTAL_COLS }, (_, c): CS[] => {
          const slotAng = c * SLOT_ANGLE;
          const eff     = slotAng - anglesRef.current[r];
          const sa      = signedAngle(eff);

          // Signed slot index (fractional, −½TOTAL_COLS … +½TOTAL_COLS)
          const si = sa / SLOT_ANGLE;

          // LINEAR x-position — cards always fill the screen evenly
          const x = si * slotPx;

          // Cull only when completely outside the visible area (+1 card buffer)
          if (Math.abs(x) > halfVw + cardW) return [{ visible: false } as CS];

          const absI  = Math.abs(si);
          // Subtle visual curve: 7° per slot, capped at 45°
          const ry    = Math.max(-45, Math.min(45, si * 7));
          // Gentle scale falloff — center 4 slots stay at 1.0
          const scale   = 1 - Math.max(0, absI - 2) * 0.038;
          // Gentle opacity fade at edges
          const opacity = 1 - Math.max(0, absI - 1) * 0.09;

          // Motion blur on img only
          const speed = Math.abs(velRef.current[r]);
          const mBlur = REDUCED ? 0 : Math.min(speed * 25, 14);

          // Entrance
          let eOp = 1, eBlur = 0;
          if (!REDUCED && !entDoneRef.current) {
            const dist  = Math.abs(c - center);
            const delay = dist * ENT_STAGGER + r * ENT_ROW_STAGGER;
            const prog  = easeOut3((entT - delay) / ENT_DURATION);
            eOp   = prog;
            eBlur = (1 - prog) * 16;
          }

          return [{ visible: true, x, ry, scale, opacity, mBlur, eOp, eBlur }];
        })
      );

      csRef.current = newCS;
      tickRef.current++;
      bump(tickRef.current);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [entTotalMs]);

  // ── Inputs ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (expandedRef.current) return;
      e.preventDefault();
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      for (let r = 0; r < ROW_COUNT; r++)
        velRef.current[r] += d * SCROLL_SENS * ROW_DIRS[r];
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { if (expandedRef.current) closeCard(); return; }
      if (expandedRef.current) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const dir = e.key === 'ArrowLeft' ? -1 : 1;
        for (let r = 0; r < ROW_COUNT; r++)
          velRef.current[r] += dir * KEY_IMPULSE * ROW_DIRS[r];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPD = useCallback((e: React.PointerEvent) => {
    if (expandedRef.current) return;
    dragRef.current = { active: true, lastX: e.clientX };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPM = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.lastX;
    dragRef.current.lastX = e.clientX;
    for (let r = 0; r < ROW_COUNT; r++)
      velRef.current[r] += dx * DRAG_SENS * ROW_DIRS[r];
  }, []);

  const onPU = useCallback(() => { dragRef.current.active = false; }, []);

  useEffect(() => {
    const fn = () => { hiddenRef.current = document.hidden; };
    document.addEventListener('visibilitychange', fn);
    return () => document.removeEventListener('visibilitychange', fn);
  }, []);

  // ── Card expand / close ───────────────────────────────────────────────────
  const openCard = useCallback((item: GalleryItem) => {
    if (expandedRef.current) return;
    expandedRef.current = true;
    setExpanded(item);
  }, []);

  const closeCard = useCallback(() => {
    expandedRef.current = false;
    setExpanded(null);
  }, []);

  const goPrev = useCallback(() => {
    setExpanded(cur => {
      if (!cur) return cur;
      const i = galleryData.findIndex(g => g.id === cur.id);
      return galleryData[(i - 1 + galleryData.length) % galleryData.length];
    });
  }, []);

  const goNext = useCallback(() => {
    setExpanded(cur => {
      if (!cur) return cur;
      const i = galleryData.findIndex(g => g.id === cur.id);
      return galleryData[(i + 1) % galleryData.length];
    });
  }, []);

  const expandedIdx = expanded
    ? galleryData.findIndex(g => g.id === expanded.id)
    : -1;

  const { cardW, cardH, gapY } = dimRef.current;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        userSelect: 'none',
        background: '#080808',
        cursor: dragRef.current.active ? 'grabbing' : 'grab',
      }}
      onPointerDown={onPD}
      onPointerMove={onPM}
      onPointerUp={onPU}
      onPointerLeave={onPU}
    >

      {/*
        ── 3D Stage ────────────────────────────────────────────────────────
        isolation: isolate keeps 3D-composited children from bleeding above
        the z-indexed UI chrome (nav bar) that lives as a sibling.
      */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          isolation: 'isolate',        // ← stacking context: cards stay below UI
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: 1200,
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Stage: dolly-in + dim when lightbox open */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: `scale(${stageScale})`,
            opacity: expanded ? 0.1 : 1,
            transition: REDUCED
              ? 'none'
              : `transform 1.15s cubic-bezier(.16,1,.3,1), opacity ${expanded ? '0.45s' : '0.35s'} ease`,
            willChange: 'transform, opacity',
          }}
        >
          {rows.map((rowItems, r) => {
            // Row Y: rows are evenly distributed across full viewport height
            const rowY = (gapY) + r * (cardH + gapY) + cardH / 2;
            // Offset from center: rows centered at 50% of viewport height
            const totalH = ROW_COUNT * cardH + (ROW_COUNT + 1) * gapY;
            const startY = (window.innerHeight - totalH) / 2 + gapY;
            const centerY = startY + r * (cardH + gapY) + cardH / 2;
            const offsetY = centerY; // absolute from top

            return (
              <div
                key={r}
                style={{
                  position: 'absolute',
                  top: offsetY,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                }}
              >
                {rowItems.map((item, c) => {
                  const cs = csRef.current[r]?.[c]?.[0];
                  if (!cs?.visible) return null;

                  const totalBlur = cs.mBlur + cs.eBlur;

                  return (
                    <div
                      key={`${r}-${c}`}
                      style={{
                        position: 'absolute',
                        width: cardW,
                        height: cardH,
                        left: -cardW / 2,
                        top: -cardH / 2,
                        transform: `translateX(${cs.x}px) rotateY(${cs.ry}deg) scale(${cs.scale})`,
                        opacity: cs.opacity * cs.eOp,
                        // zIndex within the isolated stage — just for correct 3D sorting
                        zIndex: Math.round((1 - Math.abs(cs.ry) / 90) * 10),
                        willChange: 'transform, opacity',
                      }}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); openCard(item); }}
                        aria-label={item.title}
                        disabled={!!expanded}
                        style={{
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          borderRadius: 8,
                          overflow: 'hidden',
                          background: '#111',
                          display: 'block',
                          boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
                        }}
                      >
                        {/* Motion blur applied ONLY on <img>, not on the 3D wrapper */}
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          draggable={false}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                            filter: totalBlur > 0.1 ? `blur(${totalBlur}px)` : 'none',
                            transition: 'filter 0.06s linear',
                            willChange: 'filter',
                            pointerEvents: 'none',
                          }}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/*
        ── UI Chrome ────────────────────────────────────────────────────────
        Lives OUTSIDE the isolated stage div → always renders above cards.
      */}

      {/* Top bar */}
     

      {/* Scroll hint */}
      <motion.p
        style={{
          position: 'absolute', bottom: 22, left: 0, right: 0,
          textAlign: 'center', zIndex: 50,
          fontFamily: 'var(--font-mono, monospace)', fontSize: 10,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.15)', pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={navVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Scroll · Drag · ← → to rotate
      </motion.p>

      {/* Lightbox */}
      <AnimatePresence>
        {expanded && (
          <Lightbox
            item={expanded}
            idx={expandedIdx}
            total={galleryData.length}
            allItems={galleryData}
            onClose={closeCard}
            onPrev={goPrev}
            onNext={goNext}
            onJump={setExpanded}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────
interface LBProps {
  item: GalleryItem; idx: number; total: number; allItems: GalleryItem[];
  onClose(): void; onPrev(): void; onNext(): void; onJump(i: GalleryItem): void;
}

const Lightbox: React.FC<LBProps> = ({
  item, idx, total, allItems, onClose, onPrev, onNext, onJump,
}) => {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    stripRef.current
      ?.querySelector<HTMLElement>(`[data-t="${item.id}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [item.id]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onPrev, onNext]);

  return (
    <motion.div
      key="lb"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'rgba(4,4,4,0.97)',
        backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      {/* Counter */}
      <div style={{
        position: 'absolute', top: 24, left: 26, zIndex: 10,
        fontFamily: 'var(--font-mono, monospace)', fontSize: 13,
        color: 'rgba(255,255,255,0.3)', pointerEvents: 'none',
      }}>
        <b style={{ color: '#fff', fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</b>
        {' / '}{String(total).padStart(2, '0')}
      </div>

      <IBtn style={{ position: 'absolute', top: 20, right: 20 }}
        onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close">
        <X size={17} />
      </IBtn>
      <IBtn style={{ position: 'absolute', top: '50%', left: 14, transform: 'translateY(-50%)' }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">
        <ChevronLeft size={20} />
      </IBtn>
      <IBtn style={{ position: 'absolute', top: '50%', right: 14, transform: 'translateY(-50%)' }}
        onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">
        <ChevronRight size={20} />
      </IBtn>

      <motion.div
        key={item.id}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: 1100, padding: '0 72px' }}
        initial={{ scale: 0.88, opacity: 0, y: 18 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{
          borderRadius: 14, overflow: 'hidden', background: '#111',
          boxShadow: '0 60px 150px -30px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.06)',
        }}>
          <img src={item.imageUrl} alt={item.title} referrerPolicy="no-referrer"
            style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', display: 'block' }} />
        </div>
        <motion.div
          key={item.id + 'c'}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          style={{ marginTop: 18, textAlign: 'center' }}
        >
          <p style={{ fontSize: 15, fontWeight: 600, color: '#fff',
            fontFamily: 'var(--font-heading, "Space Grotesk", system-ui)', letterSpacing: '-0.01em' }}>
            {item.title}
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>
            {item.description}
          </p>
        </motion.div>
      </motion.div>

      {/* Thumbnail strip */}
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'auto',
        padding: '20px 0 22px',
        background: 'linear-gradient(to top, rgba(4,4,4,0.96), transparent)',
      }}>
        <div ref={stripRef} style={{
          display: 'flex', gap: 7, overflowX: 'auto', padding: '4px 28px',
          scrollbarWidth: 'none',
        }}>
          {allItems.map((t) => {
            const a = t.id === item.id;
            return (
              <button key={t.id} data-t={t.id} onClick={() => onJump(t)} aria-label={t.title}
                style={{
                  flexShrink: 0, width: 44, height: 44, borderRadius: 7,
                  overflow: 'hidden', padding: 0, cursor: 'pointer', background: '#1a1a1a',
                  border: a ? '2px solid #fff' : '2px solid transparent',
                  opacity: a ? 1 : 0.28,
                  transform: a ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.2s cubic-bezier(.16,1,.3,1)',
                }}>
                <img src={t.imageUrl} alt="" referrerPolicy="no-referrer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }} />
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Icon button ──────────────────────────────────────────────────────────────
type IBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
const IBtn: React.FC<IBtnProps> = ({ children, style, ...rest }) => (
  <button {...rest} style={{
    width: 40, height: 40, borderRadius: 10, cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.06)',
    color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.16s', zIndex: 10, ...style,
  }}
    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = '#888'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
  >
    {children}
  </button>
);
