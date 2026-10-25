const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function createScript() {
  const rows = [];
  const emails = [];
  const receipts = new Map();
  const sheet = {
    appendRow: (row) => rows.push(row),
  };
  const context = {
    SpreadsheetApp: {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => sheet,
      }),
    },
    MailApp: {
      sendEmail: (email) => emails.push(email),
    },
    CacheService: {
      getScriptCache: () => ({
        put: (key, value) => receipts.set(key, value),
        get: (key) => receipts.get(key),
      }),
    },
    ContentService: {
      MimeType: { JSON: 'json', JAVASCRIPT: 'js' },
      createTextOutput: (text) => ({
        text,
        setMimeType() { return this; },
      }),
    },
    console,
  };
  const source = fs.readFileSync(path.join(__dirname, 'contact-form.gs'), 'utf8');
  vm.runInNewContext(source, context);
  return { context, rows, emails, receipts };
}

test('saves a valid message, emails it, and confirms receipt without exposing message content', () => {
  const { context, rows, emails } = createScript();
  const requestId = '11111111-1111-4111-8111-111111111111';
  const response = context.doPost({ postData: { contents: JSON.stringify({
    requestId, name: 'Ada', email: 'ada@example.com', message: 'Hi Rithwik', website: '',
  }) } });
  assert.equal(JSON.parse(response.text).ok, true);
  assert.equal(rows.length, 1);
  assert.equal(rows[0][1], 'Ada');
  assert.equal(emails[0].to, 'rithwikthirumalaraju@gmail.com');
  assert.equal(emails[0].replyTo, 'ada@example.com');

  const receipt = context.doGet({ parameter: {
    requestId, callback: 'contactReceipt_11111111111141118111111111111111',
  } });
  assert.match(receipt.text, /"status":"received"/);
  assert.doesNotMatch(receipt.text, /ada@example.com|Hi Rithwik/);
});

test('rejects invalid submissions without writing to the Sheet or sending email', () => {
  const { context, rows, emails } = createScript();
  const response = context.doPost({ postData: { contents: JSON.stringify({
    requestId: '22222222-2222-4222-8222-222222222222',
    name: 'Ada', email: 'not-an-email', message: 'Hello',
  }) } });
  assert.equal(JSON.parse(response.text).ok, false);
  assert.equal(rows.length, 0);
  assert.equal(emails.length, 0);
});
