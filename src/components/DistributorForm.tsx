'use client';

import { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function DistributorForm() {
  const [state, setState] = useState<FormState>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/distributor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      setState(res.ok ? 'success' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Application Received!</h3>
        <p className="text-green-700 text-sm leading-relaxed">
          Thank you for your interest in becoming a Kayora distributor. Our team will review your application and follow up within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="fullName">Full Name *</label>
          <input
            id="fullName" name="fullName" type="text" required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="businessName">Business Name *</label>
          <input
            id="businessName" name="businessName" type="text" required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white"
            placeholder="Your business name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="phone">Phone Number *</label>
          <input
            id="phone" name="phone" type="tel" required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white"
            placeholder="08XXXXXXXXX"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">Email Address</label>
          <input
            id="email" name="email" type="email"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="location">Location / LGA *</label>
        <input
          id="location" name="location" type="text" required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white"
          placeholder="e.g. Eket, Uyo, Ibeno..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="partnerType">Partnership Type *</label>
        <select
          id="partnerType" name="partnerType" required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white"
        >
          <option value="">Select type…</option>
          <option value="retailer">Retailer</option>
          <option value="distributor">Distributor</option>
          <option value="corporate">Corporate / Institutional</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="products">Products of Interest</label>
        <div className="grid grid-cols-2 gap-2">
          {['30cl Sharp-sharp', '50cl Original', '75cl Jara', '18.9L Never Finish'].map(p => (
            <label key={p} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" name="products" value={p} className="accent-azure-500 w-4 h-4" />
              {p}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="message">Additional Information</label>
        <textarea
          id="message" name="message" rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white resize-none"
          placeholder="Anything else you'd like us to know about your business…"
        />
      </div>

      {state === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          Something went wrong. Please try again or call us directly on 09040789918.
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full bg-azure-500 hover:bg-azure-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors text-sm"
      >
        {state === 'submitting' ? 'Submitting…' : 'Submit Application'}
      </button>
      <p className="text-xs text-gray-400 text-center">We review all applications within two business days.</p>
    </form>
  );
}
