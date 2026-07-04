'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  bgColor?: string;
  contentAlign?: 'left' | 'right';
}

const slides: Slide[] = [
  {
    id: 'brand',
    backgroundImage: '/01_kayora_homepage_banner.png',
    eyebrow: 'Premium Purified Water · NAFDAC Reg. A1-111026',
    headline: 'Purified to the Highest\nStandard. Safe for Every Table.',
    subhead: 'Eight-stage purified water from the heart of Akwa Ibom — for homes, offices, hotels and celebrations that won’t settle for less.',
    primaryCTA: { label: 'Order Kayora', href: '/products' },
    secondaryCTA: { label: 'Become a Distributor', href: '/distribution' },
    overlayStrength: 0.35,
    objectFit: 'cover',
    objectPosition: 'left top',
    contentAlign: 'right',
  },
  {
    id: 'sharp-sharp',
    backgroundImage: '/images/slider/sharp-sharp.png',
    eyebrow: 'Sharp-sharp · 30cl',
    headline: 'Built for Events.\nEasy to Chill. Easy to Share.',
    subhead: 'The Kayora you reach for at weddings, naming ceremonies and corporate functions. Compact, sleek, refreshing.',
    primaryCTA: { label: 'Order Sharp-sharp', href: '/products/30cl' },
    overlayStrength: 0.25,
    objectFit: 'contain',
    objectPosition: 'center',
    bgColor: '#dceef2',
  },
  {
    id: 'original',
    backgroundImage: '/images/slider/original.png',
    eyebrow: 'Original · 50cl',
    headline: 'Everyday Hydration,\nPerfected.',
    subhead: 'Sized right for school bags, dashboards and desks across Akwa Ibom. The bottle that started it all.',
    primaryCTA: { label: 'Order Original', href: '/products/50cl' },
    overlayStrength: 0.2,
    objectFit: 'contain',
    objectPosition: 'center',
    bgColor: '#e8f4f7',
  },
  {
    id: 'jara',
    backgroundImage: '/images/slider/jara.png',
    eyebrow: 'Jara · 75cl',
    headline: 'A Little Extra — The Way\nOnly Nigerians Know How.',
    subhead: 'Generous volume for long days, the gym and the road. For anyone who hydrates seriously.',
    primaryCTA: { label: 'Order Jara', href: '/products/75cl' },
    overlayStrength: 0.2,
    objectFit: 'contain',
    objectPosition: 'center',
    bgColor: '#e8f4f7',
  },
  {
    id: 'never-finish',
    backgroundImage: '/images/slider/never-finish.png',
    eyebrow: 'Never Finish · 18.9L',
    headline: 'Keeps Homes, Offices\nand Hotels Running.',
    subhead: 'Clean. Sealed. Tracked from borehole to delivery. The dispenser standard for those who demand the best.',
    primaryCTA: { label: 'Order Never Finish', href: '/products/18-9l' },
    overlayStrength: 0.2,
    objectFit: 'contain',
    objectPosition: 'center',
    bgColor: '#e8f4f7',
  },
  {
    id: 'factory',
    backgroundImage: '/images/slider/factory.png',
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

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const slide = slides[current];

  // Text is dark for light-bg product slides, white for photo slides
  const lightBg = !!slide.bgColor;
  const isBrandSlide = slide.id === 'brand';
  const textColor = lightBg ? 'text-kayora-blue-900' : 'text-white';
  const subColor = lightBg ? 'text-slate-700' : 'text-white/80';
  // Brand slide sits on the dark studio banner — brighter gold + semibold for legibility
  const eyebrowColor = isBrandSlide ? 'font-semibold text-kayora-gold-300' : 'text-kayora-gold-500';

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(560px, 80vh, 860px)' }}
      aria-label="Hero slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id + '-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ backgroundColor: slide.bgColor ?? '#0a1c36' }}
        >
          <Image
            src={slide.backgroundImage}
            alt=""
            fill
            priority={current === 0}
            className="w-full h-full"
            style={{
              objectFit: slide.objectFit,
              objectPosition: slide.objectPosition ?? 'center',
            }}
            sizes="100vw"
          />
          {/* Overlay — lighter for product slides so bottles stay vivid */}
          <div
            className="absolute inset-0"
            style={{ background: `rgba(10,28,54,${slide.overlayStrength})` }}
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content — right side for product slides, left for photo slides */}
      <div className="relative z-10 flex h-full items-center" style={{ minHeight: 'inherit' }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-content'}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className={`${isBrandSlide ? 'max-w-lg lg:mr-0 lg:pr-4' : 'max-w-xl'} ${(lightBg || slide.contentAlign === 'right') ? 'lg:ml-auto' : ''}`}
            >
              <p className={`text-xs uppercase tracking-widest font-sans mb-4 ${eyebrowColor}`}>
                {slide.eyebrow}
              </p>
              <h1 className={`font-display text-display-lg mb-5 whitespace-pre-line leading-tight ${textColor}`}>
                {slide.headline}
              </h1>
              <p className={`text-base lg:text-lg leading-relaxed mb-8 max-w-[50ch] ${subColor}`}>
                {slide.subhead}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={slide.primaryCTA.href}
                  className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-white font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-900 focus-visible:ring-offset-2"
                >
                  {slide.primaryCTA.label}
                </Link>
                {slide.secondaryCTA && (
                  <Link
                    href={slide.secondaryCTA.href}
                    className={`inline-flex items-center justify-center min-h-[48px] px-8 py-3 font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      lightBg
                        ? 'border border-kayora-blue-900 text-kayora-blue-900 hover:bg-kayora-blue-900/10 focus-visible:ring-kayora-blue-900'
                        : 'border border-white/60 text-white hover:bg-white/10 focus-visible:ring-white'
                    }`}
                  >
                    {slide.secondaryCTA.label}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
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
          <motion.div
            key={slide.id + '-progress'}
            className="h-full bg-kayora-gold-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
          />
        </div>
      )}
    </section>
  );
}
