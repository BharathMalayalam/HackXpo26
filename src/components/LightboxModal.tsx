import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, items, onClose, onSelect }) => {
  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const total = items.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + total) % total;
    onSelect(items[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % total;
    onSelect(items[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + total) % total;
        onSelect(items[prevIndex]);
      }
      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % total;
        onSelect(items[nextIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, total, items, onClose, onSelect]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Top action header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 text-white">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-2.5 py-1 rounded-none bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            {item.category}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {currentIndex + 1} / {total}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-none bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Prev / Next controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-none bg-slate-900/80 hover:bg-cyan-500 hover:text-black text-white border border-slate-700 transition-all active:scale-95"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-none bg-slate-900/80 hover:bg-cyan-500 hover:text-black text-white border border-slate-700 transition-all active:scale-95"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Center Image Container */}
      <div 
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-none overflow-hidden border border-slate-800 shadow-2xl bg-black">
          <img
            src={item.imageUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
          />
        </div>

        {/* Caption & Info bar */}
        <div className="w-full mt-4 text-center max-w-2xl px-4">
          <h3 className="text-lg font-heading font-semibold text-white">
            {item.title}
          </h3>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
