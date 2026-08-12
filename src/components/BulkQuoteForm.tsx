'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const EVENT_TYPES = [
  'Wedding',
  'Corporate event',
  'Naming ceremony',
  'Conference',
  'Hotel / restaurant supply',
  'Other',
] as const;

// Maps the Event Water Estimator's internal event types (Change 11 deep
// link, /contact?event_type=wedding&guests=...) onto this form's options.
const ESTIMATOR_EVENT_TYPE_MAP: Record<string, (typeof EVENT_TYPES)[number]> = {
  wedding: 'Wedding',
  corporate: 'Corporate event',
};

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(7, 'Please enter a valid phone / WhatsApp number'),
  eventType: z.enum(EVENT_TYPES, { required_error: 'Please select an event or order type' }),
  guestCount: z.string().optional(),
  deliveryDate: z.string().optional(),
  location: z.string().min(2, 'Please tell us the delivery area'),
  notes: z.string().max(2000).optional(),
  _hp: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  'w-full h-12 px-4 border border-kayora-mist rounded-md bg-white text-kayora-ink placeholder:text-kayora-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition';

const labelClass = 'block text-eyebrow uppercase tracking-widest text-kayora-graphite mb-1.5';

export default function BulkQuoteForm() {
  const searchParams = useSearchParams();
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const defaultEventType = useMemo(() => {
    const raw = searchParams.get('event_type');
    return raw ? ESTIMATOR_EVENT_TYPE_MAP[raw] : undefined;
  }, [searchParams]);
  const defaultGuests = searchParams.get('guests') ?? undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      fullName: '',
      phone: '',
      eventType: defaultEventType as FormValues['eventType'],
      guestCount: defaultGuests,
      deliveryDate: '',
      location: '',
      notes: '',
    },
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
        body: JSON.stringify({
          type: 'bulk_quote',
          fullName: data.fullName,
          phone: data.phone,
          eventType: data.eventType,
          guestCount: data.guestCount || undefined,
          deliveryDate: data.deliveryDate || undefined,
          location: data.location,
          notes: data.notes || undefined,
          _hp: data._hp,
        }),
      });
      setSubmitState(res.ok ? 'success' : 'error');
    } catch {
      setSubmitState('error');
    }
  }

  const whatsappHref = buildWhatsAppLink(
    "Hi, I'd like to request a bulk or event order quote."
  );

  if (submitState === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="bg-kayora-gold-100 border border-kayora-gold-500 rounded-xl p-10 text-center outline-none"
        aria-live="polite"
      >
        <h3 className="font-display text-xl font-semibold text-kayora-ink mb-3">Quote request received.</h3>
        <p className="text-kayora-graphite leading-relaxed max-w-[55ch] mx-auto">
          Thank you. Our team will reach out by phone or WhatsApp within one business day to confirm availability, pricing and delivery.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-kayora-mist rounded-2xl p-6 sm:p-8">
      <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-2">
        Weddings · Conferences · Institutions
      </p>
      <h2 className="font-display text-2xl font-semibold text-kayora-ink mb-2">
        Request a Bulk or Event Quote
      </h2>
      <p className="text-kayora-graphite text-sm mb-6 leading-relaxed max-w-[65ch]">
        Planning a wedding, conference, or need ongoing supply for a hotel or office? Tell us the details and our team will put together pricing and a delivery plan.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Honeypot */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
          <label htmlFor="bulk_website">Website</label>
          <input id="bulk_website" type="text" tabIndex={-1} autoComplete="off" {...register('_hp')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="bq_fullName" className={labelClass}>
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="bq_fullName"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              className={cn(inputClass, errors.fullName && 'border-kayora-danger focus-visible:ring-kayora-danger')}
              {...register('fullName')}
            />
            {errors.fullName && <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.fullName.message}</p>}
          </div>
          <div>
            <label htmlFor="bq_phone" className={labelClass}>
              Phone / WhatsApp <span aria-hidden="true">*</span>
            </label>
            <input
              id="bq_phone"
              type="tel"
              autoComplete="tel"
              placeholder="08XXXXXXXXX"
              className={cn(inputClass, errors.phone && 'border-kayora-danger focus-visible:ring-kayora-danger')}
              {...register('phone')}
            />
            {errors.phone && <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="bq_eventType" className={labelClass}>
              Event or order type <span aria-hidden="true">*</span>
            </label>
            <select
              id="bq_eventType"
              className={cn(inputClass, 'cursor-pointer', errors.eventType && 'border-kayora-danger focus-visible:ring-kayora-danger')}
              {...register('eventType')}
            >
              <option value="">Select…</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.eventType && <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.eventType.message}</p>}
          </div>
          <div>
            <label htmlFor="bq_guestCount" className={labelClass}>
              Guests / people served <span className="text-kayora-stone">(optional)</span>
            </label>
            <input
              id="bq_guestCount"
              type="number"
              min={1}
              placeholder="e.g. 200"
              className={inputClass}
              {...register('guestCount')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="bq_deliveryDate" className={labelClass}>
              Preferred delivery date <span className="text-kayora-stone">(optional)</span>
            </label>
            <input
              id="bq_deliveryDate"
              type="date"
              className={inputClass}
              {...register('deliveryDate')}
            />
          </div>
          <div>
            <label htmlFor="bq_location" className={labelClass}>
              Location / delivery area <span aria-hidden="true">*</span>
            </label>
            <input
              id="bq_location"
              type="text"
              placeholder="e.g. Uyo, Eket, Ikot Ekpene…"
              className={cn(inputClass, errors.location && 'border-kayora-danger focus-visible:ring-kayora-danger')}
              {...register('location')}
            />
            {errors.location && <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.location.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="bq_notes" className={labelClass}>
            Additional notes <span className="text-kayora-stone">(optional)</span>
          </label>
          <textarea
            id="bq_notes"
            rows={4}
            placeholder="Product sizes, quantities, or anything else we should know…"
            className="w-full px-4 py-3 border border-kayora-mist rounded-md bg-white text-kayora-ink placeholder:text-kayora-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition resize-none"
            {...register('notes')}
          />
        </div>

        {submitState === 'error' && (
          <div
            ref={errorRef}
            role="alert"
            tabIndex={-1}
            className="bg-red-50 border border-kayora-danger text-kayora-danger rounded-md px-4 py-3 text-sm outline-none"
          >
            <p className="font-semibold mb-1">Request not sent — please try again.</p>
            <p>
              Or reach us directly on{' '}
              <a href="tel:+2349040789918" className="font-semibold underline">0904 078 9918</a>.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitState === 'submitting'}
          className="w-full min-h-[48px] bg-kayora-blue-900 hover:bg-kayora-blue-700 disabled:opacity-60 text-kayora-cream font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2"
        >
          {submitState === 'submitting' ? 'Sending…' : 'Request Quote'}
        </button>

        <p className="text-center text-sm text-kayora-stone">
          Prefer WhatsApp? Send your request directly &rarr;{' '}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#128C7E] hover:underline"
          >
            Chat on WhatsApp
          </a>
        </p>
      </form>
    </div>
  );
}
