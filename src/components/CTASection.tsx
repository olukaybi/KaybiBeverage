'use client';

import Link from 'next/link';
import { track, type EventParams } from '@/lib/analytics';

interface CTALink {
  label: string;
  href: string;
  /** Optional — fires track(event, eventParams) on click. Omit for untracked CTAs. */
  event?: string;
  eventParams?: EventParams;
}

function handleCtaClick(cta: CTALink) {
  if (cta.event) track(cta.event, cta.eventParams);
}

interface CTASectionProps {
  headline: string;
  body: string;
  primaryCTA: CTALink;
  secondaryCTA?: CTALink;
  variant?: 'blue' | 'cream';
}

export default function CTASection({
  headline,
  body,
  primaryCTA,
  secondaryCTA,
  variant = 'blue',
}: CTASectionProps) {
  const isBlue = variant === 'blue';

  return (
    <section
      className={`py-[clamp(4rem,8vw,8rem)] ${
        isBlue ? 'bg-kayora-blue-900' : 'bg-kayora-gold-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className={`font-display text-display-lg mb-6 max-w-2xl mx-auto ${
            isBlue ? 'text-kayora-cream' : 'text-kayora-ink'
          }`}
        >
          {headline}
        </h2>
        <p
          className={`text-lg leading-relaxed mb-10 max-w-[65ch] mx-auto ${
            isBlue ? 'text-kayora-cream/80' : 'text-kayora-graphite'
          }`}
        >
          {body}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCTA.href}
            onClick={() => handleCtaClick(primaryCTA)}
            className={`inline-flex items-center justify-center min-h-[48px] px-8 py-3 font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isBlue
                ? 'bg-kayora-cream text-kayora-blue-900 hover:bg-kayora-gold-100 focus-visible:ring-kayora-cream'
                : 'bg-kayora-blue-900 text-kayora-cream hover:bg-kayora-blue-700 focus-visible:ring-kayora-blue-500'
            }`}
          >
            {primaryCTA.label}
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              onClick={() => handleCtaClick(secondaryCTA)}
              className={`inline-flex items-center justify-center min-h-[48px] px-8 py-3 font-semibold rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isBlue
                  ? 'border-white/40 text-white hover:bg-white/10 focus-visible:ring-white'
                  : 'border-kayora-blue-900 text-kayora-blue-900 hover:bg-kayora-blue-100 focus-visible:ring-kayora-blue-500'
              }`}
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
