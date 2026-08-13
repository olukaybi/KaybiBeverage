export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  category: 'office' | 'event' | 'hospitality' | 'distributor' | 'trust';
}

interface TestimonialSectionProps {
  eyebrow?: string;
  headline?: string;
  /** Real, sourced testimonials only — leave empty until the business supplies them. */
  testimonials?: Testimonial[];
  className?: string;
}

/**
 * Social-proof section. With no testimonials supplied, renders a neutral,
 * factual "trusted by" credibility strip instead of fabricated quotes —
 * per brand rule, this component must never invent testimonial content.
 * Once real testimonials exist, pass them in and the quote-card layout
 * takes over automatically; no page-level changes needed.
 */
export default function TestimonialSection({
  eyebrow = 'Trusted By',
  headline = 'Why Businesses and Families Choose Kayora',
  testimonials = [],
  className = 'bg-white',
}: TestimonialSectionProps) {
  const hasTestimonials = testimonials.length > 0;

  return (
    <section className={`py-[clamp(4rem,8vw,8rem)] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">{eyebrow}</p>
          <h2 className="font-display text-display-md text-kayora-ink">{headline}</h2>
        </div>

        {hasTestimonials ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-kayora-cream border border-kayora-mist rounded-xl p-6 flex flex-col">
                <blockquote className="text-kayora-graphite leading-relaxed text-sm flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 pt-4 border-t border-kayora-mist">
                  <p className="font-semibold text-kayora-ink text-sm">{t.name}</p>
                  <p className="text-xs text-kayora-stone">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'NAFDAC Registered', detail: 'A1-111026', sub: 'Inspected and approved' },
              { label: 'SON MANCAP Certified', detail: 'FT-29179 · FT-29180', sub: 'All four pack sizes' },
              { label: 'Nine States Served', detail: 'Direct + distributor', sub: 'Akwa Ibom & beyond' },
              { label: 'Made in Eket', detail: '173 Eket Oron Road', sub: 'Nigerian-owned, on-site' },
            ].map((item) => (
              <div key={item.label} className="border border-kayora-mist rounded-xl p-6">
                <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">{item.label}</p>
                <p className="font-display text-lg font-semibold text-kayora-ink">{item.detail}</p>
                <p className="text-sm text-kayora-stone mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
