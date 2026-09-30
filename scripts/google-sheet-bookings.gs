/**
 * iNOVAA — demo bookings → Google Sheet
 *
 * The contact page popup (components/DemoBookingDialog.tsx) posts each booking here,
 * and this script appends it as a new row.
 *
 * SETUP (one time, ~5 minutes):
 *  1. Create a Google Sheet (e.g. "iNOVAA Demo Bookings").
 *  2. In the sheet: Extensions → Apps Script. Delete the sample code, paste this whole file, and Save.
 *  3. Deploy → New deployment → gear icon → "Web app".
 *       Execute as:     Me
 *       Who has access: Anyone
 *     Click Deploy, approve the permissions prompt, and copy the Web app URL (ends in /exec).
 *     ("Anyone" only lets the website send rows to this script — the sheet itself stays private.)
 *  4. Open components/DemoBookingDialog.tsx and paste the URL into GOOGLE_SHEET_URL at the top.
 *
 * If you edit this script later: Deploy → Manage deployments → edit (pencil) → Version: "New version"
 * → Deploy, so the same URL keeps working.
 */

const SHEET_NAME = "Bookings";
const HEADERS = ["Submitted at", "Name", "Email", "Contact number", "Demo date", "Demo time", "Visitor time zone"];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data.name || !data.email || !data.phone) return json({ ok: false, error: "missing fields" });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000); // two bookings at the same moment still get separate rows
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
        sheet.setFrozenRows(1);
      }
      sheet.appendRow([
        new Date(),
        safe(data.name),
        safe(data.email),
        safe(data.phone),
        safe(data.date),
        safe(data.slot),
        safe(data.timeZone),
      ]);
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Store everything as plain text: a leading = + - @ would otherwise be run as a formula
// (e.g. "+92 300 1234567" would become #ERROR!, and a name like "=HYPERLINK(...)" would execute).
function safe(value) {
  const s = String(value == null ? "" : value).slice(0, 200);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
