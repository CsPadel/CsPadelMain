/**
 * POST /api/checkout – creates a Stripe Checkout session for a Menorca
 * retreat booking and returns its URL. A Vercel Function, deployed next to
 * the static Astro site.
 *
 * The browser only sends what the guest chose (date, room, guest count,
 * deposit or full payment, discount code) and their details. The amount is
 * worked out here from src/constants/menorcaBooking.ts, so nobody can change
 * the price they pay.
 *
 * Needs STRIPE_SECRET_KEY in the Vercel project's environment variables
 * (Stripe → Developers → API keys; a restricted key with "Checkout Sessions:
 * Write" is enough). Without it this answers 503 and the booking modal tells
 * the guest we'll send their payment link by email instead.
 *
 * Once paid, Stripe calls api/stripe-webhook.ts, which sends the confirmation
 * emails. Everything that email needs travels in the session's metadata.
 */
// The .js extensions are needed: the project is an ES module and Node does
// not guess extensions at runtime. Vercel compiles the .ts files to .js.
import {
  MAX_GUESTS,
  ROOM_TYPES,
  findDiscount,
  findRetreatDate,
  isBookable,
  quote,
  type RoomType,
} from '../src/constants/menorcaBooking.js';
import {
  createCheckoutSession,
  formatDateRange,
  formatLongDate,
  gbp,
  json,
  setMetadata,
  toLocale,
} from './_lib/payments.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CheckoutRequest {
  ref?: string;
  dateId?: string;
  room?: string;
  guests?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  locale?: string;
  discountCode?: string;
  /** 'full' to pay the whole retreat now; anything else pays the deposit. */
  payment?: string;
}

export async function POST(request: Request): Promise<Response> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return json({ error: 'not_configured' }, 503);

  let body: CheckoutRequest;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const date = body.dateId ? findRetreatDate(body.dateId) : undefined;
  const room = body.room as RoomType;
  const guests = Number(body.guests);
  const email = (body.email ?? '').trim();
  const locale = toLocale(body.locale);
  const ref = (body.ref ?? '').replace(/[^A-Za-z0-9-]/g, '').slice(0, 40);

  if (!date || !isBookable(date)) return json({ error: 'date_unavailable' }, 400);
  if (!ROOM_TYPES.includes(room)) return json({ error: 'invalid_room' }, 400);
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
    return json({ error: 'invalid_guests' }, 400);
  }
  if (!EMAIL_PATTERN.test(email)) return json({ error: 'invalid_email' }, 400);

  const discount = body.discountCode ? findDiscount(body.discountCode) : undefined;
  if (body.discountCode && !discount) return json({ error: 'invalid_discount' }, 400);

  const q = quote(date, room, guests, discount, { payInFull: body.payment === 'full' });
  const dates = formatDateRange(date.start, date.end);
  const roomLabel = room === 'shared' ? 'Shared room' : 'Private room';
  const firstName = (body.firstName ?? '').trim().slice(0, 100);
  const lastName = (body.lastName ?? '').trim().slice(0, 100);

  const origin = new URL(request.url).origin;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const params = new URLSearchParams();
  params.set('mode', 'payment');
  params.set('customer_email', email);
  params.set('locale', locale);
  if (ref) params.set('client_reference_id', ref);
  params.set('line_items[0][quantity]', String(guests));
  params.set('line_items[0][price_data][currency]', 'gbp');
  params.set('line_items[0][price_data][unit_amount]', String(Math.round((q.dueNow * 100) / guests)));
  params.set(
    'line_items[0][price_data][product_data][name]',
    `${q.payingInFull ? 'Menorca Padel Retreat' : 'Deposit – Menorca Padel Retreat'}, ${dates}`,
  );
  const discountNote = discount ? ` Includes ${discount.percent}% off with code ${discount.code}.` : '';
  params.set(
    'line_items[0][price_data][product_data][description]',
    q.payingInFull
      ? `${roomLabel}, paid in full.${discountNote}`
      : `${roomLabel}. Retreat total ${gbp(q.total)}; balance of ${gbp(q.balance)} due by ${formatLongDate(q.balanceDue)}.${discountNote}`,
  );
  setMetadata(params, {
    kind: 'booking',
    booking_ref: ref,
    retreat: 'Menorca',
    date_id: date.id,
    dates,
    room: roomLabel,
    room_type: room,
    guests: String(guests),
    first_name: firstName,
    last_name: lastName,
    name: `${firstName} ${lastName}`.trim(),
    email,
    phone: (body.phone ?? '').slice(0, 40),
    locale,
    payment: q.payingInFull ? 'full' : 'deposit',
    retreat_total_gbp: String(q.total),
    discount_code: discount ? discount.code : '',
    discount_percent: discount ? String(discount.percent) : '',
    discount_gbp: discount ? String(q.discount) : '',
    balance_gbp: String(q.balance),
    balance_due: q.payingInFull ? '' : q.balanceDue,
  });
  params.set('payment_intent_data[description]', `Menorca ${dates} · ${roomLabel} · ${guests} guest(s) · ${ref}`);
  params.set('success_url', `${origin}${prefix}/menorca/booking-confirmed?ref=${encodeURIComponent(ref)}`);
  params.set('cancel_url', `${origin}${prefix}/menorca?booking=cancelled`);

  const url = await createCheckoutSession(secretKey, params);
  return url ? json({ url }) : json({ error: 'stripe_error' }, 502);
}
