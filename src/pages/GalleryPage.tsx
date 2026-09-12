import React, { useState } from 'react';
import { galleryData } from '../data/gallery';
import { GalleryItem } from '../types';
import { LightboxModal } from '../components/LightboxModal';
import { 
  Image as ImageIcon, 
  Maximize2, 
  Filter, 
  Sparkles,
  Camera
} from 'lucide-react';

const categories = [
  'All Photos',
  'Opening Ceremony',
  'Team Action',
  'Mentoring',
  'Project Demos',
  'Behind-the-Scenes',
  'Prize Ceremony'
] as const;

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Photos');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredGallery = galleryData.filter((item) => {
    if (selectedCategory === 'All Photos') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 tech-grid-bg">
      
      {/* Lightbox Modal */}
      <LightboxModal
        item={activeItem}
        items={filteredGallery}
        onClose={() => setActiveItem(null)}
        onSelect={(item) => setActiveItem(item)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
            <Camera className="w-3.5 h-3.5" />
            <span>Event Photography & Visual Archive</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            HackXpo ’26 Photo Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Glimpses into the opening keynote, 36 hours of round-the-clock coding sprints, faculty architecture clinics, and the victorious prize podium.
          </p>
        </div>
        {/* Gallery Image Grid with Masonry-like Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveItem(photo)}
              className="group relative rounded-none overflow-hidden bg-slate-950 border border-slate-800/80 hover:border-cyan-500/50 cursor-pointer shadow-lg transition-all duration-300 flex flex-col justify-end"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  loading="lazy"
                />
                
                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-none bg-slate-900/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    {photo.category}
                  </span>
                </div>

                {/* Expand Hover Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-none bg-cyan-500 text-black shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Caption / Title */}
                <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
                  <h3 className="text-sm sm:text-base font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Photography */}
        <div className="text-center text-xs font-mono text-slate-500 pt-4">
          <span>Official Event Media Captured by GCE Erode IT Department Visual Media Wing.</span>
        </div>

      </div>
    </div>
  );
};
