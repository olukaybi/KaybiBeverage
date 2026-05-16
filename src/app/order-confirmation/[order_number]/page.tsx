import type { Metadata } from 'next';
import Link from 'next/link';
import KayoraWordmark from '@/components/KayoraWordmark';

export const metadata: Metadata = {
  title: 'Order Confirmed — Kayora Water',
  robots: { index: false },
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ order_number: string }>;
}) {
  const { order_number } = await params;

  return (
    <main className="min-h-screen bg-kayora-cream flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        <div className="mb-6">
          <KayoraWordmark variant="dark" className="text-[2.5rem] block mx-auto mb-2" />
        </div>

        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="font-display text-display-md text-kayora-ink mb-3">
          Order placed!
        </h1>
        <p className="text-kayora-graphite mb-2">
          Your order reference is:
        </p>
        <p className="font-display text-2xl font-bold text-kayora-blue-900 tracking-wider mb-6 bg-kayora-blue-100 rounded-xl py-3 px-6 inline-block">
          {order_number}
        </p>

        <div className="bg-white border border-kayora-mist rounded-2xl p-6 text-left mb-8 space-y-4">
          <h2 className="font-semibold text-kayora-ink">What happens next?</h2>
          <ol className="space-y-3 text-sm text-kayora-graphite">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-kayora-blue-100 text-kayora-blue-900 text-xs font-bold flex items-center justify-center">1</span>
              <span>Our team will review your order and call or WhatsApp you within a few hours to confirm the delivery details.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-kayora-blue-100 text-kayora-blue-900 text-xs font-bold flex items-center justify-center">2</span>
              <span>Payment can be made via bank transfer or cash on delivery — our team will advise you on the options.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-kayora-blue-100 text-kayora-blue-900 text-xs font-bold flex items-center justify-center">3</span>
              <span>Your Kayora water will be delivered fresh from our Eket facility on your preferred date.</span>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-2.5 bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-2.5 border border-kayora-blue-900 text-kayora-blue-900 text-sm font-semibold rounded-lg hover:bg-kayora-blue-100 transition-colors"
          >
            Continue shopping
          </Link>
        </div>

        <p className="mt-8 text-xs text-kayora-stone">
          Need help? Call us on{' '}
          <a href="tel:+2349040789918" className="underline">0904 078 9918</a>
          {' '}or email{' '}
          <a href="mailto:info@kaybibeverage.com" className="underline">info@kaybibeverage.com</a>
        </p>
      </div>
    </main>
  );
}
