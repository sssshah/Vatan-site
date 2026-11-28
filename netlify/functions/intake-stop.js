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

const SITE_ID = '6c809b51-e8d1-4103-a9b3-02544170e304';
const NY_TZ = 'America/New_York';
const STOP_STORE = 'reservation-intake-stops';
const STOP_PREFIX = 'intake-stop-';

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
    return (await stopStore(token).get(`${STOP_PREFIX}${date}`, { type: 'json' })) || {};
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
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch (err) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }
    // One-way latch: any reopen/clear action is explicitly unsupported.
    if (body.action !== undefined && body.action !== 'stop-intake') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Unsupported action' }) };
    }
    const code = LOCATION_CODES[(body.location || '').trim().toLowerCase()];
    if (!code) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Unknown location' }) };
    }
    const date = validDateParam(body.date) || todayInNY();
    if (date !== todayInNY()) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Only today can be stopped' }) };
    }
    try {
      const key = `${STOP_PREFIX}${date}`;
      const state = (await stopStore(token).get(key, { type: 'json' })) || {};
      state[code] = { stopped: true, at: new Date().toISOString() };
      await stopStore(token).setJSON(key, state);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        body: JSON.stringify({ ok: true, date, stops: state }),
      };
    } catch (err) {
      console.error(`[IntakeStop] stop write failed: ${err.message}`);
      return { statusCode: 502, body: JSON.stringify({ error: 'Failed to save stop state', detail: String((err && err.message) || err) }) };
    }
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const params = event.queryStringParameters || {};
  const date = validDateParam(params.date) || todayInNY();
  const stops = await loadStops(date, token);
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify({ date, stops }),
  };
};
