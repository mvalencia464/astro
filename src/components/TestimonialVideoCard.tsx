import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface TestimonialVideoCardProps {
  videoUrl: string;
  thumbnailUrl?: string;
  videoThumbnailUrl?: string;
  author: string;
  text: string;
  rating: number;
  avatarUrl?: string; // avatarUrl is not directly used in this component, but kept in props
  onPlayClick?: () => void;
}

export default function TestimonialVideoCard({
  videoUrl,
  thumbnailUrl,
  videoThumbnailUrl,
  author,
  text,
  rating,
  avatarUrl,
  onPlayClick,
}: TestimonialVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // For thumbnail, use the URL directly (already in public folder)
  const thumbnailSrc = videoThumbnailUrl || thumbnailUrl || '';

  const handlePlayClick = () => {
    setIsPlaying(true);
    onPlayClick?.();
  };

  if (!videoUrl) {
    return null;
  }

  // For videos, use the videoUrl directly without mapping through assetMapper
  // Videos are served from the public assets folder and don't need optimization
  const finalVideoSrc = videoUrl;


  return (
    <div className="break-inside-avoid mb-4">
      {/* Video Card - Show thumbnail when not playing */}
      {!isPlaying ? (
        <div className="w-full aspect-[9/16] cursor-pointer relative group" onClick={handlePlayClick}>
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt={`${author} testimonial video thumbnail`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-orange-600 flex items-center justify-center text-white text-sm">
                Video Thumbnail
            </div>
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
            <Play className="w-16 h-16 text-white/90 group-hover:text-white transition-colors" />
          </div>
        </div>
      ) : (
        /* Inline Video Player */
        <div className="relative w-full bg-black overflow-hidden">
          <div className="relative w-full aspect-[9/16] bg-black flex items-center justify-center">
            <video
              src={finalVideoSrc} // Use the processed video source here
              controls
              autoPlay
              className="w-full h-full"
              preload="metadata" // Preload metadata for faster playback start
            >
              Your browser does not support the video tag.
            </video>

            {/* Author Overlay at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <span key={i} className="text-orange-500">
                      ★
                    </span>
                  ))}
                </div>
                <div className="text-white font-bold text-lg">{author}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
