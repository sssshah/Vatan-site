/* One-time East Windsor closure: October 10, 2026. Remove after the event. */
(() => {
  'use strict';
  const closedDate = '2026-10-10';
  const message = 'East Windsor is closed Saturday, October 10, 2026. Please choose another date. Jersey City remains open.';
  const localPreview = ['localhost', '127.0.0.1'].includes(location.hostname)
    ? new URLSearchParams(location.search).get('closurePreview') : null;
  const dateInNJ = () => localPreview && /^2026-10-(09|10|11)$/.test(localPreview)
    ? localPreview : new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date());
  const style = document.createElement('style');
  style.textContent = `
    body.ew-closure-visible { padding-top: var(--closure-height) !important; }
    body.ew-closure-visible #navbar { top: var(--closure-height) !important; }
    body.ew-closure-visible .mobile-menu { top: calc(70px + var(--closure-height)) !important; }
    #ew-closure-banner { position: fixed; top: 0; left: 0; right: 0; z-index: 1001; background: #7A1C2E; color: #FDF6E9; text-align: center; padding: 12px 20px; font: 14px/1.5 'DM Sans', sans-serif; box-shadow: 0 2px 8px #0002; }
    #ew-closure-banner strong { color: #F0C878; }
    .ew-closure-disabled { opacity: .65; cursor: not-allowed; }
    .ew-date-note { color: #7A1C2E; font-size: 14px; line-height: 1.5; margin-top: 8px; }
    @media(max-width:600px) { #ew-closure-banner { font-size: 12px; padding: 9px 12px; } }
  `;
  document.head.append(style);
  let banner;
  const links = [...document.querySelectorAll('a[href]')].filter(a =>
    /ghar-ka-khana-by-vatan-east-windsor\.cloveronline\.com|0O0LC8xpSaWCNvVV9hE-kQ|east-windsor-1354547|761-nj-33-east-windsor/.test(a.href)
  ).map(a => ({a, href: a.getAttribute('href'), html: a.innerHTML, title: a.getAttribute('title')}));
  const fields = [
    {date: document.getElementById('resDate'), east: () => document.getElementById('selectedLocation')?.value === 'East Windsor'},
    {date: document.getElementById('pickupDate'), east: () => document.querySelector('input[name="location"]:checked')?.value.startsWith('East Windsor')}
  ].filter(f => f.date);
  fields.forEach(f => {
    f.note = document.createElement('p'); f.note.className = 'ew-date-note'; f.note.hidden = true;
    f.date.insertAdjacentElement('afterend', f.note);
    f.time = document.getElementById(f.date.id === 'resDate' ? 'resTime' : 'pickupTime');
  });
  function validateDates() {
    fields.forEach(f => {
      const blocked = f.east() && f.date.value === closedDate;
      f.date.setCustomValidity(blocked ? message : '');
      f.note.textContent = blocked ? message : ''; f.note.hidden = !blocked;
      if (f.time) {
        if (blocked && !f.time.disabled) { f.time.disabled = true; f.disabledTime = true; }
        if (!blocked && f.disabledTime) { f.time.disabled = false; f.disabledTime = false; }
      }
    });
  }
  function resizeBanner() {
    document.documentElement.style.setProperty('--closure-height', `${banner?.offsetHeight || 0}px`);
  }
  function refresh() {
    const today = dateInNJ();
    const visible = today >= '2026-10-09' && today <= closedDate;
    if (visible && !banner) {
      banner = document.createElement('aside'); banner.id = 'ew-closure-banner'; banner.setAttribute('role', 'status');
      document.body.prepend(banner); document.body.classList.add('ew-closure-visible');
      new ResizeObserver(resizeBanner).observe(banner);
    }
    if (visible) {
      banner.innerHTML = `<strong>East Windsor · ${today === closedDate ? 'Closed today, October 10 only' : 'Closed Saturday, October 10 only'}</strong><br>Reopening Sunday, October 11 at 11 AM. Open regular hours on all other Saturdays.`;
    } else if (banner) {
      banner.remove(); banner = null; document.body.classList.remove('ew-closure-visible');
    }
    resizeBanner();
    links.forEach(({a, href, html, title}) => {
      const blocked = today === closedDate;
      a.classList.toggle('ew-closure-disabled', blocked);
      if (blocked) {
        a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true');
        a.title = 'East Windsor reopens Sunday, October 11 at 11 AM'; a.textContent = 'Closed today · Reopens Sunday';
      } else {
        a.setAttribute('href', href); a.removeAttribute('aria-disabled'); a.innerHTML = html;
        if (title === null) a.removeAttribute('title'); else a.title = title;
      }
    });
    validateDates();
  }
  document.addEventListener('click', e => {
    if (e.target.closest('.ew-closure-disabled')) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  document.addEventListener('submit', e => {
    if (!['resForm', 'orderForm'].includes(e.target.id)) return;
    validateDates();
    const blocked = fields.find(f => f.date.form === e.target && f.date.validity.customError);
    if (blocked) { e.preventDefault(); e.stopImmediatePropagation(); blocked.date.reportValidity(); }
  }, true);
  document.addEventListener('change', validateDates);
  document.addEventListener('click', () => setTimeout(validateDates, 0));
  window.addEventListener('resize', resizeBanner);
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('focus', refresh);
  refresh(); setInterval(refresh, 30000);
  // Refresh open tabs at both midnight boundaries, as well as on return/focus.
  if (!localPreview) {
    ['2026-10-10T00:00:00-04:00', '2026-10-11T00:00:00-04:00'].forEach(boundary => {
      const delay = new Date(boundary).getTime() - Date.now();
      if (delay > 0 && delay < 2147483647) setTimeout(refresh, delay + 50);
    });
  }
})();
