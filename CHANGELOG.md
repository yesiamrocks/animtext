# Changelog

## [1.1.3] - 2025-07-23

### Changed

- Updated project license to **Apache License, Version 2.0**

### Added

- Introduced a `NOTICE` file with attribution details for legal clarity
  - Author: Shafayetul Islam Pavel
  - Project: AnimText https://github.com/yesiamrocks/animtext
  - Attribution is now required when using, modifying, or redistributing the software

## [1.1.1] – 2025-07-18

### Documentation Update

- Rewrote and simplified all README sections for better developer experience
- Added:
  - Clear installation instructions via NPM and CDN
  - Usage examples for all `data-at-*` attributes
  - Detailed explanations for `data-at-delay` and `data-at-base-duration`
  - Debugging guide using `window.__ANIMTEXT_DEBUG`
  - Clarified `.cssanimation` class requirement
  - Fixed typo in full usage example (`data-at-duration` → `data-at-base-duration`)
- Improved formatting, readability, and consistency throughout

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
