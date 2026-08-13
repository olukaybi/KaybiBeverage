'use client';

import { useState, useRef, type FormEvent } from 'react';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';
import { getStoredUtm } from '@/components/UtmCapture';
import type { LeadSegment } from '@/lib/leadSegments';

export interface LeadFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: readonly string[];
  helperText?: string;
  /** Layout hint — 'half' (default) pairs two fields per row on sm+, 'full' spans the row. */
  span?: 'half' | 'full';
}

interface LeadFormProps {
  segment: LeadSegment;
  apiEndpoint: string;
  fields: LeadFormField[];
  submitLabel: string;
  thankYou: { heading: string; body: string; whatsappHref?: string };
  consentText?: string;
  formName: string;
  /** e.g. { source_page: 'products/18-9l' } — merged into the submitted payload. */
  extraFields?: Record<string, string>;
}

const inputClass =
  'w-full h-12 px-4 border border-kayora-mist rounded-md bg-white text-kayora-ink placeholder:text-kayora-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition';
const labelClass = 'block text-eyebrow uppercase tracking-widest text-kayora-graphite mb-1.5';

export default function LeadForm({ segment, apiEndpoint, fields, submitLabel, thankYou, consentText, formName, extraFields }: LeadFormProps) {
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  function handleFormStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    track('form_start', { form_name: formName, segment });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = { ...getStoredUtm(), ...extraFields };
    for (const field of fields) data[field.name] = String(formData.get(field.name) ?? '');
    // honeypot
    data._hp = String(formData.get('_hp') ?? '');

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setState(res.ok ? 'success' : 'error');
      if (res.ok) {
        track(`form_submit_${segment}`, { form_name: formName, segment, preferred_sku: data.preferredSku, location: data.location || data.state });
        setTimeout(() => successRef.current?.focus(), 0);
      } else {
        setTimeout(() => errorRef.current?.focus(), 0);
      }
    } catch {
      setState('error');
      setTimeout(() => errorRef.current?.focus(), 0);
    }
  }

  if (state === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="bg-kayora-gold-100 border border-kayora-gold-500 rounded-xl p-10 text-center outline-none"
        aria-live="polite"
      >
        <h3 className="font-display text-xl font-semibold text-kayora-ink mb-3">{thankYou.heading}</h3>
        <p className="text-kayora-graphite leading-relaxed max-w-[55ch] mx-auto">{thankYou.body}</p>
        {thankYou.whatsappHref && (
          <a
            href={thankYou.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] px-6 mt-6 border border-kayora-blue-900 text-kayora-blue-900 font-semibold rounded-lg hover:bg-kayora-blue-900/10 transition-colors"
          >
            Message us on WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocusCapture={handleFormStart} noValidate className="space-y-6">
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor={`${formName}_website`}>Website</label>
        <input id={`${formName}_website`} name="_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map((field) => {
          const wrapperClass = field.span === 'full' ? 'sm:col-span-2' : '';
          return (
            <div key={field.name} className={wrapperClass}>
              <label htmlFor={field.name} className={labelClass}>
                {field.label} {field.required && <span aria-hidden="true">*</span>}
                {!field.required && <span className="text-kayora-stone normal-case tracking-normal">(optional)</span>}
              </label>
              {field.type === 'select' ? (
                <select id={field.name} name={field.name} required={field.required} className={cn(inputClass, 'cursor-pointer')} defaultValue="">
                  <option value="" disabled>Select…</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  rows={4}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-kayora-mist rounded-md bg-white text-kayora-ink placeholder:text-kayora-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition resize-none"
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              )}
              {field.helperText && <p className="text-xs text-kayora-stone mt-1">{field.helperText}</p>}
            </div>
          );
        })}
      </div>

      {state === 'error' && (
        <div
          ref={errorRef}
          role="alert"
          tabIndex={-1}
          className="bg-red-50 border border-kayora-danger text-kayora-danger rounded-md px-4 py-3 text-sm outline-none"
        >
          <p className="font-semibold mb-1">Something went wrong — please try again.</p>
          <p>
            If the problem continues, call{' '}
            <a href="tel:+2349040789918" className="font-semibold underline">0904 078 9918</a> or email{' '}
            <a href="mailto:info@kaybibeverage.com" className="font-semibold underline">info@kaybibeverage.com</a>.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full min-h-[48px] bg-kayora-blue-900 hover:bg-kayora-blue-700 disabled:opacity-60 text-kayora-cream font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2"
      >
        {state === 'submitting' ? 'Sending…' : submitLabel}
      </button>

      {consentText && <p className="text-xs text-kayora-stone text-center">{consentText}</p>}
    </form>
  );
}
