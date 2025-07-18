# Changelog

## [1.1.0] - 2025-07-18

### Initial Public Release – Rebranded from GlyphFX.js → AnimText

#### Features

- New name: **AnimText** – semantic, memorable, and focused on text animations.
- Animate text by:
  - **Letter**: `data-at-sequence`, `data-at-random`, `data-at-reverse`
  - **Word**: `data-at-word`
  - **Line**: `data-at-line` (supports dot or `<br>` separation)
- Attribute-driven animation control (`data-at-*`)
- **Custom class support** for animation effects (`ca__fx-*` from cssanimation.io)
- Supports multiple class names for staggering effects
- Supports **multiple delay values** via `data-at-delay`
- Supports global override via `data-at-base-duration`
- Includes `aria-hidden="true"` for accessibility compliance
- Automatically injects default styles based on configured selector

#### Fixes

- Corrected delay logic for `random` letter animations (no duplicate delays)
- Improved DOM clone logic to prevent detached element issues
- Added internal caching for computed animation durations
- Improved robustness for malformed attribute values

#### Debug Mode

- Set `window.__ANIMTEXT_DEBUG = true` to enable detailed logging and safe fallback warnings

#### Docs & Distribution

- Complete README with live examples, install instructions, and feature table
- CDN ready via jsDelivr and unpkg
- NPM published as `animtext`
