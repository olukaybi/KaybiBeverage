'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';

interface Slide {
  id: string;
  backgroundImage: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  overlayStrength: number;
  objectFit: 'cover' | 'contain';
  objectPosition?: string;
  imageTransform?: string;
  bgColor?: string;
  contentAlign?: 'left' | 'right';
}

const slides: Slide[] = [
  {
    id: 'brand',
    backgroundImage: '/01_kayora_homepage_banner.webp',
    eyebrow: 'Premium Purified Water · NAFDAC Reg. A1-111026',
    headline: 'Purified to the Highest\nStandard. Safe for Every Table.',
    subhead: 'Eight-stage purified water from the heart of Akwa Ibom — for homes, offices, hotels and celebrations that won’t settle for less.',
    primaryCTA: { label: 'Order Kayora', href: '/shop' },
    secondaryCTA: { label: 'Become a Distributor', href: '/distribution' },
    overlayStrength: 0.35,
    objectFit: 'cover',
    objectPosition: 'left top',
    contentAlign: 'right',
  },
  {
    id: 'sharp-sharp',
    backgroundImage: '/05_kayora_30cl_single.webp',
    eyebrow: 'Sharp-sharp · 30cl',
    headline: 'Built for Events.\nEasy to Chill. Easy to Share.',
    subhead: 'The Kayora you reach for at weddings, naming ceremonies and corporate functions. Compact, sleek, refreshing.',
    primaryCTA: { label: 'Order Sharp-sharp', href: '/products/30cl' },
    overlayStrength: 0.25,
    objectFit: 'contain',
    objectPosition: 'left top',
    imageTransform: 'translateY(16px) scale(1.15)',
    bgColor: '#dceef2',
  },
  {
    id: 'original',
    backgroundImage: '/04_kayora_50cl_single.webp',
    eyebrow: 'Original · 50cl',
    headline: 'Everyday Hydration,\nPerfected.',
    subhead: 'Sized right for school bags, dashboards and desks across Akwa Ibom. The bottle that started it all.',
    primaryCTA: { label: 'Order Original', href: '/products/50cl' },
    overlayStrength: 0.2,
    objectFit: 'contain',
    objectPosition: 'left top',
    imageTransform: 'translateY(60px) scale(1.10)',
    bgColor: '#e8f4f7',
  },
  {
    id: 'jara',
    backgroundImage: '/03_kayora_75cl_single.webp',
    eyebrow: 'Jara · 75cl',
    headline: 'A Little Extra — The Way\nOnly Nigerians Know How.',
    subhead: 'Generous volume for long days, the gym and the road. For anyone who hydrates seriously.',
    primaryCTA: { label: 'Order Jara', href: '/products/75cl' },
    overlayStrength: 0.2,
    objectFit: 'contain',
    objectPosition: 'left top',
    imageTransform: 'translateY(60px) scale(1.10)',
    bgColor: '#e8f4f7',
  },
  {
    id: 'never-finish',
    backgroundImage: '/07_kayora_18_9l_single_corrected.webp',
    eyebrow: 'Never Finish · 18.9L',
    headline: 'Keeps Homes, Offices\nand Hotels Running.',
    subhead: 'Clean. Sealed. Tracked from borehole to delivery. The dispenser standard for those who demand the best.',
    primaryCTA: { label: 'Order Never Finish', href: '/products/18-9l' },
    overlayStrength: 0.2,
    objectFit: 'contain',
    objectPosition: 'left top',
    imageTransform: 'translateY(72px) scale(1.05)',
    bgColor: '#e8f4f7',
  },
  {
    id: 'factory',
    backgroundImage: '/09_kayora_warehouse_banner.webp',
    eyebrow: 'Made in Eket, Akwa Ibom',
    headline: 'Where Quality Begins.\nEight Stages. Zero Compromise.',
    subhead: 'State-of-the-art production at 173 Eket Oron Road — where steam-cleaned caps, ozone sterilisation and NAFDAC compliance meet.',
    primaryCTA: { label: 'Our Quality Story', href: '/quality-and-certifications' },
    secondaryCTA: { label: 'Become a Distributor', href: '/distribution' },
    overlayStrength: 0.45,
    objectFit: 'cover',
    objectPosition: 'center',
  },
];

