import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { mapAssetUrl } from '../utils/assetMapper';

export default function TestimonialVideoCard({
  videoUrl,
  thumbnailUrl,
  videoThumbnailUrl,
  author,
  rating,
  onPlayClick,
}: any) {
  const [isPlaying, setIsPlaying] = useState(false);

  // RESOLVE THUMBNAIL
  const rawThumb = videoThumbnailUrl || thumbnailUrl || '';
  const mappedThumb = mapAssetUrl(rawThumb);
  
  // Extract string for standard <img> tag, or keep object for Astro <Image>
  const finalThumbSrc = (typeof mappedThumb === 'object' && 'src' in mappedThumb) 
    ? mappedThumb.src 
    : mappedThumb;

  // RESOLVE VIDEO
  const mappedVideo = mapAssetUrl(videoUrl);
  const finalVideoSrc = (typeof mappedVideo === 'object' && 'src' in mappedVideo) 
    ? mappedVideo.src 
    : mappedVideo;

  const handlePlayClick = () => {
    setIsPlaying(true);
    onPlayClick?.();
  };

  if (!videoUrl) return null;

  return (
    <div className="break-inside-avoid mb-4">
      {!isPlaying ? (
        <div className="w-full aspect-[9/16] cursor-pointer relative group rounded-xl overflow-hidden" onClick={handlePlayClick}>
          {finalThumbSrc ? (
            <img
              src={finalThumbSrc as string}
              alt={`${author} thumbnail`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
      ) : (
        <div className="relative w-full aspect-[9/16] bg-black rounded-xl overflow-hidden">
          <video
            src={finalVideoSrc as string}
            controls
            autoPlay
            playsInline
            className="w-full h-full"
            type="video/mp4"
          />
        </div>
      )}
    </div>
  );
}