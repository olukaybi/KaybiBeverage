'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/wholesale', label: 'Wholesale' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-azure-500 flex items-center justify-center text-white font-bold text-sm group-hover:bg-azure-600 transition-colors">
              K
            </div>
            <div>
              <span className="font-bold text-azure-600 text-lg leading-none">Kayora</span>
              <span className="block text-[10px] text-gray-400 leading-none tracking-widest uppercase">Premium Water</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-azure-600 border-b-2 border-azure-500 pb-0.5'
                    : 'text-gray-600 hover:text-azure-600'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 bg-azure-500 hover:bg-azure-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              Order Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-azure-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-azure-50 text-azure-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-azure-600'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 bg-azure-500 hover:bg-azure-600 text-white text-sm font-semibold px-4 py-2 rounded-full text-center transition-colors"
            >
              Order Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
