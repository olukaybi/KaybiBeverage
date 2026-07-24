import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'node:fs';
import path from 'node:path';
import { ShieldCheck, ImageOff, Video as VideoIcon } from 'lucide-react';
import HeroSlider from '@/components/HeroSlider';
import SKUCard from '@/components/SKUCard';
import ProcessSteps from '@/components/ProcessSteps';

// Inauguration photo/video assets aren't in the repo yet (see Sprint CRO
// PR notes) — check for them at render time so the section degrades to a
// clean placeholder instead of a broken <img>/<video>, and upgrades
// automatically the moment the real files are dropped into place.
const INAUGURATION_PHOTO = '/images/inauguration/inauguration-1.jpg';
const INAUGURATION_VIDEOS = [
  {
    key: 'ceremony',
    src: '/media/inauguration-ceremony.mp4',
    poster: '/media/inauguration-ceremony-poster.jpg',
    caption: "Governor's commissioning — 24 June 2026",
    placeholder: 'Ceremony video coming soon',
  },
  {
    key: 'facility',
    src: '/media/inauguration-facility.mp4',
    poster: '/media/inauguration-facility-poster.jpg',
    caption: 'Inside the Kayora production line — Eket, Akwa Ibom',
    placeholder: 'Facility video coming soon',
  },
] as const;

function publicAssetExists(webPath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', webPath));
  } catch {
    return false;
  }
}

