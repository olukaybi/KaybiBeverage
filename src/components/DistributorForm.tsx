'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';
import { getStoredUtm } from '@/components/UtmCapture';

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
  currentFootprint: z.string().min(2, 'Please describe your current distribution or retail footprint'),
  storageLogistics: z.string().min(2, 'Please describe your storage / logistics capability'),
  yearsInBusiness: z.string().optional(),
  websiteOrSocial: z.string().optional(),
  existingBrands: z.string().optional(),
  preferredTerritory: z.string().optional(),
  anythingElse: z.string().optional(),
  _hp: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  'w-full h-12 px-4 border border-kayora-mist rounded-md bg-white text-kayora-ink placeholder:text-kayora-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition';

const labelClass = 'block text-eyebrow uppercase tracking-widest text-kayora-graphite mb-1.5';

export default function DistributorForm() {
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

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

  function handleFormStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    track('form_start', { form_name: 'distribution' });
  }

  async function onSubmit(data: FormValues) {
    setSubmitState('submitting');
    try {
      const res = await fetch('/api/distributor-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...getStoredUtm(), source_page: 'distribution' }),
      });
      setSubmitState(res.ok ? 'success' : 'error');
      if (res.ok) {
        track('form_submit_distribution', { business_type: data.businessType, state: data.state });
        track('distributor_interest', { business_type: data.businessType, state: data.state });
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
        <h3 className="font-display text-xl font-semibold text-kayora-ink mb-3">Application received.</h3>
        <p className="text-kayora-graphite leading-relaxed max-w-[55ch] mx-auto">
          Thank you. We&rsquo;ve received your distributor application and will be in touch within
          one business day. If you need to speak with us urgently, call{' '}
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
      {/* Honeypot — hidden from real users, catches bots that fill every field */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="dist_website">Website</label>
        <input
          id="dist_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('_hp')}
        />
      </div>

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

      {/* Current Footprint + Storage/Logistics */}
      <div>
        <label htmlFor="currentFootprint" className={labelClass}>
          Current Distribution / Retail Footprint <span aria-hidden="true">*</span>
        </label>
        <input
          id="currentFootprint"
          type="text"
          placeholder="e.g. 12 retail outlets across Uyo and Eket"
          className={cn(inputClass, errors.currentFootprint && 'border-kayora-danger')}
          {...register('currentFootprint')}
        />
        {errors.currentFootprint && (
          <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.currentFootprint.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="storageLogistics" className={labelClass}>
          Storage / Logistics Capability <span aria-hidden="true">*</span>
        </label>
        <input
          id="storageLogistics"
          type="text"
          placeholder="e.g. 200 sqm warehouse, 2 delivery vans"
          className={cn(inputClass, errors.storageLogistics && 'border-kayora-danger')}
          {...register('storageLogistics')}
        />
        {errors.storageLogistics && (
          <p role="alert" className="mt-1 text-xs text-kayora-danger">{errors.storageLogistics.message}</p>
        )}
      </div>

      {/* Website/Social + Preferred Territory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="websiteOrSocial" className={labelClass}>
            Website or Social Page <span className="text-kayora-stone">(optional)</span>
          </label>
          <input
            id="websiteOrSocial"
            type="text"
            placeholder="e.g. instagram.com/yourbusiness"
            className={inputClass}
            {...register('websiteOrSocial')}
          />
        </div>
        <div>
          <label htmlFor="preferredTerritory" className={labelClass}>
            Preferred Territory <span className="text-kayora-stone">(optional)</span>
          </label>
          <input
            id="preferredTerritory"
            type="text"
            placeholder="e.g. Uyo and surrounding LGAs"
            className={inputClass}
            {...register('preferredTerritory')}
          />
        </div>
      </div>

      {/* Existing FMCG brands */}
      <div>
        <label htmlFor="existingBrands" className={labelClass}>
          Existing FMCG Brands Carried <span className="text-kayora-stone">(optional)</span>
        </label>
        <input
          id="existingBrands"
          type="text"
          placeholder="e.g. brand names you currently distribute"
          className={inputClass}
          {...register('existingBrands')}
        />
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
        <div
          ref={errorRef}
          role="alert"
          tabIndex={-1}
          className="bg-red-50 border border-kayora-danger text-kayora-danger rounded-md px-4 py-3 text-sm outline-none"
        >
          <p className="font-semibold mb-1">Application not sent — please try again.</p>
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
        {submitState === 'submitting' ? 'Submitting…' : 'Submit Application'}
      </button>

      <p className="text-xs text-kayora-stone text-center">
        Your information is used solely to process your distributor application. We do not share it with third parties.
      </p>
    </form>
  );
}
