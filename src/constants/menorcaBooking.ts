/**
 * Menorca 2027 open retreats: the dates and prices guests can book and pay
 * for online. The booking modal (src/components/BookingForm.tsx) reads this
 * file to show prices, and the checkout function (api/checkout.ts) reads it
 * again to decide what to charge, so a price edited in the browser is never
 * trusted.
 *
 * To update: change a price here, or set `soldOut: true` to stop new bookings
 * for a date. Prices are per person, in pounds.
 */

export type RoomType = 'shared' | 'private';

export interface RetreatDate {
  /** Stable key used in URLs, the sheet and Stripe: the start date. */
  id: string;
  /** ISO dates (YYYY-MM-DD), arrival and departure. */
  start: string;
  end: string;
  prices: Record<RoomType, number>;
  soldOut?: boolean;
}

export const MENORCA_2027_DATES: RetreatDate[] = [
  { id: '2027-04-28', start: '2027-04-28', end: '2027-05-02', prices: { shared: 1850, private: 2400 } },
  { id: '2027-05-05', start: '2027-05-05', end: '2027-05-09', prices: { shared: 1850, private: 2400 } },
  { id: '2027-06-02', start: '2027-06-02', end: '2027-06-06', prices: { shared: 1850, private: 2400 } },
  { id: '2027-09-15', start: '2027-09-15', end: '2027-09-19', prices: { shared: 1950, private: 2500 } },
  { id: '2027-09-22', start: '2027-09-22', end: '2027-09-26', prices: { shared: 1850, private: 2400 } },
  { id: '2027-09-29', start: '2027-09-29', end: '2027-10-03', prices: { shared: 1850, private: 2400 } },
  { id: '2027-10-06', start: '2027-10-06', end: '2027-10-10', prices: { shared: 1850, private: 2400 } },
];

export const ROOM_TYPES: RoomType[] = ['shared', 'private'];

/** From the booking terms: a £150 deposit per person secures a place. */
export const DEPOSIT_PER_PERSON = 150;
/** The total balance is due 21 days before the start date. */
export const BALANCE_DUE_DAYS_BEFORE = 21;
/** Bookings close 15 days before the start date. */
export const BOOKING_CLOSES_DAYS_BEFORE = 15;
/** Larger groups are a private retreat, handled through an enquiry. */
export const MAX_GUESTS = 6;

/**
 * Discount codes, as percent off the whole retreat price. Codes are matched
 * ignoring case and spaces. The deposit stays £150 per person; the discount
 * comes off the balance (or off the full amount when paying in full).
 * To add one: 'CODE': percent. To stop one: delete its line.
 */
export const DISCOUNT_CODES: Record<string, number> = {
  'PADEL&RESTORE': 15,
};

export interface Discount {
  code: string;
  percent: number;
}

/** The discount for a code the guest typed, or undefined if it isn't valid. */
export function findDiscount(input: string | undefined | null): Discount | undefined {
  const code = (input ?? '').replace(/\s+/g, '').toUpperCase();
  const percent = DISCOUNT_CODES[code];
  return code && percent ? { code, percent } : undefined;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function utcDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function findRetreatDate(id: string): RetreatDate | undefined {
  return MENORCA_2027_DATES.find((d) => d.id === id);
}

/** ISO date the total balance is due. */
export function balanceDueDate(date: RetreatDate): string {
  return new Date(utcDate(date.start).getTime() - BALANCE_DUE_DAYS_BEFORE * DAY_MS)
    .toISOString()
    .slice(0, 10);
}

/** Open for booking: not sold out, and more than 15 days before the start. */
export function isBookable(date: RetreatDate, now: Date = new Date()): boolean {
  if (date.soldOut) return false;
  return utcDate(date.start).getTime() - now.getTime() > BOOKING_CLOSES_DAYS_BEFORE * DAY_MS;
}

export interface BookingQuote {
  /** Price per person for the chosen room, before any discount. */
  pricePerPerson: number;
  /** Whole retreat, all guests, before any discount. */
  subtotal: number;
  /** Percent off from a discount code (0 without one). */
  discountPercent: number;
  /** Amount taken off the subtotal by the discount code. */
  discount: number;
  /** What the guests pay for the retreat, after any discount. */
  total: number;
  /** Charged now: the deposit, or the full amount once the balance is due. */
  dueNow: number;
  /** Left to pay after today (0 when paying in full). */
  balance: number;
  balanceDue: string;
  payingInFull: boolean;
}

export function quote(
  date: RetreatDate,
  room: RoomType,
  guests: number,
  discount?: Discount,
  now: Date = new Date(),
): BookingQuote {
  const pricePerPerson = date.prices[room];
  const discountPercent = discount?.percent ?? 0;
  // Worked out in pence so a discounted price like £1,572.50 stays exact.
  const subtotalPence = pricePerPerson * 100 * guests;
  const totalPence = pricePerPerson * (100 - discountPercent) * guests;
  const balanceDue = balanceDueDate(date);
  // Inside the 21-day window the balance is already due, so pay it all now.
  const payingInFull = now.getTime() >= utcDate(balanceDue).getTime();
  const dueNowPence = payingInFull ? totalPence : DEPOSIT_PER_PERSON * 100 * guests;
  return {
    pricePerPerson,
    subtotal: subtotalPence / 100,
    discountPercent,
    discount: (subtotalPence - totalPence) / 100,
    total: totalPence / 100,
    dueNow: dueNowPence / 100,
    balance: (totalPence - dueNowPence) / 100,
    balanceDue,
    payingInFull,
  };
}