function InaugurationVideoCard({
  src,
  poster,
  caption,
  placeholder,
  hasVideo,
  hasPoster,
}: {
  src: string;
  poster: string;
  caption: string;
  placeholder: string;
  hasVideo: boolean;
  hasPoster: boolean;
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-kayora-mist bg-kayora-blue-100 flex flex-col">
      <div className="relative aspect-video bg-kayora-blue-900/5">
        {hasVideo ? (
          <video
            src={src}
            poster={hasPoster ? poster : undefined}
            controls
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-kayora-stone p-6 text-center">
            <VideoIcon className="w-8 h-8" aria-hidden="true" />
            <p className="text-sm">{placeholder}</p>
          </div>
        )}
      </div>
      <p className="text-sm text-kayora-stone bg-white px-4 py-3 border-t border-kayora-mist">
        {caption}
      </p>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Kayora Premium Purified Water | NAFDAC Registered, Eket',
  description:
    'Wellness in every drop! Premium eight-stage purified water from Eket, Akwa Ibom. NAFDAC Registered (A1-111026). Direct delivery across Akwa Ibom; distributors across the South-South and South-East.',
  alternates: { canonical: 'https://www.kayorawater.com/' },
};

const skus = [
  {
    size: '30cl',
    name: 'Sharp-sharp',
    nickname: 'The Event Bottle',
    description:
      'Built for events. Compact, easy to chill, easy to share. The Kayora you reach for at weddings, naming ceremonies and corporate functions.',
    useCase: 'Perfect for events, celebrations and anywhere water is served to guests.',
    imageSrc: '/images/products/kayora-30cl-hero-blue.png',
    imageAlt: 'Kayora 30cl Sharp-sharp — small event bottle',
  },
  {
    size: '50cl',
    name: 'Original',
    nickname: 'The Everyday Bottle',
    description:
      'Everyday hydration, perfected. The bottle that started it all — sized right for school bags, dashboards and desks across Akwa Ibom.',
    useCase: 'Ideal for homes, offices, schools and on-the-go hydration.',
    imageSrc: '/images/products/kayora-50cl-hero-blue.png',
    imageAlt: 'Kayora 50cl Original — everyday bottle',
  },
  {
    size: '75cl',
    name: 'Jara',
    nickname: 'The Extra Bottle',
    description:
      'A little extra, the way only Nigerians know how. Generous volume for long days, the gym, the road, and anyone who hydrates seriously.',
    useCase: 'Great for fitness, travel and long working days.',
    imageSrc: '/images/products/kayora-75cl-hero-blue.png',
    imageAlt: 'Kayora 75cl Jara — extra bottle',
  },
  {
    size: '18.9L',
    name: 'Never Finish',
    nickname: 'The Dispenser Standard',
    description:
      'The dispenser standard. One bottle keeps a household, office or hotel running for days. Clean. Sealed. Tracked from borehole to delivery.',
    useCase: 'The go-to choice for offices, hotels, schools and large households.',
    imageSrc: '/images/products/kayora-18l-hero-blue.png',
    imageAlt: 'Kayora 18.9L Never Finish — dispenser bottle',
  },
];

export default function HomePage() {
  const hasPhoto = publicAssetExists(INAUGURATION_PHOTO);
  const videoAvailability = INAUGURATION_VIDEOS.map((v) => ({
    ...v,
    hasVideo: publicAssetExists(v.src),
    hasPoster: publicAssetExists(v.poster),
  }));

  return (
    <>
      {/* Section 1 — Hero Slider */}
      <HeroSlider />

      {/* Trust Strip */}
      <section className="bg-kayora-blue-900 py-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-kayora-cream/60 uppercase tracking-widest font-sans">
            <span>NAFDAC Reg. A1-111026</span>
            <span className="text-kayora-gold-500" aria-hidden="true">·</span>
            <span>SON MANCAP Certified</span>
            <span className="text-kayora-gold-500" aria-hidden="true">·</span>
            <span>Eight-Stage Purification</span>
            <span className="text-kayora-gold-500" aria-hidden="true">·</span>
            <span>Made in Eket, Akwa Ibom</span>
          </div>
        </div>
      </section>

      {/* Section 2 — The Range */}
      <section className="bg-kayora-cream py-[clamp(6rem,10vw,10rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-display text-xl italic text-kayora-blue-700 mb-16 text-center lg:text-left">
            Four sizes. One standard.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skus.map((sku) => (
              <SKUCard key={sku.size} {...sku} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2b — Inauguration Social Proof */}
      <section className="bg-white py-[clamp(5rem,9vw,9rem)] border-t border-kayora-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Recognition
            </p>
            <h2 className="font-display text-display-lg text-kayora-ink">
              Trusted at the Highest Level
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1 — Governor's Commissioning */}
            <div className="bg-kayora-cream border border-kayora-mist rounded-2xl p-8 flex flex-col">
              <span className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
                June 2026 · Eket, Akwa Ibom
              </span>
              <h3 className="font-display text-xl font-semibold text-kayora-ink mb-3">
                Commissioned by the Governor of Akwa Ibom State
              </h3>
              <p className="text-kayora-graphite leading-relaxed">
                On 24 June 2026, Executive Governor Pastor Umo Eno commissioned the Kayora manufacturing facility at our Eket site — a recognition of the standard we hold ourselves to.
              </p>
            </div>

            {/* Card 2 — Photo */}
            <div className="relative rounded-2xl overflow-hidden border border-kayora-mist bg-kayora-blue-100 aspect-[4/3] lg:aspect-auto flex flex-col">
              <div className="relative flex-1 min-h-[220px] bg-kayora-blue-900/5">
                {hasPhoto ? (
                  <Image
                    src={INAUGURATION_PHOTO}
                    alt="Governor of Akwa Ibom State at the Kayora facility commissioning, June 2026"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-kayora-stone p-6 text-center">
                    <ImageOff className="w-8 h-8" aria-hidden="true" />
                    <p className="text-sm">Commissioning photos coming soon</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-kayora-stone bg-white px-4 py-3 border-t border-kayora-mist">
                Our Eket facility — commissioned June 2026
              </p>
            </div>

            {/* Cards 3 & 4 — Ceremony + Facility videos */}
            {videoAvailability.map((v) => (
              <InaugurationVideoCard
                key={v.key}
                src={v.src}
                poster={v.poster}
                caption={v.caption}
                placeholder={v.placeholder}
                hasVideo={v.hasVideo}
                hasPoster={v.hasPoster}
              />
            ))}
          </div>

          {/* Callout strip */}
          <div className="mt-8 bg-kayora-gold-100 rounded-xl px-6 py-5 text-center">
            <p className="text-kayora-ink font-medium">
              Walk-in visits welcome. 173 Eket Oron Road, Eket — Mon–Sat, 8 am–6 pm.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Eight-Stage Process */}
      <ProcessSteps />

      {/* Section 3b — Social Proof */}
      <section className="bg-kayora-cream py-[clamp(4rem,7vw,7rem)] border-t border-kayora-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { stat: '4', label: 'Pack sizes', sub: '30cl · 50cl · 75cl · 18.9L' },
              { stat: '8', label: 'Purification stages', sub: 'Borehole to bottle' },
              { stat: '2', label: 'Regulatory bodies', sub: 'NAFDAC + SON MANCAP' },
              { stat: '9+', label: 'States covered', sub: 'Akwa Ibom & beyond' },
            ].map(({ stat, label, sub }) => (
              <div key={label} className="text-center">
                <p className="font-display text-5xl font-bold text-kayora-blue-900 mb-1">{stat}</p>
                <p className="font-semibold text-kayora-ink text-sm mb-1">{label}</p>
                <p className="text-xs text-kayora-stone">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — The Standard */}
      <section className="bg-white py-[clamp(6rem,10vw,10rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Why Kayora</p>
            <h2 className="font-display text-display-lg text-kayora-ink">
              The Standard Akwa Ibom Deserves.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Why Kayora pillars */}
            <div className="space-y-10">
              {[
                {
                  title: 'Certified, Not Just Claimed.',
                  body: 'NAFDAC has inspected our facility, our process and our records. Our registration number is printed on every label — and you can verify it.',
                },
                {
                  title: 'Local Manufacturing. Real Accountability.',
                  body: 'We are not a distant brand. We are at 173 Eket Oron Road. Walk in. Meet our team. See the line.',
                },
                {
                  title: 'Built for Nigerian Life.',
                  body: 'From the 30cl that pairs with jollof to the 18.9L that anchors an office, every SKU is designed for the way Nigerians actually drink, host and work.',
                },
              ].map((pillar) => (
                <div key={pillar.title}>
                  <h3 className="font-display text-xl font-semibold text-kayora-ink mb-3">{pillar.title}</h3>
                  <p className="text-kayora-graphite leading-relaxed">{pillar.body}</p>
                </div>
              ))}
            </div>
            {/* Right: Trust signals */}
            <div className="space-y-6">
              {[
                {
                  label: 'NAFDAC Registered',
                  detail: 'Reg. No. A1-111026',
                  sub: 'All four pack sizes — 30cl, 50cl, 75cl, 18.9L',
                },
                {
                  label: 'SON MANCAP Certified',
                  detail: 'FT-29179 · FT-29180',
                  sub: 'PET bottles and 18.9L polycarbonate dispenser',
                },
                {
                  label: 'Eight-Stage Purification',
                  detail: 'Borehole → Sediment → Carbon → Ion Exchange → Precision → RO → UV → Ozonation',
                  sub: 'Every batch. Every bottle. No exceptions.',
                },
                {
                  label: 'Made in Eket, Akwa Ibom State',
                  detail: '173 Eket Oron Road',
                  sub: 'Nigerian-owned, Nigerian-operated',
                },
              ].map((signal) => (
                <div key={signal.label} className="border border-kayora-mist rounded-xl p-6">
                  <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">{signal.label}</p>
                  <p className="font-display text-lg font-semibold text-kayora-ink">{signal.detail}</p>
                  <p className="text-sm text-kayora-stone mt-1">{signal.sub}</p>
                </div>
              ))}
              <Link
                href="/authentic"
                className="flex items-start gap-3 border border-kayora-mist rounded-xl p-6 hover:border-kayora-blue-500 hover:bg-kayora-blue-100/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
              >
                <ShieldCheck className="w-6 h-6 text-kayora-gold-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">Verify Your Bottle</p>
                  <p className="font-display text-lg font-semibold text-kayora-ink">Scan or check online</p>
                  <p className="text-sm text-kayora-stone mt-1">Confirm your Kayora is genuine →</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — For Distributors */}
      <section className="bg-kayora-blue-900 py-[clamp(6rem,10vw,10rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
              For Distributors
            </p>
            <h2 className="font-display text-display-md text-kayora-cream mb-6">
              Carry the Standard.<br />Build a Business.
            </h2>
            <p className="text-kayora-cream/80 leading-relaxed mb-4 max-w-[65ch]">
              Kayora is actively recruiting distributors across Akwa Ibom and our live South-South and South-East states — Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo. Attractive rebates and other incentives. Reliable supply. Marketing support. And a brand customers already trust.
            </p>
            <p className="text-sm text-kayora-cream/60 mb-10">
              Direct delivery across Akwa Ibom State · Distributor network in Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo{' — '}
              <Link href="/distribution" className="text-kayora-cream/80 hover:text-kayora-cream underline underline-offset-2 transition-colors">
                See full delivery details →
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/distribution"
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-gold-500 text-white font-semibold rounded-lg hover:bg-kayora-gold-500/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-kayora-blue-900"
              >
                Become a Distributor
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-kayora-blue-900"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
