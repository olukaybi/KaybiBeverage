import Image from 'next/image';
import Link from 'next/link';
import ParallaxBg from '@/components/ParallaxBg';

interface HeroProps {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  imageSrc?: string;
  imageAlt: string;
  leadBrand?: boolean;
  leadBrandSub?: string;
  productImageSrc?: string;
  logoSrc?: string;
  logoTagline?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoAfterH1?: boolean;
  backgroundImage?: string;
  mobileBackgroundImage?: string;
  backgroundPosition?: string;
}

export default function Hero({
  eyebrow,
  headline,
  subhead,
  primaryCTA,
  secondaryCTA,
  imageSrc,
  imageAlt,
  leadBrand,
  leadBrandSub,
  productImageSrc,
  logoSrc,
  logoTagline,
  logoWidth,
  logoHeight,
  logoAfterH1,
  backgroundImage,
  mobileBackgroundImage,
  backgroundPosition = 'left top',
}: HeroProps) {
  // Banner-background layout (photo carries the visual; text overlays right side)
  // Mobile: image block at top, content card flows below.
  // lg+: image is absolute background, card overlays the right side.
  if (backgroundImage) {
    return (
      <section className="overflow-hidden lg:relative lg:min-h-[680px] lg:flex lg:items-center" aria-label="Hero">
        {/* Image: own block on mobile, absolute background on lg+ */}
        <div
          className="relative w-full aspect-[1600/1531] bg-[#E6F2F4] lg:bg-transparent lg:absolute lg:inset-0 lg:aspect-auto lg:h-auto"
          style={{ '--desktop-obj-pos': backgroundPosition } as React.CSSProperties}
        >
          {/* Mobile asset — shown below lg breakpoint */}
          <Image
            src={mobileBackgroundImage ?? backgroundImage!}
            alt={imageAlt}
            fill
            priority
            className="object-cover object-center lg:hidden"
            sizes="100vw"
          />
          {/* Desktop asset — shown at lg and above */}
          <Image
            src={backgroundImage!}
            alt={imageAlt}
            fill
            priority
            className="hidden object-cover lg:block lg:[object-position:var(--desktop-obj-pos)]"
            sizes="100vw"
          />
        </div>
        {/* Content card: full-width cream section below image on mobile,
            floating overlay on the right at lg+ */}
        <div className="relative z-10 lg:flex lg:w-full lg:overflow-hidden">
          <div className="px-6 py-10 bg-kayora-cream lg:ml-auto lg:max-w-lg lg:mx-4 lg:mr-12 lg:px-9 lg:py-10 lg:my-auto lg:bg-kayora-cream/95 lg:backdrop-blur-sm lg:rounded-2xl lg:shadow-2xl lg:border lg:border-white/40">
            <p className="text-xs uppercase tracking-wide text-kayora-gold-500 font-sans mb-4">{eyebrow}</p>
            <h1 className="font-display text-display-md text-kayora-blue-900 mb-4 whitespace-pre-line">{headline}</h1>
            {logoTagline && (
              <p className="font-display italic text-kayora-blue-700 text-xl lg:text-2xl mb-5">{logoTagline}</p>
            )}
            <p className="text-base lg:text-lg leading-relaxed text-slate-700 mb-8 max-w-[55ch]">{subhead}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={primaryCTA.href}
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-white font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-900 focus-visible:ring-offset-2"
              >
                {primaryCTA.label}
              </Link>
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-kayora-blue-900 text-kayora-blue-900 font-semibold rounded-lg hover:bg-kayora-blue-900/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-900 focus-visible:ring-offset-2"
                >
                  {secondaryCTA.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Product-forward split layout
  if (productImageSrc) {
    return (
      <section className="relative bg-kayora-blue-900 min-h-[90vh] flex items-center overflow-hidden" aria-label="Hero">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-12">
            {/* Text column */}
            <div>
              {leadBrand && (
                <div className="mb-4">
                  {logoSrc ? (
                    <>
                      <Image
                        src={logoSrc}
                        alt="Kayora Water"
                        width={logoWidth ?? 180}
                        height={logoHeight ?? 54}
                        className="w-[220px] lg:w-[320px] h-auto"
                        style={{ filter: 'brightness(0) invert(1)' }}
                        priority
                      />
                      {logoTagline && (
                        <p className="font-display italic text-kayora-cream/80 text-xl lg:text-2xl mt-3">
                          {logoTagline}
                        </p>
                      )}
                    </>
                  ) : (
                    <span
                      className="font-display font-bold text-kayora-cream block leading-none"
                      style={{ fontSize: 'clamp(3.5rem, 6vw, 7rem)', letterSpacing: '-0.025em' }}
                    >
                      Kayora
                      <span aria-hidden="true" className="text-kayora-gold-500 inline-block" style={{ fontSize: '0.3em', marginLeft: '0.08em', verticalAlign: 'baseline', lineHeight: 1 }}>•</span>
                    </span>
                  )}
                </div>
              )}
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-6">{eyebrow}</p>
              <h1 className="font-display text-display-lg text-white mb-6 whitespace-pre-line">{headline}</h1>
              <p className="text-lg leading-relaxed text-white/80 mb-10 max-w-[55ch]">{subhead}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={primaryCTA.href} className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-gold-500 text-white font-semibold rounded-lg hover:bg-kayora-gold-500/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-kayora-blue-900">{primaryCTA.label}</Link>
                {secondaryCTA && (
                  <Link href={secondaryCTA.href} className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-kayora-blue-900">{secondaryCTA.label}</Link>
                )}
              </div>
            </div>
            {/* Product image column */}
            <div className="flex items-center justify-center order-first lg:order-last">
              <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px]">
                <Image
                  src={productImageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  className="object-contain"
                  sizes="(min-width: 1024px) 45vw, 90vw"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-kayora-blue-500 blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-kayora-blue-500 blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
      </section>
    );
  }

  // Original full-bleed photo layout (inner pages)
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image with parallax */}
      <ParallaxBg className="absolute inset-0">
        <Image
          src={imageSrc!}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </ParallaxBg>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-kayora-blue-900/60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          {leadBrand && (
            <div className="mb-3">
              <span
                className="font-display font-bold text-kayora-cream block leading-none"
                style={{ fontSize: 'clamp(3.5rem, 6vw, 7rem)', letterSpacing: '-0.025em' }}
              >
                Kayora
                <span
                  aria-hidden="true"
                  className="text-kayora-gold-500 inline-block"
                  style={{ fontSize: '0.3em', marginLeft: '0.08em', verticalAlign: 'baseline', lineHeight: 1 }}
                >
                  •
                </span>
              </span>
              {leadBrandSub && (
                <p className="text-white/60 text-sm font-sans mt-2">{leadBrandSub}</p>
              )}
            </div>
          )}
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-6">
            {eyebrow}
          </p>
          <h1 className={`font-display ${leadBrand ? 'text-display-lg' : 'text-display-xl'} text-white mb-6 whitespace-pre-line`}>
            {headline}
          </h1>
          {logoSrc && logoAfterH1 && (
            <div className="mb-6">
              <Image
                src={logoSrc}
                alt="Kayora Water"
                width={logoWidth ?? 240}
                height={logoHeight ?? 72}
                className="w-[260px] lg:w-[360px] h-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          )}
          <p className="text-lg leading-relaxed text-white/80 mb-10 max-w-[65ch]">
            {subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-kayora-cream font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2"
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
