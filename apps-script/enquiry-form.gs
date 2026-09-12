/**
 * Courtside Padel – Retreat enquiry form backend.
 *
 * Receives the JSON posted by the multi-step enquiry modal
 * (src/components/EnquiryForm.tsx), writes it to a Google Sheet, and fires two
 * Brevo emails: an internal new-lead notification and a confirmation to the
 * visitor in their own language.
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

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    appendToSheet(data);
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
    destination: 'menorca',
    month: 'june',
    year: '2026',
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
  undecided: 'Undecided',
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
  if (!data.email) return; // Nothing Brevo can do without an email.

  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty('BREVO_API_KEY');
  if (!apiKey) return; // Brevo not configured yet – sheet write above still succeeded.

  const listId = props.getProperty('BREVO_LIST_ID');
  const senderEmail = props.getProperty('BREVO_SENDER_EMAIL') || 'awatelet@cspadel.com';
  const ownerEmail = props.getProperty('OWNER_EMAIL') || 'awatelet@cspadel.com';

  upsertContact(apiKey, listId, data);
  sendOwnerNotification(apiKey, senderEmail, ownerEmail, data);
  sendClientConfirmation(apiKey, senderEmail, data);
}

function brevoRequest(path, apiKey, payload) {
  const res = UrlFetchApp.fetch('https://api.brevo.com/v3' + path, {
    method: 'post',
    contentType: 'application/json',
    headers: { 'api-key': apiKey, accept: 'application/json' },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  // Brevo failures (bad key, unverified sender, unknown list) never break the
  // sheet write – they're only visible here, in Executions, for debugging.
  if (res.getResponseCode() >= 400) {
    Logger.log('Brevo ' + path + ' failed (' + res.getResponseCode() + '): ' + res.getContentText());
  }
  return res;
}

function upsertContact(apiKey, listId, data) {
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
  brevoRequest('/contacts', apiKey, payload);
}

function sendOwnerNotification(apiKey, senderEmail, ownerEmail, data) {
  const fullName = ((data.firstName || '') + ' ' + (data.lastName || '')).trim();
  const destination = labelFor(DESTINATION_LABELS, data.destination) || 'Unknown';
  brevoRequest('/smtp/email', apiKey, {
    sender: { name: 'Courtside Padel – Web', email: senderEmail },
    to: [{ email: ownerEmail }],
    subject: 'New retreat enquiry – ' + (fullName || 'Unknown') + ' (' + destination + ')',
    htmlContent: emailShell(ownerEmailBody(data)),
  });
}

function sendClientConfirmation(apiKey, senderEmail, data) {
  const lang = (data.locale || 'en').slice(0, 2);
  const copy = CLIENT_EMAIL_COPY[lang] || CLIENT_EMAIL_COPY.en;
  const firstName = (data.firstName || '').trim();
  brevoRequest('/smtp/email', apiKey, {
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

function ownerEmailBody(data) {
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

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
