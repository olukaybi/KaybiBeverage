'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';
import { getStoredUtm } from '@/components/UtmCapture';

const SUBJECTS = [
  'Home / personal order',
  'Office supply',
  'Bulk / event order',
  'Distribution enquiry',
  'Partnership or sponsorship',
  'Press or media',
  'Something else',
] as const;

const STATES = [
  'Akwa Ibom',
  'Cross River',
  'Rivers',
  'Bayelsa',
  'Delta',
  'Edo',
  'Enugu',
  'Anambra',
  'Abia',
  'Imo',
  'Other',
] as const;

const SKUS = ['30cl — Sharp-sharp', '50cl — Original', '75cl — Jara', '18.9L — Never Finish', 'Not sure yet'] as const;

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.enum(SUBJECTS, { required_error: 'Please select a subject' }),
  state: z.enum(STATES).optional(),
  preferredSku: z.enum(SKUS).optional(),
  message: z.string().min(10, 'Please write at least 10 characters'),
  _hp: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const shortcuts: { label: string; subject: (typeof SUBJECTS)[number] }[] = [
  { label: 'Home / Personal', subject: 'Home / personal order' },
  { label: 'Office Supply', subject: 'Office supply' },
  { label: 'Event Order', subject: 'Bulk / event order' },
  { label: 'Distributor Enquiry', subject: 'Distribution enquiry' },
];

const inputClass =
  'w-full h-12 px-4 border border-kayora-mist rounded-md bg-white text-kayora-ink placeholder:text-kayora-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition';

const labelClass = 'block text-eyebrow uppercase tracking-widest text-kayora-graphite mb-1.5';

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (submitState === 'success') successRef.current?.focus();
    else if (submitState === 'error') errorRef.current?.focus();
  }, [submitState]);

  function handleFormStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    track('form_start', { form_name: 'contact' });
  }

  async function onSubmit(data: FormValues) {
    setSubmitState('submitting');
    try {
      const res = await fetch('/api/contact-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...getStoredUtm() }),
      });
      setSubmitState(res.ok ? 'success' : 'error');
      if (res.ok) {
        track('form_submit_contact', { subject: data.subject, state: data.state, preferred_sku: data.preferredSku });
      }
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
    <form onSubmit={handleSubmit(onSubmit)} onFocusCapture={handleFormStart} noValidate className="space-y-6">
      {/* Quick shortcuts — pre-select the subject for common enquiry types */}
      <div>
        <p className={labelClass}>What brings you here?</p>
        <div className="flex flex-wrap gap-2">
          {shortcuts.map((s) => (
            <button
              key={s.subject}
              type="button"
              onClick={() => setValue('subject', s.subject, { shouldValidate: true })}
              className="px-4 py-2 text-sm font-medium border border-kayora-mist rounded-full text-kayora-graphite hover:border-kayora-blue-500 hover:text-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

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
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.subject && (
          <p role="alert" className="mt-1 text-xs text-kayora-danger">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* State + Preferred SKU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="state" className={labelClass}>
            State / Location <span className="text-kayora-stone">(optional)</span>
          </label>
          <select id="state" className={cn(inputClass, 'cursor-pointer')} {...register('state')}>
            <option value="">Select a state…</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="preferredSku" className={labelClass}>
            Preferred Size <span className="text-kayora-stone">(optional)</span>
          </label>
          <select id="preferredSku" className={cn(inputClass, 'cursor-pointer')} {...register('preferredSku')}>
            <option value="">Select a size…</option>
            {SKUS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
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
