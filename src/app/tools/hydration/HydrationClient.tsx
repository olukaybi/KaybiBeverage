'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buildWhatsAppLink } from '@/lib/whatsapp';

type ActivityLevel = 'sedentary' | 'active' | 'athlete';
type Climate = 'cool' | 'temperate' | 'hot';

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.00,
  active: 1.20,
  athlete: 1.40,
};

const CLIMATE_MULTIPLIERS: Record<Climate, number> = {
  cool: 1.00,
  temperate: 1.05,
  hot: 1.15,
};

interface Result {
  dailyLitres: number;
  daily50cl: number;
  weekly50cl: number;
  weeklyPacks: number;
}

function calculate(weightKg: number, activity: ActivityLevel, climate: Climate): Result {
  const dailyMl = weightKg * 35 * ACTIVITY_MULTIPLIERS[activity] * CLIMATE_MULTIPLIERS[climate];
  const dailyLitres = Math.round(dailyMl / 100) / 10;
  const daily50cl = Math.max(1, Math.ceil(dailyMl / 500));
  const weekly50cl = Math.max(1, Math.ceil((dailyMl * 7) / 500));
  const weeklyPacks = Math.ceil(weekly50cl / 12);
  return { dailyLitres, daily50cl, weekly50cl, weeklyPacks };
}

