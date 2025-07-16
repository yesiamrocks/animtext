(function () {
  if (typeof window === "undefined" || !document.body || !document.head) return;

  // === Utility Function: Get Computed Animation Duration ===
  function getCssAnimationDuration(element, className) {
    if (!element || !className) return null;

    const tempEl = document.createElement("span");
    tempEl.style.visibility = "hidden";
    tempEl.style.position = "absolute";
    tempEl.className = className;
    document.body.appendChild(tempEl);

    const computedStyle = window.getComputedStyle(tempEl);
    let duration = computedStyle.getPropertyValue("animation-duration");

    document.body.removeChild(tempEl);

    if (duration) {
      duration = duration.trim();
      if (duration.endsWith("ms")) return parseFloat(duration);
      if (duration.endsWith("s")) return parseFloat(duration) * 1000;
    }
    return null;
  }

  // === Utility Function: Get Single Number Attribute ===
  function getSingleNumberAttribute(attrValue) {
    if (attrValue) {
      const num = Number(attrValue.trim());
      if (!isNaN(num)) return num;
    }
    return null;
  }

  // === Utility Function: Parse Delay Step Values ===
  function parseMultiValueDelaySteps(delayAttr, defaultValue) {
    if (!delayAttr) return [defaultValue];
    const parsed = delayAttr
      .trim()
      .split(/\s+/)
      .map((x) => {
        const num = Number(x);
        return isNaN(num) ? defaultValue : num;
      });
    return parsed.length > 0 ? parsed : [defaultValue];
  }

  // === Utility Function: Shuffle Array ===
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // === Utility Function: Process Text Nodes to Letters ===
  function processTextNodes(node, animationType, delaySteps, classList) {
    const result = [];
    const chars = [];

    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        chars.push(...child.textContent.replace(/\s+/g, " ").trim());
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const wrapper = document.createElement(child.tagName);
        for (const attr of child.attributes) {
          wrapper.setAttribute(attr.name, attr.value);
        }
        wrapper.innerHTML = processTextNodes(
          child,
          animationType,
          delaySteps,
          classList
        ).join("");
        result.push(wrapper.outerHTML);
      }
    });

    const spans = chars.map((char, index) => {
      if (char !== " ") {
        const className =
          classList[index % classList.length] ||
          classList[classList.length - 1];
        const delay =
          delaySteps[index % delaySteps.length] ??
          delaySteps[delaySteps.length - 1];
        return `<span class="gl__fx-letter ${className}" style="animation-delay:${
          delay * index
        }ms; -moz-animation-delay:${delay * index}ms; -webkit-animation-delay:${
          delay * index
        }ms;">${char}</span>`;
      }
      return " ";
    });

    if (animationType === "random") {
      const nonSpaceSpans = spans.filter((s) => s.trim() !== "");
      const indices = nonSpaceSpans.map((_, i) => i);
      shuffle(indices);

      const randomizedSpans = Array(nonSpaceSpans.length).fill("");
      indices.forEach((originalIndex, newIndex) => {
        randomizedSpans[originalIndex] = nonSpaceSpans[originalIndex].replace(
          /animation-delay:\d+ms/g,
          `animation-delay:${delaySteps[delaySteps.length - 1] * newIndex}ms`
        );
      });

      let current = 0;
      const finalResult = spans.map((s) =>
        s.trim() !== "" ? randomizedSpans[current++] : s
      );
      result.push(finalResult.join(""));
    } else if (animationType === "reverse") {
      const nonSpaceSpans = spans.filter((s) => s.trim() !== "");
      const reversedSpans = nonSpaceSpans.map((span, i) =>
        span.replace(
          /animation-delay:\d+ms/g,
          `animation-delay:${
            delaySteps[delaySteps.length - 1] * (nonSpaceSpans.length - 1 - i)
          }ms`
        )
      );

      let current = 0;
      const finalResult = spans.map((s) =>
        s.trim() !== "" ? reversedSpans[current++] : s
      );
      result.push(finalResult.join(""));
    } else {
      result.push(spans.join(""));
    }

    return result;
  }

  // === Utility Function: Process by Word or Line ===
  function processSequentialBy(
    type,
    text,
    delaySteps,
    classList,
    baseDuration,
    lineSeparator = "br"
  ) {
    let units = [];

    if (type === "word") {
      units = text.split(/(\s+)/);
    } else if (type === "line") {
      if (lineSeparator === "dot") {
        const rawParts = text.split(/(\.)/);
        const finalUnits = [];
        for (let i = 0; i < rawParts.length; i++) {
          let part = rawParts[i].trim();
          if (!part) continue;
          if (
            part !== "." &&
            i + 1 < rawParts.length &&
            rawParts[i + 1] === "."
          ) {
            finalUnits.push(part + ".");
            i++;
          } else if (part !== ".") {
            finalUnits.push(part);
          }
        }
        units = finalUnits;
      } else {
        units = text.split(/(\n|<br\s*\/?>)/);
      }
    }

    let output = [];
    let idx = 0;
    let offset = 0;

    units.forEach((unit) => {
      if (!unit.trim() && unit !== "\n" && !/<br\s*\/?>/.test(unit)) {
        output.push(unit);
        return;
      }
      if (unit === "\n" || /<br\s*\/?>/.test(unit)) {
        output.push(unit);
        return;
      }

      const className =
        classList[idx % classList.length] || classList[classList.length - 1];
      const step =
        delaySteps[idx % delaySteps.length] ??
        delaySteps[delaySteps.length - 1];
      const delay = offset + step;
      const typeClass = type === "word" ? "gl__fx-word" : "gl__fx-line";

      output.push(
        `<span class="${typeClass} ${className}" style="animation-delay:${delay}ms; -moz-animation-delay:${delay}ms; -webkit-animation-delay:${delay}ms;">${unit}</span>`
      );
      offset = delay + baseDuration;
      idx++;
    });

    return output.join("");
  }

  // === Inject Default Animation Classes ===
  const style = document.createElement("style");
  style.textContent = `
    .gl__fx-letter, .gl__fx-word, .gl__fx-line {
      display: inline-block;
      animation-duration: 1s;
      animation-fill-mode: both;
    }
  `;
  document.head.appendChild(style);

  // === Main API Exposure ===
  window.CSSAnimationLetter = window.CSSAnimationLetter || {};
  window.CSSAnimationLetter.init = initLetterAnimations;
  window.addEventListener("DOMContentLoaded", initLetterAnimations);

  // === Animation Initializers ===
  function initLetterAnimations() {
    animateLetters("gl__fx-sequence", "sequence");
    animateLetters("gl__fx-random", "random");
    animateLetters("gl__fx-reverse", "reverse");
    animateWords();
    animateLines();
  }

  function animateLetters(attrName, type) {
    document.querySelectorAll(`.cssanimation[${attrName}]`).forEach((el) => {
      if (!el._originalNode) {
        el._originalNode = el.cloneNode(true);
      } else {
        el.replaceWith(el._originalNode.cloneNode(true));
        el = el._originalNode.cloneNode(true);
      }

      const delayAttr = el.getAttribute("gl__fx-delay") || "100";
      const delaySteps = parseMultiValueDelaySteps(delayAttr, 100);
      const classList = (el.getAttribute(attrName) || "gl__fx-letter")
        .trim()
        .split(/\s+/);

      const html = processTextNodes(el, type, delaySteps, classList).join("");
      const temp = document.createElement("div");
      temp.innerHTML = html;
      const frag = document.createDocumentFragment();
      while (temp.firstChild) frag.appendChild(temp.firstChild);
      el.innerHTML = "";
      el.appendChild(frag);

      if (window.__GLYPHFX_DEBUG)
        console.log("GlyphFX processed (letters)", el);
    });
  }

  function animateWords() {
    document.querySelectorAll(".cssanimation[gl__fx-word]").forEach((el) => {
      if (!el._originalNode) {
        el._originalNode = el.cloneNode(true);
      } else {
        el.replaceWith(el._originalNode.cloneNode(true));
        el = el._originalNode.cloneNode(true);
      }

      const delayAttr = el.getAttribute("gl__fx-delay") || "100";
      const delaySteps = parseMultiValueDelaySteps(delayAttr, 100);
      const classList = (el.getAttribute("gl__fx-word") || "gl__fx-word")
        .trim()
        .split(/\s+/);

      let baseDuration = getSingleNumberAttribute(
        el.getAttribute("gl__fx-base-duration")
      );
      if (baseDuration === null && classList.length > 0) {
        const detected = getCssAnimationDuration(el, classList[0]);
        if (detected !== null) baseDuration = detected;
      }
      if (baseDuration === null) baseDuration = 1000;

      const html = processSequentialBy(
        "word",
        el.textContent,
        delaySteps,
        classList,
        baseDuration
      );
      const temp = document.createElement("div");
      temp.innerHTML = html;
      const frag = document.createDocumentFragment();
      while (temp.firstChild) frag.appendChild(temp.firstChild);
      el.innerHTML = "";
      el.appendChild(frag);

      if (window.__GLYPHFX_DEBUG) console.log("GlyphFX processed (words)", el);
    });
  }

  function animateLines() {
    document.querySelectorAll(".cssanimation[gl__fx-line]").forEach((el) => {
      if (!el._originalNode) {
        el._originalNode = el.cloneNode(true);
      } else {
        el.replaceWith(el._originalNode.cloneNode(true));
        el = el._originalNode.cloneNode(true);
      }

      const delayAttr = el.getAttribute("gl__fx-delay") || "150";
      const delaySteps = parseMultiValueDelaySteps(delayAttr, 150);
      const classList = (el.getAttribute("gl__fx-line") || "gl__fx-line")
        .trim()
        .split(/\s+/);
      const lineSeparator =
        el.getAttribute("gl__fx-separator") === "dot" ? "dot" : "br";

      let baseDuration = getSingleNumberAttribute(
        el.getAttribute("gl__fx-base-duration")
      );
      if (baseDuration === null && classList.length > 0) {
        const detected = getCssAnimationDuration(el, classList[0]);
        if (detected !== null) baseDuration = detected;
      }
      if (baseDuration === null) baseDuration = 1000;

      const html = processSequentialBy(
        "line",
        el.textContent,
        delaySteps,
        classList,
        baseDuration,
        lineSeparator
      );
      const temp = document.createElement("div");
      temp.innerHTML = html;
      const frag = document.createDocumentFragment();
      while (temp.firstChild) frag.appendChild(temp.firstChild);
      el.innerHTML = "";
      el.appendChild(frag);

      if (window.__GLYPHFX_DEBUG) console.log("GlyphFX processed (lines)", el);
    });
  }
})();
