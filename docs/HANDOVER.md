# Handover — Polina

## Branch

`branding-question-builder-a11y-review`  
**Not merged to main.** Local commits ready for review.

## Final SHA

- Branding: `efcccdc`
- Question builder: `bda4485`
- Review / remediation / docs: `9be321f` (plus any tiny follow-up cleanup on the same branch)
- Branch tip: run `git rev-parse HEAD`

```powershell
git log --oneline -5
git rev-parse HEAD
```

## What changed

1. **Brand system** — identity tokens, Atkinson Hyperlegible self-host, cropped logo suite assets, header/welcome/favicon, tagline *My voice. My choices. My way.*
2. **Question builder** — both pathways use multi-select “What would Sam like to ask?” with exclusive none-yet; summary lists selections
3. **QA / a11y** — documented review, screenshots, focus restore on question toggles, CHANGELOG

## Tests completed

- Edge + Firefox automated interaction suite: **60/60 pass** (eight pathway×mode combos, QB exclusivity, Back preserve, no storage, Listen no autoplay, About Escape)
- Screenshots: `docs/screenshots/` (welcome, consent QB, agreement QB, consent summary)
- Full report: `QA-MANUAL-ACCESSIBILITY-REVIEW.md`

## Limitations / gaps for Polina

- **Chrome** not installed here — please smoke once
- **Safari** untested (Windows host)
- **NVDA / VoiceOver** not run — please do a short AT pass on question builder and mode toolbar
- Contrast of soft-blue header chrome: quick tooling check appreciated

## Unresolved defects

No open critical/high defects after remediation. Open items are environment gaps (O1–O5 in the QA doc), not known product blockers.

## Key paths

| Item | Path |
|------|------|
| App | `index.html` |
| Brand assets | `assets/brand/` |
| Fonts | `assets/fonts/` |
| QA review | `QA-MANUAL-ACCESSIBILITY-REVIEW.md` |
| Screenshots | `docs/screenshots/` |
| Changelog | `CHANGELOG.md` |
| Content inventory | `CONTENT.md` |

## Boundaries (unchanged)

Plain HTML/CSS/JS only; no backend, storage, AI, consent capture, NDIS/gov branding, or licence changes. Do not merge or publish unless you intentionally choose to.
