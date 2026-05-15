import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Our Water — Six-Stage Purification | Kayora',
  description:
    'The full story of what is in every bottle of Kayora Premium Purified Water. Six engineered purification stages, NAFDAC Reg. A1-111026, SON MANCAP Registered. Detailed product range.',
  alternates: { canonical: 'https://www.kayorawater.com/our-water' },
};

const stages = [
  {
    number: '01',
    title: 'Deep Borehole Source',
    body: 'Water begins its journey in a protected deep borehole, sourced far below the level where surface contaminants — agricultural run-off, faecal matter, dissolved pollutants — typically exist. The borehole is sealed, maintained and tested regularly. Starting clean is non-negotiable.',
  },
  {
    number: '02',
    title: 'Sediment Filtration',
    body: 'The water passes through multi-layer sediment filters designed to capture suspended particles, fine debris, sand, silt and other physical impurities. Multiple filter layers with progressively finer porosity ensure that nothing visible or tactile survives this stage.',
  },
  {
    number: '03',
    title: 'Activated Carbon Filtration',
    body: 'Activated carbon is one of the most effective water treatment media available. At this stage, it adsorbs chlorine (often present in borehole water from geological sources), organic compounds, pesticide residues, and the taste- and odour-causing substances that make water unpleasant even when it is technically safe.',
  },
  {
    number: '04',
    title: 'Reverse Osmosis',
    body: 'This is the core technical step. High-pressure reverse osmosis membranes — with pore sizes measured in nanometres — remove dissolved solids, heavy metals (lead, arsenic, mercury), nitrates, pharmaceutical residues, and any bacteria not already captured upstream. RO is the gold standard in water purification and the step that most producers either skip or undersize. We did not.',
  },
  {
    number: '05',
    title: 'UV Sterilisation',
    body: 'After RO, the water is exposed to ultraviolet light at precisely calibrated wavelengths. UV irradiation destroys the DNA of any microbial life — bacteria, viruses, protozoa — that may have survived earlier stages. It adds no chemicals, leaves no by-products, and does not alter taste or mineral content. It simply kills what should not be in drinking water.',
  },
  {
    number: '06',
    title: 'Ozonisation',
    body: 'The final stage. Ozone is a naturally occurring, powerful oxidising agent that destroys any remaining organic compounds, provides an additional disinfection layer, and extends shelf-life without the use of artificial preservatives. After ozonisation, the water is sealed immediately. Nothing touches it between the last treatment step and the sealed bottle in your hand.',
  },
];

const skuDetails = [
  {
    size: '30cl',
    name: 'Sharp-sharp',
    material: 'PET (Food-grade, BPA-free)',
    nafdac: 'A1-111026',
    son: 'FT-29179',
    desc: 'The event standard. Compact, portable, easy to chill en masse. Our 30cl is produced in volume for weddings, naming ceremonies, corporate functions, conferences and any event where water is served to guests. The small footprint makes it easy to package, transport and distribute. The seal is tamper-evident.',
    caseInfo: 'Standard case: 24 bottles. Custom case counts available for large event orders.',
  },
  {
    size: '50cl',
    name: 'Original',
    material: 'PET (Food-grade, BPA-free)',
    nafdac: 'A1-111026',
    son: 'FT-29179',
    desc: 'The everyday bottle. The 50cl Original is the backbone of our range — the size that goes into school bags, sits on office desks, is sold in supermarkets and kiosks, and is consumed in restaurants and fast-food outlets across Akwa Ibom. It is sized for one glass, chilled well and consumed easily.',
    caseInfo: 'Standard case: 12 bottles.',
  },
  {
    size: '75cl',
    name: 'Jara',
    material: 'PET (Food-grade, BPA-free)',
    nafdac: 'A1-111026',
    son: 'FT-29179',
    desc: 'A little extra, the way Nigerians know how. The 75cl Jara is for people who hydrate seriously — gym-goers, travellers, fieldworkers, anyone whose day runs long. It is generously sized without being impractical. Hotels and restaurants use it as a table water option for diners who prefer a larger serve.',
    caseInfo: 'Standard case: 12 bottles.',
  },
  {
    size: '18.9L',
    name: 'Never Finish',
    material: 'Polycarbonate (Food-grade, BPA-free)',
    nafdac: 'A1-111026',
    son: 'FT-29180',
    desc: 'The dispenser standard. A single 18.9L bottle serves a household for multiple days or a small office for a week. The polycarbonate bottle is durable, reusable (for its return cycle), and fits all standard floor-standing and countertop water dispensers available in Nigeria. The seal is triple-locked at our facility.',
    caseInfo: 'Sold per unit. Scheduled delivery and return/replacement service available.',
  },
];

