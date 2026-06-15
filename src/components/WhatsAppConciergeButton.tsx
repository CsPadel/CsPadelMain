import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import '../i18n/config';
import { getWhatsAppConciergeUrl } from '../constants/urls';
import { getCookieConsent } from '../lib/cookieConsent';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';

interface WhatsAppConciergeButtonProps {
  locale?: Locale;
}

export default function WhatsAppConciergeButton({ locale: localeProp }: WhatsAppConciergeButtonProps) {
  const { t } = usePageTranslation(localeProp);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    const syncCookieBanner = () => {
      setCookieBannerVisible(getCookieConsent() === null);
    };

    syncCookieBanner();
    window.addEventListener('cookie-consent-change', syncCookieBanner);
    return () => window.removeEventListener('cookie-consent-change', syncCookieBanner);
  }, []);

  const href = getWhatsAppConciergeUrl(t('whatsappConcierge.prefillMessage'));

  return (
    <div
      className={`fixed right-6 z-55 transition-all duration-300 ${
        cookieBannerVisible ? 'bottom-28 md:bottom-32' : 'bottom-6'
      }`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('whatsappConcierge.ariaLabel')}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-brand-gold bg-brand-dark-2 text-brand-gold shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 hover:border-brand-gold-light hover:text-brand-gold-light hover:shadow-[0_0_24px_rgba(217,173,98,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
      >
        <MessageCircle size={26} strokeWidth={1.75} aria-hidden="true" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-button border border-brand-gold/40 bg-brand-dark-2/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          {t('whatsappConcierge.label')}
        </span>
      </a>
    </div>
  );
}
