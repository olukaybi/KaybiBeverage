'use client';

import { useEffect, useRef } from 'react';

interface ScrollPlayVideoProps {
  src: string;
  poster: string;
  className?: string;
  'aria-label'?: string;
}

/**
 * Muted, looping video that plays only while scrolled into view
 * (Instagram-style) — lighter on mobile data/battery than unconditional
 * autoplay. Falls back to the poster frame if playback fails.
 */
export default function ScrollPlayVideo({ src, poster, className, ...rest }: ScrollPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {
              // Autoplay can be blocked by the browser — the poster
              // frame stays visible as a static fallback either way.
            });
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      {...rest}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
