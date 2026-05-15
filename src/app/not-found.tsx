import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Kayora Water',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-kayora-cream">
      <div className="max-w-lg mx-auto px-4 text-center">
        <p className="font-display text-display-xl text-kayora-gold-500 mb-4">404</p>
        <h1 className="font-display text-display-md text-kayora-ink mb-4">
          We can&rsquo;t find that page.
        </h1>
        <p className="text-kayora-graphite leading-relaxed mb-8">
          Let&rsquo;s get you back to clean water.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-kayora-cream font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-kayora-blue-900 text-kayora-blue-900 font-semibold rounded-lg hover:bg-kayora-blue-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
