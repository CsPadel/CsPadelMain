export const MENORCA_URL = 'https://menorca.cspadel.com/';

const RETREAT_URLS: Record<string, string> = {
  menorca: MENORCA_URL,
  bali: '/bali',
  dubai: '/dubai',
};

export function getRetreatUrl(retreat: string): string {
  return RETREAT_URLS[retreat] ?? `/${retreat}`;
}
