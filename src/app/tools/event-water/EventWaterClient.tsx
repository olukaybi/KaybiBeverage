'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';

type EventType = 'wedding' | 'corporate' | 'religious' | 'birthday' | 'outdoor' | 'funeral';
type Duration = 1 | 2 | 3 | 5;

interface EventProfile {
  litresPerGuestPerDay: number;
  childrenShare: number;
  vipShare: number;
  jarsPer50GuestsPerDay: number;
  isOutdoor: boolean;
}

const EVENT_PROFILES: Record<EventType, EventProfile> = {
  wedding:   { litresPerGuestPerDay: 1.5, childrenShare: 0.10, vipShare: 0.05, jarsPer50GuestsPerDay: 1.0, isOutdoor: false },
  corporate: { litresPerGuestPerDay: 1.2, childrenShare: 0.00, vipShare: 0.03, jarsPer50GuestsPerDay: 1.0, isOutdoor: false },
  religious: { litresPerGuestPerDay: 1.4, childrenShare: 0.15, vipShare: 0.00, jarsPer50GuestsPerDay: 0.6, isOutdoor: false },
  birthday:  { litresPerGuestPerDay: 1.3, childrenShare: 0.30, vipShare: 0.00, jarsPer50GuestsPerDay: 0.4, isOutdoor: false },
  outdoor:   { litresPerGuestPerDay: 1.8, childrenShare: 0.15, vipShare: 0.00, jarsPer50GuestsPerDay: 0.3, isOutdoor: true  },
  funeral:   { litresPerGuestPerDay: 1.4, childrenShare: 0.10, vipShare: 0.00, jarsPer50GuestsPerDay: 0.6, isOutdoor: false },
};

const TIER_THRESHOLDS = [
  { name: 'Bulk', threshold: 200 },
  { name: 'Distributor', threshold: 50 },
  { name: 'Stockist', threshold: 10 },
  { name: 'Reseller', threshold: 1 },
];

function getTier(totalPackUnits: number) {
  return TIER_THRESHOLDS.find((t) => totalPackUnits >= t.threshold) ?? TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1];
}

// Read prices from PRODUCTS to avoid hardcoding
function getPrice(sku: string): number {
  return PRODUCTS.find((p) => p.sku === sku)?.price_naira ?? 0;
}

interface Result {
  totalLitres: number;
  bottles30cl: number;
  bottles50cl: number;
  bottles75cl: number;
  jars189L: number;
  packs30cl: number;
  packs50cl: number;
  packs75cl: number;
  totalPackUnits: number;
  subtotal: number;
  tier: { name: string; threshold: number };
  inputs: {
    eventType: EventType;
    guests: number;
    days: Duration;
    hotBump: boolean;
  };
}

function calculate(
  eventType: EventType,
  guests: number,
  days: Duration,
  hotBump: boolean
): Result {
  const profile = EVENT_PROFILES[eventType];
  const safetyBuffer = 1.10;
  const climateMultiplier = (hotBump || profile.isOutdoor) ? 1.20 : 1.00;

  const totalLitres = guests * profile.litresPerGuestPerDay * days * safetyBuffer * climateMultiplier;

  const vipLitres = totalLitres * profile.vipShare;
  const kidsLitres = totalLitres * profile.childrenShare;
  const mainLitres = totalLitres - vipLitres - kidsLitres;

  const bottles75cl = Math.ceil(vipLitres / 0.75);
  const bottles30cl = Math.ceil(kidsLitres / 0.30);
  const bottles50cl = Math.ceil(mainLitres / 0.50);
  const jars189L = Math.ceil((guests / 50) * profile.jarsPer50GuestsPerDay * days);

  const packs30cl = Math.ceil(bottles30cl / 24);
  const packs50cl = Math.ceil(bottles50cl / 12);
  const packs75cl = Math.ceil(bottles75cl / 12);

  const totalPackUnits = packs30cl + packs50cl + packs75cl + jars189L;
  const tier = getTier(totalPackUnits);

  const subtotal =
    packs30cl * getPrice('30cl') +
    packs50cl * getPrice('50cl') +
    packs75cl * getPrice('75cl') +
    jars189L  * getPrice('18.9L');

  return {
    totalLitres: Math.round(totalLitres * 10) / 10,
    bottles30cl,
    bottles50cl,
    bottles75cl,
    jars189L,
    packs30cl,
    packs50cl,
    packs75cl,
    totalPackUnits,
    subtotal,
    tier,
    inputs: { eventType, guests, days, hotBump },
  };
}

