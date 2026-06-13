# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

No build step. Open any HTML file directly in a browser, or serve locally:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Architecture

This is a **pure static site** — no frameworks, no bundler, no package.json. Five self-contained HTML pages with all CSS inlined in `<style>` blocks:

- `index.html` — homepage (hero, about, promotions, dishes, gallery, reviews, locations)
- `menu.html` — full menu with filterable categories
- `reservations.html` — reservation form (embeds third-party booking widget)
- `catering.html` — catering inquiry page
- `contact.html` — location cards with hours, maps, social links

### Key patterns

**CSS is duplicated per-page.** Each HTML file has its own complete `<style>` block. Navigation, mobile menu, footer, and the design token `:root` variables are copied across files — not shared. When changing styles that appear on multiple pages, update each file individually.

**Design tokens** (`:root` in every file):
- `--saffron` / `--saffron-light` — primary CTA color
- `--maroon` / `--maroon-deep` — secondary/accent
- `--gold` / `--gold-light` — decorative highlights
- `--ivory` / `--ivory-dark` — background shades
- `--dark` / `--dark-mid` — nav and dark sections

**Fonts:** Cormorant Garamond (headings/display, serif) + DM Sans (body, sans-serif), loaded from Google Fonts.

### `promos.js` — the only shared JS config

Weekly specials are configured in `promos.js` as the `VATAN_PROMOS` array. Fields: `id`, `file` (filename inside `images/promos/`), `day`, `name`, `desc`, `price`, `active`, `lightbox`, `locations`. Set `active: false` to hide a promo without deleting it. `locations` can be `"All Locations"` (case-insensitive) or a comma-separated list like `"Jersey City, East Windsor"`.

The hero carousel (`#heroSpecialsCarousel`) and promo grid (`#promoGrid`) are built dynamically from `VATAN_PROMOS` in the inline `<script>` at the bottom of `index.html`. The `locations` field renders as a small `📍` line in both the carousel info strip and the grid card strip.

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
- Serves the static site files from GitHub (auto-deploys on every push to `main`)
- GitHub repo: `sssshah/Vatan-site`
- Form handling: `data-netlify="true"` on both forms — Netlify intercepts POST submissions, stores them in the Netlify dashboard, and sends email notifications to `info@vatans.com`
- Form detection must be **enabled** in Netlify dashboard (Site configuration > Forms) for this to work
- Form notification emails are configured under: Netlify dashboard > Sites > Forms > Form notifications

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
- `contact.html` → Netlify form name: `contact`
- `reservations.html` → Netlify form name: `reservation`
- Both forms capture a `marketing_optin` checkbox field (not yet wired to any marketing service)
- All submissions are visible in Netlify dashboard regardless of email delivery — check there if emails are missed

## Locations

- **Jersey City**: 808 Newark Ave, NJ 07306 · (201) 839-5426 · `tel:+12018395426`
- **East Windsor**: 761 Route 33 West, NJ 08520 · (609) 336-7333 · `tel:+16093367333`
- **Edison, NJ**: Coming Soon

## Roadmap / Future TODOs

_Add future version to-dos here. Format: `[ ] Description — v1.x`_

- [ ] Edison location: add full card to locations section and footer when open — v1.2
- [ ] Update promo `locations` field when Edison launches to reflect which specials it offers — ongoing
- [ ] Consider a shared nav include (SSI or templating) to avoid per-page duplication — v2.0
- [ ] Google Search Console verification meta tag — when site goes live
- [ ] Sitemap.xml — when site goes live

## Changelog

### v1.2 — 2026-06-13
- **Netlify forms:** Both `contact.html` and `reservations.html` forms now use `data-netlify="true"` with async `fetch()` POST — no mail client required. All fields have `name` attributes; hidden `form-name` input included per Netlify spec. Netlify routes submissions to `info@vatans.com` (configure email notification in Netlify dashboard under Settings > Forms).
- **Marketing opt-in:** Added "Yes, send me special offers and updates from Vatan" checkbox (`name="marketing_optin"`) to both forms. Captured in Netlify submission data; no API integration yet.
- **Success states:** Replaced "One More Step / email client" flow with animated SVG checkmark + friendly confirmation copy ("Message Sent!" / "Request Received!").
- **CC removed:** `VATAN_CONTACT_EMAIL` constant and all silent-CC logic removed from both pages. `info@vatans.com` is now the sole recipient via Netlify.
- **Microsoft 365 / GoDaddy:** `info@vatans.com` is live on M365.

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