const AUTOPLAY_INTERVAL = 6000;
// mode="wait" sequencing from the framer version: outgoing content animates
// 0.6s after a 0.2s delay, then the incoming content mounts and plays its
// own 0.2s-delayed entrance; the backgrounds crossfade over 0.9s in parallel
const CONTENT_EXIT_MS = 800;
const BG_FADE_MS = 900;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prevBg, setPrevBg] = useState<number | null>(null);
  const [contentIndex, setContentIndex] = useState(0);
  const [contentPhase, setContentPhase] = useState<'in' | 'out'>('in');
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastIndexRef = useRef(0);
  const bgTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  useEffect(() => {
    if (current === lastIndexRef.current) return;
    const from = lastIndexRef.current;
    lastIndexRef.current = current;

    // keep the outgoing background mounted while it fades under the new one
    setPrevBg(from);
    if (bgTimeoutRef.current) clearTimeout(bgTimeoutRef.current);
    bgTimeoutRef.current = setTimeout(() => setPrevBg(null), BG_FADE_MS);

    // fade the old content block out, then swap in the new one
    setContentPhase('out');
    if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current);
    contentTimeoutRef.current = setTimeout(() => {
      setContentIndex(current);
      setContentPhase('in');
    }, CONTENT_EXIT_MS);
  }, [current]);

  useEffect(() => () => {
    if (bgTimeoutRef.current) clearTimeout(bgTimeoutRef.current);
    if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current);
  }, []);

  const slide = slides[current];
  const contentSlide = slides[contentIndex];

  // Text is dark for light-bg product slides, white for photo slides
  const lightBg = !!contentSlide.bgColor;
  const isBrandSlide = contentSlide.id === 'brand';
  const textColor = lightBg ? 'text-kayora-blue-900' : 'text-white';
  const subColor = lightBg ? 'text-slate-700' : 'text-white/80';
  // Brand slide sits on the dark studio banner — brighter gold + semibold for legibility
  const eyebrowColor = isBrandSlide ? 'font-semibold text-kayora-gold-300' : 'text-kayora-gold-500';

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(560px, 80vh, 860px)' }}
      aria-label="Hero slider"
      onPointerEnter={(e) => {
        // Only pause for genuine mouse hover — not touch or pen, where the
        // emulated mouseleave may never fire and autoplay would freeze
        if (e.pointerType === 'mouse') setPaused(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setPaused(false);
      }}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        // Only unpause when focus leaves the section entirely,
        // not when it moves between children within the section
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      {/* Background — outgoing slide fades under the incoming one */}
      {[
        ...(prevBg !== null ? [{ index: prevBg, out: true }] : []),
        { index: current, out: false },
      ].map(({ index, out }) => {
        const bg = slides[index];
        return (
          <div
            key={bg.id + (out ? '-bg-out' : '-bg')}
            className={`absolute inset-0 ${out ? 'hero-bg-out' : 'hero-bg-in'}`}
            style={{ backgroundColor: bg.bgColor ?? '#0a1c36' }}
          >
            <Image
              src={bg.backgroundImage}
              alt=""
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : 'lazy'}
              className="w-full h-full"
              style={{
                objectFit: bg.objectFit,
                objectPosition: bg.objectPosition ?? 'center',
                transform: bg.imageTransform,
                transformOrigin: 'left top',
              }}
              sizes="100vw"
            />
            {/* Overlay — lighter for product slides so bottles stay vivid */}
            <div
              className="absolute inset-0"
              style={{ background: `rgba(10,28,54,${bg.overlayStrength})` }}
              aria-hidden="true"
            />
          </div>
        );
      })}

      {/* Content — right side for product slides, left for photo slides */}
      <div className="relative z-10 flex h-full items-center" style={{ minHeight: 'inherit' }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div
            key={contentSlide.id + '-content'}
            className={`${contentPhase === 'in' ? 'hero-content-in' : 'hero-content-out'} ${isBrandSlide ? 'max-w-lg lg:mr-0 lg:pr-4' : 'max-w-xl'} ${(lightBg || contentSlide.contentAlign === 'right') ? 'lg:ml-auto' : ''}`}
          >
            <p className={`text-xs uppercase tracking-widest font-sans mb-4 ${eyebrowColor}`}>
              {contentSlide.eyebrow}
            </p>
            <h1 className={`font-display text-display-lg mb-5 whitespace-pre-line leading-tight ${textColor}`}>
              {contentSlide.headline}
            </h1>
            <p className={`text-base lg:text-lg leading-relaxed mb-8 max-w-[50ch] ${subColor}`}>
              {contentSlide.subhead}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={contentSlide.primaryCTA.href}
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-white font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-900 focus-visible:ring-offset-2"
              >
                {contentSlide.primaryCTA.label}
              </Link>
              {contentSlide.secondaryCTA && (
                <Link
                  href={contentSlide.secondaryCTA.href}
                  className={`inline-flex items-center justify-center min-h-[48px] px-8 py-3 font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    lightBg
                      ? 'border border-kayora-blue-900 text-kayora-blue-900 hover:bg-kayora-blue-900/10 focus-visible:ring-kayora-blue-900'
                      : 'border border-white/60 text-white hover:bg-white/10 focus-visible:ring-white'
                  }`}
                >
                  {contentSlide.secondaryCTA.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <button onClick={prev} aria-label="Previous slide" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors backdrop-blur-sm">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button onClick={next} aria-label="Next slide" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors backdrop-blur-sm">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2" role="tablist" aria-label="Slide indicators">
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-6 h-2 bg-kayora-gold-500' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 z-20 h-[3px] bg-kayora-gold-500/30 w-full">
          <div
            key={slide.id + '-progress'}
            className="h-full bg-kayora-gold-500 hero-progress"
            style={{ animationDuration: `${AUTOPLAY_INTERVAL}ms` }}
          />
        </div>
      )}
    </section>
  );
}
