import React from 'react';
import { Project } from '../../types/portfolio';
import ResponsiveImage from '../ResponsiveImage';
import { mapAssetUrl } from '../../utils/assetMapper'; // Import mapAssetUrl
import type { ImageMetadata } from 'astro'; // Import ImageMetadata type

interface ProjectCardProps {
  project: Project;
  // Removed onClick prop as modal functionality is removed
  onDelete?: (project: Project) => void; // Kept onDelete if it's used elsewhere
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  // Map the afterImage through mapAssetUrl
  const mappedAfterImage = mapAssetUrl(project.afterImage);
  const afterImageSrc = typeof mappedAfterImage === 'object' && mappedAfterImage !== null && 'src' in mappedAfterImage
    ? mappedAfterImage.src
    : (mappedAfterImage as string || '');
  const afterImageWidth = typeof mappedAfterImage === 'object' && mappedAfterImage !== null && 'width' in mappedAfterImage
    ? mappedAfterImage.width
    : undefined;
  const afterImageHeight = typeof mappedAfterImage === 'object' && mappedAfterImage !== null && 'height' in mappedAfterImage
    ? mappedAfterImage.height
    : undefined;

  return (
    <div
      // Removed onClick handler as card is no longer clickable for modal
      className="group bg-stone-900 rounded-sm overflow-hidden border border-stone-800 hover:border-orange-600 transition-all duration-300 flex flex-col h-full relative" // Removed cursor-pointer
    >
      <div className="relative aspect-[4/3] overflow-hidden">
         {/* Main Image */}
         <ResponsiveImage
           src={afterImageSrc}
           alt={project.title}
           className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
           sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 1024px"
           priority={false}
           width={afterImageWidth}
           height={afterImageHeight}
         />

        {/* Removed Interaction Overlay - Card is no longer clickable for modal */}

        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <span className="bg-stone-950/90 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm border border-stone-800">
            {project.niche}
          </span>
        </div>



        {project.featured && (
          <div className="absolute bottom-6 left-6">
            <div className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm shadow-lg">
              Featured Work
            </div>
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-display font-bold uppercase text-2xl text-white leading-tight"> {/* Removed group-hover effect */}
          {project.title}
        </h3>
        <p className="text-stone-400 text-sm mt-3 flex items-center gap-2 font-medium">
          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.location}
        </p>

        <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-0.5">Completed</span>
            <span className="text-sm font-semibold text-stone-300">
              {new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          {/* Removed arrow icon as card is not clickable */}
          <div className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-500"> {/* Removed hover effects */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
