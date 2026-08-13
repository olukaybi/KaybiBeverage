'use client';

import { trackWhatsAppClick } from '@/lib/analytics';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  message: string;
  label?: string;
  pageType: string;
  pageName: string;
  sku?: string;
  audienceType?: string;
  ctaLocation?: string;
  className?: string;
}

/**
 * Reusable, tracked WhatsApp CTA. Every WhatsApp entry point on the site
 * should render through this component so click events are consistently
 * named `whatsapp_click_<page_name>` with page/sku/audience context — see
 * src/lib/analytics.ts.
 */
export default function WhatsAppButton({
  message,
  label = 'Message on WhatsApp',
  pageType,
  pageName,
  sku,
  audienceType,
  ctaLocation,
  className = 'inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-kayora-blue-900',
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackWhatsAppClick({
          page_type: pageType,
          page_name: pageName,
          sku,
          audience_type: audienceType,
          cta_location: ctaLocation,
        })
      }
      className={className}
    >
      {label}
    </a>
  );
}
