'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

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
  const prefersReducedMotion = useReducedMotion();

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
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-8 bg-kayora-cream border border-kayora-mist rounded-2xl p-8 border-l-4 border-l-kayora-gold-500"
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

            <Link
              href="/shop"
              className="flex items-center justify-center min-h-[48px] w-full bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-xl hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
            >
              Order {result.weeklyPacks} pack{result.weeklyPacks !== 1 ? 's' : ''} of Kayora &rarr;
            </Link>
          </motion.div>
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
