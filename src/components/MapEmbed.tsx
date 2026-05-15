export default function MapEmbed() {
  return (
    <div className="rounded-xl overflow-hidden border border-kayora-mist">
      <iframe
        title="Kayora plant location — 173 Eket-Oron Road, Eket"
        src="https://maps.google.com/maps?q=4.6420,7.9288&z=15&output=embed"
        width="100%"
        height="400"
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        aria-label="Google Maps showing Kaybi Beverage Industries at 173 Eket-Oron Road, Eket"
      />
    </div>
  );
}
