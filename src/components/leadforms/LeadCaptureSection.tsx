import LeadForm, { type LeadFormField } from '@/components/leadforms/LeadForm';
import type { LeadSegment } from '@/lib/leadSegments';

interface LeadCaptureSectionProps {
  id?: string;
  eyebrow: string;
  headline: string;
  body: string;
  segment: LeadSegment;
  apiEndpoint: string;
  fields: LeadFormField[];
  submitLabel: string;
  thankYou: { heading: string; body: string; whatsappHref?: string };
  formName: string;
  sourcePage: string;
  className?: string;
}

const CONSENT_TEXT = 'Your information is used solely to respond to your enquiry. We do not share it with third parties.';

/**
 * Consistent framing for every segmented lead-capture form on the site —
 * headline/body copy above a LeadForm instance. Pages own the segment
 * copy and field config; this just keeps the layout uniform.
 */
export default function LeadCaptureSection({
  id,
  eyebrow,
  headline,
  body,
  segment,
  apiEndpoint,
  fields,
  submitLabel,
  thankYou,
  formName,
  sourcePage,
  className = 'bg-kayora-cream',
}: LeadCaptureSectionProps) {
  return (
    <section id={id} className={`py-[clamp(4rem,8vw,8rem)] scroll-mt-24 ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">{eyebrow}</p>
        <h2 className="font-display text-display-md text-kayora-ink mb-4">{headline}</h2>
        <p className="text-kayora-graphite leading-relaxed mb-10 max-w-[65ch]">{body}</p>
        <LeadForm
          segment={segment}
          apiEndpoint={apiEndpoint}
          fields={fields}
          submitLabel={submitLabel}
          thankYou={thankYou}
          consentText={CONSENT_TEXT}
          formName={formName}
          extraFields={{ source_page: sourcePage }}
        />
      </div>
    </section>
  );
}
