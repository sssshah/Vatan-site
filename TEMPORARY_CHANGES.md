# Temporary Site Changes

Use this checklist to restore the normal site after the temporary promotions and operational changes end.

## Edison online reservations pause (ended)

- **Added:** November 8, 2026
- **Ended:** November 8, 2026
- **File:** `reservations.html`
- **Current setting:** `EDISON_RESERVATIONS_ENABLED = true`
- **Current behavior:** Edison reservations are open. The selector, direct `?loc=edi` link, form fields, and submission all work normally.
- **Future pause:** Change the setting to `false`. The Edison selector styling, pause label, direct `?loc=edi` behavior, and submission guard all follow this single setting.

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
