export default function MapEmbed() {
  return (
    <div className="aspect-video rounded-xl overflow-hidden border border-kayora-mist">
      <iframe
        title="Kaybi Beverage Industries Location"
        src="https://maps.google.com/maps?q=4.6420,7.9288&z=15&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="Google Maps showing Kaybi Beverage Industries at 173 Eket-Oron Road, Eket"
      />
    </div>
  );
}
