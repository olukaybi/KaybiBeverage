import type { Metadata } from 'next';
import HydrationClient from './HydrationClient';

export const metadata: Metadata = {
  title: 'How Much Water Should I Drink? — Daily Hydration Calculator | Kayora',
  description:
    'Calculate your personalised daily water intake based on weight, activity level and climate. Get your weekly Kayora pack recommendation — free, no sign-up.',
};

export default function HydrationPage() {
  return <HydrationClient />;
}
