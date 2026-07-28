/**
 * Where retreat enquiries are sent.
 *
 * Set `PUBLIC_ENQUIRY_ENDPOINT` in `.env` to any form backend that accepts a
 * JSON POST (Formspree, Getform, Basin, an n8n/Zapier webhook, an internal API
 * route…). The enquiry form posts its answers there as JSON.
 *
 * While the variable is empty the form falls back to opening the visitor's mail
 * client with the enquiry pre-written, so no enquiry is ever silently lost.
 */
export const ENQUIRY_ENDPOINT: string = import.meta.env.PUBLIC_ENQUIRY_ENDPOINT ?? '';

/** Mailbox used by the fallback while no endpoint is configured. */
export const ENQUIRY_FALLBACK_EMAIL = 'executive@courtsidepadel.com';
