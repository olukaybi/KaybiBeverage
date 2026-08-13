/**
 * Structured, ESP-agnostic nurture sequence content. This is content-ready,
 * not wired to a live sender — Resend (the current provider) handles
 * transactional sends only, with no built-in delayed/drip automation.
 *
 * TODO(provider integration): to activate these sequences, either:
 *   1. Add contacts to a Resend Audience on lead capture and build the
 *      delay/branch logic in Resend's Broadcast automation (if available
 *      on the account's plan), referencing this content for copy; or
 *   2. Sync leads to an ESP with native drip automation (e.g. Mailchimp,
 *      Klaviyo, Customer.io) via webhook on lead capture, importing this
 *      file's content as the sequence source of truth; or
 *   3. Build a scheduled job (Vercel Cron + the `leads` table once
 *      supabase/migrations/20260813_create_leads_table.sql is applied)
 *      that queries leads due for their next email and sends via Resend.
 * Whichever path is chosen, {{firstName}}-style placeholders below are
 * meant to be interpolated from the lead's stored full_name.
 */
export interface SequenceEmail {
  emailNumber: number;
  /** e.g. "Immediate", "Day 2", "Day 5" */
  trigger: string;
  subject: string;
  previewText: string;
  body: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  toneNote: string;
}
