'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger offset in seconds, applied as transition-delay */
  delaySeconds?: number;
  className?: string;
}

/**
 * Fades children up into view the first time they enter the viewport.
 * CSS replacement for framer-motion's whileInView + viewport={{ once: true }};
 * the .reveal styles in globals.css carry the timing and the
 * prefers-reduced-motion opt-out.
 */
export default function Reveal({ children, delaySeconds = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ' ' + className : ''}`}
      style={delaySeconds ? { transitionDelay: `${delaySeconds}s` } : undefined}
    >
      {children}
    </div>
  );
}
