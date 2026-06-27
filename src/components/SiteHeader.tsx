'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SHOP_ENABLED } from '@/lib/flags';
import CartBadge from './CartBadge';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Our Water', href: '/our-water' },
  { label: 'Products', href: '/products' },
  { label: 'Distribution', href: '/distribution' },
  { label: 'Contact', href: '/contact' },
];

const toolsLinks = [
  { label: 'Hydration Calculator', href: '/tools/hydration', sub: 'Daily water intake' },
  { label: 'Event Water Estimator', href: '/tools/event-water', sub: 'Plan your event' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer/dropdowns on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDrawerOpen(false); setToolsOpen(false); }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-kayora-cream border-b border-kayora-mist shadow-sm'
            : 'bg-kayora-blue-900 border-b border-white/10'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-md"
              aria-label="Kayora Water — Home"
            >
              <Image
                src="/kayora-logo.png"
                alt="Kayora Water"
                width={120}
                height={36}
                className="w-[90px] lg:w-[120px] h-auto"
                style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
              {navLinks.map((link) => (
                link.label === 'Distribution' ? (
                  // Insert Tools dropdown before Distribution
                  <div key="tools-group" className="flex items-center gap-6">
                    <div ref={toolsRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setToolsOpen((v) => !v)}
                        className={cn(
                          'text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm px-1 inline-flex items-center gap-1',
                          scrolled ? 'text-kayora-graphite hover:text-kayora-blue-900' : 'text-white/90 hover:text-white'
                        )}
                      >
                        Tools
                        <svg className={`w-3 h-3 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {toolsOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border border-kayora-mist rounded-xl shadow-lg overflow-hidden z-50">
                          {toolsLinks.map((t) => (
                            <Link
                              key={t.href}
                              href={t.href}
                              onClick={() => setToolsOpen(false)}
                              className="block px-4 py-3 hover:bg-kayora-blue-100 transition-colors"
                            >
                              <p className="text-sm font-medium text-kayora-ink">{t.label}</p>
                              <p className="text-xs text-kayora-stone mt-0.5">{t.sub}</p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm px-1',
                        scrolled ? 'text-kayora-graphite hover:text-kayora-blue-900' : 'text-white/90 hover:text-white'
                      )}
                    >
                      {link.label}
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm px-1',
                      scrolled ? 'text-kayora-graphite hover:text-kayora-blue-900' : 'text-white/90 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              {SHOP_ENABLED && (
                <span className={scrolled ? 'text-kayora-graphite' : 'text-white'}>
                  <CartBadge />
                </span>
              )}
              <Link
                href="/products"
                className="inline-flex items-center justify-center min-h-[48px] px-5 py-2 bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2"
              >
                Order Kayora
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav"
              onClick={() => setDrawerOpen((v) => !v)}
              className={cn(
                'lg:hidden p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition-colors',
                scrolled ? 'text-kayora-ink' : 'text-white'
              )}
            >
              {drawerOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-kayora-ink/50 lg:hidden"
          aria-hidden="true"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 w-72 bg-kayora-cream shadow-xl transition-transform duration-300 lg:hidden flex flex-col',
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-kayora-mist">
          <Image
            src="/kayora-logo.png"
            alt="Kayora Water"
            width={108}
            height={32}
            className="w-[90px] h-auto"
          />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-kayora-graphite rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="block px-4 py-3 text-kayora-graphite font-medium rounded-lg hover:bg-kayora-blue-100 hover:text-kayora-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="px-4 pt-4 pb-1">
            <p className="text-xs font-semibold text-kayora-stone uppercase tracking-widest mb-2">Tools</p>
          </div>
          {toolsLinks.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              onClick={() => setDrawerOpen(false)}
              className="block px-4 py-2.5 text-kayora-graphite rounded-lg hover:bg-kayora-blue-100 hover:text-kayora-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition-colors"
            >
              <p className="text-sm font-medium">{t.label}</p>
              <p className="text-xs text-kayora-stone">{t.sub}</p>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-kayora-mist space-y-3">
          {SHOP_ENABLED && (
            <Link
              href="/cart"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-kayora-graphite font-medium rounded-lg hover:bg-kayora-blue-100 hover:text-kayora-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              View Cart
            </Link>
          )}
          <Link
            href="/products"
            onClick={() => setDrawerOpen(false)}
            className="flex items-center justify-center min-h-[48px] w-full px-5 py-3 bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
          >
            Order Kayora
          </Link>
        </div>
      </div>
    </>
  );
}
