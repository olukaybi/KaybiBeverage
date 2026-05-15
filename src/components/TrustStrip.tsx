export default function TrustStrip() {
  const items = [
    'NAFDAC Reg. A1-111026',
    'SON MANCAP Registered',
    'Six-Stage Purification',
    'Proudly Made in Eket',
  ];

  return (
    <div className="bg-kayora-cream border-y border-kayora-mist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop: horizontal strip with separators */}
        <ul className="hidden sm:flex items-center justify-center gap-0" aria-label="Trust indicators">
          {items.map((item, i) => (
            <li key={item} className="flex items-center">
              <span className="text-eyebrow uppercase tracking-widest text-kayora-stone px-4">
                {item}
              </span>
              {i < items.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-kayora-stone/40" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>

        {/* Mobile: 2×2 grid */}
        <ul className="sm:hidden grid grid-cols-2 gap-3" aria-label="Trust indicators">
          {items.map((item) => (
            <li
              key={item}
              className="text-eyebrow uppercase tracking-widest text-kayora-stone text-center py-1"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
