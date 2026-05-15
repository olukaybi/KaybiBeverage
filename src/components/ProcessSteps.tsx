'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface Step {
  number: string;
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Deep Borehole Source',
    body: 'Water is drawn from a protected deep borehole, far below the reach of surface contamination. Starting clean means finishing cleaner.',
  },
  {
    number: '02',
    title: 'Sediment Filtration',
    body: 'Multi-layer sediment filters capture suspended particles, fine debris, and sediment before deeper treatment begins.',
  },
  {
    number: '03',
    title: 'Activated Carbon Filtration',
    body: 'Activated carbon adsorption eliminates chlorine, organic compounds, unwanted odours, and taste impurities.',
  },
  {
    number: '04',
    title: 'Reverse Osmosis',
    body: 'High-pressure RO membranes remove dissolved solids, heavy metals, and residual bacteria to deliver exceptionally pure water.',
  },
  {
    number: '05',
    title: 'UV Sterilisation',
    body: 'Ultraviolet light irradiation destroys any remaining microbial life — without adding chemicals or altering taste.',
  },
  {
    number: '06',
    title: 'Ozonisation',
    body: 'A final ozone treatment preserves freshness, extends shelf-life, and ensures the water that reaches your table is clean as it left the plant.',
  },
];

interface ProcessStepsProps {
  eyebrow?: string;
  headline?: string;
  intro?: string;
}

export default function ProcessSteps({
  eyebrow = 'Six-Stage Purification',
  headline = 'What "Premium" Really Means',
  intro = 'We don\'t bottle ordinary water and call it premium. Every drop of Kayora moves through six engineered stages before it reaches you.',
}: ProcessStepsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
            {eyebrow}
          </p>
          <h2 className="font-display text-display-lg text-kayora-ink mb-4">{headline}</h2>
          {intro && (
            <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">{intro}</p>
          )}
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              <p className="font-display text-display-md text-kayora-gold-500 leading-none mb-3">
                {step.number}
              </p>
              <h3 className="font-sans font-semibold text-kayora-ink text-lg mb-2">{step.title}</h3>
              <p className="text-kayora-graphite text-sm leading-relaxed max-w-[65ch]">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
