# Vatan SEO — Action Plan & To Do
**Audit date:** 2026-06-26 | **Health score:** 55 / 100
**Owners:** Me = Claude (code changes); You = Sam (accounts, content, third-party)

---

## Phase 1 — Critical (this week)

- [ ] **1. Fix JC DoorDash link** — The JC "Order on DoorDash" button currently links to the EW store. **What to do:** search "Vatan 808 Newark Ave" on DoorDash to find a JC listing URL; if none exists, remove the DoorDash button from the JC card only. **Impact:** low-medium — fixes a broken CTA for JC customers trying to order delivery. Deferred.
- [x] **2. GSC verification meta tag** — Already verified via HTML file method (`googleafd2aa76994074ad.html`). Meta tag also added to all 22 pages as backup.
- [x] **3. Replace Restaurant JSON-LD** — Fixed: `@id`, `geo` coords, `areaServed` plain strings, rating as numbers, EW image, added `WebSite` node.
- [x] **4. Add BlogPosting schema to all 15 blog articles** — Done. All 15 articles now have `BlogPosting` JSON-LD.
- [x] **5. Regenerate JC Google Maps embed** — Done. Sam provided iframe code; JC (Place ID 0x89c2572fc6d5d4a5:0x7bd7501441dba105) and EW (Place ID 0x89c3df6c8cf6428f:0x2c1459664ceff894) updated in `index.html` and `contact.html`.
- [x] **6. Fix broken thali blog cover image** — Replaced `../images/blog/thali-east-windsor.jpg` with OG image URL.
- [x] **7. Fix og:url on date-night blog article** — Fixed: now points to `/blog/blog-why-...` (was missing `/blog/` subdirectory).

---

## Phase 2 — High Impact (within 2 weeks)

- [x] **8. Create /llms.txt** — Done. AI-readable summary of Vatan: locations, hours, cuisine, dietary info, menu/order/reservation links.
- [x] **9. Add _headers file** — Done. Security headers: nosniff, SAMEORIGIN, strict Referrer-Policy, HSTS with preload.
- [x] **10. ~~Create /east-windsor.html~~** — Not necessary. `contact.html` + schema covers both locations adequately for a 2-location site.
- [x] **11. ~~Create /jersey-city.html~~** — Not necessary. Revisit only if investing in location-specific neighborhood content.
- [ ] **12. Catering.html Netlify form** — The catering page CTAs currently open a mailto: link, which requires the visitor to have an email client set up. Replacing with a Netlify form means submissions go directly to `info@vatans.com` without the visitor needing to open an email app — same as the contact and reservation forms. **Impact:** medium — reduces drop-off from catering inquiries on mobile. Deferred to local client/developer.
- [x] **13. Create /thali.html** — Done. Dedicated thali landing page targeting "vegetarian thali New Jersey". All 5 thali varieties with prices, MenuItem + FAQPage + WebPage schema, "Reserve a Table" CTA, Order Online modal.
- [x] **14. Optimize order.html for search** — Added og:description. Title and canonical were already correct.
- [x] **15. Add og:description to 9 blog articles** — Done. All 9 missing articles now have og:description from their meta description.
- [x] **16. Fix blog OG images** — Done. wp-content/uploads og:image URLs replaced with /images/og-image.jpg fallback.
- [ ] **17. Add "Leave us a Google Review" CTA** — Adds a "Review us on Google" button near the reviews section on `index.html` and `contact.html`. Google uses review count and recency as a local ranking signal — more reviews = better visibility in Maps and local search. **What Sam needs to do:** log into business.google.com, go to each location → Get more reviews → copy the short review link. **Impact:** high — EW has only 511 reviews; growing this improves local pack ranking directly.
- [x] **18. Fix JC review card link** — Already correct (g.page/VatanIndianRestaurant). No change needed.
- [x] **19. Add FAQPage schema to top 3 blog articles** — Done. Thali, street food, and catering articles now have FAQPage JSON-LD.
- [x] **20. Add author attribution to all blog articles** — Done. "By Vatan Kitchen Team" byline added to all 15 articles.
- [x] **21. Add width/height to img tags in index.html** — Done. 13 images now have explicit dimensions (280x252 food photos, 1280x720 YouTube thumb).

---

## Phase 3 — Medium (within a month)

