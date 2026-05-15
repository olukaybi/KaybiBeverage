interface Pillar {
  icon?: string;
  title: string;
  body: string;
}

interface PillarGridProps {
  eyebrow: string;
  headline: string;
  pillars: Pillar[];
  className?: string;
}

export default function PillarGrid({ eyebrow, headline, pillars, className = '' }: PillarGridProps) {
  return (
    <section className={`py-[clamp(4rem,8vw,8rem)] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
            {eyebrow}
          </p>
          <h2 className="font-display text-display-lg text-kayora-ink">{headline}</h2>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <div key={pillar.title} className="flex flex-col">
              <p className="font-display text-display-md text-kayora-gold-500 leading-none mb-3">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="font-display text-xl font-semibold text-kayora-ink mb-3">{pillar.title}</h3>
              <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
