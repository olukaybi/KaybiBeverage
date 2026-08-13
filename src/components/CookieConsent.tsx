'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'kayora-consent-v1';
const GA_ID = 'G-EFLPGZD0MQ';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyWindow = any;

// Set NEXT_PUBLIC_META_PIXEL_ID to enable the Meta Pixel — unset (the
// production default until the business supplies a real Pixel ID) means
// this loader is a no-op and only GA4 loads.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function loadGA() {
  if (typeof window === 'undefined' || (window as AnyWindow).__gaLoaded) return;
  (window as AnyWindow).__gaLoaded = true;

  (window as AnyWindow).dataLayer = (window as AnyWindow).dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]) {
    ((window as AnyWindow).dataLayer as unknown[]).push(args);
  }
  (window as AnyWindow).gtag = gtag;

  gtag('js', new Date());
  gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied' });
  gtag('config', GA_ID);

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);
}

function loadMetaPixel() {
  if (!META_PIXEL_ID) return;
  if (typeof window === 'undefined' || (window as AnyWindow).__pixelLoaded) return;
  (window as AnyWindow).__pixelLoaded = true;

  const win = window as AnyWindow;
  win.fbq = win.fbq || function fbq(...args: unknown[]) {
    (win.fbq.queue = win.fbq.queue || []).push(args);
  };
  if (!win._fbq) win._fbq = win.fbq;
  win.fbq.push = win.fbq;
  win.fbq.loaded = true;
  win.fbq.version = '2.0';
  win.fbq.queue = [];

  win.fbq('init', META_PIXEL_ID);
  win.fbq('track', 'PageView');

  const script = document.createElement('script');
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.async = true;
  document.head.appendChild(script);
}

function hasPrivacySignal(): boolean {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  const win = window as Window & { doNotTrack?: string };
  return nav.doNotTrack === '1' || win.doNotTrack === '1' || nav.globalPrivacyControl === true;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'granted') {
      loadGA();
      loadMetaPixel();
      return;
    }
    if (stored === 'denied') return;
    if (hasPrivacySignal()) {
      localStorage.setItem(CONSENT_KEY, 'denied');
      return;
    }
    setVisible(true);
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    setVisible(false);
    loadGA();
    loadMetaPixel();
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 bg-kayora-ink/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 sm:px-6 sm:py-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 justify-between">
        <p className="text-sm text-white/80 leading-relaxed max-w-[70ch]">
          We use cookies to understand how visitors use this site. You can change your choice
          at any time in our{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="min-h-[44px] text-sm text-white/70 hover:text-white transition-colors px-4 py-2 rounded-lg border border-white/20 hover:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="min-h-[44px] text-sm bg-kayora-gold-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-kayora-gold-500/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-kayora-ink"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
