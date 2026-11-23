/**
 * Courtside Padel – Retreat enquiry form backend.
 *
 * Receives the JSON posted by the multi-step enquiry modal
 * (src/components/EnquiryForm.tsx), writes it to a Google Sheet, and fires two
 * Brevo emails: an internal new-lead notification and a confirmation to the
 * visitor in their own language.
 *
 * The new-lead notification must never be lost: if Brevo rejects it (bad key,
 * blocked IP – Apps Script's outgoing IPs change constantly – unverified
 * sender) or Brevo isn't configured, it is sent again through the Google
 * account that owns this script (MailApp), with the failure reason attached.
 *
 * Setup:
 * 1. Open the Google Sheet → Extensions → Apps Script.
 * 2. Replace the default code with this file's contents.
 * 3. Project Settings → Script Properties → add:
 *      BREVO_API_KEY        (from Brevo → SMTP & API → API Keys)
 *      BREVO_SENDER_EMAIL   (must be a verified sender in Brevo, e.g. awatelet@cspadel.com)
 *      OWNER_EMAIL          (where new-lead notifications are sent)
 *      BREVO_LIST_ID        (optional – numeric ID from Brevo → Contacts → Lists)
 *      SHEET_ID             (optional – only needed if the script is NOT bound
 *                            to the sheet, i.e. created standalone)
 *      PAYMENT_WEBHOOK_SECRET (the same long random text as in Vercel; lets the
 *                            website's Stripe webhook report paid bookings)
 * 4. Deploy → New deployment → Web app.
 *      Execute as: Me
 *      Who has access: Anyone
 * 5. Copy the resulting /exec URL into the site's .env as PUBLIC_ENQUIRY_ENDPOINT.
 *
 * Note: the site posts with Content-Type text/plain on purpose. Apps Script web
 * apps don't answer CORS preflight requests, so an application/json POST from
 * the browser would be blocked before it ever reaches doPost. The body is still
 * JSON and is parsed the same way here.
 */

const SHEET_NAME = 'Enquiries';
const HEADERS = [
  'Timestamp', 'First Name', 'Last Name', 'Email', 'Phone',
  'Destination', 'Month', 'Year', 'Group Size', 'Priorities', 'Notes',
  'Language', 'Source Page',
];

// Menorca bookings from the "Book your spot" modal (src/components/BookingForm.tsx)
// land in their own tab. They are recorded just before the guest is sent to
// Stripe, so a row means "checkout started": confirm the payment in Stripe.
const BOOKINGS_SHEET_NAME = 'Bookings';
const BOOKING_HEADERS = [
  'Timestamp', 'Booking Ref', 'Status', 'First Name', 'Last Name', 'Email', 'Phone',
  'Retreat', 'Dates', 'Room', 'Guests', 'Price per Person (£)', 'Discount Code',
  'Discount (£)', 'Retreat Total (£)',
  'Due at Booking (£)', 'Balance (£)', 'Balance Due', 'Padel Level', 'Notes',
  'Language', 'Source Page',
];

function isBooking(data) {
  return data.type === 'booking';
}

// Paid bookings: the website's Stripe webhook (api/stripe-webhook.ts) posts
// each successful payment here. Every payment gets a row in "Payments", which
// is also how a webhook retry is recognised and skipped.
const PAYMENTS_SHEET_NAME = 'Payments';
const PAYMENT_HEADERS = [
  'Paid At', 'Booking Ref', 'Payment', 'Amount Paid (£)', 'First Name', 'Last Name', 'Email', 'Phone',
  'Dates', 'Room', 'Guests', 'Retreat Total (£)', 'Discount Code', 'Balance Left (£)', 'Balance Due',
  'Language', 'Stripe Session', 'Stripe Payment',
];

function isPayment(data) {
  return data.type === 'payment';
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (isPayment(data)) return jsonResponse(handlePayment(data));
    if (isBooking(data)) appendBookingToSheet(data);
    else appendToSheet(data);
    notifyBrevo(data);
    return jsonResponse({ status: 'success' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: String(err) });
  }
}

/** Lets you confirm the deployment is live by opening the /exec URL in a browser. */
function doGet() {
  return jsonResponse({ status: 'ok', service: 'Courtside Padel enquiry form' });
}

/**
 * Manual test – runs the exact same path as a real form submission, without
 * needing the website. In the Apps Script editor, pick "runTestSubmission"
 * from the function dropdown (top toolbar, next to ▷ Run) and click Run.
 * Check View → Logs (or Executions in the left sidebar) for the result.
 * Change TEST_EMAIL below before running if you don't want it landing in
 * this inbox.
 */
function runTestSubmission() {
  const TEST_EMAIL = 'hansalazar04@gmail.com';
  const id = Math.floor(Math.random() * 10000);
  const fakeData = {
    firstName: 'Test',
    lastName: 'User ' + id,
    email: TEST_EMAIL,
    phone: '+34600' + (100000 + id),
    destination: 'eastSussex',
    month: 'june',
    year: '2027',
    groupSize: '4',
    priorities: ['coaching', 'dining', 'boatAndSea'],
    notes: 'Test enquiry – please ignore.',
    locale: 'es',
    submittedAt: new Date().toISOString(),
    source: '/es/upcoming-retreats',
  };
  const fakeEvent = { postData: { contents: JSON.stringify(fakeData) } };
  const result = doPost(fakeEvent);
  Logger.log('runTestSubmission result: ' + result.getContent());
}

/**
 * Sends only the Google backup notification to OWNER_EMAIL. Run it once from
 * the editor after pasting this version: it asks for the "send email as you"
 * permission MailApp needs, and proves the backup path reaches the inbox.
 */
