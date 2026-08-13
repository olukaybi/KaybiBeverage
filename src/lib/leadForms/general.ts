import type { LeadFormField } from '@/components/leadforms/LeadForm';

export const GENERAL_UPDATES_FIELDS: LeadFormField[] = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Your full name' },
  { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'you@example.com' },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '08XXXXXXXXX' },
  { name: 'location', label: 'State / City', type: 'text', placeholder: 'e.g. Uyo, Akwa Ibom' },
  {
    name: 'interestArea',
    label: 'Interest Area',
    type: 'select',
    options: ['Products', 'Delivery Areas', 'Office Supply', 'Events', 'Distribution'],
  },
];
