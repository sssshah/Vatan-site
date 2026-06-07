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

Weekly specials are configured in `promos.js` as the `VATAN_PROMOS` array. Fields: `id`, `file` (filename inside `images/promos/`), `day`, `name`, `desc`, `price`, `active`, `lightbox`. Set `active: false` to hide a promo without deleting it.

The index.html hardcodes the four promo cards in HTML and the hero ticker inline — `promos.js` is the source of truth for data but `index.html` also has matching hardcoded markup that must be kept in sync when promos change.

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
