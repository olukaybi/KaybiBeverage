/**
 * Real customer testimonials sourced from verified Facebook reviews on
 * the Kayora Water NG page. Single source of truth for /shop and the
 * homepage — do not duplicate this content elsewhere. These are exact
 * customer quotes: do not alter wording, embellish, or invent additional
 * testimonials when updating this file.
 */
export interface Testimonial {
  name: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Victor N.',
    quote: 'Kayora water is a trusted brand for clean and refreshing drinking water. Highly recommend!',
  },
  {
    name: 'GraciousWord Global Missions Eket',
    quote: 'Quality you can trust! I recommend Kayora Water Company to anyone looking for clean and safe drinking water.',
  },
  {
    name: 'Godswill T.',
    quote: 'One of the best water companies around. Clean water, prompt delivery, and great customer care. Highly recommended!',
  },
  {
    name: "God'sgift D.",
    quote: 'I highly recommend Kayora Water Company. Their water is pure, refreshing, and consistently high quality. Excellent customer service, prompt delivery, and reliable every time. Definitely a company you can trust!',
  },
];

export const TESTIMONIAL_STATS = {
  recommendPercent: 100,
  reviewCount: 6,
  facebookUrl: 'https://www.facebook.com/Kayorawaterng/reviews',
};
