# AnimText: Letter, Word & Line Text Animation JS Library

![Vanilla JS](https://img.shields.io/badge/JS-Vanilla%20JS-brightgreen?style=for-the-badge)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-lightgrey?style=for-the-badge)
![License](https://img.shields.io/badge/license-Apache%202.0-blue?style=for-the-badge)
[![npm](https://img.shields.io/npm/v/animtext?style=for-the-badge)](https://www.npmjs.com/package/animtext)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/animtext?style=for-the-badge)](https://www.jsdelivr.com/package/npm/animtext)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-blue?style=for-the-badge)](https://unpkg.com/browse/animtext/)
[![View Demo](https://img.shields.io/badge/🎬%20Live-Demo-green?style=for-the-badge)](https://yesiamrocks.github.io/animtext/)
[![Made for {css}animation](https://img.shields.io/badge/Made%20for-{css}animation-7e2ea0?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/yesiamrocks/cssanimation)

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20My%20Work-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/yesiamrocks) [![Join Membership](https://img.shields.io/badge/Become%20a%20Member-Monthly%20Support-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/yesiamrocks/membership)

**AnimText** is a lightweight JavaScript enhancer for animating text with **letter-by-letter, word-by-word, and line-by-line** animations to your projects. It's designed to work seamlessly with [{css}animation](https://github.com/yesiamrocks/cssanimation), for robust and customizable text effects.

**AnimText** is a lightweight, dependency-free JavaScript library designed to make precise letter-by-letter, word-by-word, and line-by-line text animations incredibly simple. Forget complex JavaScript or heavy frameworks; AnimText empowers you to create stunning, dynamic text effects using nothing but intuitive **HTML data attributes**.

## Key Features

- Highly customizable: Control animations directly with HTML attributes.
- Animate **Letters**, **Words**, and **Lines**: Independent control for precise effects.
- Custom CSS Animation Classes: Use any cssanimation class you like.
- Sequential Animation Logic: Units wait for the previous one to complete.
- Random & Reverse Effects: Get creative with animation order.
- Smart Handling: Safely handles whitespace and provides animation class fallbacks.

👉 [Live Demo](https://yesiamrocks.github.io/animtext/) | [Download via NPM](https://www.npmjs.com/package/animtext) | [Check on jsDelivr](https://www.jsdelivr.com/package/npm/animtext) | [View on unpkg](https://app.unpkg.com/animtext)

## Installation

You can use AnimText in two ways — via **NPM** for modern builds, or by including it directly in your HTML using a `<script>` tag.

### Install via NPM

```bash
npm i animtext
```

Then import and initialize AnimText in your JS:

```js
import animtext from "animtext";
```

### Use in Plain HTML (CDN)

Just include the script before the closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/animtext@latest/dist/animtext.min.js"></script>
```

AnimText will automatically run on `DOMContentLoaded` — no manual init needed in most cases.

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

To start using AnimText, all you need is a simple HTML element with the right attributes.

```html
<h1 class="cssanimation" data-at-sequence="ca__fx-fadeIn">Hello AnimText!</h1>
```

**What’s Happening Here**

- `class="cssanimation"`
  This class is **required**. It activates the **AnimText** and ensures the element is styled correctly.
  It also enables animation styles from the **[{css}animation](https://github.com/yesiamrocks/cssanimation)** library.

- `data-at-sequence="ca__fx-fadeIn"`
  This tells **AnimText** to animate the text **letter by letter**, using the `ca__fx-fadeIn` animation class.
  Letters will appear one after another in sequence.

You can replace `ca__fx-fadeIn` with any animation class from the **[{css}animation](https://github.com/yesiamrocks/cssanimation)** library. For the animation class check this [demo](https://yesiamrocks.github.io/cssanimation/index.html) and copy simply.

Once this setup is in place, **AnimText** handles the rest!

## Supported Attributes

Below is a quick reference table for all the `data-at-*` attributes you can use with AnimText:

| Attribute               | Description                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `data-at-sequence`      | Animates **letter-by-letter**, in order from first to last.                                  |
| `data-at-random`        | Animates **letters** in a **randomized order**.                                              |
| `data-at-reverse`       | Animates **letters** in **reverse order** (last letter animates first).                      |
| `data-at-word`          | Animates **word-by-word**, one word at a time.                                               |
| `data-at-line`          | Animates **line-by-line**, based on `<br>` or `\n` or custom separators.                     |
| `data-at-delay`         | Sets delay (in ms) before each unit starts animating. Accepts **one or multiple** values.    |
| `data-at-base-duration` | Sets a default animation duration (in ms) for each unit. Overrides CSS or internal defaults. |
| `data-at-separator`     | Optional. Use `"dot"` to split lines on periods (`.`). Default is `<br>` or line breaks.     |

---

### Example: Full Setup

```html
<h2
  class="cssanimation"
  data-at-word="ca__fx-fadeIn ca__fx-fadeInLeft ca__fx-slinkyDrop ca__fx-jiggleTransform"
  data-at-delay="200 300 400"
  data-at-base-duration="1000">
  Animate each word smoothly
</h2>
```

In this example:

- Each word gets its own animation class (cycled or repeated).
- Words animate with delays of `200ms`, `300ms`, then `400ms` (last delay repeats if more words).
- Each word’s animation lasts `1000ms`, regardless of what's in your CSS.

This lets you easily create **custom animation flows** without writing JavaScript.

## Letter-by-Letter Animation

You can animate text **letter by letter** using different animation orders.  
Just add one of these attributes to your element:

### Sequential (First to Last)

Use `data-at-sequence` to animate each letter one after another in order.

```html
<h1 class="cssanimation" data-at-sequence="ca__fx-fadeIn">Letters Animate</h1>
```

### Randomized order

Use `data-at-random` to animate the letters in a shuffled, randomized order.

```html
<p class="cssanimation" data-at-random="ca__fx-bounceInTop">
  Randomized entry!
</p>
```

### Reverse Order (Last to First)

Use `data-at-reverse` to animate the last letter first, moving backward to the start.

```html
<h3 class="cssanimation" data-at-reverse="ca__fx-moveFromTop">
  Backwards Flow
</h3>
```

💡 You can customize the animation effect by replacing the class (e.g. `ca__fx-fadeIn`) with any animation class from [{css}animation}](https://yesiamrocks.github.io/cssanimation/index.html).

## Word-by-Word Animation

To animate each **word** in your text individually, use the `data-at-word` attribute:

```html
<h2 class="cssanimation" data-at-word="ca__fx-fadeIn">
  Each word animates uniquely
</h2>
```

In this example, all the words will animate one by one using the `ca__fx-fadeIn` animation class.

In this example:

- Each word will animate one after another.
- All words use the same animation class: `ca__fx-fadeIn`.

💡 You can assign multiple animation classes or delay values if you want each word to behave differently. See Multiple Animation Classes for more.

## Line-by-Line Animation

To animate each **line** of text separately, use the `data-at-line` attribute:

```html
<p class="cssanimation" data-at-line="ca__fx-fadeIn">
  First line<br />
  Second line<br />
  Third line
</p>
```

By default, AnimText splits lines using `<br> ` tags or actual line breaks `(\n) `.

**Splitting by Periods (Dot Separator)** You can also split text into lines using periods`( . )`, to do that, just add `data-at-separator="dot"`.

```html
<p class="cssanimation" data-at-line="ca__fx-fadeIn" data-at-separator="dot">
  Step 1. Step 2. Step 3.
</p>
```

Each sentence (ending in a `.`) will be treated as a separate line and animated one after another.

Notes

- You **don’t need to set** `data-at-separator` if you're using `<br> or line breaks - that’s the default behavior.
- Just like with words, you can assign **multiple animation classes** and delay values for lines too!

## Multiple Animation Classes

🔥 You can assign **different animation classes** to each **word** or **line** to create more dynamic effects.
Just space-separate the class names inside the `data-at-word` or `data-at-line` attributes:

### Word Example

```html
<h2
  class="cssanimation"
  data-at-word="ca__fx-fadeIn ca__fx-moveFromTop ca__fx-moveFromBottom ca__fx-moveFromRight">
  Each word animates uniquely
</h2>
```

In this case, each word will use a different animation in order:

- "Each" - animate with `ca__fx-fadeIn`
- "word" - animate with `ca__fx-moveFromTop`
- "animates" - animate with `ca__fx-moveFromBottom`
- "uniquely" - animate with `ca__fx-moveFromRight`

If there are **more words than classes**, the last class will automatically be reused for the remaining words.

#### Line Example

```html
<p
  class="cssanimation"
  data-at-line="ca__fx-blurIn ca__fx-bounceFromTop ca__fx-bounceX">
  First line<br />
  Second line<br />
  Third line
</p>
```

Here:

- "First line" - animate with `ca__fx-blurIn`
- "Second line" - animate with `ca__fx-bounceFromTop`
- "Third line" - animate with `ca__fx-bounceX`

💡 This lets you mix and match effects to make your animations feel more playful or dramatic.

## Animation Delay

You can control the delay between each animated unit (letter, word, or line) using the `data-at-delay` attribute.  
The values are in **milliseconds (ms)**.

The `data-at-delay` attribute specifies the delay before each animated unit (letter, word, or line) begins its animation. The values are in milliseconds (ms).

#### Single Value

If you use a single value, that delay will apply to **every unit** equally.

```html
<h1 class="cssanimation" data-at-sequence="ca__fx-fadeIn" data-at-delay="100">
  Each letter delays by 100ms
</h1>
```

All letters will animate one after another, each with a 100ms delay.

#### Multiple Values:

You can also provide multiple delay values, separated by spaces.
Each value is used for the next unit in order. If you have more units than delays, the **last delay value repeats**.

```html
<h2 class="cssanimation" data-at-word="ca__fx-fadeIn" data-at-delay="0 200 400">
  First word, then 200ms, then 400ms, then 400ms
</h2>
```

This gives you full control over timing rhythm, such as staggered or pulsed animations.

---

💡 Tip
This pattern works with letters, words, and lines.
Example: data-at-delay="50 100 100" means:

- First unit → 50ms delay
- Next unit → 100ms
- Remaining units → 100ms

You can create subtle or dramatic timing effects just by changing the delay pattern.

## Animation Base Duration

The `data-at-base-duration` attribute lets you set a **default animation duration** (in milliseconds) for all animated units — whether they’re letters, words, or lines.

This value overrides any duration found in your CSS animation classes.

```html
<h3
  class="cssanimation"
  data-at-sequence="ca__fx-fadeIn"
  data-at-base-duration="750">
  Global base duration
</h3>
```

In this example, all letters will animate with a base duration of **750ms** - no need to set `animation-duration` in CSS.

**How Duration is Chosen (Precedence)**

1. `data-at-base-duration` (your manual override)
2. CSS-defined duration (auto-detected from your animation class if `data-at-base-duration` is absent)
3. Internal default (fallback if nothing is defined - usually `1000ms`)

This means `data-at-base-duration` gives you full control: you can set durations directly in HTML without modifying your CSS.

## Developer Tips

- The `.cssanimation` **class is required** for AnimText to work, it activates the logic and provides default styles.
- You can assign **fewer** animation classes or delay values than total units, the last value will repeat for the rest.
- If you assign more classes or delay values than units, the extra values are ignored, and a warning is logged to your console to help with debugging.
- All values (delays, durations) are parsed safely — invalid numbers are ignored and fall back to safe defaults.
- Duration logic follows this order:
  - `data-at-base-duration`
  - CSS-detected `animation-duration`
  - Internal default (`1000ms`)

This setup makes AnimText flexible for both quick prototypes and polished production use.

## Debugging AnimText

AnimText includes a simple debug mode that logs useful info to the browser console.

**Enable Debug Mode**
Set the following in your browser console or JavaScript file:

```js
window.__ANIMTEXT_DEBUG = true;
```

This will show:

- Which elements are being processed
- What attributes were parsed
- Fallback warnings (e.g. invalid delay values)

## Re-Init on Dynamic Content

If you inject new elements after page load, call:

```js
animtext.init();
```

This will scan the DOM again and animate any new `.cssanimation` elements.

## Test Example

Put this in your index.html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>AnimText Test</title>
    <link
      rel="stylesheet"
      href="node_modules/@hellouxpavel/cssanimation/dist/cssanimation.css" />
  </head>
  <body>
    <h1 class="cssanimation" data-at-sequence="ca__fx-fadeIn">
      Hello AnimText!
    </h1>

    <script type="module">
      import animtext from "./node_modules/animtext/animtext.js";
      window.__ANIMTEXT_DEBUG = true;
      animtext.init();
    </script>
  </body>
</html>
```

## License

**Triggle** is proudly open-sourced under the [Apache License 2.0](./LICENSE). You can freely use it in personal, commercial, and creative projects.

Want a quick explanation? See the [License Summary →](./ABOUT-LICENSE.md)

## Contribute

We welcome all contributions — whether it’s fixing bugs, adding feature, improving docs, or sharing ideas!

- Found an issue? [Open a GitHub Issue](https://github.com/yesiamrocks/animtext/issues)
- Want to improve the library? [Submit a Pull Request](https://github.com/yesiamrocks/animtext/pulls)
- Have questions or feature ideas? [Start a Discussion](https://github.com/yesiamrocks/animtext/discussions)

Help us make **AnimText** even more magical for everyone.

## Need Help?

Running into issues while using **AnimText** in your project?  
Whether it's a website, landing page, tool, or framework integration, we're here to help!

- Report bugs or problems via [GitHub Issues](https://github.com/yesiamrocks/animtext/issues)
- Ask questions or get guidance in [GitHub Discussions](https://github.com/yesiamrocks/animtext/discussions)

We’re happy to assist and make sure everything works smoothly in your setup.

## Support This Project

If **AnimText** has saved you time, added a little magic to your UI, or helped bring your creative vision to life — please consider supporting its development.

This project is built with care, during late nights and weekends, with a passion for open-source and motion design. Your support helps me:

- Keep the library up to date and bug-free
- Add new features and animation triggers

Every coffee counts — thank you for helping me keep creating. 🙏

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20My%20Work-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/yesiamrocks)

## Become a Community Sponsor

If **AnimText** helped you ship faster, spark delight in your UI, or just made your day as a developer easier — I’d be honored to have your support.

This isn’t a big team or a funded project. It’s just me — **Pavel** — building tools I wish existed.  
From late nights to early mornings, I pour love into every animation, every feature, every detail — to make the creative process more fun, expressive, and empowering for makers like you.

Your sponsorship helps me:

- Keep the library free and open for everyone
- Push out new triggers, animation packs, and ideas faster
- Write thoughtful dev/design content via my newsletter  
  👉 [Pixels & Projects with Pavel](https://www.linkedin.com/newsletters/pixels-projects-with-pavel-7093275757006782464/)

### As a Community Sponsor, you'll receive:

- A shoutout in the newsletter
- Your name or project proudly featured in the documentation and site
- My sincere gratitude for backing indie creativity on the web

Let’s build a more playful, animated web — together.

[![Join Membership](https://img.shields.io/badge/Become%20a%20Member-Monthly%20Support-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/yesiamrocks/membership)

<br>

---

![Built with ❤️ by Pavel](https://img.shields.io/badge/Built%20with-%E2%9D%A4%EF%B8%8F%20by%20Pavel-orange?style=for-the-badge) [![LinkedIn](https://img.shields.io/badge/LinkedIn-@shafayetul-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shafayetul/) [![Twitter](https://img.shields.io/badge/Twitter-@yesiamrocks-1DA1F2?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/yesiamrocks) [![Email](https://img.shields.io/badge/Email-yesiamrocks@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yesiamrocks@gmail.com) [![Newsletter](https://img.shields.io/badge/Pixels_&_Projects_with_Pavel-Subscribe-a6ca4b?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/newsletters/pixels-projects-with-pavel-7093275757006782464/)
