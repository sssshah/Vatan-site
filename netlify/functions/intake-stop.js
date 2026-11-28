// Intake stop backend (one-way latch for online reservations).
//
// Staff on the reservations board can STOP online intake for a location for
// TODAY ONLY. There is deliberately NO reopen path here: reopening is done
// by the owner via reservation-availability.json (an explicit
// "active": false entry for that date/location overrides this latch —
// see reservations.html). Day-keyed, so every day starts clean.
//
//   GET  ?date=YYYY-MM-DD (optional, defaults to today in America/New_York)
//        -> { date, stops: { JC: { stopped, at }, ... } } (no PII)
//   POST { location: "Edison"|"EDI"|..., date? }
//        -> records { stopped: true, at } for that location for today.
//        Only today's date is accepted. Any reopen/clear action is
//        rejected with 400.
//
// Requires NETLIFY_ACCESS_TOKEN (same env var the reservations-board
// function already uses). No new secrets.
const { getStore } = require('@netlify/blobs');

const SITE_ID = '6c80951b-e8d1-4101-a9b3-02544170e304';
const NY_TZ = 'America/New_York';
const STOP_STORE = 'reservation-intake-stops';
const STOP_PREFIX = 'intake-stop-';
// One key per location per day (not one shared day object) so two locations
// stopped at the same moment cannot overwrite each other (lost-update race
// on read-modify-write). Day-keyed, so every day starts clean.
const STOP_CODES = ['JC', 'EW', 'EDI'];

function stopKey(date, code) {
  return `${STOP_PREFIX}${date}-${code}`;
}

const LOCATION_CODES = {
  'jersey city': 'JC',
  jc: 'JC',
  'east windsor': 'EW',
  ew: 'EW',
  edison: 'EDI',
  edi: 'EDI',
  ed: 'EDI',
};

function todayInNY() {
  return new Date().toLocaleDateString('en-CA', { timeZone: NY_TZ }); // YYYY-MM-DD
}

function validDateParam(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
  const parts = value.split('-').map(Number);
  const dt = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  if (dt.getUTCFullYear() !== parts[0] || dt.getUTCMonth() !== parts[1] - 1 || dt.getUTCDate() !== parts[2]) {
    return null;
  }
  return value;
}

function stopStore(token) {
  return getStore({ name: STOP_STORE, siteID: SITE_ID, token });
}

async function loadStops(date, token) {
  try {
    const store = stopStore(token);
    const entries = await Promise.all(
      STOP_CODES.map(async (code) => [code, await store.get(stopKey(date, code), { type: 'json' })])
    );
    const stops = {};
    for (const [code, entry] of entries) {
      if (entry && entry.stopped === true) stops[code] = entry;
    }
    return stops;
  } catch (err) {
    console.error(`[IntakeStop] stop read failed: ${err.message}`);
    return {};
  }
}

exports.handler = async (event) => {
  const token = process.env.NETLIFY_ACCESS_TOKEN;
  if (!token) {
    console.error('[IntakeStop] NETLIFY_ACCESS_TOKEN not set');
    return { statusCode: 500, body: JSON.stringify({ error: 'Not configured' }) };
  }

  if (event.httpMethod === 'POST') {
    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (err) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }
    // JSON "null"/string/number bodies parse fine but are not usable requests.
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
    }
    // One-way latch: any reopen/clear action is explicitly unsupported.
    if (body.action !== undefined && body.action !== 'stop-intake') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Unsupported action' }) };
    }
    // Location must be a plain string: array coercion (["EDI"] -> "EDI")
    // would otherwise accept non-string input, and non-strings crash .trim().
    if (typeof body.location !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Unknown location' }) };
    }
    const code = LOCATION_CODES[body.location.trim().toLowerCase()];
    if (!code) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Unknown location' }) };
    }
    // An explicit date must be a valid YYYY-MM-DD string AND today; only an
    // absent date defaults to today (an impossible date like Nov 31 must not
    // silently stop today). Non-string dates (arrays, numbers) are rejected —
    // validDateParam assumes a string and would throw on .split().
    let date;
    if (body.date === undefined || body.date === null || body.date === '') {
      date = todayInNY();
    } else if (typeof body.date !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid date' }) };
    } else {
      date = validDateParam(body.date);
      if (!date) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid date' }) };
      }
    }
    if (date !== todayInNY()) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Only today can be stopped' }) };
    }
    try {
      const entry = { stopped: true, at: new Date().toISOString() };
      // Single blind write to this location's own key: no read-modify-write,
      // so concurrent stops for different locations cannot clobber each other.
      await stopStore(token).setJSON(stopKey(date, code), entry);
      const stops = await loadStops(date, token);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        body: JSON.stringify({ ok: true, date, stops }),
      };
    } catch (err) {
      console.error(`[IntakeStop] stop write failed: ${err.message}`);
      return { statusCode: 502, body: JSON.stringify({ error: 'Failed to save stop state' }) };
    }
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const params = event.queryStringParameters || {};
  let date;
  if (params.date === undefined || params.date === null || params.date === '') {
    date = todayInNY();
  } else {
    date = validDateParam(params.date);
    if (!date) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid date' }) };
    }
  }
  const stops = await loadStops(date, token);
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify({ date, stops }),
  };
};
