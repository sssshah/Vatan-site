# Temporary Site Changes

Use this checklist to restore the normal site after the temporary promotions and operational changes end.

## Edison online reservations paused

- **Added:** November 8, 2026
- **Temporarily reopened:** November 8, 2026
- **Paused again:** November 9, 2026
- **File:** `reservations.html`
- **Current setting:** `EDISON_RESERVATIONS_ENABLED = false`
- **Current behavior:** Selecting Edison, including through the direct `?loc=edi` link, shows the pause notice and disables all reservation fields and the submit button. East Windsor and Jersey City remain available.
- **Reopen:** Change the setting to `true`. The Edison selector styling, pause label, direct-link behavior, field state, and submission guard all follow this single setting.

## Happy Diwali homepage decoration

- **Added:** November 8, 2026
- **Files:** `index.html`, `images/promos/happy-diwali.png`
- **Current behavior:** Transparent upper-right hero decoration with animated diya flames and a session-based close button.
- **Rollback:** Remove the `.diwali-*` CSS and animations, the `#diwaliCorner` hero markup, and the `diwaliCorner` / `dismissDiwali()` JavaScript from `index.html`. The image asset can then be removed if it is no longer needed.

## East Windsor and Edison open Monday, November 9

- **Added:** November 8, 2026
- **Files:** `index.html`, `contact.html`, `reservations.html`
- **Current behavior:** Both locations show an `Open Mon Nov 9` badge and a `Special opening: Monday, November 9` notice. Their normal recurring hours remain visible underneath.
- **Rollback after November 9:** Remove each block marked `TEMP 2026-11-09 SPECIAL OPENING` and restore both location badges from `Open Mon Nov 9` to `Tue–Sun`.
