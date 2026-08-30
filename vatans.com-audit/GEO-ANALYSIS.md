# GEO (Generative Engine Optimization) Analysis — vatans.com

**Date:** 2026-08-29
**Trigger:** GA4 showed 50 sessions/month referred from `chatgpt.com` and 38 from `bing` — confirming AI engines are at least occasionally linking to the site. This check assesses what's happening upstream of those click-throughs: crawler access, citability, and brand-signal strength across Google AI Overviews, ChatGPT, Perplexity, and Bing Copilot.

## GEO Readiness Score: 68/100

| Category | Score | Weight |
|---|---|---|
| Citability | 15/25 | Short, punchy FAQ answers — good for direct extraction, but under the ideal self-contained passage length |
| Structural Readability | 18/20 | Strong — FAQPage/Question/Answer schema on most landing pages, clean headings |
| Multi-Modal Content | 8/15 | Photos present sitewide; no video/infographics |
| Authority & Brand Signals | 9/20 | Directory presence is solid; social-platform brand signal (Reddit/YouTube/Wikipedia) is essentially absent, and a same-named unrelated NYC restaurant creates entity confusion |
| Technical Accessibility | 18/20 | robots.txt open to all crawlers, llms.txt already present and well-built; one real gap on `order.html` |

## Platform Breakdown

- **Google AI Overviews:** Best-positioned platform. Strongly correlated with classic ranking, and the site already has Restaurant/FAQPage/Service schema across most pages — the traditional SEO work already done here transfers directly.
- **Google AI Mode (Gemini 3.5 Flash):** Weakly ranking-correlated, favors freshness and entity authority over position — this is where the 6.5-month-stale blog and the missing brand-signal presence (Reddit/YouTube/Wikipedia) hurt most.
- **ChatGPT:** Cites Wikipedia (47.9%) and Reddit (11.3%) most heavily. Vatan has neither. The `chatgpt.com` referral traffic you're already seeing is likely coming through ChatGPT's search/browsing feature crawling the site directly (llms.txt + open robots.txt help this), not through an entity/knowledge-graph citation.
- **Perplexity:** Cites Reddit (46.7%) and Wikipedia most heavily — same gap as ChatGPT, arguably worse given Perplexity's even heavier Reddit weighting.
- **Bing Copilot:** Ties to Bing's own index. Worth checking Bing Webmaster Tools verification status (already noted as done via the July commit below) and IndexNow submission.

## AI Crawler Access Status

`robots.txt` is wide open — `User-agent: * / Allow: /` — with no crawler-specific rules at all. This means **GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, and CCBot are all implicitly allowed.** Nothing to fix here; this is the correct configuration for a business that wants AI-search visibility.

## llms.txt Status: Present and well-built (undocumented in CLAUDE.md)

