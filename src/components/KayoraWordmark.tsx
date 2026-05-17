'use client';
import { cn } from '@/lib/utils';

interface KayoraWordmarkProps {
  variant?: 'dark' | 'light';
  className?: string;
  style?: React.CSSProperties;
}

export default function KayoraWordmark({ variant = 'dark', className, style }: KayoraWordmarkProps) {
  return (
    <span
      className={cn(
        'font-display font-semibold select-none',
        variant === 'dark' ? 'text-kayora-blue-900' : 'text-kayora-cream',
        className
      )}
      style={{ letterSpacing: '-0.02em', ...style }}
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
  );
}
