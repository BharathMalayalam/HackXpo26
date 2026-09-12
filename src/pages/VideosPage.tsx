import React, { useState } from 'react';
import { videosData } from '../data/videos';
import { VideoItem } from '../types';
import { VideoModal } from '../components/VideoModal';
import { 
  Play, 
  Video, 
  Clock, 
  User, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

const categories = [
  'All Videos',
  'Event Highlights',
  'Project Walkthroughs',
  'Student Interviews',
  'Keynotes'
] as const;

export const VideosPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Videos');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const filteredVideos = videosData.filter((v) => {
    if (selectedCategory === 'All Videos') return true;
    return v.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 tech-grid-bg">
      
      {/* Video Modal Player */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono">
            <Video className="w-3.5 h-3.5" />
            <span>Digital Broadcast Archives</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Event Videos & Highlights
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Watch official HackXpo ’26 recap films, in-depth architectural walkthroughs by student teams, and inaugural keynotes by department faculty.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-none bg-slate-900/80 border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-none text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group rounded-none bg-[#090D18] border border-slate-800/90 hover:border-cyan-500/40 overflow-hidden cursor-pointer shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Thumbnail with Play Icon */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                  <div className="w-14 h-14 rounded-none bg-cyan-500/90 text-black flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-1 fill-black" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-white text-xs font-mono flex items-center gap-1 border border-slate-700">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{video.duration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-none bg-slate-900/90 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Video Info Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-medium truncate max-w-[200px]">
                    <User className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{video.speakerOrTeam}</span>
                  </div>
                  <span className="text-slate-400 group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                    Play Stream <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