`/llms.txt` already exists at the site root with locations, hours, key facts, weekly specials, blog link, and social/contact info — cleanly structured per the emerging standard. Per current evidence (Mueller, Illyes, and large-scale studies cited in this skill's reference material), llms.txt is **not currently a proven citation lever for any major AI search system** — so this doesn't move the needle on citations by itself, but it's harmless, well-formed, and costs nothing to keep current.

Git history shows a commit already targeted this: `bca2d3e` (2026-07-04) — *"fix: improve AI/LLM visibility — schema description, servesCuisine, llms.txt weekly specials, Bing verification."* **This commit and the llms.txt file itself are not mentioned anywhere in CLAUDE.md** — same blind spot as `_headers`/`_redirects` before v1.5. Worth adding an entry.

## Technical Accessibility — one concrete gap found

`all-menu.html` already has a `<noscript>` fallback block (added in the same July commit) with the full category/dish list hardcoded — since AI crawlers don't execute JavaScript, this is exactly the right mitigation and it's already live. Good, deliberate work, just undocumented.

**`order.html` has no equivalent.** It renders its entire item list from `VATAN_MENU` via JavaScript with zero fallback — a non-JS-executing crawler fetching `order.html` sees empty containers and no menu content at all. Same underlying data (`menu-data.js`) as `all-menu.html`, so the fix is mechanical: port the same `<noscript>` block pattern over.

Also per the existing Roadmap in CLAUDE.md (confirmed still true): **`all-menu.html`, `order.html`, `reservations.html`, and `blog.html` have zero JSON-LD schema.** `all-menu.html`'s missing schema is a bigger GEO loss than it looks — it's the highest-value page on the site for menu/dish queries, and it's one of only two menu-bearing pages that don't self-describe.

## Brand Mention Analysis — the biggest real gap

- **Directory/aggregator presence: solid.** Confirmed indexed on Yelp, TripAdvisor, Grubhub, Seamless, Uber Eats, Sirved, and Facebook for both locations. This is baseline table-stakes, already covered.
- **Reddit: none found.** No discussion threads surfaced in search for either location.
- **YouTube: none found.** No channel, no third-party food-review video content surfaced.
- **Wikipedia: none.** Expected for a business this size, but worth naming since it's the single strongest ChatGPT/Perplexity citation source per current data.
- **Entity disambiguation risk:** there is an unrelated, much larger "**Vatan**" Indian vegetarian restaurant in **Manhattan** (409 3rd Ave, NYC — 1,027 Yelp reviews vs. Jersey City's 140) with the *same brand name*. A generic query like "Vatan Indian restaurant" is at real risk of an AI engine surfacing or blending in the NYC location instead of, or alongside, yours. Every query-facing asset (schema, llms.txt, GBP, ad copy) should keep leaning on "Jersey City," "East Windsor," and "NJ" as disambiguators rather than the bare brand name — which, per the current site content and schema, is already the pattern being followed. Worth being deliberate about maintaining that discipline going forward, especially in any future paid/organic copy.

## Passage-Level Citability

FAQ answers on `thali.html`, `jain-food-east-windsor.html`, `jain-swaminarayan-jersey-city.html`, `indo-chinese.html`, `catering-jersey-city.html`, and `catering-east-windsor.html` are well-structured (FAQPage/Question/Answer schema, clean headings) but **run short of the optimal citation length**: sampled answers on `thali.html` were 24–41 words vs. the 134–167-word range associated with the highest AI-citation rates. Short answers aren't wrong — some queries want a one-line fact — but the highest-value questions on each page (e.g., "What is a Jain Thali?", "Is Vatan food Swaminarayan-friendly?") would benefit from one expanded, fully self-contained paragraph that doesn't require the rest of the page for context.

## Content Freshness — blog is past the citation-eligibility window

Newest blog article is dated **2026-02-12** — that's 6.5+ months old as of this check. Per the cited SE Ranking study (1.3M citations), content left stale 6+ months starts losing citation eligibility in AI answers, while content under 3 months old is roughly 3x more likely to be cited. This matches CLAUDE.md's own open roadmap item about reconciling the blog list — the deeper issue isn't the file count, it's that **nothing has been published or refreshed in over half a year.**

## Top 5 Highest-Impact Changes

1. **Add the `<noscript>` menu fallback to `order.html`**, mirroring the existing `all-menu.html` pattern — closes the one real technical-accessibility gap found. Small, mechanical, low-risk (same shape as the `all-menu.html` version already live).
2. **Add JSON-LD schema to `all-menu.html`** (Menu/MenuItem schema, using the existing `VATAN_MENU` data as the source) — highest-traffic page on the site with zero structured data today.
3. **Refresh the blog** — even one new or meaningfully updated post would pull the "newest content" signal back under the 3-month window that correlates with 3x better citation odds.
4. **Expand the highest-intent FAQ answers** (Jain Thali, Swaminarayan-friendly, catering minimums) from ~30 words to a self-contained 134–167-word paragraph each — keep the short answer first, add supporting detail after, per the "answer in first 40-60 words, then elaborate" pattern.
5. **Deliberately maintain location-qualified language everywhere query-facing** ("Vatan Jersey City," "Vatan East Windsor NJ") given the NYC namesake — this is already the pattern in existing schema/llms.txt, just worth protecting as a standing rule for future content.

## Schema Recommendations

- `all-menu.html`: add `Menu` schema with nested `MenuSection` → `MenuItem` entries generated from `VATAN_MENU` (same data source already used to render the page — no new content to maintain, just a schema-generation pass over existing data).
- `order.html` / `reservations.html`: at minimum, `WebPage` + `BreadcrumbList` (per the existing CLAUDE.md roadmap item) — these are transactional pages, not content pages, so heavy schema investment matters less than the `<noscript>` fix above.
- `blog.html` + individual blog posts: `Article`/`BlogPosting` schema with `datePublished`/`dateModified` — currently zero schema on any blog page, and `dateModified` in particular is one of the signals AI Mode weighs for freshness.

## Content Reformatting Suggestions

- `thali.html` — "What is a Thali?" answer (currently 41 words) is a strong candidate to expand into the full 134–167-word block: it's a definitional, high-search-intent question exactly matching the citation pattern AI engines favor ("X is..." openers already used correctly).
- `jain-food-east-windsor.html` / `jain-swaminarayan-jersey-city.html` — "Does Vatan offer Jain food?" style answers should each get one expanded paragraph naming specific dishes and prep details (no onion/garlic/root vegetables), since specificity is what separates a citable passage from a vague one per the citability criteria above.

---
*Not checked in this pass (out of scope without paid tooling): live ChatGPT/Perplexity response sampling for target queries, DataForSEO AI-visibility/LLM-mention tracking. If you want to see actual AI Overview/ChatGPT answer text for specific queries rather than inferring from crawler/schema signals, that needs either manual query testing or a DataForSEO extension install.*
