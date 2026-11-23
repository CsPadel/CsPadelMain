import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Check, ChevronDown, Minus, Plus, MessageCircle } from 'lucide-react';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { ENQUIRY_ENDPOINT } from '../constants/forms';
import { getWhatsAppConciergeUrl } from '../constants/urls';
import {
  DEPOSIT_PER_PERSON,
  MENORCA_2027_DATES,
  MAX_GUESTS,
  ROOM_TYPES,
  findDiscount,
  isBookable,
  quote,
  type Discount,
  type RetreatDate,
  type RoomType,
} from '../constants/menorcaBooking';

/* ─── Helpers ─────────────────────────────────────────────── */

const LEVELS = ['beginner', 'intermediate', 'advanced'] as const;
const STEPS = ['retreat', 'details'] as const;
type Step = (typeof STEPS)[number];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 7;

const INTL_LOCALE: Record<Locale, string> = { en: 'en-GB', es: 'es-ES', fr: 'fr-FR' };

function formatDate(iso: string, locale: Locale, opts: Intl.DateTimeFormatOptions) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(INTL_LOCALE[locale], { ...opts, timeZone: 'UTC' });
}

/** "15–19 Sept 2027", or "28 Apr – 2 May 2027" across two months. */
function formatRange(date: RetreatDate, locale: Locale) {
  const end = formatDate(date.end, locale, { day: 'numeric', month: 'short', year: 'numeric' });
  if (date.start.slice(0, 7) === date.end.slice(0, 7)) {
    return `${formatDate(date.start, locale, { day: 'numeric' })}–${end}`;
  }
  return `${formatDate(date.start, locale, { day: 'numeric', month: 'short' })} – ${end}`;
}

