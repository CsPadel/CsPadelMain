/**
 * POST /api/stripe-webhook – Stripe calls this when a Checkout payment
 * succeeds (a deposit, a full payment or a balance).
 *
 * It checks the call really comes from Stripe, then hands the payment to the
 * Apps Script backend (apps-script/enquiry-form.gs), which marks the booking
 * paid in the sheet and sends the confirmation emails to the guest and to the
 * team. Stripe retries for up to 3 days if this does not answer 200, and the
 * Apps Script skips payments it has already handled, so a retry never sends
 * the emails twice.
 *
 * Needs, in Vercel's environment variables:
 *   STRIPE_WEBHOOK_SECRET     the endpoint's signing secret (whsec_…), from
 *                             Stripe → Developers → Webhooks
 *   PAYMENT_WEBHOOK_SECRET    any long random text; the same value goes in the
 *                             Apps Script's Script Properties. It also signs
 *                             the "Pay my balance" links.
 *   PUBLIC_ENQUIRY_ENDPOINT   the Apps Script /exec URL (already set for the forms)
 */
import { findRetreatDate } from '../src/constants/menorcaBooking.js';
import { formatLongDate, json, signBalanceToken, toLocale, verifyStripeSignature } from './_lib/payments.js';

interface CheckoutSession {
  id: string;
  payment_status: string;
  amount_total: number | null;
  currency: string;
  customer_email: string | null;
  customer_details?: { email?: string | null; name?: string | null; phone?: string | null } | null;
  payment_intent: string | null;
  metadata: Record<string, string> | null;
}

interface StripeEvent {
  id: string;
  type: string;
  data: { object: CheckoutSession };
}

const HANDLED_EVENTS = ['checkout.session.completed', 'checkout.session.async_payment_succeeded'];

export async function POST(request: Request): Promise<Response> {
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sharedSecret = process.env.PAYMENT_WEBHOOK_SECRET;
  const endpoint = process.env.PUBLIC_ENQUIRY_ENDPOINT;
  if (!signingSecret || !sharedSecret || !endpoint) {
    console.error('stripe-webhook: missing STRIPE_WEBHOOK_SECRET, PAYMENT_WEBHOOK_SECRET or PUBLIC_ENQUIRY_ENDPOINT');
    return json({ error: 'not_configured' }, 503);
  }

  const rawBody = await request.text();
  if (!verifyStripeSignature(rawBody, request.headers.get('stripe-signature'), signingSecret)) {
    return json({ error: 'invalid_signature' }, 400);
  }

  const event = JSON.parse(rawBody) as StripeEvent;
  const session = event.data?.object;
  // Other events, and card payments still processing, need nothing from us.
  if (!HANDLED_EVENTS.includes(event.type) || session?.payment_status !== 'paid') {
    return json({ received: true });
  }

  const m = session.metadata ?? {};
  const kind = m.kind === 'balance' ? 'balance' : 'booking';
  const email = session.customer_details?.email || session.customer_email || m.email || '';
  const locale = toLocale(m.locale);
  const balance = Number(m.balance_gbp || 0);
  const payment = kind === 'balance' ? 'balance' : m.payment === 'full' || balance === 0 ? 'full' : 'deposit';

  // A deposit's confirmation email carries a link to pay the rest online.
  let balanceLink = '';
  if (payment === 'deposit' && balance > 0) {
    const token = signBalanceToken(
      {
        ref: m.booking_ref ?? '',
        dateId: m.date_id ?? '',
        room: m.room_type ?? '',
        guests: Number(m.guests || 1),
        balancePence: Math.round(balance * 100),
        email,
        firstName: m.first_name ?? '',
        lastName: m.last_name ?? '',
        phone: m.phone ?? '',
        locale,
        discountCode: m.discount_code ?? '',
      },
      sharedSecret,
    );
    balanceLink = `${new URL(request.url).origin}/api/balance?t=${token}`;
  }

  const payload = {
    type: 'payment',
    secret: sharedSecret,
    payment,
    stripeSessionId: session.id,
    stripePaymentIntent: session.payment_intent ?? '',
    amountPaid: (session.amount_total ?? 0) / 100,
    ref: m.booking_ref ?? '',
    dateId: m.date_id ?? '',
    dateStart: findRetreatDate(m.date_id ?? '')?.start ?? '',
    dateEnd: findRetreatDate(m.date_id ?? '')?.end ?? '',
    dates: m.dates ?? '',
    room: m.room_type ?? '',
    guests: Number(m.guests || 1),
    firstName: m.first_name ?? '',
    lastName: m.last_name ?? '',
    email,
    phone: m.phone || session.customer_details?.phone || '',
    locale,
    total: Number(m.retreat_total_gbp || 0),
    discountCode: m.discount_code ?? '',
    discountPercent: Number(m.discount_percent || 0),
    discount: Number(m.discount_gbp || 0),
    balance: kind === 'balance' ? 0 : balance,
    balanceDue: m.balance_due ?? '',
    balanceDueLabel: m.balance_due ? formatLongDate(m.balance_due) : '',
    balanceLink,
    paidAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    const result = (await res.json().catch(() => ({}))) as { status?: string; message?: string };
    if (result.status !== 'success') {
      console.error('stripe-webhook: Apps Script did not confirm', res.status, result.message);
      return json({ error: 'backend_failed' }, 502);
    }
  } catch (err) {
    console.error('stripe-webhook: could not reach Apps Script', err);
    return json({ error: 'backend_unreachable' }, 502);
  }
  return json({ received: true });
}
