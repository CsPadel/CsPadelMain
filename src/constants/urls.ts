export const MENORCA_URL = 'https://menorca.cspadel.com/';

export const SOCIAL_URLS = {
  instagram: 'https://www.instagram.com/padelcourtside/',
  linkedin: 'https://www.linkedin.com/company/https-cspadel.com-/',
} as const;

export const WHATSAPP_CONCIERGE_NUMBER = '447786694723';

export function getWhatsAppConciergeUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_CONCIERGE_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

const RETREAT_URLS: Record<string, string> = {
  menorca: MENORCA_URL,
  eastSussex: '/east-sussex',
  bali: '/bali',
  dubai: '/dubai',
  mykonos: '/upcoming-retreats',
};

export function getRetreatUrl(retreat: string): string {
  return RETREAT_URLS[retreat] ?? `/${retreat}`;
}
