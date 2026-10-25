// Copy this file into the Apps Script project attached to your Google Sheet.
const INBOX_EMAIL = 'rithwikthirumalaraju@gmail.com';
const SHEET_NAME = 'Messages';

function authorizeServices() {
  SpreadsheetApp.getActiveSpreadsheet().getSheets();
  MailApp.getRemainingDailyQuota();
}

function doPost(e) {
  let requestId;
  try {
    const data = JSON.parse(e.postData.contents);
    requestId = String(data.requestId || '');
    if (!/^[a-f0-9-]{36}$/i.test(requestId)) throw new Error('Invalid request ID');
    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const message = String(data.message || '').trim();

    // Hidden field catches basic automated submissions without emailing them.
    if (data.website) {
      CacheService.getScriptCache().put(requestId, 'received', 300);
      return jsonResponse({ ok: true });
    }
    if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !message || message.length > 5000) {
      throw new Error('Invalid contact details');
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(['Received at', 'Name', 'Email', 'Message']);
    }

    // Prevent spreadsheet formulas in untrusted form fields.
    const asText = (value) => /^[=+\-@]/.test(value) ? "'" + value : value;
    sheet.appendRow([new Date(), asText(name), asText(email), asText(message)]);

    // A saved submission counts as received even if the email quota is exhausted.
    try {
      MailApp.sendEmail({
        to: INBOX_EMAIL,
        replyTo: email,
        subject: 'Portfolio message from ' + name.replace(/[\r\n]/g, ' '),
        body: 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message,
      });
    } catch (mailError) {
      console.error('Message saved, but email notification failed: ' + mailError);
    }

    CacheService.getScriptCache().put(requestId, 'received', 300);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error('Contact submission failed: ' + error);
    if (requestId && /^[a-f0-9-]{36}$/i.test(requestId)) {
      CacheService.getScriptCache().put(requestId, 'failed', 300);
    }
    return jsonResponse({ ok: false, error: 'Could not save message' });
  }
}

// JSONP receipt reports only status, never names, emails, or message contents.
function doGet(e) {
  const id = String(e.parameter.requestId || '');
  const callback = String(e.parameter.callback || '');
  if (!/^[a-f0-9-]{36}$/i.test(id) || !/^contactReceipt_[a-f0-9]{32}$/i.test(callback)) {
    return ContentService.createTextOutput('Invalid receipt request');
  }
  const status = CacheService.getScriptCache().get(id) || 'pending';
  return ContentService.createTextOutput(callback + '(' + JSON.stringify({ status: status }) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
