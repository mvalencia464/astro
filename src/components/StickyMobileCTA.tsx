/**
 * Sticky Mobile CTA Component
 * Improves 1.77% Mobile CTR with persistent "Get My Quote" button
 * Only visible on mobile devices
 */

import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { analytics } from '../utils/analyticsTracker';

export const StickyMobileCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Show CTA after user scrolls down a bit
    const handleScroll = () => {
      if (window.scrollY > 300 && isMobile) {
        setIsVisible(true);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  if (!isMobile || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-orange-600 shadow-lg md:hidden">
      <a 
        href="tel:+19078918283"
        className="block px-4 py-4 flex items-center justify-center gap-3 hover:bg-orange-700 transition-colors"
      >
        <Phone className="w-6 h-6 text-white flex-shrink-0" />
        <span className="text-white font-bold text-lg uppercase tracking-wider">CALL 907.891.8283</span>
      </a>
    </div>
  );
};

export default StickyMobileCTA;
