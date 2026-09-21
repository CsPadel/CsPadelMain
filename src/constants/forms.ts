/**
 * Where retreat enquiries are sent.
 *
 * Set `PUBLIC_ENQUIRY_ENDPOINT` in `.env` to any form backend that accepts a
 * JSON POST (Formspree, Getform, Basin, an n8n/Zapier webhook, an internal API
 * route…). The enquiry form posts its answers there as JSON.
 *
 * If the variable is empty, or the POST fails, the form hands the visitor a
 * WhatsApp link with the enquiry already written out. It used to fall back to
 * a `mailto:` instead, which silently did nothing for anyone without a mail
 * client configured — so the enquiry was lost exactly when the backend was
 * already failing. Nothing on this site opens a mail client any more.
 */
export const ENQUIRY_ENDPOINT: string = import.meta.env.PUBLIC_ENQUIRY_ENDPOINT ?? '';

/**
 * Mailbox that receives retreat and corporate enquiries.
 *
 * Shown as text on the legal pages, where the GDPR and the package travel
 * rules require a stated contact for the controller and the organiser. It is
 * deliberately never rendered as a `mailto:` link.
 */
export const ENQUIRY_EMAIL = 'awatelet@cspadel.com';