export default function OurWaterPage() {
  return (
    <>
      <Hero
        eyebrow="Our Water"
        headline={"What's Actually\nin the Bottle."}
        subhead="The long version of the story we tell on the label — without the marketing softness."
        primaryCTA={{ label: 'Order Kayora', href: '/contact' }}
        secondaryCTA={{ label: 'Become a Distributor', href: '/distribution' }}
        imageSrc="/images/products/kayora-front-view.jpeg"
        imageAlt="Kayora Premium Purified Water — four pack sizes on display"
      />

      {/* It Starts Underground */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              The Source
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">It Starts Underground</h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              <p>
                The water in every Kayora bottle originates from a protected deep borehole at our Eket facility. We did not choose a surface water source. We did not connect to a municipal supply of uncertain provenance. We drilled deep, to water that has been naturally filtered through geological strata over decades.
              </p>
              <p>
                That geological filtration does not make the water safe to drink on its own — it simply means we start with water that is far less contaminated than surface alternatives. What happens next is what makes Kayora what it is.
              </p>
              <p>
                The borehole is sealed against surface intrusion, monitored regularly, and the water is tested before it enters our production line. Source integrity is the first quality checkpoint. We take it seriously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Six Engineered Stages */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              The Process
            </p>
            <h2 className="font-display text-display-lg text-kayora-ink mb-4">
              Six Engineered Stages
            </h2>
            <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">
              These stages are not marketing bullet points. They are sequential, interdependent steps that each address a specific category of contamination. Skipping or underinvesting in any one of them produces an inferior product. We have not skipped any.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {stages.map((stage) => (
              <div key={stage.number} className="grid sm:grid-cols-[100px_1fr] gap-6 items-start border-b border-kayora-mist pb-10 last:border-0 last:pb-0">
                <p className="font-display text-display-md text-kayora-gold-500 leading-none">{stage.number}</p>
                <div>
                  <h3 className="font-sans font-semibold text-xl text-kayora-ink mb-3">{stage.title}</h3>
                  <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">{stage.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sealed at the Source */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Bottling & Sealing
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">Sealed at the Source</h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              <p>
                After ozonisation, the water moves directly to filling under controlled conditions. The interval between the final treatment step and bottle sealing is measured in seconds, not minutes. Bottles are filled, capped and sealed without manual handling in the fill zone.
              </p>
              <p>
                Caps are tamper-evident. Labels are applied immediately after sealing, carrying the batch number, production date and NAFDAC registration. Every bottle that leaves our facility is a traceable unit.
              </p>
              <p>
                We do not produce water that sits in open tanks. We do not refill bottles that have been returned without sanitisation. Every bottle of Kayora that you open has been sealed since it left our plant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Range In Detail */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Product Range
            </p>
            <h2 className="font-display text-display-lg text-kayora-ink mb-4">The Range — In Detail</h2>
            <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">
              Four sizes. The same water. The same six-stage process. Every unit carries a valid NAFDAC registration number and SON MANCAP registration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skuDetails.map((sku) => (
              <div key={sku.size} className="border border-kayora-mist rounded-xl p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 mb-1">{sku.size}</p>
                    <h3 className="font-display text-2xl font-semibold text-kayora-ink">{sku.name}</h3>
                  </div>
                </div>
                <p className="text-kayora-graphite text-sm leading-relaxed mb-6 max-w-[55ch]">{sku.desc}</p>
                <dl className="space-y-2 text-sm border-t border-kayora-mist pt-5">
                  <div className="flex gap-4">
                    <dt className="text-kayora-stone w-32 shrink-0">Material</dt>
                    <dd className="text-kayora-graphite">{sku.material}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-kayora-stone w-32 shrink-0">NAFDAC Reg.</dt>
                    <dd className="text-kayora-graphite font-semibold">{sku.nafdac}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-kayora-stone w-32 shrink-0">SON MANCAP</dt>
                    <dd className="text-kayora-graphite font-semibold">{sku.son}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-kayora-stone w-32 shrink-0">Packaging</dt>
                    <dd className="text-kayora-graphite">{sku.caseInfo}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why the Bottle Itself Matters */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Packaging
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">
              Why the Bottle Itself Matters
            </h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              <p>
                The purification process means nothing if the vessel it goes into is compromised. All Kayora PET bottles (30cl, 50cl, 75cl) are food-grade, BPA-free, and manufactured to NAFDAC-compliant specifications. They are sourced from qualified suppliers and inspected before use.
              </p>
              <p>
                Our 18.9L bottles are polycarbonate — a harder, more durable material suited to dispenser use. They are also BPA-free. The 18.9L bottle is part of a managed return cycle: bottles returned by customers are inspected, sanitised under hot water and chemical treatment, inspected again, and returned to fill only after passing both inspections.
              </p>
              <p>
                We do not use second-hand bottles from unverified sources. We do not refill bottles that cannot pass our sanitisation inspection. The bottle is part of the product. We treat it accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mineral Profile / CoA */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Water Quality
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">Mineral Profile</h2>
            <div className="bg-kayora-gold-100 border border-kayora-gold-500 rounded-xl p-8">
              <p className="text-kayora-graphite leading-relaxed mb-4">
                A batch-specific certificate of analysis is available on request. Please call{' '}
                <a href="tel:+2349040789918" className="font-semibold text-kayora-blue-700 hover:underline">
                  0904 078 9918
                </a>{' '}
                or email{' '}
                <a href="mailto:info@kaybibeverage.com" className="font-semibold text-kayora-blue-700 hover:underline">
                  info@kaybibeverage.com
                </a>{' '}
                and we will send the current batch CoA.
              </p>
              <p className="text-kayora-stone text-sm">
                Parameters tested include: pH, total dissolved solids (TDS), turbidity, coliform bacteria, E. coli, nitrates, nitrites, fluoride, lead, arsenic, and other parameters specified under NAFDAC guidelines for purified drinking water.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Now You Know What's in the Bottle."
        body="You can order Kayora for your home, office, event or business directly. We deliver across Akwa Ibom and respond to enquiries within hours."
        primaryCTA={{ label: 'Order Kayora', href: '/contact' }}
        secondaryCTA={{ label: 'Become a Distributor', href: '/distribution' }}
        variant="blue"
      />
    </>
  );
}
