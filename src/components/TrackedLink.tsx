'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { track, type EventParams } from '@/lib/analytics';

interface TrackedLinkProps {
  href: string;
  event: string;
  eventParams?: EventParams;
  className?: string;
  children: ReactNode;
}

/**
 * next/link wrapper that fires a named event on click before navigating —
 * drop-in for server-component pages (like the homepage) that can't attach
 * onClick handlers directly without becoming client components themselves.
 */
export default function TrackedLink({ href, event, eventParams, className, children }: TrackedLinkProps) {
  return (
    <Link href={href} onClick={() => track(event, eventParams)} className={className}>
      {children}
    </Link>
  );
}
