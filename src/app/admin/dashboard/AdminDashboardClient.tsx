'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { formatNaira } from '@/lib/products';
import KayoraWordmark from '@/components/KayoraWordmark';
import type { OrderStatus, DeliveryZoneId } from '@/lib/types';

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending_payment: 'Pending payment',
  paid: 'Paid',
  scheduled: 'Scheduled',
  dispatched: 'Dispatched',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending_payment: 'bg-amber-100 text-amber-800',
  paid: 'bg-green-100 text-green-800',
  scheduled: 'bg-blue-100 text-blue-800',
  dispatched: 'bg-purple-100 text-purple-800',
  delivered: 'bg-kayora-blue-100 text-kayora-blue-900',
  cancelled: 'bg-red-100 text-red-700',
};

const ZONE_LABELS: Record<DeliveryZoneId, string> = {
  eket_city: 'Eket City',
  uyo: 'Uyo',
  wider_akwa_ibom: 'Wider Akwa Ibom',
};

interface OrderRow {
  id: string;
  order_number: string;
  status: OrderStatus;
  subtotal_naira: number;
  delivery_fee_naira: number;
  total_naira: number;
  delivery_zone: DeliveryZoneId;
  scheduled_delivery_date: string | null;
  customer_notes: string | null;
  created_at: string;
  customers: { full_name: string; email: string; phone: string } | null;
  addresses: { street_address: string; city: string; lga: string | null } | null;
  order_items: Array<{
    product_sku: string;
    product_name: string;
    quantity: number;
    unit_price_naira: number;
    line_total_naira: number;
  }>;
}

interface Props {
  orders: OrderRow[];
  userEmail: string;
}

export default function AdminDashboardClient({ orders, userEmail }: Props) {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = filterStatus === 'all'
    ? orders
    : orders.filter((o) => o.status === filterStatus);

  async function handleSignOut() {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  async function updateStatus(orderId: string, newStatus: OrderStatus) {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) router.refresh();
    } finally {
      setUpdatingId(null);
    }
  }

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total_naira, 0);

  const pendingCount = orders.filter((o) => o.status === 'pending_payment').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-kayora-blue-900 text-kayora-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <KayoraWordmark variant="light" className="text-xl" />
            <span className="text-kayora-cream/50 text-sm hidden sm:inline">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-kayora-cream/70 hidden sm:inline">{userEmail}</span>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm text-kayora-cream/80 hover:text-kayora-cream transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total orders', value: orders.length },
            { label: 'Pending payment', value: pendingCount },
            { label: 'Total revenue', value: formatNaira(totalRevenue) },
            { label: 'Delivered', value: orders.filter((o) => o.status === 'delivered').length },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{card.label}</p>
              <p className="font-display text-2xl font-bold text-kayora-ink">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {(['all', ...Object.keys(STATUS_LABELS)] as Array<OrderStatus | 'all'>).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                filterStatus === s
                  ? 'bg-kayora-blue-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s === 'all' ? 'All orders' : STATUS_LABELS[s as OrderStatus]}
            </button>
          ))}
        </div>

        {/* Orders table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">No orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
                    <th className="text-left px-5 py-3 font-medium">Order</th>
                    <th className="text-left px-5 py-3 font-medium">Customer</th>
                    <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Zone</th>
                    <th className="text-right px-5 py-3 font-medium">Total</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Date</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <>
                      <tr
                        key={order.id}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                      >
                        <td className="px-5 py-3.5 font-mono text-kayora-blue-900 font-semibold">
                          {order.order_number}
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-kayora-ink">{order.customers?.full_name ?? '—'}</p>
                          <p className="text-xs text-gray-400">{order.customers?.phone}</p>
                        </td>
                        <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">
                          {ZONE_LABELS[order.delivery_zone]}
                        </td>
                        <td className="px-5 py-3.5 text-right font-semibold text-kayora-ink">
                          {formatNaira(order.total_naira)}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[order.status]}`}>
                            {STATUS_LABELS[order.status]}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-gray-400 text-xs hidden lg:table-cell">
                          {new Date(order.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <svg
                            className={`w-4 h-4 text-gray-400 inline-block transition-transform ${expandedId === order.id ? 'rotate-180' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </td>
                      </tr>

                      {expandedId === order.id && (
                        <tr key={`${order.id}-detail`}>
                          <td colSpan={7} className="px-5 py-5 bg-gray-50 border-b border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Customer + address */}
                              <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Customer</p>
                                <p className="text-sm text-kayora-ink">{order.customers?.full_name}</p>
                                <p className="text-sm text-gray-500">{order.customers?.email}</p>
                                <p className="text-sm text-gray-500">{order.customers?.phone}</p>
                                <p className="text-xs text-gray-400 mt-2">
                                  {order.addresses?.street_address}, {order.addresses?.city}
                                  {order.addresses?.lga ? `, ${order.addresses.lga}` : ''}
                                </p>
                                {order.scheduled_delivery_date && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    Preferred delivery: {new Date(order.scheduled_delivery_date).toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short' })}
                                  </p>
                                )}
                                {order.customer_notes && (
                                  <p className="text-xs text-gray-500 mt-2 italic">&ldquo;{order.customer_notes}&rdquo;</p>
                                )}
                              </div>

                              {/* Items */}
                              <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Items</p>
                                <ul className="space-y-1">
                                  {order.order_items.map((item, i) => (
                                    <li key={i} className="text-sm flex justify-between">
                                      <span className="text-kayora-ink">{item.product_name} × {item.quantity}</span>
                                      <span className="text-gray-500">{formatNaira(item.line_total_naira)}</span>
                                    </li>
                                  ))}
                                </ul>
                                <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500 space-y-0.5">
                                  <div className="flex justify-between">
                                    <span>Subtotal</span><span>{formatNaira(order.subtotal_naira)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Delivery</span><span>{formatNaira(order.delivery_fee_naira)}</span>
                                  </div>
                                  <div className="flex justify-between font-semibold text-kayora-ink">
                                    <span>Total</span><span>{formatNaira(order.total_naira)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Status update */}
                              <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Update status</p>
                                <div className="flex flex-col gap-2">
                                  {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
                                    <button
                                      key={s}
                                      type="button"
                                      disabled={order.status === s || updatingId === order.id}
                                      onClick={(e) => { e.stopPropagation(); updateStatus(order.id, s); }}
                                      className={`text-left text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                                        order.status === s
                                          ? `${STATUS_COLORS[s]} font-semibold`
                                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                                      }`}
                                    >
                                      {STATUS_LABELS[s]}
                                      {order.status === s && ' ✓'}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
