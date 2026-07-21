'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Scroll-linked parallax layer replacing framer-motion's
 * useScroll({ offset: ['start start', 'end start'] }) +
 * useTransform(progress, [0, 1], ['0%', '25%']) in Hero: the layer
 * translates down by up to 25% of its own height, linearly, as the
 * section scrolls out of the viewport. No-op when the user prefers
 * reduced motion, matching the old useReducedMotion guard.
 */
export default function ParallaxBg({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Measure the untransformed parent section (framer's useScroll target),
    // not this layer — its own rect moves with the transform and would damp
    // the 25% factor to 20%.
    const target = el.parentElement ?? el;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      el.style.transform = `translate3d(0, ${progress * 0.25 * rect.height}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
