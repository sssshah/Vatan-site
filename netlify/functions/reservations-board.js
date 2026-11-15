// Reservations board backend (reservations-board.html).
// GET: returns one day's rows out of Netlify Forms — the same store the
// "reservation" form already writes to — plus that day's sign-off state.
// Only display-safe fields leave here (initials, time, location code,
// party size, plus the opaque submission id). Email/phone/notes never leave.
//   ?loc=jc|ew|ed|edi   optional location filter (default: all)
//   ?date=YYYY-MM-DD    optional day in America/New_York (default: today)
// POST: records sign-off/dismiss state for one reservation in Netlify Blobs
// (day-keyed, so state naturally scopes to the day being viewed).
//   body: { date?, submissionId, done?, dismissed? } (date defaults to today)
// Requires NETLIFY_ACCESS_TOKEN (a Personal Access Token from Netlify
// User settings > Applications, no special scope needed beyond your own
// account access) set in Site configuration > Environment variables.
const { getStore } = require('@netlify/blobs');

const SITE_ID = '6c80951b-e8d1-4101-a9b3-02544170e304';
const FORM_NAME = 'reservation';
const SUBMISSION_PAGES = 10; // scans the ~1,000 most recently created submissions
const NY_TZ = 'America/New_York';
const SIGNOFF_STORE = 'reservation-signoffs';
const SIGNOFF_PREFIX = 'signoffs-';

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

function initials(first, last) {
  const f = (first || '').trim();
  const l = (last || '').trim();
  if (!f && !l) return '—';
  const fi = f ? `${f[0].toUpperCase()}.` : '';
  const l3 = l.slice(0, 3);
  const l3cap = l3 ? l3[0].toUpperCase() + l3.slice(1).toLowerCase() : '';
  return [fi, l3cap].filter(Boolean).join(' ');
}

function locationCode(location) {
  const value = (location || '').trim().toLowerCase();
  if (value === 'jersey city' || value === 'jc') return 'JC';
  if (value === 'east windsor' || value === 'ew') return 'EW';
  if (value === 'edison' || value === 'edi' || value === 'ed') return 'EDI';
  return '—';
}

// "7:00 PM" -> minutes since midnight, for sorting
function timeToMinutes(t) {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec((t || '').trim());
  if (!m) return 9999;
  let h = parseInt(m[1], 10) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return h * 60 + parseInt(m[2], 10);
}

function signoffStore() {
  return getStore(SIGNOFF_STORE);
}

async function loadSignoffs(date) {
  try {
    return (await signoffStore().get(`${SIGNOFF_PREFIX}${date}`, { type: 'json' })) || {};
  } catch (err) {
    console.error(`[ReservationsBoard] signoff read failed: ${err.message}`);
    return {};
  }
}

exports.handler = async (event) => {
  const token = process.env.NETLIFY_ACCESS_TOKEN;
  if (!token) {
    console.error('[ReservationsBoard] NETLIFY_ACCESS_TOKEN not set');
    return { statusCode: 500, body: JSON.stringify({ error: 'Not configured' }) };
  }

  if (event.httpMethod === 'POST') {
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch (err) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }
    const date = validDateParam(body.date) || todayInNY();
    const submissionId = String(body.submissionId || '');
    if (!submissionId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'submissionId required' }) };
    }
    try {
      const key = `${SIGNOFF_PREFIX}${date}`;
      const state = (await signoffStore().get(key, { type: 'json' })) || {};
      const prev = state[submissionId] || {};
      const entry = {
        done: typeof body.done === 'boolean' ? body.done : prev.done === true,
        dismissed: typeof body.dismissed === 'boolean' ? body.dismissed : prev.dismissed === true,
        at: new Date().toISOString(),
      };
      state[submissionId] = entry;
      await signoffStore().setJSON(key, state);
    } catch (err) {
      console.error(`[ReservationsBoard] signoff write failed: ${err.message}`);
      return { statusCode: 502, body: JSON.stringify({ error: 'Failed to save state', detail: String((err && err.message) || err).slice(0, 200) }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true, entry }) };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const params = event.queryStringParameters || {};
  const locParam = (params.loc || '').toLowerCase();
  const locationFilter = locParam === 'jc'
    ? 'Jersey City'
    : locParam === 'ew'
      ? 'East Windsor'
      : (locParam === 'edi' || locParam === 'ed')
        ? 'Edison'
        : null;
  const date = validDateParam(params.date) || todayInNY();

  const authHeaders = { Authorization: `Bearer ${token}` };

  try {
    const formsRes = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/forms`, { headers: authHeaders });
    if (!formsRes.ok) throw new Error(`list forms failed (${formsRes.status})`);
    const forms = await formsRes.json();
    const form = forms.find((f) => f.name === FORM_NAME);
    if (!form) throw new Error(`form "${FORM_NAME}" not found`);

    let submissions = [];
    for (let page = 1; page <= SUBMISSION_PAGES; page++) {
      const res = await fetch(
        `https://api.netlify.com/api/v1/forms/${form.id}/submissions?per_page=100&page=${page}`,
        { headers: authHeaders }
      );
      if (!res.ok) throw new Error(`list submissions failed (${res.status})`);
      const batch = await res.json();
      submissions = submissions.concat(batch);
      if (batch.length < 100) break;
    }

    const signoffs = await loadSignoffs(date);

    const rows = submissions
      .filter((s) => s.data && s.data.date === date)
      .filter((s) => !locationFilter || s.data.location === locationFilter)
      .map((s) => {
        const marks = signoffs[s.id] || {};
        return {
          id: s.id,
          time: s.data.time || '',
          location: locationCode(s.data.location),
          name: initials(s.data.first_name, s.data.last_name),
          party: s.data.party_size || '',
          done: marks.done === true,
          dismissed: marks.dismissed === true,
          minutes: timeToMinutes(s.data.time),
        };
      })
      .sort((a, b) => a.minutes - b.minutes)
      .map(({ minutes, ...rest }) => rest);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ date, location: locationFilter || 'All Locations', reservations: rows }),
    };
  } catch (err) {
    console.error(`[ReservationsBoard] ${err.message}`);
    return { statusCode: 502, body: JSON.stringify({ error: 'Failed to load reservations' }) };
  }
};
