import { TESTIMONIALS, TESTIMONIAL_STATS } from '@/lib/testimonials';

interface TestimonialsProps {
  className?: string;
}

/**
 * Real customer testimonials from verified Facebook Page reviews.
 * Facebook Page reviews are a Yes/No "recommends" system, not a 5-star
 * system — a checkmark/"Recommends" badge is used per card instead of
 * star icons, which would misrepresent the actual review format.
 */
export default function Testimonials({ className = 'bg-white' }: TestimonialsProps) {
  return (
    <section className={`py-[clamp(4rem,8vw,8rem)] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
            Trusted by our customers
          </p>
          <h2 className="font-display text-display-md text-kayora-ink mb-2">
            {TESTIMONIAL_STATS.recommendPercent}% Recommend
          </h2>
          <p className="text-kayora-stone text-sm">
            ({TESTIMONIAL_STATS.reviewCount} reviews on Facebook)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="bg-kayora-cream border border-kayora-mist rounded-2xl p-6 flex flex-col"
            >
              <blockquote className="text-kayora-graphite text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-kayora-mist">
                <p className="font-semibold text-kayora-ink text-sm mb-2">{t.name}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-kayora-success">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.415l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414l2.793 2.793 6.793-6.793a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Recommends Kayora Water
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <a
          href={TESTIMONIAL_STATS.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 text-sm font-semibold text-kayora-blue-700 hover:text-kayora-blue-900 transition-colors"
        >
          See all reviews on Facebook →
        </a>
      </div>
    </section>
  );
}
