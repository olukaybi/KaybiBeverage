-- Structured storage for the segmented lead capture system (distributor,
-- 18.9L supply, events, general interest). Not auto-applied — run this
-- migration when the business is ready to move off email-only lead
-- notifications. See src/lib/leadEmail.ts storeLeadBestEffort() for the
-- write path, which already no-ops safely until this table exists.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  segment text not null check (segment in ('distributor', '18_9l_supply', 'events', 'general_interest')),
  lifecycle_stage text not null default 'new_lead',
  source_page text,
  full_name text not null,
  email text not null,
  phone text,
  location text,
  preferred_sku text,
  enquiry_type text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  payload jsonb not null default '{}'::jsonb
);

create index if not exists leads_segment_idx on public.leads (segment);
create index if not exists leads_lifecycle_stage_idx on public.leads (lifecycle_stage);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Service role only — leads are written server-side from API routes
-- using the service-role client, never from the browser.
create policy "Service role full access to leads"
  on public.leads
  for all
  to service_role
  using (true)
  with check (true);
