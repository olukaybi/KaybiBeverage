import type { Metadata } from 'next';
import { Suspense } from 'react';
import Hero from '@/components/Hero';
import ContactForm from '@/components/ContactForm';
import BulkQuoteForm from '@/components/BulkQuoteForm';
import MapEmbed from '@/components/MapEmbed';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.kayorawater.com/contact' },
  ],
};

export const metadata: Metadata = {
  title: 'Contact Kayora | Order & Delivery in Akwa Ibom',
  description:
    'Order Kayora premium purified water for home, office, or events. Direct delivery in Akwa Ibom; enquiries welcome. 173 Eket Oron Road, Eket, Akwa Ibom State, Nigeria.',
  alternates: { canonical: 'https://www.kayorawater.com/contact' },
  openGraph: {
    type: 'website',
    url: 'https://www.kayorawater.com/contact',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kayora Premium Purified Water — Wellness in every drop!',
        type: 'image/png',
      },
    ],
  },
};

const contactCards = [
  {
    icon: Phone,
    title: 'Call Us',
    lines: [
      { text: '0904 078 9918', href: 'tel:+2349040789918' },
    ],
    note: 'Monday–Saturday, 8:00am–6:00pm WAT',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: [
      { text: 'info@kaybibeverage.com', href: 'mailto:info@kaybibeverage.com' },
    ],
    note: 'We respond within one business day.',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: [
      { text: '173 Eket Oron Road, Eket', href: 'https://maps.google.com/?q=4.6420,7.9288' },
      { text: 'Akwa Ibom State, Nigeria 524101', href: null },
    ],
    note: 'Facility visits by appointment.',
  },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Get in Touch"
        headline={"We're in Eket.\nEasy to Reach."}
        subhead="Place an order, ask a question, schedule a visit. We respond within hours during business days."
        primaryCTA={{ label: 'Call 0904 078 9918', href: 'tel:+2349040789918' }}
        secondaryCTA={{ label: 'Email Us', href: 'mailto:info@kaybibeverage.com' }}
        imageSrc="/images/factory/factory-02.jpg"
        imageAlt="Kaybi Beverage Industries facility — 173 Eket Oron Road, Eket"
      />

      {/* Bulk / event quote — above the generic contact form so
          high-intent event and institutional buyers see it first */}
      <section id="bulk-quote" className="bg-white py-[clamp(4rem,8vw,6rem)] scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="h-96" />}>
            <BulkQuoteForm />
          </Suspense>
        </div>
      </section>

      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Contact info + map */}
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
                Contact Details
              </p>
              <h2 className="font-display text-display-md text-kayora-ink mb-8">
                How to Reach Us
              </h2>

              {/* Contact cards */}
              <div className="space-y-5 mb-10">
                {contactCards.map(({ icon: Icon, title, lines, note }) => (
                  <div
                    key={title}
                    className="flex gap-4 bg-white border border-kayora-mist rounded-xl p-5"
                  >
                    <div className="w-10 h-10 rounded-full bg-kayora-blue-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-kayora-blue-700" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-eyebrow uppercase tracking-widest text-kayora-stone mb-1">{title}</p>
                      {lines.map(({ text, href }) =>
                        href ? (
                          <a
                            key={text}
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="block text-kayora-ink font-medium hover:text-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
                          >
                            {text}
                          </a>
                        ) : (
                          <p key={text} className="text-kayora-ink font-medium">{text}</p>
                        )
                      )}
                      {note && <p className="text-xs text-kayora-stone mt-1">{note}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div className="bg-white border border-kayora-mist rounded-xl p-5 mb-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-kayora-blue-100 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-kayora-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-eyebrow uppercase tracking-widest text-kayora-stone mb-2">Business Hours</p>
                    <dl className="space-y-1 text-sm text-kayora-graphite">
                      <div className="flex justify-between gap-8">
                        <dt>Monday – Saturday</dt>
                        <dd className="font-semibold">8:00am – 6:00pm WAT</dd>
                      </div>
                      <div className="flex justify-between gap-8 text-kayora-stone">
                        <dt>Sunday</dt>
                        <dd>Closed</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              <MapEmbed />
            </div>

            {/* Right: Contact form */}
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
                Send a Message
              </p>
              <h2 className="font-display text-display-md text-kayora-ink mb-8">
                Tell Us What You Need
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
