# I Choose How

Fictional demonstration prototype — front-end only, mobile-first.

## How to open

1. Close any Cursor/VS Code **source preview** of `index.html` (that shows raw markup).
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox, or Safari) by double-clicking the file, or from PowerShell: `start index.html`.
3. Or serve locally, for example: `npx serve .` then visit the printed URL.
4. Use a phone-sized viewport (~375×812) or rely on the built-in phone frame on desktop.

### If you see raw HTML with odd characters

If the browser shows raw tags like `<!DOCTYPE` with strange symbols, the file was saved as **UTF-16** and misread as UTF-8. Re-save as **UTF-8** (no BOM preferred). On Windows, avoid PowerShell `Out-File -Encoding unicode` / `Set-Content` defaults that write UTF-16; prefer an editor “Save with Encoding → UTF-8”, or:

```powershell
[System.IO.File]::WriteAllText($path, $content, [System.Text.UTF8Encoding]::new($false))
```

## Brand

Tagline: **My voice. My choices. My way.**

| Token | HEX |
|-------|-----|
| Charcoal | `#111417` |
| Slate | `#6B7280` |
| Blue | `#2563EB` |
| Soft Blue | `#93A3D9` |
| Mist | `#F2F4F7` |

**Font:** Atkinson Hyperlegible, self-hosted as WOFF2 under `assets/fonts/` (SIL Open Font License — see `assets/fonts/OFL.txt`), with system sans-serif fallback. Loaded via `@font-face` in `css/styles.css` (`font-display: swap`).

**Marks:** Cropped from the official logo suite (not redrawn) in `assets/brand/` — wordmark, monogram app icon, favicon, one-colour high-contrast fallback. Source PNGs are kept alongside exports.

## What this is

A clickable prototype showing how someone might choose how information is explained (Read / Listen / Show me / With a supporter) for two fictional pathways:

- Consent (what consent means, choices, question builder, summary)
- Service agreement (plain-language cards, choices, question builder, summary)

Both pathways use a multi-select **question builder** (“What would Sam like to ask?”). Session state stays in memory only and resets on Home, Start again, or page reload. Back preserves in-session answers.

## What this is not

- Not a real product, service, or legal tool
- Does not record consent, capture signatures, or store personal data
- Does not connect to NDIS, government systems, APIs, or live AI
- Does not provide legal advice
- No uploads, accounts, cookies, localStorage, analytics, or persistent records

See `LIMITATIONS.md` and the About disclaimer in the app.

## Files

| Path | Role |
|------|------|
| `index.html` | App shell, favicon, header monogram |
| `css/styles.css` | Brand tokens, layout, a11y |
| `js/app.js` | Router, session, question builder |
| `js/content.js` | Copy and explain variants |
| `js/modes.js` | Read / Listen / Show me / Supporter |
| `assets/brand/` | Logo suite crops and source PNGs |
| `assets/fonts/` | Atkinson Hyperlegible WOFF2 + OFL |
| `assets/icons/` | Local SVG icons (authored for this demo) |
| `CONTENT.md` | Screen inventory and fixed content |
| `LIMITATIONS.md` | Hard boundaries |
| `QA-MANUAL-ACCESSIBILITY-REVIEW.md` | Manual QA + a11y review |
| `CHANGELOG.md` | Notable changes |
| `docs/screenshots/` | 375×812 review captures |
| `docs/HANDOVER.md` | Branch / SHA / open items for Polina |

## Testing notes

- Smoke the eight pathway × mode combinations (consent/agreement × read/listen/show/supporter).
- Confirm question multi-select, exclusive “I do not have a question yet.”, empty selection allowed, Back preserves, Home/Start again clears.
- Keyboard: Tab, Enter/Space on choices, Escape closes About.
- Listen mode never autoplays; Play is required.
- See `QA-MANUAL-ACCESSIBILITY-REVIEW.md` for browser/AT coverage and gaps.

## Asset licence

- SVG icons in `assets/icons/` were authored for this prototype.
- Brand PNGs are project brand assets (cropped from the provided suite / identity board).
- Atkinson Hyperlegible is under the SIL Open Font License (`assets/fonts/OFL.txt`).
- No third-party icon packs or government/NDIS logos are included.

## Accessibility notes

- Body text ≥18px; large tap targets (≥48×48px)
- Keyboard navigation and visible focus states
- Selection and progress use more than colour alone (marks, borders, text)
- Icons paired with text labels
- No autoplay audio; Listen mode requires Play
- No flashing or forced motion; respects `prefers-reduced-motion`
