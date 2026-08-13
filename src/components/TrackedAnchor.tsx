'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { track, type EventParams } from '@/lib/analytics';

interface TrackedAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: string;
  eventParams?: EventParams;
  children: ReactNode;
}

/**
 * Plain <a> wrapper for tel:/mailto:/external links that need a tracked
 * click — for server-component pages that can't attach onClick directly.
 * Use TrackedLink for internal next/link navigation instead.
 */
export default function TrackedAnchor({ event, eventParams, children, ...anchorProps }: TrackedAnchorProps) {
  return (
    <a {...anchorProps} onClick={() => track(event, eventParams)}>
      {children}
    </a>
  );
}
