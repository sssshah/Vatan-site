// Proxies subscriber signups to MailerLite. Kept isolated from the Netlify Forms
// submission flow — the caller fires this fire-and-forget, so nothing here can
// block or fail a reservation/contact submission. Toggle off anytime by setting
// MAILERLITE_ENABLED to anything other than "true" in Netlify env vars.
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (process.env.MAILERLITE_ENABLED !== 'true') {
    return { statusCode: 200, body: JSON.stringify({ skipped: true }) };
  }

  let email, source;
  try {
    ({ email, source } = JSON.parse(event.body || '{}'));
  } catch (err) {
    console.error('[MailerLite] Invalid request body:', err.message);
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid body' }) };
  }

  if (!email || typeof email !== 'string') {
    console.error(`[MailerLite] Missing email in request, source=${source || 'unknown'}`);
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing email' }) };
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error(`[MailerLite] MAILERLITE_API_KEY not set — skipping subscribe, source=${source || 'unknown'}`);
    return { statusCode: 200, body: JSON.stringify({ skipped: true }) };
  }

  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error(`[MailerLite] Subscribe failed (${res.status}), source=${source || 'unknown'}: ${detail}`);
      return { statusCode: 502, body: JSON.stringify({ error: 'MailerLite request failed' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(`[MailerLite] Subscribe error, source=${source || 'unknown'}: ${err.message}`);
    return { statusCode: 502, body: JSON.stringify({ error: 'MailerLite request failed' }) };
  }
};
