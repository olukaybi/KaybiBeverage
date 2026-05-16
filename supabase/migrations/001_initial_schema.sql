-- Kayora Water — initial e-commerce schema
-- Run this in the Supabase SQL editor for your project.

-- ────────────────────────────────────────────────────────────────────────────
-- Enums
-- ────────────────────────────────────────────────────────────────────────────
create type order_status as enum (
  'pending_payment',
  'paid',
  'scheduled',
  'dispatched',
  'delivered',
  'cancelled'
);

create type delivery_zone_id as enum (
  'eket_city',
  'uyo',
  'wider_akwa_ibom'
);

-- ────────────────────────────────────────────────────────────────────────────
-- Customers
-- ────────────────────────────────────────────────────────────────────────────
create table customers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  full_name   text not null,
  phone       text not null,
  whatsapp    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index customers_email_idx on customers (email);

-- ────────────────────────────────────────────────────────────────────────────
-- Addresses
-- ────────────────────────────────────────────────────────────────────────────
create table addresses (
  id              uuid primary key default gen_random_uuid(),
  customer_id     uuid not null references customers (id) on delete cascade,
  street_address  text not null,
  city            text not null,
  lga             text,
  state           text not null default 'Akwa Ibom',
  delivery_zone   delivery_zone_id not null,
  notes           text,
  created_at      timestamptz not null default now()
);

create index addresses_customer_idx on addresses (customer_id);

-- ────────────────────────────────────────────────────────────────────────────
-- Orders
-- ────────────────────────────────────────────────────────────────────────────
create table orders (
  id                      uuid primary key default gen_random_uuid(),
  order_number            text not null unique,
  customer_id             uuid not null references customers (id),
  address_id              uuid not null references addresses (id),
  delivery_zone           delivery_zone_id not null,
  status                  order_status not null default 'pending_payment',
  subtotal_naira          integer not null,
  delivery_fee_naira      integer not null,
  total_naira             integer not null,
  paystack_reference      text,
  paid_at                 timestamptz,
  scheduled_delivery_date date,
  customer_notes          text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create index orders_customer_idx   on orders (customer_id);
create index orders_status_idx     on orders (status);
create index orders_created_at_idx on orders (created_at desc);

-- Auto-generate order number: KAY-YYYYMMDD-NNNN
create sequence order_seq start 1000 increment 1;

create or replace function generate_order_number()
returns trigger language plpgsql as $$
begin
  new.order_number := 'KAY-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(nextval('order_seq')::text, 4, '0');
  return new;
end;
$$;

create trigger set_order_number
before insert on orders
for each row execute function generate_order_number();

-- ────────────────────────────────────────────────────────────────────────────
-- Order items
-- ────────────────────────────────────────────────────────────────────────────
create table order_items (
  id                uuid primary key default gen_random_uuid(),
  order_id          uuid not null references orders (id) on delete cascade,
  product_sku       text not null,
  product_name      text not null,
  quantity          integer not null check (quantity > 0),
  unit_price_naira  integer not null,
  line_total_naira  integer not null,
  created_at        timestamptz not null default now()
);

create index order_items_order_idx on order_items (order_id);

-- ────────────────────────────────────────────────────────────────────────────
-- Updated_at triggers
-- ────────────────────────────────────────────────────────────────────────────
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger customers_updated_at before update on customers
for each row execute function touch_updated_at();

create trigger orders_updated_at before update on orders
for each row execute function touch_updated_at();

-- ────────────────────────────────────────────────────────────────────────────
-- Row-level security
-- Policy: admin (service role) can do everything.
-- Anon users can only insert new orders/customers (via API route with service key).
-- ────────────────────────────────────────────────────────────────────────────
alter table customers  enable row level security;
alter table addresses  enable row level security;
alter table orders     enable row level security;
alter table order_items enable row level security;

-- Service role bypasses RLS by default — no additional policies needed for admin.
-- All client-side inserts go through server-side API routes that use the service key.
