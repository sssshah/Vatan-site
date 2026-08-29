// Read-only proxy for the reservations board (reservations-board.html).
// Reads today's rows straight out of Netlify Forms — the same store the
// "reservation" form already writes to — and returns only display-safe
// fields (initials, time, party size). Email/phone/notes never leave here.
//
// Requires NETLIFY_ACCESS_TOKEN (a Personal Access Token from Netlify
// User settings > Applications, no special scope needed beyond your own
// account access) set in Site configuration > Environment variables.
const SITE_ID = '6c80951b-e8d1-4101-a9b3-02544170e304';
const FORM_NAME = 'reservation';
const SUBMISSION_PAGES = 3; // scans the ~300 most recently created submissions
const NY_TZ = 'America/New_York';

function todayInNY() {
  return new Date().toLocaleDateString('en-CA', { timeZone: NY_TZ }); // YYYY-MM-DD
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

// "7:00 PM" -> minutes since midnight, for sorting
function timeToMinutes(t) {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec((t || '').trim());
  if (!m) return 9999;
  let h = parseInt(m[1], 10) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return h * 60 + parseInt(m[2], 10);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const token = process.env.NETLIFY_ACCESS_TOKEN;
  if (!token) {
    console.error('[ReservationsBoard] NETLIFY_ACCESS_TOKEN not set');
    return { statusCode: 500, body: JSON.stringify({ error: 'Not configured' }) };
  }

  const locParam = ((event.queryStringParameters && event.queryStringParameters.loc) || '').toLowerCase();
  const locationFilter = locParam === 'jc' ? 'Jersey City' : locParam === 'ew' ? 'East Windsor' : null;

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

    const today = todayInNY();

    const rows = submissions
      .filter((s) => s.data && s.data.date === today)
      .filter((s) => !locationFilter || s.data.location === locationFilter)
      .map((s) => ({
        time: s.data.time || '',
        name: initials(s.data.first_name, s.data.last_name),
        party: s.data.party_size || '',
        minutes: timeToMinutes(s.data.time),
      }))
      .sort((a, b) => a.minutes - b.minutes)
      .map(({ minutes, ...rest }) => rest);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ date: today, location: locationFilter || 'All Locations', reservations: rows }),
    };
  } catch (err) {
    console.error(`[ReservationsBoard] ${err.message}`);
    return { statusCode: 502, body: JSON.stringify({ error: 'Failed to load reservations' }) };
  }
};
