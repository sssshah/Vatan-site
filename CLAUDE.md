# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

No build step. Open any HTML file directly in a browser, or serve locally:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Architecture

This is a **pure static site** — no frameworks, no bundler, no package.json. All CSS is inlined per-page in `<style>` blocks. The site has grown well past the original six pages documented here through v1.4 — current inventory:

**Core pages:**
- `index.html` — homepage (hero, about, promotions, dishes, gallery, reviews, locations)
- `all-menu.html` — full menu with filterable categories; renders dynamically from `menu-data.js` (`VATAN_MENU`)
- `reservations.html` — reservation form (native Netlify Forms submission, form name `reservation`)
- `catering.html` — catering inquiry page
- `contact.html` — location cards with hours, maps, social links
- `order.html` — direct pickup order form (v1.3+); builds menu from `menu-data.js`
- `faq.html` — sitewide FAQ page
- `privacy-policy.html` — privacy policy

**Local-SEO location/topic landing pages** (added post-v1.4, previously undocumented):
- `thali.html`, `indo-chinese.html` — dish-focused landing pages
- `catering-jersey-city.html`, `catering-east-windsor.html` — per-location catering landing pages
- `jain-food-east-windsor.html`, `jain-swaminarayan-jersey-city.html` — Jain/Swaminarayan-friendly dining landing pages
- `eggless-bakery-east-windsor.html` — bakery landing page
- `indian-catering-mercer-county.html`, `indian-restaurant-near-princeton-nj.html`, `restaurant-near-baps-robbinsville.html` — geo-targeted landing pages (Mercer County, Princeton, BAPS Akshardham Robbinsville)

