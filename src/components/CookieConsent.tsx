import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../i18n/config';
import { getCookieConsent, setCookieConsent } from '../lib/cookieConsent';

import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { useLocalizedHref } from '../i18n/useLocale';

interface CookieConsentProps {
  locale?: Locale;
}

export default function CookieConsent({ locale: localeProp }: CookieConsentProps) {
  const { t } = usePageTranslation(localeProp);
  const localizedHref = useLocalizedHref(localeProp);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  const handleChoice = (status: 'accepted' | 'rejected') => {
    setCookieConsent(status);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          aria-live="polite"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[60] border-t border-brand-gold/60 bg-brand-dark-2/95 backdrop-blur-md px-6 py-5 md:px-12 md:py-6 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10">
            <div className="flex-1">
              <p
                id="cookie-consent-title"
                className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-2"
              >
                {t('cookieConsent.title')}
              </p>
              <p
                id="cookie-consent-description"
                className="text-brand-light/75 text-sm leading-relaxed"
              >
                {t('cookieConsent.description')}{' '}
                <a
                  href={localizedHref('/cookies')}
                  className="text-brand-gold underline underline-offset-4 hover:text-brand-gold-light transition-colors"
                >
                  {t('cookieConsent.policyLink')}
                </a>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleChoice('rejected')}
                className="btn-consent w-full sm:w-auto"
              >
                {t('cookieConsent.reject')}
              </button>
              <button
                type="button"
                onClick={() => handleChoice('accepted')}
                className="btn-consent w-full sm:w-auto"
              >
                {t('cookieConsent.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
