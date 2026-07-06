import { redirect } from 'next/navigation';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata = {
  title: 'Admin — Kayora Orders',
  robots: { index: false },
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/login');
  }

  // Fetch recent orders with customer + items.
  // RLS on these tables only grants service_role, so the data query must
  // use the service client — the cookie/anon client above is auth-only.
  const serviceSupabase = createServiceClient();
  const { data: orders, error } = await serviceSupabase
    .from('orders')
    .select(`
      id,
      order_number,
      status,
      subtotal_naira,
      delivery_fee_naira,
      total_naira,
      delivery_zone,
      scheduled_delivery_date,
      customer_notes,
      created_at,
      customers (
        full_name,
        email,
        phone
      ),
      addresses (
        street_address,
        city,
        lga
      ),
      order_items (
        product_sku,
        product_name,
        quantity,
        unit_price_naira,
        line_total_naira
      )
    `)
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Dashboard orders error:', error);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <AdminDashboardClient
      orders={(orders ?? []) as any}
      userEmail={session.user.email ?? ''}
    />
  );
}
