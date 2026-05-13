'use client';

import { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
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
        <div className="text-4xl mb-3">💧</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-700 text-sm leading-relaxed">
          Thank you for reaching out. We'll get back to you within one business day. For urgent orders, call us directly on <strong>09040789918</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="name">Name *</label>
          <input
            id="name" name="name" type="text" required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="phone">Phone *</label>
          <input
            id="phone" name="phone" type="tel" required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white"
            placeholder="08XXXXXXXXX"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="contactEmail">Email Address</label>
        <input
          id="contactEmail" name="email" type="email"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="subject">Subject *</label>
        <select
          id="subject" name="subject" required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white"
        >
          <option value="">Select a subject…</option>
          <option value="order">Place an Order</option>
          <option value="wholesale">Wholesale Enquiry</option>
          <option value="delivery">Delivery Question</option>
          <option value="general">General Enquiry</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="contactMessage">Message *</label>
        <textarea
          id="contactMessage" name="message" rows={4} required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-azure-400 focus:border-transparent bg-white resize-none"
          placeholder="Tell us what you need — product size, quantity, delivery location…"
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
        {state === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
