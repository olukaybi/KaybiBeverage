import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.kayorawater.com/about' },
  ],
};

export const metadata: Metadata = {
  title: 'About Kayora & Kaybi Beverage Industries | Eket, Akwa Ibom',
  description:
    'Kaybi Beverage Industries Limited produces Kayora premium purified water in Eket, Akwa Ibom. NAFDAC Registered, eight-stage purification, locally manufactured.',
  alternates: { canonical: 'https://www.kayorawater.com/about' },
};

export default function AboutPage() {
  return (
    <>
      <Hero
        leadBrand
        leadBrandSub="A product of Kaybi Beverage Industries Limited"
        eyebrow="Our Story"
        headline={'Born in Eket.\nBuilt for Every Table.'}
        subhead="Kaybi Beverage Industries was founded on a stubborn idea — that the water Nigerians drink every day should meet the highest standard, not the lowest acceptable one."
        primaryCTA={{ label: 'Schedule a Visit', href: '/contact' }}
        secondaryCTA={{ label: 'Our Water', href: '/our-water' }}
        imageSrc="/images/factory/factory-01.jpg"
        imageAlt="Kaybi Beverage Industries production facility — Eket, Akwa Ibom"
      />

      {/* Why We Built This Company */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Why We Built This Company
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">
              A Stubborn Idea About Water
            </h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              <p>
                In too many parts of Nigeria, &ldquo;table water&rdquo; is a category defined by what people are willing to overlook — packaging that bursts, seals that aren&rsquo;t sealed, certifications that don&rsquo;t exist. Families pay anyway, because the alternatives are worse. We disagreed with the premise.
              </p>
              <p>
                Kaybi Beverage Industries Limited was incorporated with a single operating principle: every bottle that leaves our Eket facility must be something we would hand to our own family, without hesitation. That principle shapes everything from our borehole depth to our ozonation step to the way we seal and label each unit.
              </p>
              <p>
                We are not a large conglomerate. We are a focused manufacturing company, producing one product line with exceptional care. We think that focus is a feature, not a limitation.
              </p>
              <p>
                That product is Kayora.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooted in Akwa Ibom */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
                Our Roots
              </p>
              <h2 className="font-display text-display-md text-kayora-ink mb-8">
                Rooted in Akwa Ibom
              </h2>
              <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
                <p>
                  Our plant is at 173 Eket Oron Road, Eket. That address is not incidental. Eket is where our founders live. It is where our staff come from. It is where our first customers trusted us. Grounding the business here, in the community we serve, keeps us accountable in ways that a distant corporate structure cannot replicate.
                </p>
                <p>
                  Akwa Ibom State is one of Nigeria&rsquo;s most economically active states — oil and gas, agriculture, hospitality, education. Every one of those sectors needs clean water. Hotels need it for guests. Offices need it for staff. Schools need it for children. We see our role as supplying a critical utility, not just a commodity.
                </p>
                <p>
                  We deliver across Eket, Uyo, Oron, Ikot Ekpene and the wider state. As we grow, our distribution network will extend into neighbouring states — but our manufacturing heart will remain in Eket.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-kayora-blue-100 rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-kayora-ink mb-2">Our Facility</h3>
                <address className="not-italic text-kayora-graphite text-sm leading-relaxed">
                  173 Eket Oron Road<br />
                  Eket, Akwa Ibom State<br />
                  Nigeria (Postal Code 524101)
                </address>
                <a
                  href="https://maps.google.com/?q=4.6420,7.9288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-sm text-kayora-blue-700 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
                >
                  View on Google Maps &rarr;
                </a>
              </div>
              <div className="bg-kayora-mist rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-kayora-ink mb-3">Business Hours</h3>
                <dl className="space-y-1 text-sm text-kayora-graphite">
                  <div className="flex justify-between">
                    <dt>Monday – Saturday</dt>
                    <dd className="font-semibold">8:00am – 6:00pm WAT</dd>
                  </div>
                  <div className="flex justify-between text-kayora-stone">
                    <dt>Sunday</dt>
                    <dd>Closed</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safe for Every Table */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Our Tagline, Explained
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">
              What &ldquo;Safe for Every Table&rdquo; Means to Us
            </h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              <p>
                &ldquo;Safe for every table&rdquo; is not marketing language. It is an operational commitment. The water in a Kayora 30cl served at a wedding in Eket is identical — in purity, in process, in standard — to the water in the 18.9L dispensed in an Uyo office. There is no &ldquo;event grade&rdquo; and &ldquo;bulk grade.&rdquo; There is only Kayora grade.
              </p>
              <p>
                This matters because water is not optional. It is the one product a consumer cannot meaningfully inspect before consuming. That invisible trust is one we take seriously. Every batch we produce is traceable. Every label carries a valid NAFDAC registration number. Every bottle is sealed at point of fill.
              </p>
              <p>
                We say &ldquo;every table&rdquo; because we mean it without qualification. The restaurant table. The hospital bedside. The naming ceremony. The school canteen. The hotel minibar. We do not tier our product. We produce one standard and hold to it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory section */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Our Certifications
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">
              Regulated. Inspected. Documented.
            </h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch] mb-10">
              <p>
                We did not apply for NAFDAC registration because we had to. We applied because we wanted consumers to be able to verify, independently, that Kayora is what we say it is. The registration process required physical inspection of our facility, review of our manufacturing processes, and assessment of our water quality records.
              </p>
              <p>
                We passed. Our registration is current. It is printed on every label. You can verify it on the NAFDAC portal using the number below.
              </p>
              <p>
                The numbers are on our bottles. The records are open to inspection. That is the deal.
              </p>
            </div>

            {/* Certification callout */}
            <div className="bg-kayora-gold-100 border border-kayora-gold-500 rounded-xl p-8 space-y-6">
              <div>
                <p className="text-eyebrow uppercase tracking-widest text-kayora-stone mb-2">NAFDAC Registration</p>
                <p className="font-display text-2xl font-semibold text-kayora-ink">A1-111026</p>
                <p className="text-kayora-graphite text-sm mt-1">
                  Valid through April 2031. Covers all four pack sizes (30cl, 50cl, 75cl, 18.9L).
                </p>
              </div>
              <div className="border-t border-kayora-gold-500/40 pt-6">
                <p className="text-eyebrow uppercase tracking-widest text-kayora-stone mb-2">SON MANCAP Registered</p>
                <dl className="space-y-1 text-sm text-kayora-graphite">
                  <div className="flex gap-4">
                    <dt className="font-semibold">FT-29179</dt>
                    <dd>PET bottles — 30cl, 50cl, 75cl</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="font-semibold">FT-29180</dt>
                    <dd>18.9L polycarbonate bottle</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The People Behind the Bottle */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Our Team
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">
              The People Behind the Bottle
            </h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              <p>
                Kaybi Beverage Industries is operated by a small, experienced team of production, logistics and customer service staff — most of them from Eket and the surrounding communities. We are not trying to be a mass-market corporation. We are trying to be the most trusted water company in Akwa Ibom.
              </p>
              <p>
                Our production team runs the plant with precision. Our delivery staff know the roads. Our customer-facing team answers calls the same day. This is not accidental — it is the culture we have deliberately built.
              </p>
              <p>
                We are growing. And as we grow, we are committed to maintaining the operational discipline and personal accountability that defines Kayora today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Quiet Commitment */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Our Commitment
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">
              A Quiet Commitment
            </h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              <p>
                We do not make grand promises about changing Nigeria. We make a more modest and more actionable commitment: to produce, consistently, the cleanest table water available in Akwa Ibom State — and to earn the trust of every customer, one bottle at a time.
              </p>
              <p>
                If you are a household customer, that means you can trust that every 50cl or 18.9L you buy from us is the same quality as the last. If you are a distributor, it means your reputation is safe with our product. If you are a hotel or restaurant, it means your guests are drinking water that meets Nigeria&rsquo;s highest certification standards.
              </p>
              <p>
                That is the commitment. It is quiet. It is unglamorous. And it is the one we show up to honour every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Come See For Yourself."
        body="Our facility welcomes scheduled visits from distributors, partners and large customers. Call ahead and we will have someone ready to walk you through the plant."
        primaryCTA={{ label: 'Schedule a Visit', href: '/contact' }}
        variant="blue"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
