export default function MapEmbed() {
  return (
    <div className="rounded-xl overflow-hidden border border-kayora-mist">
      <iframe
        title="Kayora plant location — 173 Eket-Oron Road, Eket"
        src="https://www.openstreetmap.org/export/embed.html?bbox=7.9238%2C4.6370%2C7.9338%2C4.6470&layer=mapnik&marker=4.6420%2C7.9288"
        width="100%"
        height="400"
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        aria-label="OpenStreetMap showing Kaybi Beverage Industries at 173 Eket-Oron Road, Eket"
      />
    </div>
  );
}
