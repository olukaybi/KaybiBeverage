'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Our Water', href: '/our-water' },
  { label: 'Distribution', href: '/distribution' },
  { label: 'Contact', href: '/contact' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change / escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-kayora-cream border-b border-kayora-mist shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-md"
              aria-label="Kayora Water — Home"
            >
              <Image
                src="/kaybi-logo.svg"
                alt="Kaybi Beverage Industries — Kayora Water"
                width={140}
                height={40}
                priority
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm px-1',
                    scrolled
                      ? 'text-kayora-graphite hover:text-kayora-blue-900'
                      : 'text-white/90 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
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
            src="/kaybi-logo.svg"
            alt="Kayora Water"
            width={120}
            height={36}
            className="h-9 w-auto"
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
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
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
        </nav>
        <div className="p-4 border-t border-kayora-mist">
          <Link
            href="/contact"
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
