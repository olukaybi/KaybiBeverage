import { createHash } from 'crypto';
import { createServiceClient } from '@/lib/supabase/server';
import type { LeadSegment } from '@/lib/leadSegments';

export function hashEmail(email: string): string {
  return createHash('sha256').update(email.toLowerCase().trim()).digest('hex').slice(0, 12);
}

export function watTimestamp(): string {
  return (
    new Date().toLocaleString('en-NG', {
      timeZone: 'Africa/Lagos',
      dateStyle: 'full',
      timeStyle: 'short',
    }) + ' WAT'
  );
}

export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function htmlRow(label: string, value: string): string {
  return `<tr><td class="lbl">${label}</td><td class="val">${value}</td></tr>`;
}

export const EMAIL_STYLES = `
  body{font-family:Arial,sans-serif;font-size:14px;color:#1a1a2e;line-height:1.6;margin:0;padding:24px}
  table{border-collapse:collapse;width:100%;max-width:580px}
  td{padding:9px 14px;border-bottom:1px solid #e8edf0;vertical-align:top}
  .lbl{font-weight:600;color:#555;width:150px;white-space:nowrap}
  .val{color:#1a1a2e}
  .section{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#888;
           background:#f5f7f9;padding:10px 14px 6px;font-weight:600}
  .msg{white-space:pre-wrap;font-family:inherit}
  h2{font-size:16px;margin:0 0 4px}
  .meta{font-size:12px;color:#888;margin:0 0 24px}
`;

/**
 * Best-effort structured lead storage. The `leads` table does not exist
 * in the connected Supabase project yet — apply
 * supabase/migrations/0001_create_leads_table.sql when ready. Until then
 * this silently no-ops on error so it never blocks the notification email
 * (which remains the source of truth for now).
 *
 * TODO(provider integration): once a table/CRM exists, replace or extend
 * this with a real sync — Airtable, HubSpot, or a dedicated leads DB.
 */
export async function storeLeadBestEffort(row: {
  segment: LeadSegment;
  source_page: string;
  email: string;
  full_name: string;
  phone?: string;
  location?: string;
  preferred_sku?: string;
  enquiry_type?: string;
  lifecycle_stage: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  payload: Record<string, unknown>;
}): Promise<void> {
  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from('leads').insert([row]);
    if (error) {
      console.warn(`[leads] storeLeadBestEffort skipped (table likely missing): ${error.message}`);
    }
  } catch (err) {
    console.warn('[leads] storeLeadBestEffort failed', err);
  }
}