/** £1,850, or £1,572.50 once a discount leaves pence. */
function gbp(amount: number, locale: Locale) {
  const digits = Number.isInteger(amount) ? 0 : 2;
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

/** Short, readable reference shared by the sheet row and the Stripe payment. */
function newBookingRef(date: RetreatDate) {
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MEN${date.start.slice(2, 4)}${date.start.slice(5, 7)}${date.start.slice(8, 10)}-${random}`;
}

const inputClass =
  'w-full bg-transparent border-b border-brand-dark/25 pb-3 text-brand-dark text-base font-light ' +
  'focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-dark/40';

const labelClass = 'block text-[9px] uppercase tracking-[0.28em] text-brand-dark/55 mb-3 font-semibold';

interface Details {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  level: string;
  notes: string;
  terms: boolean;
}

const emptyDetails: Details = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  level: '',
  notes: '',
  terms: false,
};

/* ─── Date dropdown ───────────────────────────────────────── */

type Translate = ReturnType<typeof usePageTranslation>['t'];

function DatePicker({
  value,
  onChange,
  locale,
  t,
}: {
  value: RetreatDate;
  onChange: (date: RetreatDate) => void;
  locale: Locale;
  t: Translate;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-card border text-left transition-colors ${
          open ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-dark/20 hover:border-brand-gold/50'
        }`}
      >
        <span>
          <span className="block text-brand-dark text-base font-light">{formatRange(value, locale)}</span>
          <span className="block text-brand-dark/55 text-xs font-light mt-0.5">
            {t('bookingForm.retreat.fromPrice', { price: gbp(value.prices.shared, locale) })}
          </span>
        </span>
        <ChevronDown
          className={`w-5 h-5 text-brand-gold-deep flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="mt-2 rounded-card border border-brand-dark/15 bg-white overflow-hidden divide-y divide-brand-dark/8"
        >
          {MENORCA_2027_DATES.map((date) => {
            const available = isBookable(date);
            const selected = date.id === value.id;
            return (
              <li key={date.id} role="option" aria-selected={selected} aria-disabled={!available}>
                <button
                  type="button"
                  disabled={!available}
                  onClick={() => {
                    onChange(date);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors ${
                    selected ? 'bg-brand-gold/10' : 'hover:bg-brand-dark/5'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <span className="text-sm font-light text-brand-dark">{formatRange(date, locale)}</span>
                  <span className="flex items-center gap-3 text-xs font-light text-brand-dark/60">
                    {available
                      ? t('bookingForm.retreat.fromPrice', { price: gbp(date.prices.shared, locale) })
                      : t('bookingForm.retreat.soldOut')}
                    {selected && <Check className="w-3.5 h-3.5 text-brand-gold-deep" />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ─── Modal ───────────────────────────────────────────────── */

interface BookingFormModalProps {
  open: boolean;
  onClose: () => void;
  locale?: Locale;
}

export function BookingFormModal({ open, onClose, locale: localeProp }: BookingFormModalProps) {
  const { t, locale } = usePageTranslation(localeProp);

  const firstOpen = useMemo(() => MENORCA_2027_DATES.find((d) => isBookable(d)) ?? MENORCA_2027_DATES[0], []);
  const [stepIndex, setStepIndex] = useState(0);
  const [date, setDate] = useState<RetreatDate>(firstOpen);
  const [room, setRoom] = useState<RoomType>('shared');
  const [guests, setGuests] = useState(1);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [discount, setDiscount] = useState<Discount | undefined>();
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [payInFull, setPayInFull] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'requested' | 'failed'>('idle');
  const [waHref, setWaHref] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setStepIndex(0);
    setDate(firstOpen);
    setRoom('shared');
    setGuests(1);
    setDetails(emptyDetails);
    setDiscount(undefined);
    setCodeInput('');
    setCodeError(false);
    setPayInFull(false);
    setError(null);
    setStatus('idle');
  }, [open, firstOpen]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [stepIndex, status]);

  const step: Step = STEPS[stepIndex];
  const q = quote(date, room, guests, discount, { payInFull });
  // Inside the 21-day window the full amount is due anyway: no choice to make.
  const mustPayInFull = quote(date, room, guests).payingInFull;

  const applyCode = () => {
    const found = findDiscount(codeInput);
    setDiscount(found);
    setCodeError(!found && codeInput.trim() !== '');
  };

  const removeCode = () => {
    setDiscount(undefined);
    setCodeInput('');
    setCodeError(false);
  };

  const setDetail = <K extends keyof Details>(key: K, value: Details[K]) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const validate = (): string | null => {
    if (step === 'retreat') return isBookable(date) ? null : t('bookingForm.errors.date');
    if (!details.firstName.trim() || !details.lastName.trim()) return t('enquiryForm.errors.name');
    if (!EMAIL_PATTERN.test(details.email.trim())) return t('enquiryForm.errors.email');
    if (details.phone.replace(/\D/g, '').length < MIN_PHONE_DIGITS) return t('enquiryForm.errors.phone');
    if (!details.level) return t('bookingForm.errors.level');
    if (!details.terms) return t('bookingForm.errors.terms');
    return null;
  };

  const summaryLines = (ref: string) => [
    `${t('bookingForm.whatsappIntro')} (${ref})`,
    '',
    `${formatRange(date, locale)} · ${t(`bookingForm.retreat.rooms.${room}.name`)} · ${guests}`,
    discount ? `${t('bookingForm.summary.discount', { code: discount.code, percent: discount.percent })}: -${gbp(q.discount, locale)}` : '',
    `${t('bookingForm.summary.total')}: ${gbp(q.total, locale)}`,
    `${details.firstName.trim()} ${details.lastName.trim()} · ${details.email.trim()} · ${details.phone.trim()}`,
    details.notes.trim(),
  ];

  const handleSubmit = async () => {
    setStatus('sending');
    const ref = newBookingRef(date);
    const booking = {
      type: 'booking',
      ref,
      destination: 'menorca',
      dateId: date.id,
      dates: formatRange(date, 'en'),
      room,
      guests,
      pricePerPerson: q.pricePerPerson,
      subtotal: q.subtotal,
      discountCode: discount?.code ?? '',
      discountPercent: q.discountPercent,
      discount: q.discount,
      total: q.total,
      payment: q.payingInFull ? 'full' : 'deposit',
      dueNow: q.dueNow,
      balance: q.balance,
      balanceDue: q.balanceDue,
      firstName: details.firstName.trim(),
      lastName: details.lastName.trim(),
      email: details.email.trim(),
      phone: details.phone.trim(),
      level: details.level,
      notes: details.notes.trim(),
      locale,
      submittedAt: new Date().toISOString(),
      source: window.location.pathname,
    };

    // 1. Record the booking (sheet + email to the team) before payment, so a
    //    guest who stops at Stripe can still be followed up.
    let recorded = false;
    if (ENQUIRY_ENDPOINT) {
      try {
        const res = await fetch(ENQUIRY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(booking),
        });
        recorded = res.ok;
      } catch {
        recorded = false;
      }
    }

    // 2. Send the guest to Stripe for the deposit.
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      const data = (await res.json()) as { url?: string };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      /* falls through to the manual follow-up below */
    }

    // 3. No online payment available: the team sends a payment link instead.
    if (recorded) {
      setStatus('requested');
    } else {
      setWaHref(getWhatsAppConciergeUrl(summaryLines(ref).join('\n')));
      setStatus('failed');
    }
  };

  const goNext = () => {
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    if (stepIndex === STEPS.length - 1) void handleSubmit();
    else setStepIndex((i) => i + 1);
  };

  const goBack = () => {
    setError(null);
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const progress = ((stepIndex + (status === 'requested' ? 1 : 0.5)) / STEPS.length) * 100;
  const isLastStep = stepIndex === STEPS.length - 1;
  const payLabel = q.payingInFull
    ? t('bookingForm.payFull', { amount: gbp(q.dueNow, locale) })
    : t('bookingForm.payDeposit', { amount: gbp(q.dueNow, locale) });

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/70 backdrop-blur-sm z-[100]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('bookingForm.title')}
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-xl
                       bg-brand-ivory z-[110] border border-brand-dark/12 rounded-card shadow-2xl
                       flex flex-col max-h-[88vh] overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="flex-shrink-0 px-7 md:px-10 pt-7 pb-5 border-b border-brand-dark/10">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold-deep font-semibold mb-2">
                    {t('bookingForm.eyebrow')}
                  </p>
                  <h2
                    className="text-2xl md:text-3xl font-light text-brand-dark leading-tight"
                    style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                  >
                    {t('bookingForm.title')}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('enquiryForm.close')}
                  className="text-brand-dark/55 hover:text-brand-dark transition-colors p-1.5 -mr-1.5 -mt-1 rounded-md hover:bg-brand-dark/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="h-px w-full bg-brand-dark/10" aria-hidden="true">
                <motion.div
                  className="h-px bg-brand-gold"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* ── Body ── */}
            <div ref={panelRef} className="flex-1 overflow-y-auto px-7 md:px-10 py-8">
              {status === 'requested' ? (
                <div className="py-10 text-center">
                  <div className="w-14 h-14 rounded-full border border-brand-gold/40 bg-brand-gold/10 flex items-center justify-center mx-auto mb-7">
                    <Check className="w-6 h-6 text-brand-gold-deep" />
                  </div>
                  <h3
                    className="text-2xl font-light text-brand-dark mb-4"
                    style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                  >
                    {t('bookingForm.requested.title')}
                  </h3>
                  <p className="text-brand-dark/60 text-sm font-light leading-relaxed max-w-sm mx-auto">
                    {t('bookingForm.requested.body', { amount: gbp(q.dueNow, locale) })}
                  </p>
                </div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <p className="text-brand-dark text-lg md:text-xl font-light leading-snug mb-2">
                    {t(`bookingForm.${step}.question`)}
                  </p>
                  <p className="text-brand-dark/55 text-sm font-light leading-relaxed mb-8">
                    {t(`bookingForm.${step}.help`)}
                  </p>

                  {step === 'retreat' && (
                    <div className="flex flex-col gap-8">
                      <div>
                        <p className={labelClass}>{t('bookingForm.retreat.datesLabel')}</p>
                        <DatePicker value={date} onChange={(d) => { setDate(d); setError(null); }} locale={locale} t={t} />
                      </div>

                      <div>
                        <p className={labelClass}>{t('bookingForm.retreat.roomLabel')}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {ROOM_TYPES.map((value) => {
                            const selected = room === value;
                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => setRoom(value)}
                                aria-pressed={selected}
                                className={`text-left px-5 py-4 rounded-card border transition-all duration-200 ${
                                  selected
                                    ? 'border-brand-gold bg-brand-gold/10'
                                    : 'border-brand-dark/15 hover:border-brand-gold/45'
                                }`}
                              >
                                <span className="flex items-center justify-between gap-3">
                                  <span className="text-brand-dark text-sm font-light tracking-wide">
                                    {t(`bookingForm.retreat.rooms.${value}.name`)}
                                  </span>
                                  {selected && <Check className="w-3.5 h-3.5 text-brand-gold-deep" />}
                                </span>
                                <span
                                  className="block text-brand-gold-deep text-xl mt-1"
                                  style={{ fontFamily: 'var(--font-display)' }}
                                >
                                  {gbp(date.prices[value], locale)}
                                  <span className="text-brand-dark/55 text-xs font-light ml-1.5" style={{ fontFamily: 'inherit' }}>
                                    {t('bookingForm.retreat.perPerson')}
                                  </span>
                                </span>
                                <span className="block text-brand-dark/60 text-xs font-light leading-relaxed mt-2">
                                  {t(`bookingForm.retreat.rooms.${value}.description`)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <p className={labelClass}>{t('bookingForm.retreat.guestsLabel')}</p>
                        <div className="flex items-center gap-5">
                          <button
                            type="button"
                            onClick={() => setGuests((g) => Math.max(1, g - 1))}
                            disabled={guests <= 1}
                            aria-label={t('bookingForm.retreat.fewerGuests')}
                            className="w-10 h-10 rounded-full border border-brand-dark/25 flex items-center justify-center text-brand-dark hover:border-brand-gold disabled:opacity-30 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-brand-dark text-2xl font-light w-6 text-center" aria-live="polite">
                            {guests}
                          </span>
                          <button
                            type="button"
                            onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                            disabled={guests >= MAX_GUESTS}
                            aria-label={t('bookingForm.retreat.moreGuests')}
                            className="w-10 h-10 rounded-full border border-brand-dark/25 flex items-center justify-center text-brand-dark hover:border-brand-gold disabled:opacity-30 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-brand-dark/50 text-xs font-light mt-3">
                          {t('bookingForm.retreat.groupNote', { max: MAX_GUESTS })}
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 'details' && (
                    <div className="flex flex-col gap-7">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                        <div>
                          <label className={labelClass} htmlFor="booking-first-name">
                            {t('enquiryForm.steps.contact.firstName')}
                          </label>
                          <input
                            id="booking-first-name"
                            type="text"
                            autoComplete="given-name"
                            value={details.firstName}
                            onChange={(e) => setDetail('firstName', e.target.value)}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="booking-last-name">
                            {t('enquiryForm.steps.contact.lastName')}
                          </label>
                          <input
                            id="booking-last-name"
                            type="text"
                            autoComplete="family-name"
                            value={details.lastName}
                            onChange={(e) => setDetail('lastName', e.target.value)}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="booking-email">
                          {t('enquiryForm.steps.contact.email')}
                        </label>
                        <input
                          id="booking-email"
                          type="email"
                          autoComplete="email"
                          value={details.email}
                          onChange={(e) => setDetail('email', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="booking-phone">
                          {t('enquiryForm.steps.contact.phone')}
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          autoComplete="tel"
                          value={details.phone}
                          onChange={(e) => setDetail('phone', e.target.value)}
                          placeholder={t('enquiryForm.steps.contact.phonePlaceholder')}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <p className={labelClass}>{t('bookingForm.details.levelLabel')}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {LEVELS.map((value) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setDetail('level', value)}
                              aria-pressed={details.level === value}
                              className={`px-3 py-3 rounded-card border text-sm font-light transition-all duration-200 ${
                                details.level === value
                                  ? 'border-brand-gold bg-brand-gold/10 text-brand-dark'
                                  : 'border-brand-dark/15 text-brand-dark/75 hover:border-brand-gold/45 hover:text-brand-dark'
                              }`}
                            >
                              {t(`bookingForm.details.levels.${value}`)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="booking-notes">
                          {t('bookingForm.details.notesLabel')}
                        </label>
                        <textarea
                          id="booking-notes"
                          rows={3}
                          value={details.notes}
                          onChange={(e) => setDetail('notes', e.target.value)}
                          placeholder={t('bookingForm.details.notesPlaceholder')}
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={details.terms}
                          onChange={(e) => setDetail('terms', e.target.checked)}
                          className="mt-0.5 w-4 h-4 accent-brand-gold flex-shrink-0"
                        />
                        <span className="text-brand-dark/60 text-xs font-light leading-relaxed group-hover:text-brand-dark/75 transition-colors">
                          {t('bookingForm.details.termsBefore')}{' '}
                          <a
                            href="/legal/terms-and-conditions"
                            target="_blank"
                            rel="noopener"
                            className="text-brand-gold-deep underline underline-offset-2"
                          >
                            {t('bookingForm.details.termsLink')}
                          </a>{' '}
                          {t('bookingForm.details.termsMiddle')}{' '}
                          <a
                            href="/legal/privacy-policy"
                            target="_blank"
                            rel="noopener"
                            className="text-brand-gold-deep underline underline-offset-2"
                          >
                            {t('bookingForm.details.privacyLink')}
                          </a>
                          .
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Price summary, on both steps */}
                  <div className="mt-9 rounded-card border border-brand-dark/12 bg-white p-5">
                    <p className="text-brand-dark text-sm font-light mb-4">
                      {formatRange(date, locale)} · {t(`bookingForm.retreat.rooms.${room}.name`)} ·{' '}
                      {t('bookingForm.summary.guests', { count: guests })}
                    </p>

                    {!mustPayInFull && (
                      <fieldset className="mb-5">
                        <legend className={labelClass}>{t('bookingForm.payment.label')}</legend>
                        <div className="grid grid-cols-2 gap-2.5">
                          {([false, true] as const).map((full) => {
                            const selected = payInFull === full;
                            return (
                              <button
                                key={String(full)}
                                type="button"
                                onClick={() => setPayInFull(full)}
                                aria-pressed={selected}
                                className={`text-left px-4 py-3 rounded-card border transition-all duration-200 ${
                                  selected
                                    ? 'border-brand-gold bg-brand-gold/10'
                                    : 'border-brand-dark/15 hover:border-brand-gold/45'
                                }`}
                              >
                                <span className="flex items-center justify-between gap-2 text-brand-dark text-sm font-light">
                                  {t(full ? 'bookingForm.payment.full' : 'bookingForm.payment.deposit')}
                                  {selected && <Check className="w-3.5 h-3.5 text-brand-gold-deep flex-shrink-0" />}
                                </span>
                                <span className="block text-brand-dark/60 text-xs font-light leading-relaxed mt-1">
                                  {full
                                    ? t('bookingForm.payment.fullNote', { amount: gbp(q.total, locale) })
                                    : t('bookingForm.payment.depositNote', {
                                        amount: gbp(DEPOSIT_PER_PERSON * guests, locale),
                                      })}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                    )}
                    <dl className="flex flex-col gap-2 text-sm font-light">
                      {discount && (
                        <>
                          <div className="flex justify-between gap-4 text-brand-dark/55">
                            <dt>{t('bookingForm.summary.subtotal')}</dt>
                            <dd className="line-through">{gbp(q.subtotal, locale)}</dd>
                          </div>
                          <div className="flex justify-between gap-4 text-brand-gold-deep">
                            <dt>
                              {t('bookingForm.summary.discount', { code: discount.code, percent: discount.percent })}
                            </dt>
                            <dd>−{gbp(q.discount, locale)}</dd>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between gap-4 text-brand-dark/65">
                        <dt>{t('bookingForm.summary.total')}</dt>
                        <dd>{gbp(q.total, locale)}</dd>
                      </div>
                      <div className="flex justify-between gap-4 text-brand-dark">
                        <dt>{q.payingInFull ? t('bookingForm.summary.dueNowFull') : t('bookingForm.summary.dueNow')}</dt>
                        <dd className="text-brand-gold-deep">{gbp(q.dueNow, locale)}</dd>
                      </div>
                      {!q.payingInFull && (
                        <div className="flex justify-between gap-4 text-brand-dark/55 text-xs">
                          <dt>
                            {t('bookingForm.summary.balance', {
                              date: formatDate(q.balanceDue, locale, { day: 'numeric', month: 'long', year: 'numeric' }),
                            })}
                          </dt>
                          <dd>{gbp(q.balance, locale)}</dd>
                        </div>
                      )}
                    </dl>

                    {/* Discount code */}
                    <div className="mt-5 pt-5 border-t border-brand-dark/10">
                      <label className={labelClass} htmlFor="booking-discount">
                        {t('bookingForm.discount.label')}
                      </label>
                      {discount ? (
                        <div className="flex items-center justify-between gap-4">
                          <p className="flex items-center gap-2 text-sm font-light text-brand-dark">
                            <Check className="w-4 h-4 text-brand-gold-deep flex-shrink-0" />
                            <span>
                              <span className="text-brand-gold-deep">{discount.code}</span>{' '}
                              <span className="text-brand-dark/65">
                                {t('bookingForm.discount.applied', { percent: discount.percent })}
                              </span>
                            </span>
                          </p>
                          <button
                            type="button"
                            onClick={removeCode}
                            className="text-[10px] uppercase tracking-[0.22em] font-semibold text-brand-dark/50 hover:text-brand-dark/85 transition-colors"
                          >
                            {t('bookingForm.discount.remove')}
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-end gap-3">
                            <input
                              id="booking-discount"
                              type="text"
                              autoComplete="off"
                              autoCapitalize="characters"
                              spellCheck={false}
                              value={codeInput}
                              onChange={(e) => {
                                setCodeInput(e.target.value);
                                setCodeError(false);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  applyCode();
                                }
                              }}
                              placeholder={t('bookingForm.discount.placeholder')}
                              aria-invalid={codeError}
                              aria-describedby={codeError ? 'booking-discount-error' : undefined}
                              className={`${inputClass} uppercase placeholder:normal-case`}
                            />
                            <button
                              type="button"
                              onClick={applyCode}
                              disabled={!codeInput.trim()}
                              className="flex-shrink-0 px-4 py-2 rounded-full border border-brand-gold/60 text-brand-gold-deep text-[10px] uppercase tracking-[0.22em] font-semibold hover:bg-brand-gold hover:text-brand-dark disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            >
                              {t('bookingForm.discount.apply')}
                            </button>
                          </div>
                          {codeError && (
                            <p id="booking-discount-error" role="alert" className="text-brand-gold-deep text-xs font-light mt-3">
                              {t('bookingForm.discount.invalid')}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <p role="alert" className="text-brand-gold-deep text-xs font-light mt-6">
                  {error}
                </p>
              )}

              {status === 'failed' && (
                <div role="alert" className="mt-6 rounded-card border border-brand-gold/30 bg-brand-gold/5 p-5">
                  <p className="text-brand-gold-deep text-xs font-light leading-relaxed mb-4">
                    {t('bookingForm.errors.submit')}
                  </p>
                  {waHref && (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury group inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      {t('enquiryForm.errors.submitWhatsapp')}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* ── Footer ── */}
            {status !== 'requested' && (
              <div className="flex-shrink-0 px-7 md:px-10 py-5 border-t border-brand-dark/10 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-semibold
                             text-brand-dark/50 hover:text-brand-dark/85 disabled:opacity-0 disabled:pointer-events-none
                             transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {t('enquiryForm.back')}
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={status === 'sending'}
                  className="btn-luxury group disabled:opacity-60 disabled:pointer-events-none"
                >
                  {status === 'sending' ? t('bookingForm.redirecting') : isLastStep ? payLabel : t('enquiryForm.next')}
                  {status !== 'sending' && (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* ─── Trigger button ──────────────────────────────────────── */

interface BookingCtaProps {
  locale?: Locale;
  label?: string;
  className?: string;
}

export default function BookingCta({ locale, label, className = '' }: BookingCtaProps) {
  const { t } = usePageTranslation(locale);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`btn-luxury btn-luxury-gold group ${className}`}>
        {label ?? t('bookingForm.trigger')}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
      <BookingFormModal open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}
