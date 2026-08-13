'use client';

import { useEffect } from 'react';
import { track, type EventParams } from '@/lib/analytics';

interface PageViewTrackerProps {
  event: string;
  params?: EventParams;
}

/**
 * Fires one named event on mount — used for `product_view_<sku>` on SKU
 * pages and generic `page_view` context (audience_type, page_type) on
 * growth/use-case pages, on top of GA4's own automatic page_view. Renders
 * nothing; safe to drop into any page.
 */
export default function PageViewTracker({ event, params = {} }: PageViewTrackerProps) {
  useEffect(() => {
    track(event, params);
    // Fire once per mount only — params are static per page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
