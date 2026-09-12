import React, { useEffect } from 'react';
import { VideoItem } from '../types';
import { X, Play, Video, Share2 } from 'lucide-react';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-[#0A0E17] rounded-none border border-slate-800 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-none bg-cyan-500/20 text-cyan-400">
              <Video className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                {video.category} • {video.duration}
              </span>
              <h3 className="text-base font-heading font-bold text-white truncate max-w-md sm:max-w-xl">
                {video.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Responsive Video Player Area */}
        <div className="relative w-full pb-[56.25%] bg-black">
          <iframe
            src={`${video.videoUrl}?autoplay=1`}
            title={video.title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Details Body */}
        <div className="p-6 bg-black space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold text-cyan-300">
              Presented by: {video.speakerOrTeam}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              HackXpo ’26 Official Stream Archive
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};