function testOwnerFallback() {
  const ownerEmail = PropertiesService.getScriptProperties().getProperty('OWNER_EMAIL') || 'awatelet@cspadel.com';
  sendOwnerFallback(ownerEmail, {
    firstName: 'Test',
    lastName: 'Backup',
    email: 'hansalazar04@gmail.com',
    destination: 'menorca',
    notes: 'Test of the Google backup notification – please ignore.',
    locale: 'en',
  }, 'Manual test from testOwnerFallback().');
  Logger.log('Backup notification sent to ' + ownerEmail + ' (MailApp quota left today: ' + MailApp.getRemainingDailyQuota() + ')');
}

/**
 * Diagnostic – run this from the editor's function dropdown to see which
 * Script Properties are set. Emails silently don't go out when BREVO_API_KEY
 * is missing, so this is the first thing to check if rows land in the sheet
 * but no mail arrives. Only reports presence, never prints the key itself.
 */
function checkConfig() {
  const props = PropertiesService.getScriptProperties();
  const report = ['BREVO_API_KEY', 'BREVO_SENDER_EMAIL', 'OWNER_EMAIL', 'BREVO_LIST_ID', 'SHEET_ID']
    .map(function (key) {
      const value = props.getProperty(key);
      const shown = key === 'BREVO_API_KEY' ? (value ? 'set (' + value.length + ' chars)' : 'MISSING') : (value || '–');
      return key + ': ' + shown;
    })
    .join('\n');
  Logger.log('Script Properties\n' + report + '\nSpreadsheet: ' + sheetUrl());
}

function appendToSheet(data) {
  const sheet = getOrCreateSheet();
  sheet.appendRow([
    new Date(),
    data.firstName || '',
    data.lastName || '',
    data.email || '',
    formatPhoneForSheet(data.phone),
    labelFor(DESTINATION_LABELS, data.destination),
    labelFor(MONTH_LABELS, data.month),
    data.year || '',
    data.groupSize || '',
    formatPriorities(data.priorities),
    data.notes || '',
    data.locale || '',
    data.source || '',
  ]);
}

function formatPhoneForSheet(phone) {
  // Sheets parses leading "+" as a formula ("+593..." → #ERROR!). A leading
  // apostrophe forces plain text without showing up in the cell.
  return phone ? "'" + phone : '';
}

function formatPriorities(priorities) {
  if (!priorities || !priorities.length) return '';
  return priorities.map(function (p) { return labelFor(PRIORITY_LABELS, p); }).join(', ');
}

/** Turns the form's stable English keys ("boatAndSea") into readable text. */
function labelFor(map, key) {
  if (!key) return '';
  return map[key] || key;
}

// Keys must match DESTINATIONS in src/components/EnquiryForm.tsx. An unmapped
// key still comes through — labelFor falls back to the key itself — but it
// reaches the sheet as "eastSussex" rather than a readable name.
const DESTINATION_LABELS = {
  menorca: 'Menorca', eastSussex: 'UK (East Sussex)', bali: 'Bali', dubai: 'Dubai',
  tunisia: 'Tunisia (Tunis)', undecided: 'Undecided',
};

const MONTH_LABELS = {
  january: 'January', february: 'February', march: 'March', april: 'April',
  may: 'May', june: 'June', july: 'July', august: 'August',
  september: 'September', october: 'October', november: 'November',
  december: 'December', flexible: 'Flexible',
};

const PRIORITY_LABELS = {
  coaching: 'Coaching', matchplay: 'Match play', wellness: 'Wellness',
  dining: 'Dining', boatAndSea: 'Boat & sea', culture: 'Culture',
  celebration: 'Celebration', corporate: 'Corporate',
};

