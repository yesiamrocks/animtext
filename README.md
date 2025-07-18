# Amazing Text & Letter Animations

![Plugin](https://img.shields.io/badge/Type-Text%20Enhancer-4B9CE2?style=for-the-badge)
![Vanilla JS](https://img.shields.io/badge/JS-Vanilla%20JS-brightgreen?style=for-the-badge)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-lightgrey?style=for-the-badge)
[![Built for](https://img.shields.io/badge/Built%20for-cssanimation-blueviolet?style=for-the-badge)](https://github.com/yesiamrocks/cssanimation)
[![npm](https://img.shields.io/npm/v/animtext?style=for-the-badge)](https://www.npmjs.com/package/animtext)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/animtext?style=for-the-badge)](https://www.jsdelivr.com/package/npm/animtext)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-blue?style=for-the-badge)](https://unpkg.com/browse/animtext/)
[![View Demo](https://img.shields.io/badge/🎬%20Live-Demo-green?style=for-the-badge)](https://yesiamrocks.github.io/animtext/)

**AnimText** is a lightweight JavaScript enhancer for animating text with **letter-by-letter, word-by-word, and line-by-line** animations to your projects. It's designed to work seamlessly with [{css}animation](https://github.com/yesiamrocks/cssanimation), for robust and customizable text effects.

## Key Features

- Highly customizable: Control animations directly with HTML attributes.
- Animate **Letters**, **Words**, and **Lines**: Independent control for precise effects.
- Custom CSS Animation Classes: Use any cssanimation class you like.
- Sequential Animation Logic: Units wait for the previous one to complete.
- Random & Reverse Effects: Get creative with animation order.
- Smart Handling: Safely handles whitespace and provides animation class fallbacks.

## Installation

### Via NPM

```bash
npm install animtext
```

For plain HTML, include the `animtext.js`, plugin just before your closing `</body>` tag:

### JS Initialization

```js
import animtext from "animtext";

animtext.init();
// or with debug mode
animtext.init({ dev: true });
```

```html
<script src="https://cdn.jsdelivr.net/npm/animtext@latest/dist/animtext.min.js"></script>
```

## Animation Classes Powered by {css}animation

**AnimText** is designed to work hand-in-hand with the animation classes from **[{css}animation](https://github.com/yesiamrocks/cssanimation)**. These CSS classes are required to make the **AnimText** actually animate elements, so be sure to include them in your project.

Install the animation library:

```bash
npm install @hellouxpavel/cssanimation
```

Then import it in your JavaScript:

```js
import "@hellouxpavel/cssanimation";
```

Or include it via CDN:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/cssanimation.min.css" />
```

Without the cssanimation classes, **AnimText** can still spilt the text, but no animation will play.

## Getting Started

```html
<h1 class="cssanimation" data-at-sequence="ca__fx-fadeIn">Hello AnimText!</h1>
```

This will animate the letters of the heading using your chosen animation class.
`class="cssanimation"` – Required. This enables animation support from the **[{css}animation](https://github.com/yesiamrocks/cssanimation)** library.

## Supported Attributes

| Attribute               | Description                                                                      |
| ----------------------- | -------------------------------------------------------------------------------- |
| `data-at-sequence`      | Animates letter-by-letter, in order.                                             |
| `data-at-random`        | Animates letter-by-letter, in a randomized order.                                |
| `data-at-reverse`       | Animates letter-by-letter, in reverse order (last letter first).                 |
| `data-at-word`          | Animates word-by-word.                                                           |
| `data-at-line`          | Animates line-by-line.                                                           |
| `data-at-delay`         | Accepts one or more delay values (e.g., `100 300 500`) in milliseconds per unit. |
| `data-at-base-duration` | Optional base animation duration per unit (in ms)                                |
| `data-at-separator`     | Use `dot` to split on periods `( . )`. Default: line breaks (`<br>` or `\n`)     |

**Example**

```html
<h2
  class="cssanimation"
  data-at-word="ca__fx-fadeIn ca__fx-fadeInLeft ca__fx-slinkyDrop ca__fx-jiggleTransform"
  data-at-delay="200 300 400"
  data-at-duration="1000">
  Animate each word smoothly
</h2>
```

## 1. Letter Animation Usage

Animate text one letter at a time with different sequencing styles:

**Sequential (in order):** `data-at-sequence`

```html
<h1 class="cssanimation" data-at-sequence="ca__fx-fadeIn">Letters Animate</h1>
```

**Randomized order** `data-at-random`

```html
<p class="cssanimation" data-at-random="ca__fx-bounceInTop">
  Randomized entry!
</p>
```

**Reverse (last letter first)** `data-at-reverse`

```html
<h3 class="cssanimation" data-at-reverse="ca__fx-moveFromTop">
  Backwards Flow
</h3>
```

---

## 2. Word-by-Word Animation `data-at-word`

```html
<h2 class="cssanimation" data-at-word="ca__fx-fadeIn">
  Each word animates uniquely
</h2>
```

## 3. Line-by-line Animation `data-at-line`

```html
<p class="cssanimation" data-at-line="ca__fx-fadeIn">
  First line<br />
  Second line<br />
  Third line
</p>
```

Split lines by periods `"."` or by `<br>` / `\n`. Use `data-at-separator="dot"` for period separation.

```html
<p class="cssanimation" data-at-line="ca__fx-fadeIn" data-at-separator="dot">
  Step 1. Step 2. Step 3.
</p>
```

You don't need to add `data-at-separator` for `<br>` or newlines, this is the **default behavior**.

## Multiple Animation Classes

🔥You can assign different animation classes and delays to each **word and line**! Space-separate your class names and delay values.

```html
<h2
  class="cssanimation"
  data-at-word="ca__fx-fadeIn ca__fx-moveFromTop ca__fx-moveFromBottom ca__fx-moveFromRight">
  Each word animates uniquely
</h2>
```

```html
<p
  class="cssanimation"
  data-at-line="ca__fx-blurIn ca__fx-bounceFromTop ca__fx-bounceX">
  First line<br />
  Second line<br />
  Third line
</p>
```

[Check out this Text & Letter Animations Preview Tool to easily generate the animation code for your text.](https://yesiamrocks.github.io/cssanimation/text-animation.html)

## `data-at-delay`

The `data-at-delay` attribute specifies the delay before each animated unit (letter, word, or line) begins its animation. The values are in milliseconds (ms).

**Single Value:** If you provide a single value, that delay will be applied to every unit.

```html
<h1 class="cssanimation" data-at-sequence="ca__fx-fadeIn" data-at-delay="100">
  Each letter delays by 100ms
</h1>
```

**Multiple Values:** This is where it gets powerful! You can provide multiple space-separated values. These values will be applied sequentially to each unit. If you provide fewer delay values than there are units, the last delay value will repeat for the remaining units.

```html
<h2 class="cssanimation" data-at-word="ca__fx-fadeIn" data-at-delay="0 200 400">
  First word, then 200ms, then 400ms, then 400ms
</h2>
```

This allows you to create rhythmic or staggered entry effects easily, like `data-at-delay="50 100 100"` as in your example. The first unit gets 50ms delay, and all subsequent units get 100ms delay.

## `data-at-base-duration`

The `data-at-base-duration` attribute provides a simple way to set a global default animation duration for all units (letters, words, or lines) in milliseconds (ms).

This value is used to explicitly set the duration for all units, overriding any `animation-duration` or `transition-duration` that might be detected from the CSS classes applied to the element.

```html
<h3
  class="cssanimation"
  data-at-sequence="ca__fx-fadeIn"
  data-at-base-duration="750">
  Global base duration
</h3>
```

**Precedence:**

1. `data-at-base-duration` (global override)
2. CSS-defined duration (auto-detected from your animation class if `data-at-base-duration` is absent)
3. Internal library default (if no duration is specified anywhere)

This means `data-at-base-duration` gives you a convenient way to set a project-wide or component-wide default duration without needing to edit CSS.

## Developer Tips

- The `.cssanimation` **class is always required** for baseline styling and to activate text animations.
- You can provide fewer classes or delay values than units; the last value will simply repeat for the remaining units, making it easy to apply a pattern.
- If you pass more classes or values than needed, the extra elements are skipped, and a warning might be logged to your console to help with debugging.
- Delay and duration values are parsed safely; non-numeric strings will fall back to default behaviors to prevent errors.
- Animation duration is determined in this order of precedence: `data-at-base-duration` > CSS-detected duration > internal default.

[← Return to the main README](./README.md)
