# East Windsor — Local SEO Action Plan
**Created:** 2026-06-28 | **Location:** 761 NJ-33, East Windsor, NJ 08520

---

## Canonical NAP (use this exactly everywhere)
- **Name:** Vatan Indian Vegetarian Cuisine & Bakery
- **Address:** 761 NJ-33, East Windsor, NJ 08520
- **Phone:** +1 609-336-7333
- **Hours:** Mon Closed · Tue–Sun 11:00AM–3:00PM, 4:30PM–9:30PM

---

## 1. GBP (Google Business Profile)
_All items: Sam logs into business.google.com → East Windsor location_

| # | Action | Impact | Owner | Needs from Sam | Status |
|---|--------|--------|-------|----------------|--------|
| G1 | Add **"Catering food and drink supplier"** as additional GBP category | 🔴 High | Sam | GBP → Info → Category | ✅ Done 2026-06-28 |
| G2 | Add **"Vegetarian restaurant"** as additional GBP category (if not already there) | 🔴 High | Sam | GBP → Info → Category | ✅ Done 2026-06-28 |
| G3 | Add **"Cake shop"** as additional GBP category (GBP name already says Bakery) | 🟡 Medium | Sam | Confirm bakery items actively sold | ✅ Done 2026-06-28 |
| G4 | Add keyword-rich **Business Description**: Gujarati thali, Jain/Swaminarayan menu, buffet Tue/Wed/Thu 5:30PM, catering from $19.99/person, eggless cakes (Edit profile → Description, 750 chars max) | 🔴 High | Sam | Freeform description field | ✅ Done 2026-06-28 |
| G5 | Add **GBP Products**: catering packages + cakes with names & prices | 🟡 Medium | Sam | Packages: $19.99/$20.99/$21.99/person | ✅ N/A — Offerings auto-populate from menu URL; no manual add available for restaurant profiles |
| G6 | Turn on **GBP Attributes**: vegetarian, vegan, gluten-free | 🟡 Medium | Sam | GBP → Attributes tab | ✅ Done 2026-06-28 |
| G7 | Confirm **Menu URL** → `vatans.com/all-menu.html` and **Order URL** → `vatans.com/order.html` | 🟡 Medium | Sam | GBP → Info → URLs | ✅ Done 2026-06-28 (menu link set; order URL not available in GBP profile) |
| G8 | Get **Google Review short link** for EW (business.google.com → Get more reviews) | 🔴 High | Sam | Share link — Claude adds CTA button | ✅ Done 2026-06-28 — https://g.page/r/CZT470xmWRQsEBM/review |
| G9 | **Reply to all existing reviews** — especially service, hygiene, wait time mentions | 🔴 High | Sam | Operational | ✅ Done 2026-06-28 |
| G10 | Set up **review request program** via Reputation Manager (email/SMS after visits) | 🔴 High | Sam | BrightLocal Reputation Manager | ⏳ Pending |
| G11 | Publish **weekly Google Posts** — buffet nights, Gujarati specials, Jain dishes, catering | 🟡 Medium | Sam | BrightLocal GBP Post Scheduler | ⏳ Pending |

---

## 2. NAP / Citations
_Fix address to exact canonical: `761 NJ-33, East Windsor, NJ 08520`_
_Priority order = directory authority score_

| # | Directory | Authority | Current Problem | Action | Owner | Status |
|---|-----------|-----------|----------------|--------|-------|--------|
| N1 | Apple Maps | 99/100 | "NJ-33 W" + "United States" in address | Fix address + remove country | Sam | ⏳ Pending |
| N2 | Facebook | 96/100 | "United States" appended to address | Remove country suffix | Sam | ⏳ Pending |
| N3 | Yelp | 93/100 | "761 Rte 33 W" | Update to canonical address | Sam | ⏳ Pending |
| N4 | MapQuest | 88/100 | "761 Rte 33 W" | Update to canonical address | Sam | ⏳ Pending |
| N5 | YellowPages | 86/100 | "Route 33 W" + missing comma | Update to canonical address | Sam | ⏳ Pending |
| N6 | SuperPages | 74/100 | "761 Route 33 W" | Update to canonical address | Sam | ⏳ Pending |
| N7 | DexKnows | 57/100 | "761 Route 33 W" | Update to canonical address | Sam | ⏳ Pending |
| N8 | EZLocal | 55/100 | City repeated 3×, space in "NJ -33" | Full correction to canonical | Sam | ⏳ Pending |
| N9 | Data Axle | 48/100 | "Route 33 W" + zip+4 format | Update to canonical address | Sam | ⏳ Pending |
| N10 | BBB | — | No listing | Create new listing | Sam | ⏳ Pending |
| N11 | Manta | — | No listing | Create new listing | Sam | ⏳ Pending |
| N12 | MerchantCircle | — | No listing | Create new listing | Sam | ⏳ Pending |

**Phone to standardize:** `+1 609-336-7333` (currently inconsistent: some show `(609) 336-7333`, some `6093367333`)