function appendBookingToSheet(data) {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(BOOKINGS_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(BOOKINGS_SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(BOOKING_HEADERS);
  sheet.appendRow([
    new Date(),
    data.ref || '',
    'Checkout started – check payment in Stripe',
    data.firstName || '',
    data.lastName || '',
    data.email || '',
    formatPhoneForSheet(data.phone),
    labelFor(DESTINATION_LABELS, data.destination),
    data.dates || '',
    data.room === 'private' ? 'Private room' : 'Shared room',
    data.guests || '',
    data.pricePerPerson || '',
    data.discountCode ? data.discountCode + ' (' + data.discountPercent + '%)' : '',
    data.discount || '',
    data.total || '',
    data.dueNow || '',
    data.balance || 0,
    data.balance ? data.balanceDue : 'Paid in full',
    data.level || '',
    data.notes || '',
    data.locale || '',
    data.source || '',
  ]);
}

function getOrCreateSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

function getSpreadsheet() {
  // Bound scripts get the sheet for free; a standalone deployment needs SHEET_ID.
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  const sheetId = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (!sheetId) throw new Error('No active spreadsheet and no SHEET_ID script property set.');
  return SpreadsheetApp.openById(sheetId);
}

function notifyBrevo(data) {
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty('BREVO_API_KEY');
  const listId = props.getProperty('BREVO_LIST_ID');
  const senderEmail = props.getProperty('BREVO_SENDER_EMAIL') || 'awatelet@cspadel.com';
  const ownerEmail = props.getProperty('OWNER_EMAIL') || 'awatelet@cspadel.com';

  if (!apiKey) {
    sendOwnerFallback(ownerEmail, data, 'BREVO_API_KEY is not set in Script Properties.');
    return;
  }

  const problems = [];
  if (data.email) {
    const contact = brevoRequest('/contacts', apiKey, contactPayload(listId, data));
    if (!contact.ok) problems.push('Brevo contact: ' + contact.error);
  }
  const owner = sendOwnerNotification(apiKey, senderEmail, ownerEmail, data);
  // Bookings get their receipt from Stripe and a confirmation page instead.
  if (data.email && !isBooking(data)) {
    const client = sendClientConfirmation(apiKey, senderEmail, data);
    if (!client.ok) problems.push('Client confirmation was NOT sent: ' + client.error);
  }
  if (!owner.ok) {
    problems.unshift('Brevo notification: ' + owner.error);
    sendOwnerFallback(ownerEmail, data, problems.join('\n'));
  }
}

function brevoRequest(path, apiKey, payload) {
  const res = UrlFetchApp.fetch('https://api.brevo.com/v3' + path, {
    method: 'post',
    contentType: 'application/json',
    headers: { 'api-key': apiKey, accept: 'application/json' },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  // Brevo failures (bad key, blocked IP, unverified sender, unknown list) never
  // break the sheet write – the caller decides whether to fall back to MailApp.
  const code = res.getResponseCode();
  if (code >= 400) {
    const error = '(' + code + ') ' + res.getContentText();
    Logger.log('Brevo ' + path + ' failed ' + error);
    return { ok: false, error: error };
  }
  return { ok: true };
}

function contactPayload(listId, data) {
  const payload = {
    email: data.email,
    attributes: {
      FIRSTNAME: data.firstName || '',
      LASTNAME: data.lastName || '',
      SMS: data.phone || '',
    },
    updateEnabled: true,
  };
  if (listId) payload.listIds = [Number(listId)];
  return payload;
}

function sendOwnerNotification(apiKey, senderEmail, ownerEmail, data) {
  const fullName = ((data.firstName || '') + ' ' + (data.lastName || '')).trim();
  const payload = {
    sender: { name: 'Courtside Padel – Web', email: senderEmail },
    to: [{ email: ownerEmail }],
    subject: ownerSubject(data),
    htmlContent: emailShell(ownerEmailBody(data)),
  };
  // Hitting "Reply" on the notification answers the lead directly.
  if (data.email) payload.replyTo = { email: data.email, name: fullName || data.email };
  return brevoRequest('/smtp/email', apiKey, payload);
}

function ownerSubject(data) {
  const fullName = ((data.firstName || '') + ' ' + (data.lastName || '')).trim();
  if (isBooking(data)) {
    return 'Checkout started – ' + (fullName || 'Unknown') + ' – Menorca ' + (data.dates || '') + ' (' + (data.ref || '') + ')';
  }
  const destination = labelFor(DESTINATION_LABELS, data.destination) || 'Unknown';
  return 'New retreat enquiry – ' + (fullName || 'Unknown') + ' (' + destination + ')';
}

/**
 * Sends the new-lead notification from the Google account that owns this
 * script. Used only when Brevo can't deliver it, so a lead is never sitting
 * unseen in the sheet. The reason is shown at the top so the Brevo problem
 * gets fixed rather than silently relied on.
 */
function sendOwnerFallback(ownerEmail, data, reason) {
  const warning =
    '<div style="margin:0 0 24px;padding:14px 16px;border-radius:8px;background:#FDF3E1;color:#7A4B00;font-size:13px;line-height:1.5;">' +
    '<strong>Sent by Google as a backup – Brevo could not deliver it.</strong><br>' +
    escapeHtml(reason).replace(/\n/g, '<br>') +
    '</div>';
  const options = {
    name: 'Courtside Padel – Web',
    htmlBody: emailShell(warning + ownerEmailBody(data)),
  };
  if (data.email) options.replyTo = data.email;
  try {
    MailApp.sendEmail(ownerEmail, ownerSubject(data), reason, options);
  } catch (err) {
    Logger.log('MailApp fallback failed too: ' + err);
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function sendClientConfirmation(apiKey, senderEmail, data) {
  const lang = (data.locale || 'en').slice(0, 2);
  const copy = CLIENT_EMAIL_COPY[lang] || CLIENT_EMAIL_COPY.en;
  const firstName = (data.firstName || '').trim();
  return brevoRequest('/smtp/email', apiKey, {
    sender: { name: 'Courtside Padel', email: senderEmail },
    to: [{ email: data.email, name: (firstName + ' ' + (data.lastName || '')).trim() }],
    subject: copy.subject,
    htmlContent: emailShell(clientEmailBody(copy, firstName, data)),
  });
}

const CLIENT_EMAIL_COPY = {
  en: {
    subject: 'We’ve received your enquiry – Courtside Padel',
    eyebrow: 'Private Padel Retreats',
    heading: function (name) { return name ? 'Thank you, ' + name + '.' : 'Thank you.'; },
    paragraph: 'We’ve received your retreat enquiry. A member of our team will be in touch within 24 hours to discuss dates, availability and how we can best shape the experience for your group.',
    summaryTitle: 'Your enquiry',
    labels: { destination: 'Destination', dates: 'Dates', group: 'Group size', priorities: 'Priorities' },
    signoff: 'Best,',
  },
  es: {
    subject: 'Hemos recibido tu solicitud – Courtside Padel',
    eyebrow: 'Retiros Privados de Pádel',
    heading: function (name) { return name ? '¡Gracias, ' + name + '!' : '¡Gracias!'; },
    paragraph: 'Hemos recibido tu solicitud. Un miembro de nuestro equipo se pondrá en contacto contigo en menos de 24 horas para hablar de fechas, disponibilidad y cómo diseñar la mejor experiencia para tu grupo.',
    summaryTitle: 'Tu solicitud',
    labels: { destination: 'Destino', dates: 'Fechas', group: 'Tamaño del grupo', priorities: 'Prioridades' },
    signoff: 'Un saludo,',
  },
  fr: {
    subject: 'Nous avons bien reçu votre demande – Courtside Padel',
    eyebrow: 'Retraites Privées de Padel',
    heading: function (name) { return name ? 'Merci, ' + name + ' !' : 'Merci !'; },
    paragraph: 'Nous avons bien reçu votre demande. Un membre de notre équipe vous contactera sous 24 heures pour évoquer les dates, les disponibilités et la meilleure façon de concevoir l’expérience pour votre groupe.',
    summaryTitle: 'Votre demande',
    labels: { destination: 'Destination', dates: 'Dates', group: 'Taille du groupe', priorities: 'Priorités' },
    signoff: 'Cordialement,',
  },
};

// ── Shared HTML email shell (table-based layout – required for Outlook/Gmail compatibility) ──
// Uses a text wordmark instead of the logo image: small/alpha .webp files get
// re-encoded (and often corrupted) by Gmail's image proxy, so a styled text
// header is more reliable than an <img> here – and renders instantly with no
// "images blocked" placeholder either.

const BRAND = {
  dark: '#01192C',
  gold: '#D9AD62',
};

function sheetUrl() {
  try {
    return getSpreadsheet().getUrl();
  } catch (err) {
    return 'https://docs.google.com/spreadsheets/';
  }
}

function emailShell(bodyHtml) {
  return (
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef0f2;padding:40px 16px;font-family:-apple-system,Helvetica,Arial,sans-serif;">' +
    '<tr><td align="center">' +
    '<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(1,25,44,0.08);" cellpadding="0" cellspacing="0">' +
    '<tr><td style="background:' + BRAND.dark + ';padding:36px 32px;text-align:center;">' +
    '<p style="margin:0;font-size:19px;font-weight:700;letter-spacing:0.3em;color:#ffffff;">COURTSIDE</p>' +
    '<p style="margin:6px 0 0;font-size:11px;font-weight:600;letter-spacing:0.35em;color:' + BRAND.gold + ';">PADEL RETREATS</p>' +
    '</td></tr>' +
    '<tr><td style="padding:40px 36px;color:#1a1a1a;">' + bodyHtml + '</td></tr>' +
    '<tr><td style="background:#f8f8f8;padding:20px 32px;text-align:center;border-top:1px solid #eee;">' +
    '<p style="margin:0;font-size:11px;letter-spacing:0.06em;color:#a0a0a0;">Courtside Padel &middot; awatelet@cspadel.com</p>' +
    '</td></tr>' +
    '</table></td></tr></table>'
  );
}

function goldRule() {
  return '<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="width:36px;height:2px;background:' + BRAND.gold + ';font-size:0;line-height:0;">&nbsp;</td></tr></table>';
}

function summaryRows(pairs) {
  return pairs
    .map(function (pair, i) {
      return (
        '<tr style="background:' + (i % 2 === 0 ? '#f9f9f9' : '#ffffff') + ';">' +
        '<td style="padding:11px 14px;font-size:12px;color:#888;letter-spacing:0.02em;">' + pair[0] + '</td>' +
        '<td style="padding:11px 14px;font-size:14px;color:#1a1a1a;font-weight:600;text-align:right;">' + (pair[1] || '–') + '</td>' +
        '</tr>'
      );
    })
    .join('');
}

function summaryTable(rowsHtml) {
  return (
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;border-radius:10px;overflow:hidden;border:1px solid #f0f0f0;">' +
    rowsHtml +
    '</table>'
  );
}

function formatDates(data) {
  const month = labelFor(MONTH_LABELS, data.month);
  return [month, data.year].filter(Boolean).join(' ');
}

function clientEmailBody(copy, firstName, data) {
  const rows = summaryRows([
    [copy.labels.destination, labelFor(DESTINATION_LABELS, data.destination)],
    [copy.labels.dates, formatDates(data)],
    [copy.labels.group, data.groupSize],
    [copy.labels.priorities, formatPriorities(data.priorities)],
  ]);
  return (
    '<p style="margin:0 0 10px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:' + BRAND.gold + ';font-weight:700;">' + copy.eyebrow + '</p>' +
    '<h1 style="margin:0 0 22px;font-size:25px;font-weight:400;color:' + BRAND.dark + ';line-height:1.3;">' + copy.heading(firstName) + '</h1>' +
    '<p style="margin:0 0 28px;font-size:15px;line-height:1.65;color:#444;">' + copy.paragraph + '</p>' +
    '<p style="margin:0 0 12px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#999;font-weight:700;">' + copy.summaryTitle + '</p>' +
    summaryTable(rows) +
    '<div style="margin:28px 0 24px;">' + goldRule() + '</div>' +
    '<p style="margin:0;font-size:14px;line-height:1.6;color:#444;">' + copy.signoff + '<br><strong style="color:' + BRAND.dark + ';">Courtside Padel</strong></p>'
  );
}

function bookingEmailBody(data) {
  const rows = summaryRows([
    ['Booking Ref', data.ref],
    ['Name', ((data.firstName || '') + ' ' + (data.lastName || '')).trim()],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Dates', 'Menorca, ' + (data.dates || '')],
    ['Room', data.room === 'private' ? 'Private room' : 'Shared room'],
    ['Guests', data.guests],
    ['Discount', data.discountCode ? data.discountCode + ' (' + data.discountPercent + '%): -£' + data.discount : ''],
    ['Retreat Total', '£' + data.total],
    ['Due at Booking', '£' + data.dueNow],
    ['Balance', data.balance ? '£' + data.balance + ' by ' + data.balanceDue : 'Paid in full'],
    ['Padel Level', data.level],
    ['Notes', data.notes],
    ['Language', data.locale],
  ]);
  return (
    '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;"><tr>' +
    '<td style="background:#FDF3E1;padding:8px 16px;border-radius:999px;font-size:12px;font-weight:700;color:#7A4B00;">&#9679;&nbsp; Checkout started</td>' +
    '</tr></table>' +
    '<h1 style="margin:0 0 12px;font-size:22px;font-weight:400;color:' + BRAND.dark + ';">New Menorca booking</h1>' +
    '<p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#555;">The guest was sent to Stripe to pay. A separate &ldquo;Payment received&rdquo; email follows as soon as they pay. If none arrives, they stopped before paying and it is worth a follow-up.</p>' +
    summaryTable(rows) +
    '<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr><td style="border-radius:8px;background:' + BRAND.dark + ';">' +
    '<a href="' + sheetUrl() + '" style="display:inline-block;padding:13px 26px;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.04em;">View in Google Sheet &rarr;</a>' +
    '</td></tr></table>'
  );
}

function ownerEmailBody(data) {
  if (isBooking(data)) return bookingEmailBody(data);
  const rows = summaryRows([
    ['Name', ((data.firstName || '') + ' ' + (data.lastName || '')).trim()],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Destination', labelFor(DESTINATION_LABELS, data.destination)],
    ['Dates', formatDates(data)],
    ['Group Size', data.groupSize],
    ['Priorities', formatPriorities(data.priorities)],
    ['Notes', data.notes],
    ['Language', data.locale],
    ['Source Page', data.source],
  ]);
  return (
    '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;"><tr>' +
    '<td style="background:#E8F3EC;padding:8px 16px;border-radius:999px;font-size:12px;font-weight:700;color:#1F7A4D;">&#9679;&nbsp; New lead</td>' +
    '</tr></table>' +
    '<h1 style="margin:0 0 24px;font-size:22px;font-weight:400;color:' + BRAND.dark + ';">New retreat enquiry</h1>' +
    summaryTable(rows) +
    '<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr><td style="border-radius:8px;background:' + BRAND.dark + ';">' +
    '<a href="' + sheetUrl() + '" style="display:inline-block;padding:13px 26px;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.04em;">View in Google Sheet &rarr;</a>' +
    '</td></tr></table>'
  );
}

// ── Paid bookings ─────────────────────────────────────────────────────────

/**
 * A payment reported by the website's Stripe webhook: log it, mark the
 * booking paid, and email the guest and the team. Answers success for a
 * payment already handled, so Stripe stops retrying without a second email.
 */
function handlePayment(data) {
  const secret = PropertiesService.getScriptProperties().getProperty('PAYMENT_WEBHOOK_SECRET');
  if (!secret || data.secret !== secret) {
    Logger.log('handlePayment: secret missing or wrong');
    return { status: 'error', message: 'unauthorized' };
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = getOrCreatePaymentsSheet();
    if (paymentAlreadyLogged(sheet, data.stripeSessionId)) {
      return { status: 'success', duplicate: true };
    }
    sheet.appendRow([
      new Date(),
      data.ref || '',
      PAYMENT_LABELS_EN[data.payment] || data.payment,
      data.amountPaid || 0,
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      formatPhoneForSheet(data.phone),
      data.dates || '',
      data.room === 'private' ? 'Private room' : 'Shared room',
      data.guests || '',
      data.total || '',
      data.discountCode || '',
      data.balance || 0,
      data.balance ? data.balanceDue : '',
      data.locale || '',
      data.stripeSessionId || '',
      data.stripePaymentIntent || '',
    ]);
    markBookingPaid(data);
  } finally {
    lock.releaseLock();
  }

  sendPaymentEmails(data);
  return { status: 'success' };
}

const PAYMENT_LABELS_EN = { deposit: 'Deposit', full: 'Paid in full', balance: 'Balance' };

function getOrCreatePaymentsSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(PAYMENTS_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(PAYMENTS_SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(PAYMENT_HEADERS);
  return sheet;
}

function paymentAlreadyLogged(sheet, sessionId) {
  if (!sessionId || sheet.getLastRow() < 2) return false;
  const column = PAYMENT_HEADERS.indexOf('Stripe Session') + 1;
  const ids = sheet.getRange(2, column, sheet.getLastRow() - 1, 1).getValues();
  return ids.some(function (row) { return row[0] === sessionId; });
}

/** Updates the Status cell of the booking's row in "Bookings", if there is one. */
function markBookingPaid(data) {
  const sheet = getSpreadsheet().getSheetByName(BOOKINGS_SHEET_NAME);
  if (!sheet || !data.ref || sheet.getLastRow() < 2) return;
  const refs = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
  let status;
  if (data.payment === 'deposit') {
    status = 'Deposit paid – ' + money(data.amountPaid) + ' (balance ' + money(data.balance) + ' due ' + data.balanceDue + ')';
  } else if (data.payment === 'balance') {
    status = 'Paid in full – balance of ' + money(data.amountPaid) + ' paid';
  } else {
    status = 'Paid in full – ' + money(data.amountPaid);
  }
  for (let i = refs.length - 1; i >= 0; i--) {
    if (refs[i][0] === data.ref) {
      sheet.getRange(i + 2, 3).setValue(status);
      return;
    }
  }
}

/** £3,950 or £1,572.50. */
function money(amount) {
  const n = Number(amount) || 0;
  const fixed = Number.isInteger(n) ? String(n) : n.toFixed(2);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '£' + parts.join('.');
}

const MONTH_NAMES = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
};

function dayMonth(iso, lang) {
  const p = iso.split('-');
  const day = Number(p[2]);
  const month = MONTH_NAMES[lang][Number(p[1]) - 1];
  return lang === 'es' ? day + ' de ' + month : day + ' ' + month;
}

/** "25 August 2027" · "25 de agosto de 2027" · "25 août 2027" */
function longDate(iso, lang) {
  if (!iso) return '';
  const year = iso.slice(0, 4);
  return dayMonth(iso, lang) + (lang === 'es' ? ' de ' : ' ') + year;
}

/** "15–19 September 2027", or "28 April – 2 May 2027" across months. */
function dateRange(start, end, lang) {
  if (!start || !end) return '';
  const year = end.slice(0, 4);
  const tail = (lang === 'es' ? ' de ' : ' ') + year;
  if (start.slice(0, 7) === end.slice(0, 7)) {
    return Number(start.slice(8)) + '–' + dayMonth(end, lang) + tail;
  }
  return dayMonth(start, lang) + ' – ' + dayMonth(end, lang) + tail;
}

const PAYMENT_EMAIL_COPY = {
  en: {
    subject: {
      deposit: 'Your place is confirmed – Menorca Padel Retreat',
      full: 'Your retreat is confirmed and paid – Menorca Padel Retreat',
      balance: 'Balance received – you’re all set for Menorca',
    },
    eyebrow: { deposit: 'Booking confirmed', full: 'Booking confirmed', balance: 'Payment received' },
    heading: function (name) { return name ? 'See you in Menorca, ' + name + '.' : 'See you in Menorca.'; },
    intro: {
      deposit: 'Thank you for your deposit. Your place on the Menorca Padel Retreat is secured.',
      full: 'Thank you for your payment. Your place on the Menorca Padel Retreat is secured and fully paid.',
      balance: 'Thank you, we’ve received your balance. Your Menorca Padel Retreat is now fully paid.',
    },
    summaryTitle: 'Your booking',
    labels: { ref: 'Booking reference', retreat: 'Retreat', dates: 'Dates', room: 'Room', guests: 'Guests', total: 'Retreat total', discount: 'Discount', paid: 'Paid today', balance: 'Balance' },
    retreat: 'Menorca Padel Retreat, Barceló Nura',
    rooms: { shared: 'Shared room', private: 'Private room' },
    paidInFull: 'Paid in full',
    balanceDueBy: function (amount, date) { return amount + ' by ' + date; },
    balanceBlock: function (amount, date) { return 'Your balance of <strong>' + amount + '</strong> is due by <strong>' + date + '</strong>. You can pay it online at any time before then:'; },
    balanceButton: 'Pay my balance',
    nextTitle: 'What happens next',
    next: {
      booking: 'One of the founders will be in touch within 24 hours to welcome you and share your padel programme, travel details and everything you need to prepare.',
      balance: 'We’ll be in touch closer to the retreat with your final travel details and programme.',
    },
    questions: 'Any questions? Simply reply to this email.',
    receipt: 'Stripe will also email you a payment receipt.',
    signoff: 'See you on court,',
  },
  es: {
    subject: {
      deposit: 'Tu plaza está confirmada – Retiro de Pádel en Menorca',
      full: 'Tu retiro está confirmado y pagado – Retiro de Pádel en Menorca',
      balance: 'Saldo recibido – todo listo para Menorca',
    },
    eyebrow: { deposit: 'Reserva confirmada', full: 'Reserva confirmada', balance: 'Pago recibido' },
    heading: function (name) { return name ? 'Nos vemos en Menorca, ' + name + '.' : 'Nos vemos en Menorca.'; },
    intro: {
      deposit: 'Gracias por tu depósito. Tu plaza en el Retiro de Pádel en Menorca está asegurada.',
      full: 'Gracias por tu pago. Tu plaza en el Retiro de Pádel en Menorca está asegurada y pagada por completo.',
      balance: 'Gracias, hemos recibido tu saldo. Tu Retiro de Pádel en Menorca ya está pagado por completo.',
    },
    summaryTitle: 'Tu reserva',
    labels: { ref: 'Referencia', retreat: 'Retiro', dates: 'Fechas', room: 'Habitación', guests: 'Personas', total: 'Total del retiro', discount: 'Descuento', paid: 'Pagado hoy', balance: 'Saldo' },
    retreat: 'Retiro de Pádel en Menorca, Barceló Nura',
    rooms: { shared: 'Habitación compartida', private: 'Habitación privada' },
    paidInFull: 'Pagado por completo',
    balanceDueBy: function (amount, date) { return amount + ' antes del ' + date; },
    balanceBlock: function (amount, date) { return 'Tu saldo de <strong>' + amount + '</strong> se paga antes del <strong>' + date + '</strong>. Puedes pagarlo online cuando quieras hasta esa fecha:'; },
    balanceButton: 'Pagar mi saldo',
    nextTitle: 'Próximos pasos',
    next: {
      booking: 'Uno de los fundadores se pondrá en contacto contigo en menos de 24 horas para darte la bienvenida y compartir tu programa de pádel, los detalles del viaje y todo lo que necesitas para prepararte.',
      balance: 'Nos pondremos en contacto contigo antes del retiro con los detalles finales del viaje y el programa.',
    },
    questions: '¿Alguna pregunta? Responde a este email.',
    receipt: 'Stripe también te enviará un recibo del pago.',
    signoff: 'Nos vemos en la pista,',
  },
  fr: {
    subject: {
      deposit: 'Votre place est confirmée – Retraite Padel à Minorque',
      full: 'Votre retraite est confirmée et réglée – Retraite Padel à Minorque',
      balance: 'Solde reçu – tout est prêt pour Minorque',
    },
    eyebrow: { deposit: 'Réservation confirmée', full: 'Réservation confirmée', balance: 'Paiement reçu' },
    heading: function (name) { return name ? 'Rendez-vous à Minorque, ' + name + '.' : 'Rendez-vous à Minorque.'; },
    intro: {
      deposit: 'Merci pour votre acompte. Votre place pour la Retraite Padel à Minorque est garantie.',
      full: 'Merci pour votre paiement. Votre place pour la Retraite Padel à Minorque est garantie et entièrement réglée.',
      balance: 'Merci, nous avons bien reçu votre solde. Votre Retraite Padel à Minorque est désormais entièrement réglée.',
    },
    summaryTitle: 'Votre réservation',
    labels: { ref: 'Référence', retreat: 'Retraite', dates: 'Dates', room: 'Chambre', guests: 'Participants', total: 'Total de la retraite', discount: 'Réduction', paid: 'Réglé aujourd’hui', balance: 'Solde' },
    retreat: 'Retraite Padel à Minorque, Barceló Nura',
    rooms: { shared: 'Chambre partagée', private: 'Chambre individuelle' },
    paidInFull: 'Entièrement réglé',
    balanceDueBy: function (amount, date) { return amount + ' avant le ' + date; },
    balanceBlock: function (amount, date) { return 'Votre solde de <strong>' + amount + '</strong> est à régler avant le <strong>' + date + '</strong>. Vous pouvez le payer en ligne à tout moment d’ici là :'; },
    balanceButton: 'Payer mon solde',
    nextTitle: 'La suite',
    next: {
      booking: 'L’un des fondateurs vous contactera sous 24 heures pour vous souhaiter la bienvenue et vous transmettre votre programme de padel, les détails du voyage et tout ce qu’il vous faut pour vous préparer.',
      balance: 'Nous vous recontacterons avant la retraite avec les derniers détails du voyage et le programme.',
    },
    questions: 'Une question ? Répondez simplement à cet e-mail.',
    receipt: 'Stripe vous enverra également un reçu de paiement.',
    signoff: 'À bientôt sur le court,',
  },
};

function button(href, label) {
  return (
    '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px;"><tr><td style="border-radius:8px;background:' + BRAND.dark + ';">' +
    '<a href="' + href + '" style="display:inline-block;padding:14px 28px;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">' + label + ' &rarr;</a>' +
    '</td></tr></table>'
  );
}

function guestPaymentEmailBody(copy, data, lang) {
  const kind = data.payment;
  const firstName = escapeHtml((data.firstName || '').trim());
  const rows = [
    [copy.labels.ref, escapeHtml(data.ref || '')],
    [copy.labels.retreat, copy.retreat],
    [copy.labels.dates, dateRange(data.dateStart, data.dateEnd, lang) || escapeHtml(data.dates || '')],
    [copy.labels.room, copy.rooms[data.room] || ''],
    [copy.labels.guests, data.guests],
  ];
  if (kind !== 'balance') {
    rows.push([copy.labels.total, money(data.total)]);
    if (data.discountCode) rows.push([copy.labels.discount, escapeHtml(data.discountCode) + ' (−' + data.discountPercent + '%)']);
  }
  rows.push([copy.labels.paid, money(data.amountPaid)]);
  rows.push([copy.labels.balance, kind === 'deposit' ? copy.balanceDueBy(money(data.balance), longDate(data.balanceDue, lang)) : copy.paidInFull]);

  let balanceHtml = '';
  if (kind === 'deposit' && data.balanceLink) {
    balanceHtml =
      '<div style="margin:28px 0 0;padding:22px 22px 18px;border-radius:10px;background:#F7F4EF;">' +
      '<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#333;">' + copy.balanceBlock(money(data.balance), longDate(data.balanceDue, lang)) + '</p>' +
      button(data.balanceLink, copy.balanceButton) +
      '</div>';
  }

  return (
    '<p style="margin:0 0 10px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8A5A1C;font-weight:700;">' + copy.eyebrow[kind] + '</p>' +
    '<h1 style="margin:0 0 18px;font-size:25px;font-weight:400;color:' + BRAND.dark + ';line-height:1.3;">' + copy.heading(firstName) + '</h1>' +
    '<p style="margin:0 0 28px;font-size:15px;line-height:1.65;color:#444;">' + copy.intro[kind] + '</p>' +
    '<p style="margin:0 0 12px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#999;font-weight:700;">' + copy.summaryTitle + '</p>' +
    summaryTable(summaryRows(rows)) +
    balanceHtml +
    '<p style="margin:30px 0 8px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#999;font-weight:700;">' + copy.nextTitle + '</p>' +
    '<p style="margin:0 0 12px;font-size:14px;line-height:1.65;color:#444;">' + (kind === 'balance' ? copy.next.balance : copy.next.booking) + '</p>' +
    '<p style="margin:0 0 4px;font-size:14px;line-height:1.65;color:#444;">' + copy.questions + '</p>' +
    '<p style="margin:0;font-size:12px;line-height:1.6;color:#999;">' + copy.receipt + '</p>' +
    '<div style="margin:28px 0 22px;">' + goldRule() + '</div>' +
    '<p style="margin:0;font-size:14px;line-height:1.6;color:#444;">' + copy.signoff + '<br><strong style="color:' + BRAND.dark + ';">Courtside Padel</strong></p>'
  );
}

function ownerPaymentSubject(data) {
  const name = ((data.firstName || '') + ' ' + (data.lastName || '')).trim() || 'Unknown';
  const what = data.payment === 'deposit' ? money(data.amountPaid) + ' deposit'
    : data.payment === 'balance' ? money(data.amountPaid) + ' balance'
    : money(data.amountPaid) + ' paid in full';
  return 'Payment received – ' + what + ' – ' + name + ' – Menorca ' + (data.dates || '') + ' (' + (data.ref || '') + ')';
}

function ownerPaymentEmailBody(data) {
  const heading = data.payment === 'deposit' ? money(data.amountPaid) + ' deposit paid'
    : data.payment === 'balance' ? 'Balance paid – ' + money(data.amountPaid)
    : 'Paid in full – ' + money(data.amountPaid);
  const rows = summaryRows([
    ['Booking Ref', escapeHtml(data.ref || '')],
    ['Name', escapeHtml(((data.firstName || '') + ' ' + (data.lastName || '')).trim())],
    ['Email', escapeHtml(data.email || '')],
    ['Phone', escapeHtml(data.phone || '')],
    ['Dates', 'Menorca, ' + escapeHtml(data.dates || '')],
    ['Room', data.room === 'private' ? 'Private room' : 'Shared room'],
    ['Guests', data.guests],
    ['Payment', PAYMENT_LABELS_EN[data.payment] || data.payment],
    ['Amount Paid', money(data.amountPaid)],
    ['Retreat Total', data.payment === 'balance' ? '' : money(data.total)],
    ['Discount', data.discountCode ? escapeHtml(data.discountCode) + ' (' + data.discountPercent + '%): -' + money(data.discount) : ''],
    ['Balance Left', data.payment === 'deposit' ? money(data.balance) + ' by ' + (data.balanceDueLabel || data.balanceDue) : 'Paid in full'],
    ['Language', data.locale],
  ]);
  const stripeLink = data.stripePaymentIntent ? 'https://dashboard.stripe.com/payments/' + data.stripePaymentIntent : 'https://dashboard.stripe.com/payments';
  return (
    '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;"><tr>' +
    '<td style="background:#E8F3EC;padding:8px 16px;border-radius:999px;font-size:12px;font-weight:700;color:#1F7A4D;">&#9679;&nbsp; Payment received</td>' +
    '</tr></table>' +
    '<h1 style="margin:0 0 12px;font-size:22px;font-weight:400;color:' + BRAND.dark + ';">' + heading + '</h1>' +
    '<p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#555;">' +
    (data.payment === 'deposit'
      ? 'The guest has their confirmation email with a link to pay the balance online.'
      : 'The guest has their confirmation email. Nothing is left to pay.') +
    '</p>' +
    summaryTable(rows) +
    '<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr>' +
    '<td style="border-radius:8px;background:' + BRAND.dark + ';"><a href="' + sheetUrl() + '" style="display:inline-block;padding:13px 22px;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;">View in Google Sheet &rarr;</a></td>' +
    '<td style="width:10px;"></td>' +
    '<td style="border-radius:8px;border:1px solid ' + BRAND.dark + ';"><a href="' + stripeLink + '" style="display:inline-block;padding:12px 22px;color:' + BRAND.dark + ';text-decoration:none;font-size:13px;font-weight:700;">View in Stripe &rarr;</a></td>' +
    '</tr></table>'
  );
}

/** Guest confirmation + team notification, each through Brevo with a Google backup. */
function sendPaymentEmails(data) {
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty('BREVO_API_KEY');
  const senderEmail = props.getProperty('BREVO_SENDER_EMAIL') || 'awatelet@cspadel.com';
  const ownerEmail = props.getProperty('OWNER_EMAIL') || 'awatelet@cspadel.com';
  const lang = PAYMENT_EMAIL_COPY[data.locale] ? data.locale : 'en';
  const copy = PAYMENT_EMAIL_COPY[lang];
  const guestName = ((data.firstName || '') + ' ' + (data.lastName || '')).trim();
  const problems = [];

  if (data.email) {
    const subject = copy.subject[data.payment];
    const html = emailShell(guestPaymentEmailBody(copy, data, lang));
    let sent = false;
    if (apiKey) {
      const res = brevoRequest('/smtp/email', apiKey, {
        sender: { name: 'Courtside Padel', email: senderEmail },
        to: [{ email: data.email, name: guestName || data.email }],
        replyTo: { email: ownerEmail, name: 'Courtside Padel' },
        subject: subject,
        htmlContent: html,
      });
      sent = res.ok;
      if (!res.ok) problems.push('Guest confirmation through Brevo failed: ' + res.error);
    }
    if (!sent) {
      try {
        MailApp.sendEmail(data.email, subject, copy.intro[data.payment], { name: 'Courtside Padel', htmlBody: html, replyTo: ownerEmail });
        problems.push('The guest confirmation was sent by Google instead.');
      } catch (err) {
        problems.push('The guest confirmation was NOT sent: ' + err);
      }
    }
  }

  const ownerHtml = ownerPaymentEmailBody(data);
  let ownerSent = false;
  if (apiKey && problems.length === 0) {
    const payload = {
      sender: { name: 'Courtside Padel – Web', email: senderEmail },
      to: [{ email: ownerEmail }],
      subject: ownerPaymentSubject(data),
      htmlContent: emailShell(ownerHtml),
    };
    if (data.email) payload.replyTo = { email: data.email, name: guestName || data.email };
    ownerSent = brevoRequest('/smtp/email', apiKey, payload).ok;
  }
  if (!ownerSent) {
    const reason = problems.length ? problems.join('\n') : (apiKey ? 'Brevo could not deliver this notification.' : 'BREVO_API_KEY is not set in Script Properties.');
    const warning =
      '<div style="margin:0 0 24px;padding:14px 16px;border-radius:8px;background:#FDF3E1;color:#7A4B00;font-size:13px;line-height:1.5;">' +
      '<strong>Sent by Google as a backup.</strong><br>' + escapeHtml(reason).replace(/\n/g, '<br>') + '</div>';
    try {
      const options = { name: 'Courtside Padel – Web', htmlBody: emailShell(warning + ownerHtml) };
      if (data.email) options.replyTo = data.email;
      MailApp.sendEmail(ownerEmail, ownerPaymentSubject(data), reason, options);
    } catch (err) {
      Logger.log('Payment owner fallback failed too: ' + err);
    }
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