export default function HydrationClient() {

  const [weightKg, setWeightKg] = useState(70);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [activity, setActivity] = useState<ActivityLevel>('active');
  const [climate, setClimate] = useState<Climate>('hot');
  const [result, setResult] = useState<Result | null>(null);

  const displayWeight = unit === 'kg' ? weightKg : Math.round(weightKg * 2.205);
  const minDisplay = unit === 'kg' ? 30 : 66;
  const maxDisplay = unit === 'kg' ? 150 : 330;

  function handleWeightChange(val: number) {
    if (unit === 'kg') {
      setWeightKg(Math.round(Math.min(150, Math.max(30, val))));
    } else {
      const kg = Math.round(Math.min(150, Math.max(30, val / 2.205)));
      setWeightKg(kg);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(calculate(weightKg, activity, climate));
  }

  return (
    <main className="min-h-screen bg-kayora-cream pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <div className="mb-10">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
            Hydration Calculator
          </p>
          <h1 className="font-display text-display-lg text-kayora-ink mb-3">
            How much water do you really need?
          </h1>
          <p className="text-kayora-graphite leading-relaxed">
            A daily and weekly estimate, based on your body and lifestyle.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-kayora-blue-100 border border-kayora-blue-200 rounded-xl px-5 py-3.5 mb-8 text-sm text-kayora-graphite">
          Both calculators produce planning estimates. They are decision-support tools, not binding quotes.
          Every order placed by WhatsApp, the website, or the wholesale portal is re-priced and confirmed
          by our team before delivery.
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-kayora-mist rounded-2xl p-8 space-y-8">

          {/* Weight */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-kayora-ink">Body weight</label>
              <div className="flex rounded-lg overflow-hidden border border-kayora-mist text-sm">
                {(['kg', 'lbs'] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className={`px-3 py-1.5 font-medium transition-colors ${
                      unit === u ? 'bg-kayora-blue-900 text-white' : 'text-kayora-graphite hover:bg-kayora-blue-100'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={minDisplay}
                max={maxDisplay}
                value={displayWeight}
                onChange={(e) => handleWeightChange(Number(e.target.value))}
                className="flex-1 accent-kayora-blue-900"
              />
              <span className="font-display text-2xl font-bold text-kayora-blue-900 w-24 text-right">
                {displayWeight} {unit}
              </span>
            </div>
            <div className="flex justify-between text-xs text-kayora-stone mt-1">
              <span>{minDisplay} {unit}</span>
              <span>{maxDisplay} {unit}</span>
            </div>
          </div>

          {/* Activity level */}
          <div>
            <p className="font-semibold text-kayora-ink mb-3">Activity level</p>
            <div className="grid grid-cols-3 gap-3">
              {([
                { value: 'sedentary', label: 'Sedentary', sub: 'Mostly sitting' },
                { value: 'active', label: 'Active', sub: 'Regular exercise' },
                { value: 'athlete', label: 'Athlete', sub: 'Daily training' },
              ] as const).map((opt) => (
                <label
                  key={opt.value}
                  className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-colors ${
                    activity === opt.value
                      ? 'border-kayora-blue-900 bg-kayora-blue-100'
                      : 'border-kayora-mist hover:border-kayora-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="activity"
                    value={opt.value}
                    checked={activity === opt.value}
                    onChange={() => setActivity(opt.value)}
                    className="sr-only"
                  />
                  <p className="font-semibold text-kayora-ink text-sm">{opt.label}</p>
                  <p className="text-kayora-stone text-xs mt-0.5">{opt.sub}</p>
                </label>
              ))}
            </div>
          </div>

          {/* Climate */}
          <div>
            <p className="font-semibold text-kayora-ink mb-3">Climate / environment</p>
            <div className="grid grid-cols-3 gap-3">
              {([
                { value: 'cool', label: 'Cool', sub: 'Air-conditioned' },
                { value: 'temperate', label: 'Temperate', sub: 'Mild weather' },
                { value: 'hot', label: 'Hot', sub: 'Tropical / humid' },
              ] as const).map((opt) => (
                <label
                  key={opt.value}
                  className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-colors ${
                    climate === opt.value
                      ? 'border-kayora-blue-900 bg-kayora-blue-100'
                      : 'border-kayora-mist hover:border-kayora-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="climate"
                    value={opt.value}
                    checked={climate === opt.value}
                    onChange={() => setClimate(opt.value)}
                    className="sr-only"
                  />
                  <p className="font-semibold text-kayora-ink text-sm">{opt.label}</p>
                  <p className="text-kayora-stone text-xs mt-0.5">{opt.sub}</p>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center min-h-[48px] bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-xl hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
          >
            Calculate my hydration
          </button>
        </form>

        {/* Result card */}
        {result && (
          <div
            className="result-reveal mt-8 bg-kayora-cream border border-kayora-mist rounded-2xl p-8 border-l-4 border-l-kayora-gold-500"
          >
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-6">
              Your daily hydration estimate
            </h2>

            <div className="text-center mb-8">
              <p className="font-display text-6xl font-bold text-kayora-blue-900">
                {result.dailyLitres} L
              </p>
              <p className="text-kayora-graphite mt-1">per day</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-kayora-mist">
                <span className="text-kayora-graphite">Daily bottles</span>
                <span className="font-semibold text-kayora-ink">
                  {result.daily50cl} bottles of Kayora 50cl
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-kayora-mist">
                <span className="text-kayora-graphite">Weekly bottles</span>
                <span className="font-semibold text-kayora-ink">
                  {result.weekly50cl} bottles of Kayora 50cl
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-kayora-graphite">Weekly packs</span>
                <span className="font-display text-2xl font-bold text-kayora-blue-900">
                  {result.weeklyPacks} pack{result.weeklyPacks !== 1 ? 's' : ''} of 12 × 50cl
                </span>
              </div>
            </div>

            <p className="font-display italic text-sm text-kayora-stone mb-6 leading-relaxed">
              This is an estimate for healthy adults. People with kidney, heart, or other medical conditions
              affecting fluid balance should consult a physician before adjusting daily intake.
              Children&rsquo;s needs differ — these figures apply to adults only.
            </p>

            <p className="text-sm text-kayora-graphite mb-4 text-center">
              Kayora&rsquo;s 50cl Original is perfect for daily hydration goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop#50cl"
                className="flex-1 inline-flex items-center justify-center min-h-[48px] bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-xl hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
              >
                Order 50cl Original &rarr;
              </Link>
              <a
                href={buildWhatsAppLink(
                  `Hi, I'd like to place a daily hydration order — ${result.weeklyPacks} pack${result.weeklyPacks !== 1 ? 's' : ''} of Kayora 50cl Original per week (${result.dailyLitres} L/day).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#25D366] text-white text-sm font-semibold rounded-xl hover:bg-[#1fbc59] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order via WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* FAQ schema content */}
        <div className="mt-12 space-y-4">
          <h2 className="font-display text-lg font-semibold text-kayora-ink">Frequently asked questions</h2>
          {[
            {
              q: 'Is 2 litres a day enough water?',
              a: 'It depends on your weight, activity level and climate. The common "8 glasses / 2 litres" rule is a rough average. A 90 kg athlete training in Eket heat needs significantly more. Use this calculator for a figure based on your body.',
            },
            {
              q: 'How many bottles of water should I drink per day?',
              a: 'For most Nigerian adults: 4–8 bottles of 50cl Kayora per day, depending on weight and activity. Our calculator gives you a personalised figure.',
            },
            {
              q: 'Does hot weather increase your water needs?',
              a: 'Yes. Hot and humid climates like Akwa Ibom increase daily water needs by about 15% compared to cool, air-conditioned environments. The calculator accounts for this with a climate multiplier.',
            },
            {
              q: 'How many cases of water do I need per week?',
              a: 'Divide your weekly bottle count by 12 (bottles per case). The calculator shows this directly as "weekly packs."',
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
