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
    body: 'Water is drawn from a protected deep borehole on our Eket site, far below the reach of surface contamination. Starting clean means finishing cleaner.',
  },
  {
    number: '02',
    title: 'Sediment Filtration',
    body: 'Multi-layer sediment filters capture suspended particles, fine debris, sand and silt before deeper treatment begins.',
  },
  {
    number: '03',
    title: 'Activated Carbon Filtration',
    body: 'Activated carbon adsorption strips chlorine, organic compounds, unwanted odours and taste impurities from the water.',
  },
  {
    number: '04',
    title: 'Ion Exchange Resin',
    body: 'An ion exchange resin bed removes dissolved hardness ions and other charged contaminants, conditioning the water and protecting the RO membrane downstream.',
  },
  {
    number: '05',
    title: 'Precision Filtration (5µm → 1µm)',
    body: 'A cascade of progressively finer cartridge filters captures the finest remaining particulates before reverse osmosis — the last mechanical barrier before the membrane.',
  },
  {
    number: '06',
    title: 'Reverse Osmosis',
    body: 'High-pressure RO membranes — with pores measured in fractions of a nanometre — remove dissolved solids, heavy metals and residual microbial contaminants.',
  },
  {
    number: '07',
    title: 'UV Sterilisation',
    body: 'High-intensity ultraviolet light at 254 nm destroys the DNA of any remaining bacteria, viruses and protozoa. No chemicals. No taste change. Purely physical.',
  },
  {
    number: '08',
    title: 'Ozonation',
    body: 'A final dose of dissolved ozone neutralises anything remaining and persists briefly inside the sealed bottle, providing residual protection until the seal is broken.',
  },
];

interface ProcessStepsProps {
  eyebrow?: string;
  headline?: string;
  intro?: string;
}

export default function ProcessSteps({
  eyebrow = 'Eight-Stage Purification',
  headline = 'What "Premium" Really Means',
  intro = 'We don\'t bottle ordinary water and call it premium. Every drop of Kayora moves through eight engineered stages before it reaches you.',
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
