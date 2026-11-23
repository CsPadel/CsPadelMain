/**
 * POST /api/checkout – creates a Stripe Checkout session for a Menorca
 * retreat booking and returns its URL. A Vercel Function, deployed next to
 * the static Astro site.
 *
 * The browser only sends what the guest chose (date, room, guest count) and
 * their details. The amount is worked out here from
 * src/constants/menorcaBooking.ts, so nobody can change the price they pay.
 *
 * Needs STRIPE_SECRET_KEY in the Vercel project's environment variables
 * (Stripe → Developers → API keys; a restricted key with "Checkout Sessions:
 * Write" is enough). Without it this answers 503 and the booking modal tells
 * the guest we'll send their payment link by email instead.
 */
// The .js extension is needed: the project is an ES module and Node does not
// guess extensions at runtime. Vercel compiles the .ts file to .js.
import {
  MAX_GUESTS,
  ROOM_TYPES,
  findDiscount,
  findRetreatDate,
  isBookable,
  quote,
  type RoomType,
} from '../src/constants/menorcaBooking.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOCALES = ['en', 'es', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

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

function json(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function formatDateRange(start: string, end: string): string {
  const fmt = (iso: string, withYear: boolean) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      ...(withYear ? { year: 'numeric' } : {}),
      timeZone: 'UTC',
    });
  if (start.slice(0, 7) === end.slice(0, 7)) {
    return `${new Date(`${start}T00:00:00Z`).getUTCDate()}–${fmt(end, true)}`;
  }
  return `${fmt(start, false)} – ${fmt(end, true)}`;
}

/** £1,572.50, or £1,850 for whole pounds. */
function gbp(amount: number): string {
  return `£${amount.toLocaleString('en-GB', {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatLongDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
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
  const locale: Locale = LOCALES.includes(body.locale as Locale) ? (body.locale as Locale) : 'en';
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
  const name = `${body.firstName ?? ''} ${body.lastName ?? ''}`.trim().slice(0, 200);

  const origin = new URL(request.url).origin;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const metadata: Record<string, string> = {
    booking_ref: ref,
    retreat: 'Menorca',
    dates,
    room: roomLabel,
    guests: String(guests),
    name,
    phone: (body.phone ?? '').slice(0, 40),
    retreat_total_gbp: String(q.total),
    discount_code: discount ? `${discount.code} (${discount.percent}% off, -${gbp(q.discount)})` : '',
    balance_gbp: String(q.balance),
    balance_due: q.payingInFull ? 'paid in full' : q.balanceDue,
  };

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
  for (const [key, value] of Object.entries(metadata)) {
    if (!value) continue;
    params.set(`metadata[${key}]`, value);
    params.set(`payment_intent_data[metadata][${key}]`, value);
  }
  params.set('payment_intent_data[description]', `Menorca ${dates} · ${roomLabel} · ${guests} guest(s) · ${ref}`);
  params.set('success_url', `${origin}${prefix}/menorca/booking-confirmed?ref=${encodeURIComponent(ref)}`);
  params.set('cancel_url', `${origin}${prefix}/menorca?booking=cancelled`);

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  const session = (await res.json()) as { url?: string; error?: { message?: string } };
  if (!res.ok || !session.url) {
    console.error('Stripe checkout failed', res.status, session.error?.message);
    return json({ error: 'stripe_error' }, 502);
  }
  return json({ url: session.url });
}
