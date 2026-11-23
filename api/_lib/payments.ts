/**
 * Shared by the payment functions in api/. Files under api/_lib are helpers,
 * not endpoints (Vercel skips paths that start with an underscore).
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

export const LOCALES = ['en', 'es', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

export function toLocale(value: unknown): Locale {
  return LOCALES.includes(value as Locale) ? (value as Locale) : 'en';
}

export function json(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

/** "15–19 Sept 2027", or "28 Apr – 2 May 2027" across two months. */
export function formatDateRange(start: string, end: string): string {
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

export function formatLongDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** £1,572.50, or £1,850 for whole pounds. */
export function gbp(amount: number): string {
  return `£${amount.toLocaleString('en-GB', {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Creates a Stripe Checkout session; returns its URL or null. */
export async function createCheckoutSession(secretKey: string, params: URLSearchParams): Promise<string | null> {
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
    return null;
  }
  return session.url;
}

/** Sets the same metadata on the session and on its payment, so both show it in Stripe. */
export function setMetadata(params: URLSearchParams, metadata: Record<string, string>): void {
  for (const [key, value] of Object.entries(metadata)) {
    if (!value) continue;
    params.set(`metadata[${key}]`, value);
    params.set(`payment_intent_data[metadata][${key}]`, value);
  }
}

/* ─── Signed balance links ────────────────────────────────────
 * The deposit confirmation email carries a "Pay my balance" link. Its token
 * holds the booking and the amount left to pay, signed with
 * PAYMENT_WEBHOOK_SECRET, so nobody can change the amount in the URL. */

export interface BalanceToken {
  ref: string;
  dateId: string;
  room: string;
  guests: number;
  /** Amount left to pay, in pence. */
  balancePence: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  locale: Locale;
  discountCode: string;
}

const b64url = (input: Buffer | string) => Buffer.from(input).toString('base64url');

function sign(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('base64url');
}

export function signBalanceToken(token: BalanceToken, secret: string): string {
  const data = b64url(JSON.stringify(token));
  return `${data}.${sign(data, secret)}`;
}

export function verifyBalanceToken(value: string, secret: string): BalanceToken | null {
  const [data, signature] = value.split('.');
  if (!data || !signature) return null;
  const expected = Buffer.from(sign(data, secret));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    return JSON.parse(Buffer.from(data, 'base64url').toString('utf8')) as BalanceToken;
  } catch {
    return null;
  }
}

/* ─── Stripe webhook signatures ───────────────────────────────
 * https://docs.stripe.com/webhooks#verify-manually */

const SIGNATURE_TOLERANCE_SECONDS = 300;

export function verifyStripeSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(',').map((part) => {
      const [k, ...v] = part.split('=');
      return [k, v.join('=')];
    }),
  );
  const timestamp = Number(parts.t);
  if (!timestamp || Math.abs(Date.now() / 1000 - timestamp) > SIGNATURE_TOLERANCE_SECONDS) return false;
  const expected = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex');
  const signatures = header
    .split(',')
    .filter((p) => p.startsWith('v1='))
    .map((p) => p.slice(3));
  return signatures.some((sig) => {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  });
}
