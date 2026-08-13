'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
export const UTM_STORAGE_KEY = 'kayora_utm';

/**
 * Captures utm_* params on landing and persists them to sessionStorage so
 * they survive client-side navigation to a conversion page (e.g. a Meta ad
 * lands on /for-offices, the visitor then browses to /contact and submits
 * the form — the original campaign is still attributable). Never overwrites
 * an existing capture with an empty visit, so mid-session internal clicks
 * don't clobber the original campaign attribution.
 */
export default function UtmCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const found: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = searchParams.get(key);
      if (value) found[key] = value;
    }
    if (Object.keys(found).length > 0) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify({ ...found, captured_at: new Date().toISOString() }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}

export function getStoredUtm(): Partial<Record<(typeof UTM_KEYS)[number], string>> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    delete parsed.captured_at;
    return parsed;
  } catch {
    return {};
  }
}
