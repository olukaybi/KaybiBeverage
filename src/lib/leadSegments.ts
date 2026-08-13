/**
 * Canonical lead segment registry — every lead capture route/form should
 * import from here rather than hardcoding segment strings, so tagging,
 * routing and lifecycle stay consistent across the site.
 *
 * Recommended lifecycle (adopt progressively — starts at `new_lead`,
 * advanced manually in the admin/CRM until a pipeline tool is wired):
 *   new_lead → contacted → awaiting_reply → qualified → quoted → closed_won | closed_lost
 */
export type LeadSegment = 'distributor' | '18_9l_supply' | 'events' | 'general_interest';

export interface SegmentConfig {
  segment: LeadSegment;
  label: string;
  /** Internal recipient for the notification email — swap per segment if the business wants a dedicated inbox/owner later. */
  notifyEmail: string;
  /** Default lifecycle stage stamped on creation. */
  lifecycleStage: string;
  /** Which nurture sequence (see src/lib/emailSequences/) this segment triggers. */
  sequenceId: 'distributor' | 'office18l' | 'events' | 'general';
}

export const LEAD_SEGMENTS: Record<LeadSegment, SegmentConfig> = {
  distributor: {
    segment: 'distributor',
    label: 'Distributor',
    notifyEmail: 'info@kaybibeverage.com',
    lifecycleStage: 'new_distributor_lead',
    sequenceId: 'distributor',
  },
  '18_9l_supply': {
    segment: '18_9l_supply',
    label: '18.9L Supply',
    notifyEmail: 'info@kaybibeverage.com',
    lifecycleStage: 'new_18_9l_lead',
    sequenceId: 'office18l',
  },
  events: {
    segment: 'events',
    label: 'Event / Bulk Order',
    notifyEmail: 'info@kaybibeverage.com',
    lifecycleStage: 'new_event_lead',
    sequenceId: 'events',
  },
  general_interest: {
    segment: 'general_interest',
    label: 'General Interest',
    notifyEmail: 'info@kaybibeverage.com',
    lifecycleStage: 'new_general_lead',
    sequenceId: 'general',
  },
};
