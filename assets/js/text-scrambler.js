/**
 * Text Scrambler Plugin
 * Scrambles text characters around the mouse cursor using Splitting.js
 * Requires: Splitting.js, monospaced font
 */

class TextScrambler {
  constructor(options = {}) {
    this.options = {
      scrambleRadius: options.scrambleRadius || 3, // Characters to scramble on each side - reduced for more focused effect
      scrambleIterations: options.scrambleIterations || 8, // Number of scramble cycles
      scrambleSpeed: options.scrambleSpeed || 120, // Speed between scramble iterations (ms) - much slower for smoother effect
      targetSelector: options.targetSelector || "[data-scramble]", // Elements to apply scrambling to
      characters:
        options.characters ||
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`\"'\\",
      ...options,
    };

    this.activeScrambles = new Map(); // Track active scrambling animations
    this.elements = [];
    this.isEnabled = true;

    this.init();
  }

  init() {
    // Wait for Splitting to be available and DOM to be ready
    if (typeof Splitting === "undefined") {
      console.warn("TextScrambler: Splitting.js is required but not found");
      return;
    }

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Find all target elements
    this.elements = document.querySelectorAll(this.options.targetSelector);

    if (this.elements.length === 0) {
      console.warn(
        "TextScrambler: No elements found with selector:",
        this.options.targetSelector
      );
      return;
    }

    // Apply Splitting to target elements if not already done
    this.elements.forEach((element) => {
      if (!element.hasAttribute("data-splitting")) {
        Splitting({ target: element, by: "chars" });
      }
    });

    // Set up mouse tracking
    this.setupMouseTracking();
  }

  setupMouseTracking() {
    // Track mouse position with immediate response
    document.addEventListener("mousemove", (e) => {
      if (!this.isEnabled) return;

      // Process immediately without debouncing for fluid response
      this.elements.forEach((element) => {
        this.processElementAtPosition(element, e.clientX, e.clientY);
      });
    });
  }

  processElementAtPosition(element, mouseX, mouseY) {
    const rect = element.getBoundingClientRect();

    // Check if mouse is over the element
    if (
      mouseX < rect.left ||
      mouseX > rect.right ||
      mouseY < rect.top ||
      mouseY > rect.bottom
    ) {
      return;
    }

    // Get all character elements
    const chars = element.querySelectorAll(".char");
    if (chars.length === 0) return;

    // Find the closest character to the mouse position
    let closestChar = null;
    let closestDistance = Infinity;
    let closestIndex = -1;

    chars.forEach((char, index) => {
      const charRect = char.getBoundingClientRect();
      const charCenterX = charRect.left + charRect.width / 2;
      const charCenterY = charRect.top + charRect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mouseX - charCenterX, 2) + Math.pow(mouseY - charCenterY, 2)
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestChar = char;
        closestIndex = index;
      }
    });

    if (closestIndex === -1) return;

    // Get the line that contains the closest character
    const lineChars = this.getLineChars(chars, closestIndex);
    const charIndexInLine = lineChars.indexOf(chars[closestIndex]);

    if (charIndexInLine === -1) return;

    // Calculate scramble range within the line
    const startIndex = Math.max(
      0,
      charIndexInLine - this.options.scrambleRadius
    );
    const endIndex = Math.min(
      lineChars.length - 1,
      charIndexInLine + this.options.scrambleRadius
    );

    // Scramble characters in range
    for (let i = startIndex; i <= endIndex; i++) {
      const char = lineChars[i];
      if (char && !this.activeScrambles.has(char)) {
        this.scrambleCharacter(char);
      }
    }
  }

  getLineChars(allChars, targetIndex) {
    // Get the line containing the target character
    const targetChar = allChars[targetIndex];
    const targetRect = targetChar.getBoundingClientRect();
    const targetY = targetRect.top;
    const tolerance = targetRect.height * 0.5; // Allow some tolerance for line detection

    // Find all characters on the same line
    const lineChars = [];
    allChars.forEach((char) => {
      const charRect = char.getBoundingClientRect();
      if (Math.abs(charRect.top - targetY) <= tolerance) {
        lineChars.push(char);
      }
    });

    // Sort by horizontal position
    lineChars.sort((a, b) => {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      return aRect.left - bRect.left;
    });

    return lineChars;
  }

  scrambleCharacter(charElement) {
    if (this.activeScrambles.has(charElement)) return;

    const originalText = charElement.textContent;
    let iteration = 0;

    // Mark as actively scrambling
    this.activeScrambles.set(charElement, originalText);

    const scrambleInterval = setInterval(() => {
      if (iteration < this.options.scrambleIterations) {
        // Show random character
        const randomChar =
          this.options.characters[
            Math.floor(Math.random() * this.options.characters.length)
          ];
        charElement.textContent = randomChar;
        iteration++;
      } else {
        // Restore original character
        charElement.textContent = originalText;
        clearInterval(scrambleInterval);
        this.activeScrambles.delete(charElement);
      }
    }, this.options.scrambleSpeed);
  }

  // Public methods
  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
    // Restore all currently scrambling characters immediately
    this.activeScrambles.forEach((originalText, charElement) => {
      charElement.textContent = originalText;
    });
    this.activeScrambles.clear();
  }

  destroy() {
    this.disable();
    this.elements = [];
    this.activeScrambles.clear();
  }

  // Update options
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
  }
}

// Auto-initialize if elements with data-scramble exist
document.addEventListener("DOMContentLoaded", () => {
  const scrambleElements = document.querySelectorAll("[data-scramble]");
  if (scrambleElements.length > 0) {
    window.textScrambler = new TextScrambler();
  }
});

// Export for manual initialization
window.TextScrambler = TextScrambler;
