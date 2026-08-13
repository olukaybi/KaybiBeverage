import type { LeadFormField } from '@/components/leadforms/LeadForm';

export const EVENT_QUOTE_FIELDS: LeadFormField[] = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Your full name' },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '08XXXXXXXXX' },
  { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'you@example.com' },
  { name: 'eventDate', label: 'Event Date', type: 'date', required: true },
  { name: 'eventLocation', label: 'Event Location', type: 'text', required: true, placeholder: 'e.g. Eket, Uyo, Calabar' },
  { name: 'guestCount', label: 'Estimated Guest Count / Quantity', type: 'text', required: true, placeholder: 'e.g. 150 guests / 20 cases' },
  {
    name: 'preferredSku',
    label: 'Preferred Size',
    type: 'select',
    required: true,
    options: ['30cl — Sharp-sharp', '50cl — Original', '75cl — Jara', 'Undecided'],
  },
  { name: 'eventType', label: 'Event Type', type: 'text', placeholder: 'e.g. wedding, naming ceremony, conference' },
  { name: 'deliveryTiming', label: 'Delivery Timing', type: 'text', placeholder: 'e.g. day before the event' },
  { name: 'needsHelp', label: 'Need Help Choosing a Size?', type: 'select', options: ['Yes', 'No'] },
  { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Tell us more about your event…', span: 'full' },
];
