# Changelog

## Unreleased — branch `branding-question-builder-a11y-review`

### Brand

- Applied identity-board tokens (Charcoal, Slate, Blue, Soft Blue, Mist) across CSS
- Self-hosted Atkinson Hyperlegible (WOFF2 + OFL) with system fallback
- Added cropped brand assets (wordmark, monogram, favicon, high-contrast fallback) from the logo suite
- Header monogram, welcome wordmark, updated favicon markup
- Tagline updated to **My voice. My choices. My way.**
- Selection / focus / progress states no longer colour-only

### Question builder

- Replaced consent and service-agreement “practice statement” checklists with one reusable multi-select question builder
- Exclusive “I do not have a question yet.” behaviour; empty selection allowed
- Summary lists mode, next-step choice, and every selected question in plain text

### Review

- Manual/automated interaction QA documented in `QA-MANUAL-ACCESSIBILITY-REVIEW.md`
- Focus restored on question options after toggle (a11y remediation)
- Screenshots at 375×812 under `docs/screenshots/`
- Handover note for Polina in `docs/HANDOVER.md`
