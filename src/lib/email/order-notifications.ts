import { Resend } from 'resend';
import { formatNaira } from '@/lib/products';

/**
 * Shared order-notification emails for the card (verify/webhook) and
 * COD (/api/orders) paths. Every send is wrapped so a Resend outage can
 * never fail an API route after the order itself has been written.
 */

const FROM_CUSTOMER = 'Kayora Water <noreply@kayorawater.com>';
const FROM_INTERNAL = 'Kayora Orders <noreply@kayorawater.com>';
const INTERNAL_TO = 'info@kaybibeverage.com';

const FOOTER = `
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0">
  <p style="font-size:12px;color:#888">Kaybi Beverage Industries Limited · 173 Eket Oron Road, Eket, Akwa Ibom</p>
`;

interface OrderItemInfo {
  product_name: string;
  quantity: number;
  line_total_naira: number;
}

export interface OrderNotificationInfo {
  orderNumber: string;
  totalNaira: number;
  customerName: string;
  customerEmail: string;
  /** Paystack reference — card payments only */
  reference?: string;
  /** Included in the internal email when available (COD path) */
  items?: OrderItemInfo[];
  addressText?: string;
  scheduledDeliveryDate?: string;
}

async function safeSend(payload: {
  from: string;
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send(payload);
  } catch (err) {
    console.error(`[email] Failed to send "${payload.subject}" to ${payload.to}:`, err);
  }
}

function itemsHtml(items?: OrderItemInfo[]): string {
  if (!items?.length) return '';
  const rows = items
    .map((i) => `<li>${i.product_name} × ${i.quantity} — ${formatNaira(i.line_total_naira)}</li>`)
    .join('');
  return `<ul>${rows}</ul>`;
}

/** Customer email for a successfully paid (card) order. */
export async function sendCustomerPaidConfirmation(info: OrderNotificationInfo): Promise<void> {
  if (!info.customerEmail) return;
  await safeSend({
    from: FROM_CUSTOMER,
    to: info.customerEmail,
    subject: `Payment confirmed — Order ${info.orderNumber}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h1 style="font-size:24px;margin-bottom:8px">Payment confirmed</h1>
        <p>Hi ${info.customerName},</p>
        <p>We've received your payment for <strong>Order ${info.orderNumber}</strong> — ${formatNaira(info.totalNaira)}.</p>
        <p>Our team will be in touch shortly to confirm your delivery schedule.</p>
        <p style="margin-top:24px">Questions? Call us on <a href="tel:+2349040789918">0904 078 9918</a> or reply to this email.</p>
        ${FOOTER}
      </div>
    `,
  });
}

/** Customer email for a pay-later (COD / bank transfer) order. */
export async function sendCustomerCodConfirmation(info: OrderNotificationInfo): Promise<void> {
  if (!info.customerEmail) return;
  await safeSend({
    from: FROM_CUSTOMER,
    to: info.customerEmail,
    subject: `Order ${info.orderNumber} received — payment on delivery`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h1 style="font-size:24px;margin-bottom:8px">Order received</h1>
        <p>Hi ${info.customerName},</p>
        <p>We've received your order <strong>${info.orderNumber}</strong> — ${formatNaira(info.totalNaira)}.</p>
        <p>Our team will call or WhatsApp you shortly to confirm your delivery details and arrange payment — by bank transfer or cash — at the time of delivery.</p>
        <p style="margin-top:24px">Questions? Call us on <a href="tel:+2349040789918">0904 078 9918</a> or reply to this email.</p>
        ${FOOTER}
      </div>
    `,
  });
}

/**
 * Internal notification to the fulfilment team.
 * `kind` distinguishes card payments (verify or webhook path) from COD.
 */
export async function sendInternalOrderNotification(
  info: OrderNotificationInfo,
  kind: 'paid' | 'paid-webhook' | 'cod'
): Promise<void> {
  const tag = kind === 'cod' ? '[COD]' : kind === 'paid-webhook' ? '[PAID via webhook]' : '[PAID]';
  const paymentLine =
    kind === 'cod'
      ? '<p><strong>Payment on delivery</strong> — collect by bank transfer or cash at time of delivery.</p>'
      : `<p>Paystack reference: ${info.reference ?? 'n/a'}</p>`;
  await safeSend({
    from: FROM_INTERNAL,
    to: INTERNAL_TO,
    subject: `${tag} Order ${info.orderNumber} — ${formatNaira(info.totalNaira)}`,
    html: `
      <p>${kind === 'cod' ? 'New pay-later order' : 'Payment confirmed'} for order <strong>${info.orderNumber}</strong>.</p>
      <p>Customer: ${info.customerName} (${info.customerEmail})</p>
      <p>Amount: ${formatNaira(info.totalNaira)}</p>
      ${paymentLine}
      ${info.addressText ? `<p>Deliver to: ${info.addressText}</p>` : ''}
      ${info.scheduledDeliveryDate ? `<p>Preferred delivery date: ${info.scheduledDeliveryDate}</p>` : ''}
      ${itemsHtml(info.items)}
    `,
  });
}
