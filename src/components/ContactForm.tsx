'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.enum(
    [
      'Placing an order',
      'Distribution enquiry',
      'Bulk/event order',
      'Partnership or sponsorship',
      'Press or media',
      'Something else',
    ],
    { required_error: 'Please select a subject' }
  ),
  message: z.string().min(10, 'Please write at least 10 characters'),
  _hp: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  'w-full h-12 px-4 border border-kayora-mist rounded-md bg-white text-kayora-ink placeholder:text-kayora-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition';

const labelClass = 'block text-eyebrow uppercase tracking-widest text-kayora-graphite mb-1.5';

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (submitState === 'success') successRef.current?.focus();
    else if (submitState === 'error') errorRef.current?.focus();
  }, [submitState]);

  async function onSubmit(data: FormValues) {
    setSubmitState('submitting');
    try {
      const res = await fetch('/api/contact-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitState(res.ok ? 'success' : 'error');
    } catch {
      setSubmitState('error');
    }
  }

  if (submitState === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="bg-kayora-gold-100 border border-kayora-gold-500 rounded-xl p-10 text-center outline-none"
        aria-live="polite"
      >
        <h3 className="font-display text-xl font-semibold text-kayora-ink mb-3">Message received.</h3>
        <p className="text-kayora-graphite leading-relaxed max-w-[55ch] mx-auto">
          Thank you. We&rsquo;ve received your message and will respond within one business day. For
          urgent orders, call{' '}
          <a href="tel:+2349040789918" className="font-semibold text-kayora-blue-700 hover:underline">
            0904 078 9918
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Honeypot — hidden from real users, catches bots that fill every field */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="contact_website">Website</label>
        <input
          id="contact_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('_hp')}
        />
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className={labelClass}>
          Full Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          className={cn(inputClass, errors.fullName && 'border-kayora-danger focus-visible:ring-kayora-danger')}
          {...register('fullName')}
        />
        {errors.fullName && (
          <p role="alert" className="mt-1 text-xs text-kayora-danger">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={cn(inputClass, errors.email && 'border-kayora-danger focus-visible:ring-kayora-danger')}
            {...register('email')}
          />
          {errors.email && (
            <p role="alert" className="mt-1 text-xs text-kayora-danger">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-kayora-stone">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="08XXXXXXXXX"
            className={inputClass}
            {...register('phone')}
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject <span aria-hidden="true">*</span>
        </label>
        <select
          id="subject"
          className={cn(
            inputClass,
            'cursor-pointer',
            errors.subject && 'border-kayora-danger focus-visible:ring-kayora-danger'
          )}
          {...register('subject')}
        >
          <option value="">Select a subject…</option>
          <option value="Placing an order">Placing an order</option>
          <option value="Distribution enquiry">Distribution enquiry</option>
          <option value="Bulk/event order">Bulk / event order</option>
          <option value="Partnership or sponsorship">Partnership or sponsorship</option>
          <option value="Press or media">Press or media</option>
          <option value="Something else">Something else</option>
        </select>
        {errors.subject && (
          <p role="alert" className="mt-1 text-xs text-kayora-danger">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us what you need — product size, quantity, delivery location…"
          className={cn(
            'w-full px-4 py-3 border border-kayora-mist rounded-md bg-white text-kayora-ink placeholder:text-kayora-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition resize-none',
            errors.message && 'border-kayora-danger focus-visible:ring-kayora-danger'
          )}
          {...register('message')}
        />
        {errors.message && (
          <p role="alert" className="mt-1 text-xs text-kayora-danger">
            {errors.message.message}
          </p>
        )}
      </div>

      {submitState === 'error' && (
        <div
          ref={errorRef}
          role="alert"
          tabIndex={-1}
          className="bg-red-50 border border-kayora-danger text-kayora-danger rounded-md px-4 py-3 text-sm outline-none"
        >
          <p className="font-semibold mb-1">Message not sent — please try again.</p>
          <p>
            If the problem continues, reach us directly:{' '}
            <a href="tel:+2349040789918" className="font-semibold underline">
              0904 078 9918
            </a>{' '}
            or{' '}
            <a href="mailto:info@kaybibeverage.com" className="font-semibold underline">
              info@kaybibeverage.com
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitState === 'submitting'}
        className="w-full min-h-[48px] bg-kayora-blue-900 hover:bg-kayora-blue-700 disabled:opacity-60 text-kayora-cream font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2"
      >
        {submitState === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
