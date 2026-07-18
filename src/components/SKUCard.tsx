import Image from 'next/image';
import Link from 'next/link';

interface SKUCardProps {
  name: string;
  nickname: string;
  description: string;
  useCase: string;
  imageSrc: string;
  imageAlt: string;
  size: string;
}

export default function SKUCard({
  name,
  nickname,
  description,
  useCase,
  imageSrc,
  imageAlt,
  size,
}: SKUCardProps) {
  return (
    <div className="bg-white border border-kayora-mist rounded-xl overflow-hidden flex flex-col transition-transform duration-200 ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* Image area */}
      <div className="relative aspect-[4/5] bg-kayora-blue-900 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[400ms] ease-in-out hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">
          {size}
        </p>
        <h3 className="font-display text-2xl font-semibold text-kayora-ink mb-1">{name}</h3>
        <p className="text-kayora-clay-500 font-sans text-sm font-medium mb-3 italic">{nickname}</p>
        <p className="text-kayora-graphite text-sm leading-relaxed max-w-[65ch] flex-1 mb-4">
          {description}
        </p>
        <p className="text-xs text-kayora-stone italic mb-4">{useCase}</p>
        <Link
          href={`/products/${size === '18.9L' ? '18-9l' : size}`}
          className="text-sm font-semibold text-kayora-blue-700 hover:text-kayora-blue-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm inline-flex items-center gap-1 min-h-[48px] items-center"
          aria-label={`Learn more about Kayora ${size} ${name}`}
        >
          See Details &rarr;
        </Link>
      </div>
    </div>
  );
}
