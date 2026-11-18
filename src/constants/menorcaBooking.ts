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
  /** Price per person for the chosen room. */
  pricePerPerson: number;
  /** Whole retreat, all guests. */
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
  now: Date = new Date(),
): BookingQuote {
  const pricePerPerson = date.prices[room];
  const total = pricePerPerson * guests;
  const balanceDue = balanceDueDate(date);
  // Inside the 21-day window the balance is already due, so pay it all now.
  const payingInFull = now.getTime() >= utcDate(balanceDue).getTime();
  const dueNow = payingInFull ? total : DEPOSIT_PER_PERSON * guests;
  return { pricePerPerson, total, dueNow, balance: total - dueNow, balanceDue, payingInFull };
}