function buildWhatsAppMessage(r: Result): string {
  const tierHint =
    r.tier.name !== 'Reseller'
      ? 'This order volume may qualify for rebates and other incentives — happy to discuss distributor terms.'
      : '';

  const lines = [
    'Kayora Order Estimate',
    '',
    `Event: ${r.inputs.eventType.charAt(0).toUpperCase() + r.inputs.eventType.slice(1)}`,
    `Guests: ${r.inputs.guests}`,
    `Length: ${r.inputs.days} day(s)`,
    r.inputs.hotBump ? 'Hot/outdoor: yes' : '',
    '',
    'Recommended mix:',
    r.packs30cl ? `- ${r.packs30cl} packs × 30cl Sharp-sharp` : '',
    `- ${r.packs50cl} packs × 50cl Original`,
    r.packs75cl ? `- ${r.packs75cl} packs × 75cl Jara` : '',
    r.jars189L  ? `- ${r.jars189L} × 18.9L Never Finish` : '',
    '',
    `Estimated total (RRP): ₦${r.subtotal.toLocaleString('en-NG')}`,
    '',
    `— Please confirm availability and delivery. ${tierHint}`,
  ].filter((l) => l !== null);

  return encodeURIComponent(lines.join('\n'));
}

export default function EventWaterClient() {
  const searchParams = useSearchParams();

  const [eventType, setEventType] = useState<EventType>('wedding');
  const [guests, setGuests] = useState(150);
  const [days, setDays] = useState<Duration>(1);
  const [hotBump, setHotBump] = useState(true);
  const [result, setResult] = useState<Result | null>(null);
  const [preFilled, setPreFilled] = useState(false);

  // Pre-fill from URL params (e.g. from hydration calculator or events page)
  useEffect(() => {
    const et = searchParams.get('event_type') as EventType | null;
    const g = searchParams.get('guests');
    const d = searchParams.get('days');
    const h = searchParams.get('hot');

    if (et && EVENT_PROFILES[et]) setEventType(et);
    if (g) setGuests(Math.min(2000, Math.max(20, Number(g))));
    if (d) setDays(([1, 2, 3, 5].includes(Number(d)) ? Number(d) : 1) as Duration);
    if (h) setHotBump(h === 'true');

    if (et || g) {
      setPreFilled(true);
    }
  }, [searchParams]);

  // Auto-enable hot toggle for outdoor events
  useEffect(() => {
    if (eventType === 'outdoor') setHotBump(true);
  }, [eventType]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(calculate(eventType, guests, days, hotBump));
  }

  const eventLabels: Record<EventType, string> = {
    wedding: 'Wedding',
    corporate: 'Corporate',
    religious: 'Religious',
    birthday: 'Birthday',
    outdoor: 'Outdoor',
    funeral: 'Funeral',
  };

  return (
    <main className="min-h-screen bg-kayora-cream pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <div className="mb-10">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
            Event Water Estimator
          </p>
          <h1 className="font-display text-display-lg text-kayora-ink mb-3">
            How much water will your event need?
          </h1>
          <p className="text-kayora-graphite leading-relaxed">
            A planning estimate by guest count, event type, and weather. Real orders are confirmed by our team before delivery.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-kayora-blue-100 border border-kayora-blue-200 rounded-xl px-5 py-3.5 mb-8 text-sm text-kayora-graphite">
          Both calculators produce planning estimates. They are decision-support tools, not binding quotes.
          Every order placed by WhatsApp, the website, or the wholesale portal is re-priced and confirmed
          by our team before delivery.
        </div>

        {preFilled && (
          <div className="bg-kayora-gold-500/10 border border-kayora-gold-500/30 rounded-xl px-5 py-3 mb-6 text-sm text-kayora-graphite">
            Pre-filled from the event calculator — adjust as needed.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-kayora-mist rounded-2xl p-8 space-y-8">

          {/* Event type */}
          <div>
            <p className="font-semibold text-kayora-ink mb-3">Event type</p>
            <div className="grid grid-cols-3 gap-2">
              {(Object.entries(eventLabels) as [EventType, string][]).map(([val, label]) => (
                <label
                  key={val}
                  className={`cursor-pointer rounded-xl border-2 p-3 text-center text-sm transition-colors ${
                    eventType === val
                      ? 'border-kayora-blue-900 bg-kayora-blue-100 font-semibold text-kayora-blue-900'
                      : 'border-kayora-mist hover:border-kayora-blue-300 text-kayora-graphite'
                  }`}
                >
                  <input
                    type="radio"
                    name="eventType"
                    value={val}
                    checked={eventType === val}
                    onChange={() => setEventType(val)}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Guest count */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-kayora-ink">Number of guests</label>
              <span className="font-display text-2xl font-bold text-kayora-blue-900">{guests}</span>
            </div>
            <input
              type="range"
              min={20}
              max={2000}
              step={10}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full accent-kayora-blue-900"
            />
            <div className="flex justify-between text-xs text-kayora-stone mt-1">
              <span>20</span><span>2,000</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <p className="font-semibold text-kayora-ink mb-3">Event length</p>
            <div className="grid grid-cols-4 gap-2">
              {([1, 2, 3, 5] as Duration[]).map((d) => (
                <label
                  key={d}
                  className={`cursor-pointer rounded-xl border-2 p-3 text-center text-sm transition-colors ${
                    days === d
                      ? 'border-kayora-blue-900 bg-kayora-blue-100 font-semibold text-kayora-blue-900'
                      : 'border-kayora-mist hover:border-kayora-blue-300 text-kayora-graphite'
                  }`}
                >
                  <input
                    type="radio"
                    name="days"
                    value={d}
                    checked={days === d}
                    onChange={() => setDays(d)}
                    className="sr-only"
                  />
                  {d} {d === 1 ? 'day' : 'days'}
                </label>
              ))}
            </div>
          </div>

          {/* Hot/outdoor toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-kayora-ink">Hot day or outdoor venue</p>
              <p className="text-sm text-kayora-stone">Adds a +20% heat multiplier</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={hotBump}
              onClick={() => eventType !== 'outdoor' && setHotBump((v) => !v)}
              disabled={eventType === 'outdoor'}
              className={`relative w-12 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 ${
                hotBump ? 'bg-kayora-blue-900' : 'bg-kayora-mist'
              } ${eventType === 'outdoor' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  hotBump ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center min-h-[48px] bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-xl hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
          >
            Calculate water requirement
          </button>
        </form>

        {/* Result card */}
        {result && (
          <div
            className="result-reveal mt-8 bg-kayora-cream border border-kayora-mist rounded-2xl p-8 border-l-4 border-l-kayora-gold-500"
          >
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-2">
              Estimated requirement for your event
            </h2>
            <p className="text-kayora-stone text-sm mb-6">
              ~{result.totalLitres.toLocaleString('en-NG')} L of Kayora
            </p>

            {/* SKU breakdown */}
            <div className="space-y-3 mb-6">
              <p className="text-xs font-semibold text-kayora-stone uppercase tracking-wide">Recommended mix</p>
              {result.packs30cl > 0 && (
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-kayora-ink">{result.packs30cl} packs of 30cl Sharp-sharp</p>
                    <p className="text-sm text-kayora-stone">{result.bottles30cl} bottles — children&rsquo;s share</p>
                  </div>
                  <p className="text-kayora-graphite text-sm">₦{(result.packs30cl * getPrice('30cl')).toLocaleString('en-NG')}</p>
                </div>
              )}
              {result.packs50cl > 0 && (
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-kayora-ink">{result.packs50cl} packs of 50cl Original</p>
                    <p className="text-sm text-kayora-stone">{result.bottles50cl} bottles — main hydration</p>
                  </div>
                  <p className="text-kayora-graphite text-sm">₦{(result.packs50cl * getPrice('50cl')).toLocaleString('en-NG')}</p>
                </div>
              )}
              {result.packs75cl > 0 && (
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-kayora-ink">{result.packs75cl} packs of 75cl Jara</p>
                    <p className="text-sm text-kayora-stone">{result.bottles75cl} bottles — VIP table</p>
                  </div>
                  <p className="text-kayora-graphite text-sm">₦{(result.packs75cl * getPrice('75cl')).toLocaleString('en-NG')}</p>
                </div>
              )}
              {result.jars189L > 0 && (
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-kayora-ink">{result.jars189L} × 18.9L Never Finish</p>
                    <p className="text-sm text-kayora-stone">Refill stations</p>
                  </div>
                  <p className="text-kayora-graphite text-sm">₦{(result.jars189L * getPrice('18.9L')).toLocaleString('en-NG')}</p>
                </div>
              )}
            </div>

            {/* Pricing block */}
            <div className="bg-kayora-blue-900 rounded-xl px-6 py-5 mb-4 text-center">
              <p className="text-kayora-cream/70 text-sm mb-1">Estimated total at RRP</p>
              <p className="font-display text-3xl font-bold text-kayora-cream">
                ₦{result.subtotal.toLocaleString('en-NG')}
              </p>
            </div>
            <p className="text-xs text-kayora-stone mb-6 leading-relaxed">
              Recommended retail price. Bulk and event orders may qualify for attractive rebates and other incentives — request a quote for distributor terms.
            </p>

            <p className="font-display italic text-sm text-kayora-stone mb-6 leading-relaxed">
              This is a planning estimate, not a binding quote. Availability and final pricing confirmed by our team before delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/2349040789918?text=${buildWhatsAppMessage(result)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center min-h-[48px] gap-2 bg-[#25D366] text-white text-sm font-semibold rounded-xl hover:bg-[#1fbc59] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send to WhatsApp
              </a>
              <Link
                href={`/contact?reason=bulk%2Fevent+order&event_type=${result.inputs.eventType}&guests=${result.inputs.guests}&days=${result.inputs.days}&hot=${result.inputs.hotBump}`}
                className="flex-1 inline-flex items-center justify-center min-h-[48px] border-2 border-kayora-blue-900 text-kayora-blue-900 text-sm font-semibold rounded-xl hover:bg-kayora-blue-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
              >
                Request delivery quote
              </Link>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-12 space-y-4">
          <h2 className="font-display text-lg font-semibold text-kayora-ink">Frequently asked questions</h2>
          {[
            {
              q: 'How much water for a 200-person wedding?',
              a: 'A typical 200-guest Nigerian wedding needs approximately 300–400 litres on a hot day — around 25–35 packs of 50cl plus VIP 75cl and dispenser refill stations. Use the calculator above for an exact breakdown.',
            },
            {
              q: 'How many packs of water do I need for 100 guests?',
              a: 'For a one-day event with 100 guests in hot weather: roughly 15–20 packs of 50cl Original, 2–3 packs of 75cl Jara for the head table, and 2 × 18.9L dispensers. The calculator accounts for event type, which changes the per-person consumption rate.',
            },
            {
              q: 'What\'s the minimum order for event water?',
              a: 'The minimum is 10 cases for the PET bottle range (30cl, 50cl, 75cl), mixed or single SKU. For 18.9L dispenser bottles, the minimum is 5. For large events, contact our team directly for a quote.',
            },
            {
              q: 'Does Kayora deliver to event venues?',
              a: 'Yes. We deliver across Eket, Uyo and the wider Akwa Ibom State. For events outside our standard zones, call 0904 078 9918 — we often find a way.',
            },
            {
              q: 'Can I get a discount for a large event order?',
              a: 'Bulk and event orders may qualify for rebates and incentives. We don\'t publish wholesale pricing — send us a WhatsApp with your requirements and our team will respond with terms.',
            },
          ].map(({ q, a }) => (
            <details key={q} className="bg-white border border-kayora-mist rounded-xl">
              <summary className="px-6 py-4 font-medium text-kayora-ink cursor-pointer hover:text-kayora-blue-900 transition-colors">
                {q}
              </summary>
              <p className="px-6 pb-4 text-kayora-graphite text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
