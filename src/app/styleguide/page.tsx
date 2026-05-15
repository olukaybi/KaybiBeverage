import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System | Kayora Styleguide',
  robots: { index: false },
};

const colors = [
  { name: 'kayora-blue-100', hex: '#E0EBF7', cls: 'bg-[#E0EBF7]', dark: false },
  { name: 'kayora-blue-500', hex: '#3E82CF', cls: 'bg-[#3E82CF]', dark: true },
  { name: 'kayora-blue-700', hex: '#1A5BA8', cls: 'bg-[#1A5BA8]', dark: true },
  { name: 'kayora-blue-900', hex: '#003B7A', cls: 'bg-[#003B7A]', dark: true },
  { name: 'kayora-clay-300', hex: '#E1A48E', cls: 'bg-[#E1A48E]', dark: false },
  { name: 'kayora-clay-500', hex: '#C45A3E', cls: 'bg-[#C45A3E]', dark: true },
  { name: 'kayora-clay-700', hex: '#A04428', cls: 'bg-[#A04428]', dark: true },
  { name: 'kayora-gold-100', hex: '#F5EBD0', cls: 'bg-[#F5EBD0]', dark: false },
  { name: 'kayora-gold-500', hex: '#C9A14A', cls: 'bg-[#C9A14A]', dark: true },
  { name: 'kayora-ink', hex: '#1A1A1A', cls: 'bg-[#1A1A1A]', dark: true },
  { name: 'kayora-graphite', hex: '#3D3D3D', cls: 'bg-[#3D3D3D]', dark: true },
  { name: 'kayora-stone', hex: '#6B6B6B', cls: 'bg-[#6B6B6B]', dark: true },
  { name: 'kayora-mist', hex: '#E8E5DF', cls: 'bg-[#E8E5DF]', dark: false },
  { name: 'kayora-cream', hex: '#FAF8F4', cls: 'bg-[#FAF8F4]', dark: false },
  { name: 'kayora-success', hex: '#2D7A4F', cls: 'bg-[#2D7A4F]', dark: true },
  { name: 'kayora-warning', hex: '#C49A28', cls: 'bg-[#C49A28]', dark: true },
  { name: 'kayora-danger', hex: '#B83A2E', cls: 'bg-[#B83A2E]', dark: true },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="font-sans font-semibold text-kayora-stone uppercase tracking-widest text-sm mb-6 pb-3 border-b border-kayora-mist">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="bg-kayora-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 mb-3">Internal Reference</p>
          <h1 className="font-display text-display-xl text-kayora-ink">Kayora Design System</h1>
          <p className="text-kayora-graphite mt-4 max-w-[65ch]">
            The visual language of Kayora Premium Purified Water. All colour tokens, type scales, and component patterns.
          </p>
        </div>

        {/* Colors */}
        <Section title="Color Tokens">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {colors.map(({ name, hex, cls, dark }) => (
              <div key={name} className="rounded-lg overflow-hidden border border-kayora-mist">
                <div className={`${cls} h-16`} />
                <div className="bg-white p-3">
                  <p className="font-mono text-xs text-kayora-ink font-medium">{name}</p>
                  <p className="font-mono text-xs text-kayora-stone">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography Scale">
          <div className="space-y-8">
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-stone mb-2">Display XL — font-display</p>
              <p className="font-display text-display-xl text-kayora-ink">Purified to the Highest Standard.</p>
            </div>
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-stone mb-2">Display LG — font-display</p>
              <p className="font-display text-display-lg text-kayora-ink">Safe for Every Table.</p>
            </div>
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-stone mb-2">Display MD — font-display</p>
              <p className="font-display text-display-md text-kayora-ink">Four Sizes. One Standard.</p>
            </div>
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-stone mb-2">Eyebrow — font-sans</p>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500">NAFDAC Certified · Made in Eket</p>
            </div>
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-stone mb-2">Body — font-sans</p>
              <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">
                We don&rsquo;t bottle ordinary water and call it premium. Every drop of Kayora moves through six engineered stages before it reaches you. That&rsquo;s the Kayora promise — not a slogan, but a process.
              </p>
            </div>
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-stone mb-2">Font Families</p>
              <p className="font-display text-xl text-kayora-ink">Fraunces — Display / Headings</p>
              <p className="font-sans text-xl text-kayora-ink mt-2">Inter — Body / UI</p>
            </div>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Button Variants">
          <div className="flex flex-wrap gap-4 items-center">
            <button className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-kayora-cream font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2">
              Primary
            </button>
            <button className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-kayora-blue-900 text-kayora-blue-900 font-semibold rounded-lg hover:bg-kayora-blue-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2">
              Secondary
            </button>
            <button className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-gold-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-500 focus-visible:ring-offset-2">
              Accent
            </button>
            <button disabled className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-kayora-cream font-semibold rounded-lg opacity-40 cursor-not-allowed">
              Disabled
            </button>
          </div>
        </Section>

        {/* Form Input */}
        <Section title="Form Elements">
          <div className="max-w-sm space-y-4">
            <div>
              <label htmlFor="sg-input" className="block text-eyebrow uppercase tracking-widest text-kayora-graphite mb-1.5">
                Label
              </label>
              <input
                id="sg-input"
                type="text"
                placeholder="Placeholder text"
                className="w-full h-12 px-4 border border-kayora-mist rounded-md bg-white text-kayora-ink placeholder:text-kayora-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition"
              />
            </div>
            <div>
              <label htmlFor="sg-select" className="block text-eyebrow uppercase tracking-widest text-kayora-graphite mb-1.5">
                Select
              </label>
              <select
                id="sg-select"
                className="w-full h-12 px-4 border border-kayora-mist rounded-md bg-white text-kayora-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 transition cursor-pointer"
              >
                <option>Option one</option>
                <option>Option two</option>
              </select>
            </div>
            <div>
              <p className="text-xs text-kayora-danger">This is an error message.</p>
            </div>
          </div>
        </Section>

        {/* Card */}
        <Section title="Card Pattern">
          <div className="max-w-xs">
            <div className="bg-white border border-kayora-mist rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-kayora-blue-100 flex items-center justify-center">
                <p className="text-kayora-stone text-sm">Image area (4:3)</p>
              </div>
              <div className="p-6">
                <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 mb-1">30cl</p>
                <h3 className="font-display text-xl font-semibold text-kayora-ink mb-1">Sharp-sharp</h3>
                <p className="text-kayora-clay-500 text-sm italic mb-3">The Event Bottle</p>
                <p className="text-kayora-graphite text-sm leading-relaxed mb-4">Built for events. Compact, easy to chill, easy to share.</p>
                <a href="#" className="text-sm font-semibold text-kayora-blue-700 hover:text-kayora-blue-900 transition-colors">
                  Learn more &rarr;
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* Trust Strip */}
        <Section title="Trust Strip">
          <div className="bg-kayora-cream border-y border-kayora-mist py-4">
            <ul className="flex items-center justify-center gap-0">
              {['NAFDAC Reg. A1-111026', 'SON MANCAP Registered', 'Six-Stage Purification', 'Proudly Made in Eket'].map((item, i, arr) => (
                <li key={item} className="flex items-center">
                  <span className="text-eyebrow uppercase tracking-widest text-kayora-stone px-4">{item}</span>
                  {i < arr.length - 1 && <span className="w-1 h-1 rounded-full bg-kayora-stone/40" aria-hidden="true" />}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </div>
    </div>
  );
}