**Blog:**
- `blog.html` — blog index
- `blog/*.html` — 23 article pages (grew from the original 10 written up in the v1.4 changelog entry; that entry's file list is now incomplete — treat the `blog/` directory listing as current truth)

**Kiosk / display pages (not linked from nav, no login):**
- `reservations-board.html` — added v1.7. Airport-departures-style live display of today's reservations for a host stand TV/tablet. `?loc=ew` / `?loc=jc` scopes to one location; no param shows all locations. Polls `netlify/functions/reservations-board.js` every 5 minutes. Shows only time, party size, and privacy-safe initials (first initial + first 3 letters of last name) — never email, phone, or notes. Deliberately has no login: the URL is unlisted (like the print-review-card templates below) and the data it shows is low-sensitivity. See Serverless Functions below for how it reads Netlify Forms data.

**Not real pages — exclude from page-list/nav-audit work:**
- `index_backup.html`, `all-menu.backup-2026-07-15.html`, `all-menu.backup-2026-07-15-before-font-bump.html` — manual backups, not linked from nav, not deployed-as-current
- `google466a17476ad238df.html`, `googleafd2aa76994074ad.html` — Search Console verification files; must stay at site root, never delete or move
- `print-review-card-jc.html`, `print-review-card-ew.html`, `print-review-card-ew-single.html` — print-only QR review-card templates (see memory: Review QR cards)
- `_og-image-preview.html` — local preview tool for OG image, not deployed content

### Key patterns

**CSS is duplicated per-page.** Each HTML file has its own complete `<style>` block. Navigation, mobile menu, footer, and the design token `:root` variables are copied across files — not shared. When changing styles that appear on multiple pages, update each file individually.

**Design tokens** (`:root` in every file):
- `--saffron` / `--saffron-light` — primary CTA color
- `--maroon` / `--maroon-deep` — secondary/accent
- `--gold` / `--gold-light` — decorative highlights
- `--ivory` / `--ivory-dark` — background shades
- `--dark` / `--dark-mid` — nav and dark sections

**Fonts:** Cormorant Garamond (headings/display, serif) + DM Sans (body, sans-serif), loaded from Google Fonts.

### `promos.js` — weekly specials config

Weekly specials are configured in `promos.js` as the `VATAN_PROMOS` array. Fields: `id`, `file` (filename inside `images/promos/`), `day`, `name`, `desc`, `price`, `active`, `lightbox`, `locations`. Set `active: false` to hide a promo without deleting it. `locations` can be `"All Locations"` (case-insensitive) or a comma-separated list like `"Jersey City, East Windsor"`.

The hero carousel (`#heroSpecialsCarousel`) and promo grid (`#promoGrid`) are built dynamically from `VATAN_PROMOS` in the inline `<script>` at the bottom of `index.html`. The `locations` field renders as a small `📍` line in both the carousel info strip and the grid card strip.

### `menu-data.js` — single source of truth for menu items

All 19 menu categories and their items are defined in `menu-data.js` as the `VATAN_MENU` array. This is the **only place prices need to be updated** — both `order.html` and any future dynamic `all-menu.html` render from it.

```js
// Structure
{ id, name, emoji, label, tagline, headerImg, items: [
  { id, name, desc, price, img, tags, note, section, active }
]}
```

- `active: false` hides an item from the order form without deleting it
- `tags`: any combo of `"J"` (Jain Friendly), `"S"` (Swaminarayan Friendly), `"V"` (Vegan Friendly) — e.g. `["J","S","V"]`
- `section`: sub-heading within a category (e.g. `"Tandoor Breads"`, `"Bakery Pastries"`)
- `img`: path inside `images/food/` or `null` if no image yet
- Items with `section` group under a sub-header in the order accordion

**Non-technical price updates:** Edit `menu-data.js` directly on GitHub.com (pencil icon → change the number → commit). Netlify auto-deploys within ~1 minute. No local pull needed for price-only changes.

The file ends with `if (typeof module !== 'undefined') module.exports = VATAN_MENU;` so it works in both browser (`<script src>`) and Node (future tooling).

### Shared nav pattern (v1.1+)

All 5 pages have a **"Call Us" dropdown** in the nav — a button with phone icon that opens a 3-location dropdown (Jersey City, East Windsor, Edison Coming Soon). It sits between `.nav-links` and `.hamburger`. On mobile (≤768px), text and chevron are hidden so it displays as a round phone icon button. The dropdown closes on outside click via a `document.addEventListener('click', ...)` handler. All pages also declare `const VATAN_CONTACT_EMAIL = 'nraikundalia@yahoo.com'` at the top of their script block — used as silent CC on mailto links only; never shown publicly.

### JavaScript on index.html

All JS is at the bottom of `index.html` as an inline `<script>`. It handles:
- Scroll-based nav style change and `.reveal` animations (IntersectionObserver)
- Animated milestone counters (count up on scroll into view)
- Hero specials ticker (cycles through `.hs-item` elements every 2.5s)
- Promo lightbox (`openLightbox(index)` / `closeLightbox()`) with prev/next navigation
- Mobile hamburger menu toggle
- Floating "back to top" button visibility

### Images

- `images/food/` — dish photos (JPG)
- `images/promos/` — weekly special flyer images (JPG); filenames referenced in `promos.js` and hardcoded in `index.html`
- `images/logo.png` — site logo used in nav and footer across all pages

## Infrastructure

### DNS — GoDaddy
GoDaddy owns `vatans.com` and manages all DNS records:
- **A / CNAME records** → point `vatans.com` to Netlify (site is served from Netlify's CDN)
- **MX records** → point to Microsoft 365 (all `@vatans.com` email routes to M365)

### Hosting — Netlify
- Netlify site name: `vatan-nj` · Site ID: `6c80951b-e8d1-4101-a9b3-02544170e304`
- Serves the static site files from GitHub (auto-deploys on every push to `main`)
- GitHub repo: `sssshah/Vatan-site`
- Form handling: `data-netlify="true"` on all three forms — Netlify intercepts POST submissions, stores them in the Netlify dashboard, and sends email notifications to `info@vatans.com`
- Form detection must be **enabled** in Netlify dashboard (Site configuration > Forms) for this to work
- Form notification emails are configured under: Netlify dashboard > Sites > Forms > Form notifications
- **Known issue:** notification emails have landed in the `info@vatans.com` spam folder (confirmed for the `reservation` form, 2026-08-18) — Netlify *did* send them, this is an M365-side deliverability gap (sender domain is Netlify's own infra, not `vatans.com`, so it won't match `vatans.com`'s SPF/DKIM). Not yet fixed — likely needs a Safe Sender / mail flow rule in M365. Check spam folder, not just inbox, if a submission seems to have gone missing.

### Email — Microsoft 365 via GoDaddy
- `info@vatans.com` is a live M365 mailbox (set up through GoDaddy)
- Receives Netlify form notification emails
- Netlify sends notifications from its own email infrastructure — the sender display name reflects the Netlify account name, not `vatans.com`

### Form submission flow
```
User submits form on vatans.com
        ↓
fetch() POSTs to Netlify (async, no mail client opens)
        ↓
Netlify stores submission in dashboard + sends notification email
        ↓
Notification arrives at info@vatans.com (M365 via GoDaddy MX records)
```

### Forms
- `contact.html` → Netlify form name: `contact` · email notification confirmed working (2026-08-18, lands in spam — see above)
- `reservations.html` → Netlify form name: `reservation` · email notification confirmed working (2026-08-18, lands in spam — see above)
- `order.html` → Netlify form name: `takeout-order` · **notification setup status unverified** — the v1.3 launch note said to add this "immediately after first deploy" but there's no confirmation it was ever done or tested. Verify in Netlify dashboard → Forms → Form notifications before relying on it.
- All three forms have a honeypot spam field (`netlify-honeypot="bot-field"`, hidden `<input name="bot-field">`) — Netlify silently discards submissions where it's filled
- `contact.html` and `reservations.html` capture a `marketing_optin` checkbox and, if checked, also subscribe the email to MailerLite (see Serverless Functions below). `order.html` has the same checkbox but is **not** wired to MailerLite (deliberately out of scope, may be added later)
- All submissions are visible in Netlify dashboard regardless of email delivery — check there if emails are missed

### Environment variables
Set in Netlify dashboard → Project configuration → Environment variables (never in git):
- `MAILERLITE_API_KEY` — MailerLite API token, marked "Contains secret values". Scope: All scopes (the "Specific scopes"/Functions-only option is locked behind a paid plan upgrade on the current account)
- `MAILERLITE_ENABLED` — `"true"` / `"false"` (or unset). Kill switch for the MailerLite integration — flip and no redeploy is needed, since the function reads it at invocation time
- Both are set to "Same value for all deploy contexts," which covers Production, Deploy Previews, and Branch deploys — but **not** "Local development." `netlify dev` / `netlify env:get` currently cannot read env vars for this site at all (tested 2026-08-18, appears to be an account-level CLI/API permission issue, unrelated to the vars themselves) — local CLI testing is effectively broken; test via a Deploy Preview instead
- `NETLIFY_ACCESS_TOKEN` — added v1.7 for the reservations board. A Netlify **Personal Access Token** (User settings → Applications → New access token, not a site-scoped API key), marked "Contains secret values," set to "Same value for all deploy contexts." Lets `reservations-board.js` read Forms submissions via Netlify's own API. Created and added 2026-08-28, verified working on the reservations board's Deploy Preview (PR #2) before merge.

### Serverless Functions (`netlify/functions/`)
- `vatan-mailerlite-subscribe.js` — proxies email signups to MailerLite's API (`connect.mailerlite.com/api/subscribers`), added 2026-08-18. Keeps the API key server-side; the static pages never see it.
  - No-ops (returns success, logs nothing) if `MAILERLITE_ENABLED` isn't `"true"`
  - Called fire-and-forget from `reservations.html` and `contact.html` — fires only after the existing Netlify Forms submission already succeeded, only if `marketing_optin` is checked and the honeypot field is empty. Wrapped in try/catch on the client side so a MailerLite failure of any kind (bad key, API down, disabled) can never block or fail the underlying form submission or surface an error to the user
  - Currently sends only `{ email }` — no source tagging (`reservation` vs `contact`) reaches MailerLite yet, since that needs a custom field or group to already exist there. Client still passes a `source` value to the function for logging purposes even though it isn't forwarded to MailerLite today
  - Failures are logged server-side via `console.error`, prefixed `[MailerLite]`, success is silent by design. View at: Netlify dashboard → Logs & metrics → Functions → `vatan-mailerlite-subscribe` (production deploys show here directly; a function that only exists on a Deploy Preview requires going through Deploys → that specific deploy → Functions instead). Logs are retained 24 hours.
- `reservations-board.js` — added v1.7. Read-only GET endpoint backing `reservations-board.html`. Looks up the `reservation` Netlify Form by name, scans its ~300 most recently created submissions, filters to rows whose `date` field matches today (America/New_York) and, if `?loc=` was passed, whose `location` field matches, then returns only `{ time, name, party }` per row — `name` is reduced to initials server-side before it ever reaches the browser.
  - Introduces no new data store — reads the same Netlify Forms submissions the `reservation` form already writes to. Requires `NETLIFY_ACCESS_TOKEN` (see above); returns HTTP 500 with a `console.error` if it's missing.
  - **Known limitation:** scans only the latest ~300 submissions (by submission creation time, not reservation date) per request, since Netlify's Forms API has no server-side filter by field value. A reservation booked far enough in advance that 300 newer submissions have since come in would be missed. Fine at current volume; revisit (raise `SUBMISSION_PAGES` or add Netlify Blobs caching) if the form's submission rate grows a lot.
  - No caching between polls (`Cache-Control: no-store`) — each of the board's 5-minute polls re-fetches from Netlify's API fresh.

### `netlify.toml`
- `[functions] directory = "netlify/functions"` — added 2026-08-18 alongside the MailerLite function
- Four `[[headers]]` blocks set `Cache-Control`: long-cache (`immutable`, 1 year) for `/images/*` and `/*.js`; `must-revalidate, max-age=0` for `/promos.js` and `/menu-data.js` specifically, since those are live-edited content files that must never be served stale

### `_headers` and `_redirects` (repo root)
Both predate the MailerLite work and were previously undocumented here:
- `_headers` — sitewide security headers on `/*`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security` (HSTS, 1 year, includes subdomains, preload)
- `_redirects` — one 301 redirect consolidating a duplicate blog article URL (`blog-discovering-heart-indian-vegetarian-cuisine-east-windsor.html` → `blog-discover-best-indian-thali-east-windsor.html`)

## Locations

- **Jersey City**: 808 Newark Ave, NJ 07306 · (201) 839-5426 · `tel:+12018395426`
- **East Windsor**: 761 Route 33 West, NJ 08520 · (609) 336-7333 · `tel:+16093367333`
- **Edison, NJ**: Coming Soon

## Roadmap / Future TODOs

_Add future version to-dos here. Format: `[ ] Description — v1.x`_

- [ ] **Verify Netlify email notification for `takeout-order` form actually exists and works** — was supposed to be set up immediately after order.html's first deploy but was never confirmed; check Netlify dashboard → Forms → Form notifications
- [ ] Decide whether to add MailerLite signup to `order.html` and/or create a MailerLite custom field for source tagging (reservation/contact/order) — currently only email is captured, no segmentation
- [ ] Add item images to `menu-data.js` as `images/food/` paths are confirmed — ongoing
- [ ] Edison location: add full card to locations section and footer when open — v1.2
- [ ] Update promo `locations` field when Edison launches to reflect which specials it offers — ongoing
- [ ] Consider a shared nav include (SSI or templating) to avoid per-page duplication — even more valuable now given the page count has grown to 20+ — v2.0
- [ ] Add JSON-LD structured data to `all-menu.html`, `order.html`, `reservations.html`, and `blog.html` — currently the only pages with zero schema; most other pages already have Restaurant/Service/FAQPage/BreadcrumbList markup
- [ ] Reconcile the v1.4 changelog's 10-article blog list against the current 23 files in `blog/` — changelog entry is stale, `blog/` directory listing is current truth

**Done, previously listed here as pending — confirmed 2026-08-23:**
- [x] Google Search Console verification meta tag — live sitewide (`google-site-verification` meta on every page, plus two verification files at site root)
- [x] Sitemap.xml — exists at root with per-image entries and `lastmod`; `robots.txt` exists and references it
- [x] Refactor `all-menu.html` to render dynamically from `menu-data.js` — done, confirmed using `VATAN_MENU` for category nav and menu body

**Done, previously listed here as pending — confirmed 2026-08-28:**
- [x] M365 Safe Sender / mail flow rule for Netlify form notifications — `info@vatans.com` no longer seeing them land in spam

## Design principles & gotchas

**`display:flex` on `<li>` breaks bullet rendering.** Every child element (including `<strong>`, `<a>`) becomes a flex item with its own box, creating unexpected gaps. Use `position:relative` + `padding-left` on the `li` and `position:absolute;left:0` on `li::before` for the bullet instead.

**`position:sticky` in CSS Grid requires `align-self:stretch` on the grid item.** If the grid uses `align-items:start`, the right column shrinks to its content height — the sticky child's containing block is only as tall as the element itself, so sticky never scrolls. Fix: add `align-self:stretch` to the sidebar column so its containing block extends the full grid row height.

**`menu-data.js` is the single source of truth for prices.** Never hard-code prices in `order.html` or `all-menu.html`. Update `menu-data.js` only — once for both pages.

**URL params for pre-selected state.** `order.html?loc=jc` / `?loc=ew` auto-checks the matching location radio on load. Use this pattern on any page that needs context from a referring link (location cards, modal CTAs, etc.).

**Netlify form auto-registration.** Any form with `data-netlify="true"` and a `name` attribute is automatically detected and registered by Netlify at deploy time — no manual dashboard step needed to create the form. Email notifications, however, must be configured manually per form.

**GitHub web editor workflow for non-technical updates.** Editing `menu-data.js` (or `promos.js`) via the GitHub.com pencil icon creates a commit directly on `main`. Netlify auto-deploys within ~1 minute. If you also work locally, always `git pull` before editing — otherwise your local branch will be behind `origin/main` and the next push will require a merge.

**`-webkit-line-clamp:2` for multi-line text truncation in item rows.** Use `display:-webkit-box; -webkit-box-orient:vertical; overflow:hidden; -webkit-line-clamp:2` instead of `white-space:nowrap` — `nowrap` causes horizontal overflow on long item names/descriptions.

**iOS Safari: `position:sticky` collapses to ~0 height when it contains an `overflow:auto` child.** This affects the category tab bar in `test-menu.html` — on iPhone, the sticky bar shrinks to just a bottom border line when the user scrolls. Do NOT use `position:sticky` on `.cat-nav-wrapper` on mobile. The fix in `test-menu.html` is a JS scroll listener (labelled `MOBILE CAT-NAV PIN`) that measures the element's natural document position on page load (`triggerY`), then switches to `position:fixed` only once the user scrolls past that point. This avoids both failure modes: (1) applying `fixed` immediately on load (which pinned the bar over the hero section before the page had scrolled), and (2) using `sticky` while scrolled (which triggered the iOS collapse bug). **Never remove or rewrite this IIFE without re-testing on a real iPhone or the iOS Simulator.** To test locally on mobile without burning a Netlify deploy: start the server (`python3 -m http.server 8080`), find your Mac's local IP (`ipconfig getifaddr en0`), and open `http://[ip]:8080/test-menu.html` in iPhone Safari on the same WiFi network.

**Active tab underline on `.cat-tab` uses `box-shadow`, not `border-bottom`.** The `.cat-nav` strip has `overflow-x:auto`, which implicitly sets `overflow-y:auto` and clips any negative-margin bleed. Using `border-bottom:2px solid + margin-bottom:-2px` (the standard tab underline trick) is clipped by the overflow container and only shows intermittently across browsers. The fix: `box-shadow:inset 0 -2px 0 var(--saffron)` renders inside the element's own box and is never clipped. Do not revert to `border-bottom` for this indicator.

## Changelog

### v1.7 — 2026-08-28
- **Reservations board:** Added `reservations-board.html` + `netlify/functions/reservations-board.js` to solve "no way to show today's reservations to someone in the restaurant" without adding a database. The function reads today's rows straight out of the existing `reservation` Netlify Form via Netlify's own Forms API, reduces each row to privacy-safe fields (time, party size, initials — first initial + first 3 letters of last name), and the page polls it every 5 minutes in a full-screen airport-departures-board layout. Scoped per location via `?loc=ew` / `?loc=jc`; no login, unlisted URL, no email/phone/notes ever leave the function. Requires a new `NETLIFY_ACCESS_TOKEN` env var, created and added 2026-08-28, verified working via the PR's Deploy Preview before merge. Refresh interval was changed from an initial 30 minutes to 5 minutes before merge — client-side polling only, so load scales with however many physical screens are actually open, not with traffic.
- **Docs fix:** `reservations.html`'s Core pages description corrected from "embeds third-party booking widget" (stale) to "native Netlify Forms submission" — it was never a widget.

### v1.6 — 2026-08-23
- **Weekly specials band on `all-menu.html`:** Added a `.specials-band` section between the hero and the legend/category tab bar, built at load time from `VATAN_PROMOS` (`active:true` only, same data source as the homepage carousel/grid — nothing new to maintain). Shows each active promo's real photo (`images/promos/`), day, name, price, and a 📍 location line when a promo isn't sitewide. Band is skipped entirely if no promo is active.
- **New self-contained lightbox on `all-menu.html`:** `all-menu.html` had no lightbox before this; `#specLightbox` + `openSpecLightbox()`/`closeSpecLightbox()`/`specLbNav()` were added so tapping a specials card opens the full flyer image with prev/next nav and a "Reserve a Table" CTA, mirroring the homepage's `#lightbox` pattern but fully independent (own IDs/functions, no shared state).
- **Hero simplified:** Removed the four decorative badge pills (`🌿 100% Vegetarian` / `🫙 Jain Options` / `🙏 Swaminarayan Friendly` / `🌱 Vegan Available`) from the `all-menu.html` hero — Jain/Swaminarayan/Vegan were already restated seconds later by the legend bar, so keeping the full pill row was the same claim twice. The vegetarian claim was folded into the tagline instead: *"Authentic, 100% vegetarian flavors of India — crafted fresh, served with love."* Tagline text opacity bumped `0.6` → `0.82` to match the site's established readable-label-on-dark convention (same value used for nav links).
- **Disclaimer relocated:** "Photos are for illustration only — actual dishes may vary." moved from its own bar under the hero into the footer, next to the copyright line.
- **Mobile spacing tightened on `all-menu.html`:** hero side/bottom padding reduced (top padding kept at `4rem` — must stay clear of the 70px fixed nav, learned the hard way when a first pass over-trimmed it and the nav's saffron border sliced through the "Our Menu" headline), specials-band subtext removed in favor of a short "Scroll →" hint, and category-section spacing trimmed (`.menu-section` margin `4rem`→`2.5rem`, `.menu-body` top padding `2.5rem`→`1.2rem` above the first section) — all while keeping each section's border-bottom divider so categories stay visually distinct.

### v1.5 — 2026-08-18
- **MailerLite integration:** Added `netlify/functions/vatan-mailerlite-subscribe.js`, a serverless proxy that subscribes an email to MailerLite when a customer checks `marketing_optin` on the reservation or contact form. Fully modular — toggled by the `MAILERLITE_ENABLED` env var, fails silently on any error, and never blocks or affects the existing Netlify Forms submission. `order.html` intentionally not wired up. See Infrastructure → Environment variables / Serverless Functions above for full details.
- **Discovered and documented (previously untracked):** root-level `_headers` and `_redirects` files, and the `netlify.toml` `[[headers]]` caching rules — all pre-existing but never written down in this file until now.
- **Discovered:** `reservation` form notification emails to `info@vatans.com` land in spam (M365 deliverability, not a Netlify failure) — not fixed yet, tracked in Roadmap.
- **Discovered:** `takeout-order` form's email notification setup (called out as a TODO since v1.3) was never actually confirmed — status unknown, needs verification.

### v1.4 — 2026-06-16
- **Blog section:** Reconstructed 10 blog articles from Wayback Machine cache and added a `blog.html` index page. Articles span Nov 28, 2025 – Feb 12, 2026 covering Indian cuisine, seasonal dishes, catering, and street food.
- **`blog.html`:** Blog index with 10 article cards in a 3-column responsive grid. Cards include category badge, date, excerpt (3-line clamp), and full-card click target. Linked from nav and footer on all pages.
- **10 article pages:** Each is a self-contained HTML file following the site's CSS-per-page pattern. Layout: dark hero (title/meta at bottom), cover image below hero, `max-width:800px` content body with h2 sections, FAQ box, and CTA block. Cover images use original `vatans.com/wp-content/uploads/` URLs.
  - `blog-why-indian-cuisine-ultimate-romantic-date-night.html` — Feb 12, 2026
  - `blog-discover-best-indian-thali-east-windsor.html` — Jan 30, 2026
  - `blog-why-vatan-best-choice-vegetarian-food-east-windsor.html` — Jan 30, 2026
  - `blog-discovering-heart-indian-vegetarian-cuisine-east-windsor.html` — Jan 27, 2026
  - `blog-best-indian-lunch-dinner-snacks-east-windsor-winter.html` — Dec 23, 2025
  - `blog-best-family-friendly-indian-dishes-december.html` — Dec 18, 2025
  - `blog-how-to-choose-perfect-indian-catering-menu-holiday-parties.html` — Dec 10, 2025
  - `blog-10-most-popular-indian-street-food-items.html` — Dec 6, 2025
  - `blog-why-november-best-time-dal-khichdi.html` — Nov 29, 2025
  - `blog-why-indian-food-perfect-for-winter.html` — Nov 28, 2025
- **Nav update:** "Blog" link added between Contact and Reserve a Table on all 6 existing pages (`index.html`, `all-menu.html`, `reservations.html`, `catering.html`, `contact.html`, `order.html`) — both desktop nav and mobile menu.
- **Footer update:** `index.html` footer blog link updated from `https://vatans.com/blog/` to `blog.html`.

### v1.3 — 2026-06-14
- **`order.html`:** New direct pickup order page. Customers browse all 19 menu categories in collapsible accordions, add items with +/− controls, and submit via Netlify form (`takeout-order`). Restaurant calls back within 15 minutes to confirm.
- **`menu-data.js`:** New shared JS file — single source of truth for all menu items, prices, descriptions, and images. `order.html` loads it via `<script src="menu-data.js">`. Future `all-menu.html` refactor will use it too.
- **Order Direct entry points:** "Order Direct" button added to the Order Online modal in `index.html`, `all-menu.html`, and `contact.html`. Also added to each location card in `index.html` (Jersey City → `order.html?loc=jc`, East Windsor → `order.html?loc=ew`).
- **Location auto-select:** `order.html` reads `?loc=jc` / `?loc=ew` URL param on load and pre-checks the matching location radio, skipping manual selection for users arriving from a specific location card.
- **Business hours time slots:** Available pickup times are generated from a `BIZ_HOURS` object (per-location, per-day). Times already past (+ 30-minute lead time) are excluded when the selected date is today. EW is closed Mondays; shows warning and disables time select on that day.
- **Sticky summary panel:** "Your Order" sidebar stays fixed as the user scrolls through the accordion. Fixed by adding `align-self:stretch` to the summary column so its containing block spans the full grid row height.
- **Back-to-top button:** Floating round button appears after 400px scroll; sits above the mobile bar on small screens.
- **Clear Order:** "Clear All" button in the desktop summary and "Clear" link in the mobile bottom bar reset all quantities and refresh the UI.
- **Mobile bottom bar:** Fixed bar at bottom of screen (≤900px) shows item count, estimated total, "Clear" link, and "Place Order" button.
- **Netlify form — `takeout-order`:** Uses `data-netlify="true"` and `netlify-honeypot="bot-field"`. Order items serialized to `order_items` hidden field as plain text before submit. **After first deploy, add email notification in Netlify dashboard → Forms → `takeout-order` → Notifications → `info@vatans.com`.**

### v1.2 — 2026-06-13
- **Netlify forms:** Both `contact.html` and `reservations.html` forms now use `data-netlify="true"` with async `fetch()` POST — no mail client required. All fields have `name` attributes; hidden `form-name` input included per Netlify spec. Netlify routes submissions to `info@vatans.com` (configure email notification in Netlify dashboard under Settings > Forms).
- **Marketing opt-in:** Added "Yes, send me special offers and updates from Vatan" checkbox (`name="marketing_optin"`) to both forms. Captured in Netlify submission data; no API integration yet.
- **Success states:** Replaced "One More Step / email client" flow with animated SVG checkmark + friendly confirmation copy ("Message Sent!" / "Request Received!").
- **CC removed:** `VATAN_CONTACT_EMAIL` constant and all silent-CC logic removed from both pages. `info@vatans.com` is now the sole recipient via Netlify.
- **Microsoft 365 / GoDaddy:** `info@vatans.com` is live on M365.
- **Email subjects:** Contact form now sets subject dynamically based on selected topic (e.g. "New Feedback / Compliment — Vatan"); reservation form subject is "New Reservation — Vatan". Honeypot (`netlify-honeypot="bot-field"`) added to both forms to reduce spam.
- **Contact form note field:** Hidden `note` field moved to end of form so it appears last in Netlify submission emails.
- **Policy list rendering fix:** `reservations.html` "Good to Know" list switched from `display:flex` to `position:relative` + `padding-left` for bullet — fixes extra whitespace gaps around `<strong>` and `<a>` tags that flex was creating.

### v1.1 — 2026-06-10
- **SEO:** Added `<title>`, `<meta description>`, Open Graph, Twitter Card, canonical, geo meta, and `robots` tags to all 5 pages. Added JSON-LD Restaurant structured data (both locations) to `index.html`.
- **Call Us nav dropdown:** Added phone icon button to every page's nav; opens a dropdown with Jersey City, East Windsor, and Edison (Coming Soon). On mobile (≤768px), collapses to a round icon. Closes on outside click.
- **`promos.js` locations field:** Added `locations` field to all 4 promos (default `"All Locations"`). Case-insensitive — `"all locations"` normalizes to `"All Locations"`.
- **Location display on promos:** Hero carousel and promo grid now render a `📍 [locations]` line under each special's name.
- **Specials footnote:** Added note below promo grid — specials may vary by location, call to confirm.
- **Reservation footnote:** Success state and form note updated — reservation not confirmed until a response is received; includes direct phone numbers.
- **Contact footnote + CC:** Form note updated with callback guidance; `mailto:` now silently CCs `nraikundalia@yahoo.com` (never shown publicly).
- **`VATAN_CONTACT_EMAIL` constant:** Added `const VATAN_CONTACT_EMAIL = 'nraikundalia@yahoo.com'` to all 5 pages' script blocks.
- **About section:** Text updated to mention Jersey City, East Windsor, and Edison (coming soon). Milestone counter updated to 3 "NJ Locations".
