# Manual QA and accessibility review — I Choose How

**Branch:** `branding-question-builder-a11y-review`  
**Reviewer / executor:** implementation agent (automated Edge + Firefox Playwright; manual checklist completed against build)  
**Date:** 2026-07-31  
**Build under test:** local `file://` open of `index.html` on this branch (see `docs/HANDOVER.md` for final SHA)

## Scope

Brand system, multi-select question builder (consent + service agreement), session navigation, and accessibility basics. No production WCAG certification claim.

## Environment

| Environment | Status |
|-------------|--------|
| Microsoft Edge (Chromium) | Automated interaction suite **passed** (60 assertions across Edge+Firefox run; Edge portion green) |
| Mozilla Firefox | Automated interaction suite **passed** (Playwright Firefox) |
| Google Chrome | **Not installed** on this machine — treated as equivalent to Edge Chromium; recommend Polina smoke on Chrome |
| Safari | **Unavailable** (Windows host) — record as **untested** |
| Viewport | 375×812 screenshots + phone frame |
| NVDA / screen reader | **Not available** in this environment — gap documented below |
| Keyboard | Exercised via Playwright roles + Escape on About; recommend manual Tab pass by Polina |

## Screenshots (375×812)

| Screen | Path |
|--------|------|
| Welcome | `docs/screenshots/welcome.png` |
| Consent question builder | `docs/screenshots/consent-question-builder.png` |
| Agreement question builder | `docs/screenshots/agreement-question-builder.png` |
| Consent summary | `docs/screenshots/summary-consent.png` |

## Interaction matrix

### Pathways × modes (eight combinations)

| Topic | Read | Listen | Show me | With a supporter |
|-------|------|--------|---------|------------------|
| Consent | Pass | Pass | Pass | Pass |
| Service agreement | Pass | Pass | Pass | Pass |

### Question builder

| Check | Result |
|-------|--------|
| Title “What would Sam like to ask?” | Pass |
| Instruction present | Pass |
| Multi-select without typing | Pass |
| Empty selection allowed | Pass |
| “I do not have a question yet.” exclusive (clears others) | Pass |
| Selecting a real question clears none-yet | Pass |
| Summary lists each selected question | Pass |
| None-yet shown neutrally on summary | Pass |
| Back preserves selections | Pass |
| Home / Start again / reload clear session | Pass (Home/Start again automated; reload by design — in-memory only) |

### Safety / chrome

| Check | Result |
|-------|--------|
| Back / Home / Start again | Pass |
| Mode toolbar switching | Pass |
| About dialog + Escape close | Pass |
| Decision footer on choice/QB/summary | Pass |
| Listen does not autoplay | Pass |
| No localStorage / sessionStorage / cookies written | Pass |

## Accessibility findings

### Critical / high — fixed on this branch

| ID | Severity | Finding | Remediation |
|----|----------|---------|-------------|
| A1 | High | Re-rendering the question builder after each toggle moved focus to `#main`, losing the active control for keyboard/AT users | Restore focus to the toggled `data-question-id` button after render |
| A2 | Medium→fixed | Selected mode/explain states relied too heavily on colour; CSS `content` checkmarks risked polluting accessible names | Use thicker border, inset bar, underline; keep `aria-pressed`; checkbox glyphs on QB options are `aria-hidden` with pressed state on the button |

### Remaining / open (for Polina)

| ID | Severity | Finding | Notes |
|----|----------|---------|-------|
| O1 | Medium | Full NVDA / VoiceOver pass not run | No NVDA in CI machine; Safari/VoiceOver unavailable on Windows |
| O2 | Low | Chrome not smoke-tested locally | Expect parity with Edge; confirm favicon + font load |
| O3 | Low | Safari untested | Layout/font/`speechSynthesis` may differ |
| O4 | Low | About / skip-link soft-blue on charcoal should be spot-checked with a contrast tool | Visual review suggests OK; not instrumented |
| O5 | Low | Focusing `#main` on most screen changes is intentional for route announcement but can feel abrupt | Consider live region “screen changed” if AT feedback requests it |

### Pass notes

- Tap targets ≥48px; body ≥18px
- Visible `:focus-visible` outlines
- Selection not colour-only on QB (☑/☐ + border + inset)
- Progress uses text (“Step X of Y”) plus marker
- Icons accompanied by text
- `prefers-reduced-motion` disables transitions
- No flashing content
- Disclaimers present; no signature/consent-capture language implying legal agreement

## Boundaries reconfirmed

No backend, DB, analytics, cookies, localStorage, uploads, accounts, live AI, NDIS/gov integration, Aboriginal-specific content, or new topics/modules.

## Automation artefact

Optional local runner: `scripts/qa-interaction.cjs` (requires Playwright; not part of the shipped demo UX). Results snapshot: `docs/qa-run-results.json`.
