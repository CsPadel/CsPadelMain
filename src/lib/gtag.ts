// ─── Google Ads / gtag helper ─────────────────────────────────────────────────
// Replace the two constants below with your real Google Ads values.
// You can find them in Google Ads → Tools → Conversions → select your conversion → Tag details.

/** Your Google Ads account ID, e.g. "AW-123456789" */
export const GA_ADS_ID = 'AW-18206970630';

/** The conversion label for WhatsApp click-throughs */
export const WA_CONVERSION_LABEL = 'Y0sOCK_27rccEIam4elD';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]): void;
}

/**
 * Fires a Google Ads conversion event for a WhatsApp button click.
 * Safe to call even if gtag is not yet loaded (will no-op gracefully).
 */
export function trackWhatsAppClick(): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: `${GA_ADS_ID}/${WA_CONVERSION_LABEL}`,
    value: 1.0,
    currency: 'USD',
  });
}
