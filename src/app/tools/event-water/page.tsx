import type { Metadata } from 'next';
import { Suspense } from 'react';
import EventWaterClient from './EventWaterClient';

export const metadata: Metadata = {
  title: 'Wedding & Event Water Calculator — How Much for Your Event | Kayora',
  description:
    'Plan exactly how much water your event needs. Enter guest count, event type and duration — get a SKU breakdown and RRP estimate. Free planning tool from Kayora.',
};

export default function EventWaterPage() {
  return (
    <Suspense>
      <EventWaterClient />
    </Suspense>
  );
}
