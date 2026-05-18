'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  businessName: z.string().min(2, 'Please enter your business name'),
  businessType: z.enum(['Retailer', 'Wholesaler', 'Event Supplier', 'HoReCa', 'Other'], {
    required_error: 'Please select a business type',
  }),
  city: z.string().min(2, 'Please enter your city'),
  lga: z.string().min(2, 'Please enter your LGA'),
  state: z.string().min(2, 'Please enter your state'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  whatsapp: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  monthlyVolume: z.string().min(1, 'Please estimate your monthly volume'),
  yearsInBusiness: z.string().optional(),
  anythingElse: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  'w-full h-12 px-4 border border-kayora-mist rounded-md bg-white text-kayora-ink placeholder:text-kayora-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition';

const labelClass = 'block text-eyebrow uppercase tracking-widest text-kayora-graphite mb-1.5';

export default function DistributorForm() {
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    setSubmitState('submitting');
    try {
      const res = await fetch('/api/distributor', {
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
      <div className="bg-kayora-gold-100 border border-kayora-gold-500 rounded-xl p-10 text-center">
        <h3 className="font-display text-xl font-semibold text-kayora-ink mb-3">Application received.</h3>
        <p className="text-kayora-graphite leading-relaxed max-w-[55ch] mx-auto">
          Thank you. We&rsquo;ve received your distributor application and will respond within one business day. If you need to speak with us urgently, call{' '}
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
      {/* Full Name + Business Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={cn(inputClass, errors.fullName && 'border-kayora-danger')}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="businessName" className={labelClass}>
            Business Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="businessName"
            type="text"
            placeholder="Your business name"
            className={cn(inputClass, errors.businessName && 'border-kayora-danger')}
            {...register('businessName')}
          />
          {errors.businessName && (
            <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.businessName.message}</p>
          )}
        </div>
      </div>

      {/* Business Type */}
      <div>
        <label htmlFor="businessType" className={labelClass}>
          Business Type <span aria-hidden="true">*</span>
        </label>
        <select
          id="businessType"
          className={cn(inputClass, 'cursor-pointer', errors.businessType && 'border-kayora-danger')}
          {...register('businessType')}
        >
          <option value="">Select type…</option>
          <option value="Retailer">Retailer</option>
          <option value="Wholesaler">Wholesaler</option>
          <option value="Event Supplier">Event Supplier</option>
          <option value="HoReCa">HoReCa (Hotels / Restaurants / Catering)</option>
          <option value="Other">Other</option>
        </select>
        {errors.businessType && (
          <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.businessType.message}</p>
        )}
      </div>

      {/* Location: City, LGA, State */}
      <div>
        <p className={labelClass}>Location <span aria-hidden="true">*</span></p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="sr-only">City</label>
            <input
              id="city"
              type="text"
              placeholder="City"
              className={cn(inputClass, errors.city && 'border-kayora-danger')}
              {...register('city')}
            />
            {errors.city && (
              <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="lga" className="sr-only">LGA</label>
            <input
              id="lga"
              type="text"
              placeholder="LGA"
              className={cn(inputClass, errors.lga && 'border-kayora-danger')}
              {...register('lga')}
            />
            {errors.lga && (
              <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.lga.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="state" className="sr-only">State</label>
            <input
              id="state"
              type="text"
              placeholder="State"
              className={cn(inputClass, errors.state && 'border-kayora-danger')}
              {...register('state')}
            />
            {errors.state && (
              <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.state.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Phone + WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="08XXXXXXXXX"
            className={cn(inputClass, errors.phone && 'border-kayora-danger')}
            {...register('phone')}
          />
          {errors.phone && (
            <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="whatsapp" className={labelClass}>
            WhatsApp <span className="text-kayora-stone">(if different)</span>
          </label>
          <input
            id="whatsapp"
            type="tel"
            placeholder="WhatsApp number"
            className={inputClass}
            {...register('whatsapp')}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@business.com"
          className={cn(inputClass, errors.email && 'border-kayora-danger')}
          {...register('email')}
        />
        {errors.email && (
          <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.email.message}</p>
        )}
      </div>

      {/* Monthly Volume + Years in Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="monthlyVolume" className={labelClass}>
            Est. Monthly Volume <span aria-hidden="true">*</span>
          </label>
          <input
            id="monthlyVolume"
            type="text"
            placeholder="e.g. 500 cartons / 200 18.9L"
            className={cn(inputClass, errors.monthlyVolume && 'border-kayora-danger')}
            {...register('monthlyVolume')}
          />
          {errors.monthlyVolume && (
            <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.monthlyVolume.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="yearsInBusiness" className={labelClass}>
            Years in Business <span className="text-kayora-stone">(optional)</span>
          </label>
          <input
            id="yearsInBusiness"
            type="text"
            placeholder="e.g. 3 years"
            className={inputClass}
            {...register('yearsInBusiness')}
          />
        </div>
      </div>

      {/* Anything else */}
      <div>
        <label htmlFor="anythingElse" className={labelClass}>
          Anything else <span className="text-kayora-stone">(optional)</span>
        </label>
        <textarea
          id="anythingElse"
          rows={4}
          placeholder="Tell us anything that would help us understand your business or needs…"
          className="w-full px-4 py-3 border border-kayora-mist rounded-md bg-white text-kayora-ink placeholder:text-kayora-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition resize-none"
          {...register('anythingElse')}
        />
      </div>

      {submitState === 'error' && (
        <div role="alert" className="bg-red-50 border border-kayora-danger text-kayora-danger rounded-md px-4 py-3 text-sm">
          Something went wrong. Please try again or call us on{' '}
          <a href="tel:+2349040789918" className="font-semibold underline">0904 078 9918</a>.
        </div>
      )}

      <button
        type="submit"
        disabled={submitState === 'submitting'}
        className="w-full min-h-[48px] bg-kayora-blue-900 hover:bg-kayora-blue-700 disabled:opacity-60 text-kayora-cream font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2"
      >
        {submitState === 'submitting' ? 'Submitting…' : 'Submit Application'}
      </button>

      <p className="text-xs text-kayora-stone text-center">
        Your information is used solely to process your distributor application. We do not share it with third parties.
      </p>
    </form>
  );
}
