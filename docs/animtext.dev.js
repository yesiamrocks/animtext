(function () {
  // Early return only if window is undefined (e.g., non-browser environment)
  if (typeof window === "undefined") return;

  // Configuration for customizable CSS selector and defaults
  const config = window.AnimText?.config || {
    selector: ".at-letter, .at-word, .at-line",
    defaultDuration: "1s",
  };

  // Cache for computed animation durations
  const durationCache = new Map();

  // === Utility Function: Get Computed Animation Duration ===
  function getCssAnimationDuration(element, className) {
    if (!element || !className) return null;
    if (durationCache.has(className)) return durationCache.get(className);

    const tempEl = document.createElement("span");
    tempEl.style.visibility = "hidden";
    tempEl.style.position = "absolute";
    tempEl.className = className;
    document.body.appendChild(tempEl);

    try {
      const computedStyle = window.getComputedStyle(tempEl);
      let duration = computedStyle.getPropertyValue("animation-duration");
      if (duration) {
        duration = duration.trim();
        if (duration.endsWith("ms")) {
          const value = parseFloat(duration);
          durationCache.set(className, value);
          return value;
        }
        if (duration.endsWith("s")) {
          const value = parseFloat(duration) * 1000;
          durationCache.set(className, value);
          return value;
        }
      }
      durationCache.set(className, null);
      return null;
    } finally {
      document.body.removeChild(tempEl);
    }
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
    if (!delayAttr || delayAttr.trim() === "") {
      if (window.__ANIMTEXT_DEBUG) {
        console.warn(
          "Invalid or empty data-at-delay attribute, using default:",
          defaultValue
        );
      }
      return [defaultValue];
    }
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
        chars.push(...child.textContent.replace(/\s+/g, " ").trim().split(""));
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const wrapper = document.createElement(child.tagName);
        for (const attr of child.attributes) {
          wrapper.setAttribute(attr.name, attr.value);
        }
        wrapper.setAttribute("aria-hidden", "true"); // Accessibility
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
        return `<span class="at-letter ${className}" style="animation-delay:${
          delay * index
        }ms;" aria-hidden="true">${char}</span>`;
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
          /animation-delay:\d*\.?\d*ms/g,
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
          /animation-delay:\d*\.?\d*ms/g,
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
      const typeClass = type === "word" ? "at-word" : "at-line";

      output.push(
        `<span class="${typeClass} ${className}" style="animation-delay:${delay}ms;" aria-hidden="true">${unit}</span>`
      );
      offset = delay + baseDuration;
      idx++;
    });

    return output.join("");
  }

  // === Inject Default Animation Classes ===
  if (document.head) {
    const style = document.createElement("style");
    style.textContent = `
      ${config.selector} {
        display: inline-block;
        animation-duration: ${config.defaultDuration};
        animation-fill-mode: both;
      }
    `;
    document.head.appendChild(style);
  }

  // === Main API Exposure ===
  window.AnimText = window.AnimText || {};
  window.AnimText.init = initLetterAnimations;

  // === Animation Initializers ===
  function initLetterAnimations() {
    try {
      animateLetters("data-at-sequence", "sequence");
      animateLetters("data-at-random", "random");
      animateLetters("data-at-reverse", "reverse");
      animateWords();
      animateLines();
    } catch (e) {
      if (window.__ANIMTEXT_DEBUG)
        console.error("Error in initLetterAnimations:", e);
    }
  }

  // Add and cleanup DOMContentLoaded listener
  const initHandler = () => {
    initLetterAnimations();
    window.removeEventListener("DOMContentLoaded", initHandler);
  };
  window.addEventListener("DOMContentLoaded", initHandler);

  function animateLetters(attrName, type) {
    try {
      document.querySelectorAll(`.cssanimation[${attrName}]`).forEach((el) => {
        if (!el._originalNode) {
          el._originalNode = el.cloneNode(true);
        } else if (el.isConnected) {
          el.replaceWith(el._originalNode.cloneNode(true));
          el = el._originalNode.cloneNode(true);
        } else {
          el = el._originalNode.cloneNode(true);
        }

        const delayAttr = el.getAttribute("data-at-delay") || "100";
        const delaySteps = parseMultiValueDelaySteps(delayAttr, 100);
        const classList = (el.getAttribute(attrName) || "at-letter")
          .trim()
          .split(/\s+/);

        const html = processTextNodes(el, type, delaySteps, classList).join("");
        const temp = document.createElement("div");
        temp.innerHTML = html;
        const frag = document.createDocumentFragment();
        while (temp.firstChild) frag.appendChild(temp.firstChild);
        el.innerHTML = "";
        el.appendChild(frag);

        if (window.__ANIMTEXT_DEBUG) {
          console.log(`AnimText processed (${type})`, el);
        }
      });
    } catch (e) {
      if (window.__ANIMTEXT_DEBUG)
        console.error(`Error in animateLetters (${type}):`, e);
    }
  }

  function animateWords() {
    try {
      document.querySelectorAll(".cssanimation[data-at-word]").forEach((el) => {
        if (!el._originalNode) {
          el._originalNode = el.cloneNode(true);
        } else if (el.isConnected) {
          el.replaceWith(el._originalNode.cloneNode(true));
          el = el._originalNode.cloneNode(true);
        } else {
          el = el._originalNode.cloneNode(true);
        }

        const delayAttr = el.getAttribute("data-at-delay") || "100";
        const delaySteps = parseMultiValueDelaySteps(delayAttr, 100);
        const classList = (el.getAttribute("data-at-word") || "at-word")
          .trim()
          .split(/\s+/);

        let baseDuration = getSingleNumberAttribute(
          el.getAttribute("data-at-base-duration")
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

        if (window.__ANIMTEXT_DEBUG)
          console.log("AnimText processed (words)", el);
      });
    } catch (e) {
      if (window.__ANIMTEXT_DEBUG) console.error("Error in animateWords:", e);
    }
  }

  function animateLines() {
    try {
      document.querySelectorAll(".cssanimation[data-at-line]").forEach((el) => {
        if (!el._originalNode) {
          el._originalNode = el.cloneNode(true);
        } else if (el.isConnected) {
          el.replaceWith(el._originalNode.cloneNode(true));
          el = el._originalNode.cloneNode(true);
        } else {
          el = el._originalNode.cloneNode(true);
        }

        const delayAttr = el.getAttribute("data-at-delay") || "150";
        const delaySteps = parseMultiValueDelaySteps(delayAttr, 150);
        const classList = (el.getAttribute("data-at-line") || "at-line")
          .trim()
          .split(/\s+/);
        const lineSeparator =
          el.getAttribute("data-at-separator") === "dot" ? "dot" : "br";

        let baseDuration = getSingleNumberAttribute(
          el.getAttribute("data-at-base-duration")
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

        if (window.__ANIMTEXT_DEBUG)
          console.log("AnimText processed (lines)", el);
      });
    } catch (e) {
      if (window.__ANIMTEXT_DEBUG) console.error("Error in animateLines:", e);
    }
  }
})();
