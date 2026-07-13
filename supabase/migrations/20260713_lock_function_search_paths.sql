-- Sprint 5.18 — Lock down function search_path to prevent
-- privilege-escalation via schema hijacking (Supabase security lint:
-- function_search_path_mutable)

alter function public.generate_order_number()
  set search_path = public, pg_catalog;

alter function public.touch_updated_at()
  set search_path = public, pg_catalog;

-- Sprint 5.18 — Add covering index for orders.address_id foreign key
-- for join performance as order volume grows (Supabase performance lint:
-- unindexed_foreign_keys)

create index if not exists orders_address_id_idx
  on public.orders (address_id);
