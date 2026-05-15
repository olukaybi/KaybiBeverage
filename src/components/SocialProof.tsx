'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const testimonials = [
  {
    quote:
      "We switched our hotel to Kayora about six months ago. Guests have noticed — we've had more positive comments about the water than in years of using other brands. The seal integrity alone makes it worth it.",
    name: 'Ekanem Obot',
    role: 'Hotel Manager',
    location: 'Eket, Akwa Ibom',
  },
  {
    quote:
      "I've been organising events in Eket for over ten years. Kayora is the only brand I trust for weddings and corporate functions now. No burst sachets, no funny taste, no complaints from guests. That's rare.",
    name: 'Blessing Akpan',
    role: 'Event Organiser',
    location: 'Eket & Uyo',
  },
  {
    quote:
      "The 18.9L dispenser bottles are the best we've found. They fit our office dispensers perfectly, arrive sealed every time, and the delivery team actually shows up when they say they will.",
    name: 'Uduak Essien',
    role: 'Office Manager',
    location: 'Uyo, Akwa Ibom',
  },
];

const photos = [
  {
    src: '/images/lifestyle/kayora-beach-party.png',
    alt: 'Kayora at a beach celebration — Akwa Ibom',
  },
  {
    src: '/images/lifestyle/kayora-family-dinner.png',
    alt: 'Kayora at a family dinner',
  },
  {
    src: '/images/factory/factory-04.jpg',
    alt: 'Inside the Kaybi Beverage Industries facility — Eket',
  },
  {
    src: '/images/factory/factory-05.jpg',
    alt: 'Kayora production line — Eket, Akwa Ibom',
  },
];

export default function SocialProof() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
            What Customers Say
          </p>
          <h2 className="font-display text-display-lg text-kayora-ink">
            Kayora — At Every Table
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-kayora-cream border border-kayora-mist rounded-2xl p-8 flex flex-col"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              {/* Decorative quote mark */}
              <span
                aria-hidden="true"
                className="font-display text-[5rem] leading-none text-kayora-gold-500/20 select-none -mt-4 -ml-2 mb-2"
              >
                &ldquo;
              </span>
              <p className="text-kayora-graphite leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>
              <div>
                <p className="font-semibold text-kayora-ink">{t.name}</p>
                <p className="text-sm text-kayora-stone">
                  {t.role} · {t.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Photo strip */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-stone font-sans">
              Follow us on Instagram
            </p>
            <a
              href="https://www.instagram.com/kayorawaterng/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-kayora-blue-700 hover:text-kayora-blue-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
              aria-label="Follow Kayora on Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @kayorawaterng &rarr;
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {photos.map((photo, i) => (
              <a
                key={photo.src}
                href="https://www.instagram.com/kayorawaterng/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={photo.alt}
                className="group relative aspect-square rounded-xl overflow-hidden bg-kayora-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
                {/* Instagram overlay on hover */}
                <div className="absolute inset-0 bg-kayora-blue-900/0 group-hover:bg-kayora-blue-900/30 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
