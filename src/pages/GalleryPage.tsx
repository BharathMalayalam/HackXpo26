import React, { useState } from 'react';
import { galleryData } from '../data/gallery';
import { GalleryItem } from '../types';
import { LightboxModal } from '../components/LightboxModal';
import { 
  Maximize2, 
  Camera
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 tech-grid-bg">
      
      {/* Lightbox Modal */}
      <LightboxModal
        item={activeItem}
        items={galleryData}
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
            HackXpo '26 Photo Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Glimpses into the opening keynote, 36 hours of round-the-clock coding sprints, faculty architecture clinics, and the victorious prize podium.
          </p>
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryData.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveItem(photo)}
              className="group relative rounded-none overflow-hidden bg-slate-950 border border-slate-800/80 hover:border-cyan-500/50 cursor-pointer shadow-lg transition-all duration-300"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt="Gallery photo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  loading="lazy"
                />
                
                {/* Expand Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="p-3 rounded-none bg-cyan-500 text-black shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
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