---

## 3. Site (Code Changes)
_All items: Claude makes changes locally; Sam tests; then push to deploy_

| # | File(s) | Action | Impact | Owner | Status |
|---|---------|--------|--------|-------|--------|
| S1 | `index.html`, `contact.html` | Fix EW schema `name` → "Vatan Indian Vegetarian Cuisine & Bakery" | 🔴 High | Claude | ✅ Was already correct |
| S2 | `index.html`, `contact.html` | Fix EW schema `streetAddress` → "761 NJ-33" (was "Route 33 West") | 🔴 High | Claude | ✅ Done 2026-06-28 |
| S3 | `contact.html` | Fix footer NAP text to match canonical exactly | 🔴 High | Claude | ✅ Done 2026-06-28 |
| S4 | `index.html`, `contact.html` | Verify EW hours in schema: Mon Closed, Tue–Sun 11:00–15:00, 16:30–21:30 | 🔴 High | Claude | ✅ Was already correct |
| S5 | `llms.txt` | Update EW address to canonical (761 NJ-33) | 🟡 Medium | Claude | ✅ Done 2026-06-28 |
| S6 | `order.html` | Verify EW `BIZ_HOURS` time slots match GBP hours | 🟡 Medium | Claude | ✅ Was already correct |
| S7 | NEW `jain-food-east-windsor.html` | Landing page: Jain vs Swaminarayan explained, BAPS proximity, FAQ, CTAs | 🔴 High | Claude | ✅ Done 2026-06-28 |
| S8 | NEW `catering-east-windsor.html` | Landing page: 9 service area towns, packages, features, Service schema | 🔴 High | Claude | ✅ Done 2026-06-28 |
| S9 | NEW `eggless-bakery-east-windsor.html` | Landing page: 8 pastries + 4 puffs, custom cake inquiry | 🟡 Medium | Claude | ✅ Done 2026-06-28 |
| S10 | `faq.html` | Added buffet Q&A (Tue/Wed/Thu 5:30PM, disclaimer), pickup wait time; fixed Swaminarayan answer (removed "no root vegetables") | 🔴 High | Claude | ✅ Done 2026-06-28 |
| S11 | `catering.html` | Expanded `areaServed` to 9 towns; added link → `catering-east-windsor.html` | 🟡 Medium | Claude | ✅ Done 2026-06-28 |
| S12 | `thali.html`, `faq.html` | Internal links → `jain-food-east-windsor.html` added to both | 🟡 Medium | Claude | ✅ Done 2026-06-28 |
| S13 | `sitemap.xml` + all pages | 3 new pages added to sitemap; footer links updated on 9 root pages + 15 blog articles | 🟡 Medium | Claude | ✅ Done 2026-06-28 |
| S14 | `index.html`, `contact.html` | Add "Leave a Google Review" CTA button for EW | 🔴 High | Claude | ✅ Done 2026-06-28 |

---

## 4. Keywords to Add to BrightLocal Tracking
_Sam adds these in BrightLocal → Rankings → Edit Keywords_

| Keyword | Status |
|---------|--------|
| vegetarian restaurant east windsor nj | ✅ Done 2026-06-29 |
| indian restaurant east windsor | ✅ Done 2026-06-29 |
| gujarati thali east windsor | ✅ Done 2026-06-29 |
| jain food east windsor nj | ✅ Done 2026-06-29 |
| indian food near princeton nj | ✅ Done 2026-06-29 |
| vegetarian restaurant near princeton | ✅ Done 2026-06-29 |
| swaminarayan restaurant new jersey | ✅ Done 2026-06-29 |
| indian restaurant near baps | ✅ Done 2026-06-29 |
| indian catering east windsor | ✅ Done 2026-06-29 |
| eggless cake east windsor nj | ✅ Done 2026-06-29 |
| vegetarian catering central nj | ✅ Done 2026-06-29 |

---

## 5. Blockers — What Claude Needs from Sam

| Item | Details | Blocks | Status |
|------|---------|--------|--------|
| ~~Buffet days + times~~ | ✅ Tue/Wed/Thu, starts 5:30PM — confirmed 2026-06-28 | S10, G4 | ✅ Resolved |
| ~~Catering pricing~~ | ✅ $19.99/$20.99/$21.99/person — found on catering.html | S8, G5 | ✅ Resolved |
| ~~Bakery items~~ | ✅ 8 pastries + 4 puffs from menu-data.js — confirmed 2026-06-28 | S9, G3 | ✅ Resolved |
| ~~Jain/Swaminarayan notes~~ | ✅ Jain = no root veg; Swaminarayan = no onion/garlic — confirmed 2026-06-28 | S7 | ✅ Resolved |
| EW Google Review short link | Get from business.google.com → Get more reviews → copy short URL | S14, G8 | ⏸ Pending Sam |

---

## Status Legend
- 🔴 High impact · 🟡 Medium impact
- ✅ Done · ⏳ Pending · ⏸ Blocked/waiting
