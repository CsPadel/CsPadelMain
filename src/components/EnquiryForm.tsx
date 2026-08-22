import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { ENQUIRY_ENDPOINT, ENQUIRY_FALLBACK_EMAIL } from '../constants/forms';

/* ─── Option values ───────────────────────────────────────────
   Values are stable English keys so the submitted payload reads the
   same whatever language the visitor used. Labels come from i18n.   */

const DESTINATIONS = ['menorca', 'bali', 'dubai', 'undecided'] as const;

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
  'flexible',
] as const;

const YEARS = ['2026', '2027', '2028'] as const;

const PRIORITIES = [
  'coaching', 'matchplay', 'wellness', 'dining',
  'boatAndSea', 'culture', 'celebration', 'corporate',
] as const;

const STEPS = ['destination', 'dates', 'group', 'priorities', 'contact'] as const;
type Step = (typeof STEPS)[number];

interface Answers {
  destination: string;
  month: string;
  year: string;
  groupSize: string;
  priorities: string[];
  notes: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
}

const emptyAnswers: Answers = {
  destination: '',
  month: '',
  year: '',
  groupSize: '',
  priorities: [],
  notes: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ─── Shared field styles ─────────────────────────────────── */

const inputClass =
  'w-full bg-transparent border-b border-white/18 pb-3 text-white text-base font-light ' +
  'focus:outline-none focus:border-brand-gold transition-colors placeholder:text-white/25';

const labelClass =
  'block text-[9px] uppercase tracking-[0.28em] text-white/40 mb-3 font-semibold';

/* ─── Choice chip ─────────────────────────────────────────── */

function Choice({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center justify-between gap-3 px-5 py-3.5 rounded-card border text-left text-sm font-light tracking-wide transition-all duration-200 ${
        selected
          ? 'border-brand-gold bg-brand-gold/10 text-white'
          : 'border-white/12 text-white/70 hover:border-brand-gold/45 hover:text-white'
      }`}
    >
      <span>{label}</span>
      {selected && <Check className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />}
    </button>
  );
}

/* ─── Modal ───────────────────────────────────────────────── */

interface EnquiryFormModalProps {
  open: boolean;
  onClose: () => void;
  locale?: Locale;
  /** Pre-selects a destination, e.g. when opened from a destination page. */
  destination?: (typeof DESTINATIONS)[number];
}

export function EnquiryFormModal({
  open,
  onClose,
  locale: localeProp,
  destination,
}: EnquiryFormModalProps) {
  const { t } = usePageTranslation(localeProp);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Portal target only exists client-side; avoids SSR mismatch. */
  useEffect(() => {
    setMounted(true);
  }, []);

  const step: Step = STEPS[stepIndex];

  /* Reset whenever the modal is reopened */
  useEffect(() => {
    if (!open) return;
    setStepIndex(0);
    setAnswers({ ...emptyAnswers, destination: destination ?? '' });
    setError(null);
    setStatus('idle');
  }, [open, destination]);

  /* Lock body scroll + close on Escape */
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

  /* Scroll the panel back to the top on every step change */
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [stepIndex, status]);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const togglePriority = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(value)
        ? prev.priorities.filter((p) => p !== value)
        : [...prev.priorities, value],
    }));
    setError(null);
  };

  /** Returns an error message when the current step is incomplete. */
  const validate = (): string | null => {
    switch (step) {
      case 'destination':
        return answers.destination ? null : t('enquiryForm.errors.destination');
      case 'dates':
        return answers.month && answers.year ? null : t('enquiryForm.errors.dates');
      case 'group': {
        const size = Number(answers.groupSize);
        if (!answers.groupSize || Number.isNaN(size) || size < 1) {
          return t('enquiryForm.errors.group');
        }
        return null;
      }
      case 'priorities':
        return null; // entirely optional
      case 'contact':
        if (!answers.firstName.trim() || !answers.lastName.trim()) {
          return t('enquiryForm.errors.name');
        }
        if (!EMAIL_PATTERN.test(answers.email.trim())) {
          return t('enquiryForm.errors.email');
        }
        if (!answers.consent) return t('enquiryForm.errors.consent');
        return null;
    }
  };

  const buildPayload = () => ({
    destination: answers.destination,
    month: answers.month,
    year: answers.year,
    groupSize: answers.groupSize,
    priorities: answers.priorities,
    notes: answers.notes.trim(),
    firstName: answers.firstName.trim(),
    lastName: answers.lastName.trim(),
    email: answers.email.trim(),
    phone: answers.phone.trim(),
    locale: localeProp ?? 'en',
    submittedAt: new Date().toISOString(),
    source: typeof window !== 'undefined' ? window.location.pathname : '',
  });

  /** Opens the visitor's mail client with the enquiry pre-written. */
  const sendByEmail = (payload: ReturnType<typeof buildPayload>) => {
    const lines = [
      `${t('enquiryForm.steps.contact.firstName')}: ${payload.firstName} ${payload.lastName}`,
      `${t('enquiryForm.steps.contact.email')}: ${payload.email}`,
      `${t('enquiryForm.steps.contact.phone')}: ${payload.phone || '–'}`,
      '',
      `${t('enquiryForm.steps.destination.question')} ${t(`enquiryForm.steps.destination.options.${payload.destination}`)}`,
      `${t('enquiryForm.steps.dates.question')} ${t(`enquiryForm.steps.dates.months.${payload.month}`)} ${payload.year}`,
      `${t('enquiryForm.steps.group.question')} ${payload.groupSize}`,
      `${t('enquiryForm.steps.priorities.question')} ${
        payload.priorities
          .map((p) => t(`enquiryForm.steps.priorities.options.${p}`))
          .join(', ') || '–'
      }`,
      '',
      payload.notes,
    ];

    const href =
      `mailto:${ENQUIRY_FALLBACK_EMAIL}` +
      `?subject=${encodeURIComponent(t('enquiryForm.emailSubject'))}` +
      `&body=${encodeURIComponent(lines.join('\n'))}`;

    window.location.href = href;
  };

  const handleSubmit = async () => {
    const payload = buildPayload();
    setStatus('sending');

    if (!ENQUIRY_ENDPOINT) {
      sendByEmail(payload);
      setStatus('sent');
      return;
    }

    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        // text/plain keeps this a "simple" request. Google Apps Script web apps
        // never answer the CORS preflight an application/json POST would
        // trigger; the body is still JSON and is parsed as such server-side.
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Enquiry endpoint responded ${res.status}`);
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  const goNext = () => {
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    if (stepIndex === STEPS.length - 1) {
      void handleSubmit();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const goBack = () => {
    setError(null);
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const progress = useMemo(
    () => ((stepIndex + (status === 'sent' ? 1 : 0)) / STEPS.length) * 100,
    [stepIndex, status],
  );

  const isLastStep = stepIndex === STEPS.length - 1;

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
            className="fixed inset-0 bg-brand-dark/85 backdrop-blur-sm z-[100]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('enquiryForm.title')}
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-xl
                       bg-brand-dark-2 z-[110] border border-white/10 rounded-card shadow-2xl
                       flex flex-col max-h-[88vh] overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="flex-shrink-0 px-7 md:px-10 pt-7 pb-5 border-b border-white/8">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold mb-2">
                    {t('enquiryForm.eyebrow')}
                  </p>
                  <h2
                    className="text-2xl md:text-3xl font-light text-white leading-tight"
                    style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                  >
                    {t('enquiryForm.title')}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('enquiryForm.close')}
                  className="text-white/40 hover:text-white transition-colors p-1.5 -mr-1.5 -mt-1 rounded-md hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-px w-full bg-white/10" aria-hidden="true">
                <motion.div
                  className="h-px bg-brand-gold"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* ── Body ── */}
            <div ref={panelRef} className="flex-1 overflow-y-auto px-7 md:px-10 py-8">
              {status === 'sent' ? (
                <div className="py-10 text-center">
                  <div className="w-14 h-14 rounded-full border border-brand-gold/40 bg-brand-gold/10 flex items-center justify-center mx-auto mb-7">
                    <Check className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3
                    className="text-2xl font-light text-white mb-4"
                    style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                  >
                    {t('enquiryForm.success.title')}
                  </h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm mx-auto">
                    {t('enquiryForm.success.body')}
                  </p>
                </div>
              ) : (
                /* Keyed so each step remounts and plays its enter animation.
                   Deliberately no exit animation: an unfinished exit would keep
                   the previous step mounted and out of sync with the footer. */
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    <p className="text-white text-lg md:text-xl font-light leading-snug mb-2">
                      {t(`enquiryForm.steps.${step}.question`)}
                    </p>
                    <p className="text-white/40 text-sm font-light leading-relaxed mb-8">
                      {t(`enquiryForm.steps.${step}.help`)}
                    </p>

                    {/* ── Step 1: destination ── */}
                    {step === 'destination' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {DESTINATIONS.map((value) => (
                          <Choice
                            key={value}
                            label={t(`enquiryForm.steps.destination.options.${value}`)}
                            selected={answers.destination === value}
                            onClick={() => set('destination', value)}
                          />
                        ))}
                      </div>
                    )}

                    {/* ── Step 2: dates ── */}
                    {step === 'dates' && (
                      <div className="flex flex-col gap-8">
                        <div>
                          <p className={labelClass}>{t('enquiryForm.steps.dates.monthLabel')}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {MONTHS.map((value) => (
                              <Choice
                                key={value}
                                label={t(`enquiryForm.steps.dates.months.${value}`)}
                                selected={answers.month === value}
                                onClick={() => set('month', value)}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className={labelClass}>{t('enquiryForm.steps.dates.yearLabel')}</p>
                          <div className="grid grid-cols-3 gap-2">
                            {YEARS.map((value) => (
                              <Choice
                                key={value}
                                label={value}
                                selected={answers.year === value}
                                onClick={() => set('year', value)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── Step 3: group size ── */}
                    {step === 'group' && (
                      <div>
                        <label className={labelClass} htmlFor="enquiry-group-size">
                          {t('enquiryForm.steps.group.label')}
                        </label>
                        <input
                          id="enquiry-group-size"
                          type="number"
                          inputMode="numeric"
                          min={1}
                          value={answers.groupSize}
                          onChange={(e) => set('groupSize', e.target.value)}
                          placeholder={t('enquiryForm.steps.group.placeholder')}
                          className={inputClass}
                        />
                        <p className="text-white/30 text-xs font-light mt-4 leading-relaxed">
                          {t('enquiryForm.steps.group.note')}
                        </p>
                      </div>
                    )}

                    {/* ── Step 4: priorities ── */}
                    {step === 'priorities' && (
                      <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {PRIORITIES.map((value) => (
                            <Choice
                              key={value}
                              label={t(`enquiryForm.steps.priorities.options.${value}`)}
                              selected={answers.priorities.includes(value)}
                              onClick={() => togglePriority(value)}
                            />
                          ))}
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="enquiry-notes">
                            {t('enquiryForm.steps.priorities.notesLabel')}
                          </label>
                          <textarea
                            id="enquiry-notes"
                            rows={3}
                            value={answers.notes}
                            onChange={(e) => set('notes', e.target.value)}
                            placeholder={t('enquiryForm.steps.priorities.notesPlaceholder')}
                            className={`${inputClass} resize-none`}
                          />
                        </div>
                      </div>
                    )}

                    {/* ── Step 5: contact ── */}
                    {step === 'contact' && (
                      <div className="flex flex-col gap-7">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                          <div>
                            <label className={labelClass} htmlFor="enquiry-first-name">
                              {t('enquiryForm.steps.contact.firstName')}
                            </label>
                            <input
                              id="enquiry-first-name"
                              type="text"
                              autoComplete="given-name"
                              value={answers.firstName}
                              onChange={(e) => set('firstName', e.target.value)}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass} htmlFor="enquiry-last-name">
                              {t('enquiryForm.steps.contact.lastName')}
                            </label>
                            <input
                              id="enquiry-last-name"
                              type="text"
                              autoComplete="family-name"
                              value={answers.lastName}
                              onChange={(e) => set('lastName', e.target.value)}
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="enquiry-email">
                            {t('enquiryForm.steps.contact.email')}
                          </label>
                          <input
                            id="enquiry-email"
                            type="email"
                            autoComplete="email"
                            value={answers.email}
                            onChange={(e) => set('email', e.target.value)}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="enquiry-phone">
                            {t('enquiryForm.steps.contact.phone')}
                          </label>
                          <input
                            id="enquiry-phone"
                            type="tel"
                            autoComplete="tel"
                            value={answers.phone}
                            onChange={(e) => set('phone', e.target.value)}
                            placeholder={t('enquiryForm.steps.contact.phoneOptional')}
                            className={inputClass}
                          />
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={answers.consent}
                            onChange={(e) => set('consent', e.target.checked)}
                            className="mt-1 w-4 h-4 flex-shrink-0 accent-[#D9AD62]"
                          />
                          <span className="text-white/45 text-xs font-light leading-relaxed group-hover:text-white/65 transition-colors">
                            {t('enquiryForm.steps.contact.consent')}
                          </span>
                        </label>
                      </div>
                    )}
                </motion.div>
              )}

              {error && (
                <p role="alert" className="text-brand-gold text-xs font-light mt-6">
                  {error}
                </p>
              )}

              {status === 'failed' && (
                <p role="alert" className="text-brand-gold text-xs font-light mt-6">
                  {t('enquiryForm.errors.submit')}
                </p>
              )}
            </div>

            {/* ── Footer ── */}
            {status !== 'sent' && (
              <div className="flex-shrink-0 px-7 md:px-10 py-5 border-t border-white/8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-semibold
                             text-white/35 hover:text-white/75 disabled:opacity-0 disabled:pointer-events-none
                             transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {t('enquiryForm.back')}
                </button>

                <div className="flex items-center gap-5">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-white/25 hidden sm:block">
                    {stepIndex + 1} / {STEPS.length}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={status === 'sending'}
                    className="btn-luxury group disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {status === 'sending'
                      ? t('enquiryForm.sending')
                      : isLastStep
                        ? t('enquiryForm.submit')
                        : t('enquiryForm.next')}
                    {status !== 'sending' && (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ─── Trigger button ──────────────────────────────────────── */

interface EnquiryCtaProps {
  locale?: Locale;
  /** Overrides the default "Enquire About a Retreat" label. */
  label?: string;
  /** `link` renders the understated footer-style CTA instead of a filled button. */
  variant?: 'button' | 'link';
  destination?: (typeof DESTINATIONS)[number];
  className?: string;
}

export default function EnquiryCta({
  locale,
  label,
  variant = 'button',
  destination,
  className = '',
}: EnquiryCtaProps) {
  const { t } = usePageTranslation(locale);
  const [open, setOpen] = useState(false);
  const text = label ?? t('enquiryForm.triggerLabel');

  return (
    <>
      {variant === 'link' ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`inline-flex items-center gap-2 group ${className}`}
        >
          <span className="text-[9px] uppercase tracking-[0.32em] font-semibold text-white/30 group-hover:text-brand-gold transition-colors duration-200">
            {text}
          </span>
          <ArrowRight className="w-3 h-3 text-white/25 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all duration-200" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`btn-luxury group ${className}`}
        >
          {text}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      )}

      <EnquiryFormModal
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        destination={destination}
      />
    </>
  );
}
