/**
 * GET /api/balance?t=<signed token> – the "Pay my balance" button in a
 * deposit confirmation email. Opens a Stripe payment page for exactly the
 * balance left on that booking, then redirects the guest to it.
 *
 * The token is made by api/stripe-webhook.ts and signed with
 * PAYMENT_WEBHOOK_SECRET, so the amount cannot be changed in the URL. Each
 * click makes a fresh payment page, so the link keeps working until it is used.
 */
import { findRetreatDate } from '../src/constants/menorcaBooking.js';
import { WHATSAPP_CONCIERGE_NUMBER } from '../src/constants/urls.js';

// Shown as text, never a mailto: link (see src/constants/forms.ts). That file
// is not imported here: it reads import.meta.env, which Node does not have.
const CONTACT_EMAIL = 'awatelet@cspadel.com';
import {
  createCheckoutSession,
  formatDateRange,
  gbp,
  setMetadata,
  verifyBalanceToken,
} from './_lib/payments.js';

function page(status: number, message: string): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Courtside Padel</title></head>
<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F7F4EF;font-family:-apple-system,Helvetica,Arial,sans-serif;color:#01192C;padding:24px">
<div style="max-width:440px;text-align:center"><p style="letter-spacing:.3em;font-weight:700;margin:0 0 24px">COURTSIDE</p>
<p style="font-size:16px;line-height:1.6;margin:0 0 24px">${message}</p>
<a href="https://wa.me/${WHATSAPP_CONCIERGE_NUMBER}" style="color:#8A5A1C">WhatsApp</a> · ${CONTACT_EMAIL}</div></body></html>`;
  return new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

export async function GET(request: Request): Promise<Response> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const sharedSecret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!secretKey || !sharedSecret) {
    return page(503, 'Online balance payments are not available right now. Please contact us and we will send you a payment link.');
  }

  const url = new URL(request.url);
  const token = verifyBalanceToken(url.searchParams.get('t') ?? '', sharedSecret);
  const date = token ? findRetreatDate(token.dateId) : undefined;
  if (!token || !date || !(token.balancePence > 0)) {
    return page(400, 'This payment link is not valid. Please contact us and we will help you pay your balance.');
  }

  const dates = formatDateRange(date.start, date.end);
  const roomLabel = token.room === 'private' ? 'Private room' : 'Shared room';
  const balance = token.balancePence / 100;
  const prefix = token.locale === 'en' ? '' : `/${token.locale}`;

  const params = new URLSearchParams();
  params.set('mode', 'payment');
  if (token.email) params.set('customer_email', token.email);
  params.set('locale', token.locale);
  if (token.ref) params.set('client_reference_id', token.ref);
  params.set('line_items[0][quantity]', '1');
  params.set('line_items[0][price_data][currency]', 'gbp');
  params.set('line_items[0][price_data][unit_amount]', String(token.balancePence));
  params.set('line_items[0][price_data][product_data][name]', `Balance – Menorca Padel Retreat, ${dates}`);
  params.set(
    'line_items[0][price_data][product_data][description]',
    `${roomLabel}, ${token.guests} guest(s). Booking ${token.ref}. Remaining balance ${gbp(balance)}.`,
  );
  setMetadata(params, {
    kind: 'balance',
    booking_ref: token.ref,
    retreat: 'Menorca',
    date_id: date.id,
    dates,
    room: roomLabel,
    room_type: token.room,
    guests: String(token.guests),
    first_name: token.firstName,
    last_name: token.lastName,
    name: `${token.firstName} ${token.lastName}`.trim(),
    email: token.email,
    phone: token.phone,
    locale: token.locale,
    payment: 'balance',
    discount_code: token.discountCode,
    balance_gbp: '0',
  });
  params.set('payment_intent_data[description]', `Menorca ${dates} · balance · ${token.ref}`);
  params.set('success_url', `${url.origin}${prefix}/menorca/booking-confirmed?ref=${encodeURIComponent(token.ref)}&paid=balance`);
  params.set('cancel_url', `${url.origin}${prefix}/menorca`);

  const checkoutUrl = await createCheckoutSession(secretKey, params);
  if (!checkoutUrl) {
    return page(502, 'We could not open the payment page. Please try again in a few minutes, or contact us.');
  }
  return Response.redirect(checkoutUrl, 303);
}
