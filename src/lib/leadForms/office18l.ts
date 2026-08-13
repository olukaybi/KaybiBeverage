import type { LeadFormField } from '@/components/leadforms/LeadForm';

export const OFFICE_18L_FIELDS: LeadFormField[] = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Your full name' },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '08XXXXXXXXX' },
  { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'you@example.com' },
  {
    name: 'location',
    label: 'Location / State',
    type: 'select',
    required: true,
    options: ['Akwa Ibom', 'Cross River', 'Rivers', 'Bayelsa', 'Delta', 'Edo', 'Enugu', 'Anambra', 'Abia', 'Imo', 'Other'],
  },
  { name: 'organization', label: 'Organization / Household Name', type: 'text', required: true, placeholder: 'e.g. your office, school or family name' },
  {
    name: 'enquiryType',
    label: 'Enquiry Type',
    type: 'select',
    required: true,
    options: ['Home', 'Office', 'Institution', 'Church', 'Clinic', 'School', 'Other'],
  },
  { name: 'quantityFrequency', label: 'Estimated Quantity / Frequency', type: 'text', required: true, placeholder: 'e.g. 4 bottles per week' },
  { name: 'deliveryTiming', label: 'Preferred Delivery Timing', type: 'text', required: true, placeholder: 'e.g. weekly, as soon as possible' },
  { name: 'recurring', label: 'One-Time or Recurring?', type: 'select', options: ['One-time', 'Recurring'], span: 'half' },
  { name: 'dispenser', label: 'Dispenser Status', type: 'select', options: ['Have a dispenser', 'Need a dispenser'], span: 'half' },
  { name: 'unitsCount', label: 'Number of Staff / Users / Households', type: 'text', placeholder: 'e.g. 15 staff' },
  { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Tell us about your supply needs…', span: 'full' },
];
