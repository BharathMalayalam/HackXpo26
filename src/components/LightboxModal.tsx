import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, items, onClose, onSelect }) => {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;
  const total = items.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && item) {
        const prevIndex = (currentIndex - 1 + total) % total;
        onSelect(items[prevIndex]);
      }
      if (e.key === 'ArrowRight' && item) {
        const nextIndex = (currentIndex + 1) % total;
        onSelect(items[nextIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, total, items, onClose, onSelect, item]);

  return null;
};
