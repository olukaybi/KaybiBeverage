import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ContactForm from '@/components/ContactForm';
import MapEmbed from '@/components/MapEmbed';
import TrackedAnchor from '@/components/TrackedAnchor';
import LeadForm from '@/components/leadforms/LeadForm';
import { GENERAL_UPDATES_FIELDS } from '@/lib/leadForms/general';
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
      { text: '0904 078 9918', href: 'tel:+2349040789918', event: 'phone_click_contact' },
    ],
    note: 'Monday–Saturday, 8:00am–6:00pm WAT',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: [
      { text: 'info@kaybibeverage.com', href: 'mailto:info@kaybibeverage.com', event: 'email_click_contact' },
    ],
    note: 'We respond within one business day.',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: [
      { text: '173 Eket Oron Road, Eket', href: 'https://maps.google.com/?q=4.6420,7.9288', event: 'map_click_contact' },
      { text: 'Akwa Ibom State, Nigeria 524101', href: null, event: undefined },
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
        subhead="Place an order, ask a question, schedule a visit. We typically respond within hours during business hours (Monday–Saturday, 8:00am–6:00pm WAT)."
        primaryCTA={{ label: 'Call 0904 078 9918', href: 'tel:+2349040789918', event: 'phone_click_contact', eventParams: { page_name: 'contact', cta_location: 'hero' } }}
        secondaryCTA={{ label: 'Message on WhatsApp', href: 'https://wa.me/2349040789918', event: 'whatsapp_click_contact', eventParams: { page_name: 'contact', cta_location: 'hero' } }}
        imageSrc="/images/factory/factory-02.jpg"
        imageAlt="Kaybi Beverage Industries facility — 173 Eket Oron Road, Eket"
      />

      <div className="lg:hidden bg-kayora-cream px-4 pt-6 text-center">
        <a
          href="#send-message"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-kayora-blue-700 hover:text-kayora-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
        >
          Prefer to write? Jump to the message form ↓
        </a>
      </div>

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
                      {lines.map(({ text, href, event }) =>
                        href ? (
                          <TrackedAnchor
                            key={text}
                            href={href}
                            event={event ?? 'contact_link_click'}
                            eventParams={{ page_name: 'contact' }}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="block text-kayora-ink font-medium hover:text-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
                          >
                            {text}
                          </TrackedAnchor>
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
            <div id="send-message" className="scroll-mt-24">
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

      {/* Lightest-touch capture — product/availability updates, not a dominant CTA */}
      <section className="bg-white py-16 border-t border-kayora-mist">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-2">Stay in the Loop</p>
          <h2 className="font-display text-xl font-semibold text-kayora-ink mb-2">Receive Product and Availability Updates</h2>
          <p className="text-sm text-kayora-graphite leading-relaxed mb-6 max-w-[60ch]">
            Not ready to order yet? Leave your details and we will let you know about new delivery areas, product updates and supply availability — nothing else.
          </p>
          <LeadForm
            segment="general_interest"
            apiEndpoint="/api/leads/general-updates"
            fields={GENERAL_UPDATES_FIELDS}
            submitLabel="Receive Product and Availability Updates"
            thankYou={{
              heading: "You're on the list.",
              body: 'Thank you — we will keep you posted on product and availability updates for your area.',
            }}
            formName="general_updates"
            extraFields={{ source_page: 'contact' }}
          />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