- [x] **22. Add loading="lazy" to below-fold images + preload LCP hint** — **Me** lazy-load 12 below-fold images in `index.html`; add `<link rel="preload">` for first dish card image.
- [x] **23. Trim Google Fonts** — Done. Removed unused Cormorant Garamond weights (normal-300, normal-500, italic-600) across all pages. Down from 12 to 9 variants.
- [x] **24. Add netlify.toml with cache headers** — Done. Images: immutable 1-year cache. JS files: 1-week cache.
- [ ] **25. Add defer to promos.js** — ~~Done~~ **Reverted — do not apply.** Adding `defer` breaks the hero carousel: the inline `<script>` at the bottom of `index.html` reads `VATAN_PROMOS` from promos.js synchronously; with `defer`, promos.js executes after the inline script runs, leaving `VATAN_PROMOS` undefined. promos.js must remain a blocking script tag.
- [x] **26. Add location names to hero copy** — Done. Hero subtitle now reads "in Jersey City & East Windsor, NJ" instead of "across New Jersey".
- [x] **27. Fix "Happy Guests" milestone counter** — Done. `data-target="10000"` with "+" suffix; was showing 0 due to "inf" value.
- [x] **28. Update footer copyright © 2025 → © 2026** — Done. Updated across all pages (root + blog/).
- [x] **29. Add Service schema to catering.html** — Done. Service JSON-LD with catering types, areaServed (NJ/NY/CT), and offer catalog.
- [x] **30. Add Restaurant schema to contact.html** — Done. Both location entities with hours, address, hasMap, EW aggregateRating.
- [x] **31. Consolidate competing EW thali articles** — Done. `_redirects` file: `blog-discovering-heart-indian-vegetarian-cuisine-east-windsor.html` → `blog-discover-best-indian-thali-east-windsor.html` (301).
- [x] **32. Add full NAP to contact.html footer** — Done. Both addresses and phone numbers added as small text in footer.
- [x] **33. Standardize "Route 33 West"** — Done. All instances now use "Route 33 West" across all pages and blog articles.
- [x] **34. Add question-based H2s to 2 blog articles** — Done. Thali article: 4 H2s converted. Catering article: all 8 H2s converted.
- [x] **35. Display star rating + review count on homepage** — N/A. JC rating too low to highlight; EW rating already in schema only.
- [ ] **36. Replace stock Unsplash photos on catering.html** — The catering page hero and feature images are currently generic stock photos from Unsplash, not Vatan's own events. Real photos of Vatan catering setups build trust and make the page more convincing to prospective clients. **What Sam needs to do:** provide 2–3 photos from past catering events (any format). **Impact:** medium — conversion rate on catering inquiries; also signals authenticity to Google's image quality assessment.

---

## Phase 4 — Backlog

- [x] **37. Create /faq.html** — Done. 15 Q&As across 3 groups (Dietary, Locations/Hours, Ordering). FAQPage + WebPage schema included.
- [ ] **38. Add YouTube channel to schema** — Adding the YouTube channel URL to the Restaurant schema's `sameAs` list tells Google that the channel and the restaurant are the same entity. This strengthens the Knowledge Panel and helps Google connect content (videos) to Vatan's local listing. **What Sam needs to do:** find Vatan's YouTube channel URL (if one exists) and share it. **Impact:** low-medium — entity reinforcement; only worth doing if there's an active channel with content.
- [ ] **39. Citation audit (Yelp, TripAdvisor, Apple Maps, Bing, Foursquare)** — "Citations" are any place on the web where Vatan's name, address, and phone appear (NAP). Inconsistent citations — e.g. "Route 33 W" on Yelp vs "Route 33 West" on Google — confuse Google's local algorithm and hurt map rankings. An audit finds and corrects these mismatches. **What Sam needs to do:** run a free scan at Whitespark.ca or BrightLocal.com, review inconsistencies, and claim/correct listings. Currently no Yelp link exists on the site. **Impact:** high for local pack rankings — this is a foundational local SEO signal.
- [x] **40. Add static menu fallback to all-menu.html** — Done. `<noscript>` block with all 14 menu categories and key items added before footer.
- [x] **41. Implement IndexNow** — Done. Key file `3b0ebe019e0a47cbb6811e1c1dd6f9f9.txt` created at repo root. After deploy, submit URLs to `https://api.indexnow.org/indexnow`.
- [ ] **42. Add poster to elephant logo video** — The animated elephant logo in the About section is a `<video>` tag with no poster image. Without a poster, the browser shows a blank/black frame until the video loads — looks broken on slow connections or if autoplay is blocked. A poster is a static image shown before the video plays. **What Sam needs to do:** open `logo-elephant.mov` in QuickTime, pause on a good frame, and screenshot it as `images/logo-elephant-poster.jpg`. **Impact:** low — visual polish; prevents broken-looking section on slow mobile connections.
- [ ] **43. Publish 2+ blog articles/month** — All 15 current articles are about East Windsor or generic Indian food. There are zero articles targeting Jersey City specifically — a major gap given that's the older, busier location. Fresh content also signals to Google that the site is active. **Suggested topics:** "Best Vegetarian Restaurants in Jersey City NJ" (mentions Vatan), "Jain Food Guide for New Jersey", "Kathiyawadi Cuisine: What Makes It Different", "Indian Food Near Journal Square". **What Sam needs to do:** write or approve article topics; Claude can draft them. **Impact:** high long-term — content is the primary driver of organic search growth.
- [ ] **44. Add JC aggregateRating to schema** — Adds JC's star rating and review count to the Restaurant schema, which can make the rich result in Google search show stars next to Vatan JC. Currently deferred because the JC rating was observed to be low (around 3.1). **Decision for Sam:** if/when the JC rating improves to 3.8+, share the current rating and review count and Claude will add it. **Impact:** medium — star display in search results increases click-through rate, but only worth showing if the rating is strong.
- [ ] **45. Add "Order Online" to desktop nav** — ~~Done~~ **Reverted — intentionally removed.** Nav already has a "Reserve a Table" CTA; adding "Order Online" created a duplicate alongside the hero's existing Order Online button. Removed from all pages to avoid visual clutter and redundancy.
- [x] **46. Add "Latest Blog Posts" module to homepage** — Done. 3-card section above CTA banner: date-night, thali, and catering articles.
- [x] **47. Add image sitemap** — Done. sitemap.xml updated with `<image:image>` entries for 15 food/promo images across key pages. New pages (thali, faq) also added.
