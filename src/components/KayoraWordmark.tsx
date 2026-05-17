'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface KayoraWordmarkProps {
  variant?: 'dark' | 'light';
  className?: string;
  style?: React.CSSProperties;
}

export default function KayoraWordmark({ variant = 'dark', className, style }: KayoraWordmarkProps) {
  if (variant === 'dark') {
    return (
      <span className={cn('inline-flex items-center', className)} style={style}>
        <Image
          src="/images/logo/kayora-logo.png"
          alt="Kayora Premium Purified Water"
          width={120}
          height={120}
          className="object-contain"
          style={{ height: '2em', width: 'auto' }}
          priority
        />
      </span>
    );
  }
  // Light variant: text wordmark for dark backgrounds
  return (
    <span
      className={cn('font-display font-semibold select-none text-kayora-cream', className)}
      style={{ letterSpacing: '-0.02em', ...style }}
    >
      Kayora
      <span aria-hidden="true" className="text-kayora-gold-500 inline-block" style={{ fontSize: '0.3em', marginLeft: '0.08em', verticalAlign: 'baseline', lineHeight: 1 }}>•</span>
    </span>
  );
}
