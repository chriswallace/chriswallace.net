# Text Scrambler Plugin Integration Guide

## Overview

The Text Scrambler plugin creates a dynamic effect where characters around the mouse cursor scramble through random characters before returning to their original state. It works seamlessly with Splitting.js and monospaced fonts.

## Files Created

- `assets/js/text-scrambler.js` - Main plugin file
- `assets/js/text-scrambler.min.js` - Minified version for production
- `text-scrambler-demo.html` - Demo page showing all features

## Integration Steps

### 1. Add Script to Head

Since Splitting.js is already loaded in your `_includes/head.md`, add the text scrambler after it:

```html
<script
  src="https://unpkg.com/splitting/dist/splitting.min.js"
  expires="31536000"
></script>
<script src="/assets/js/text-scrambler.min.js" expires="31536000"></script>
```

### 2. Add the Data Attribute

Add `data-scramble` to any text element you want to have the scrambling effect:

```html
<p data-scramble>This text will scramble around the mouse cursor</p>
<div data-scramble>
  <h2>Multiple elements work too</h2>
  <p>Each line is processed independently</p>
</div>
```

### 3. Automatic Initialization

The plugin automatically initializes when the page loads if it finds elements with `data-scramble` attributes.

## Configuration Options

### Default Settings

```javascript
{
  scrambleRadius: 6,        // Characters to scramble on each side of cursor
  scrambleIterations: 8,    // Number of scramble cycles before settling
  scrambleSpeed: 120,       // Speed between iterations (ms) - slower for smoother effect
  targetSelector: '[data-scramble]', // CSS selector for target elements
  characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`"\'\\▪▫■□○●◦•±×÷≈≠≤≥∞'
}
```

### Manual Initialization

For custom settings, initialize manually:

```javascript
const scrambler = new TextScrambler({
  scrambleRadius: 8,
  scrambleIterations: 10,
  scrambleSpeed: 100,
  targetSelector: ".my-custom-class",
});
```

## Usage Examples

### Basic Usage

```html
<p data-scramble>Hover over this text to see the effect</p>
```

### With Custom Classes

```html
<div class="hero-text" data-scramble>
  <h1>Welcome to My Site</h1>
  <p>This text will scramble as you move your mouse over it</p>
</div>
```

### Code Blocks

```html
<pre data-scramble><code>
function example() {
  console.log("This code will scramble too!");
}
</code></pre>
```

## API Methods

### Control Methods

```javascript
// Enable/disable the effect
window.textScrambler.enable();
window.textScrambler.disable();

// Update options on the fly
window.textScrambler.updateOptions({
  scrambleRadius: 10,
  scrambleSpeed: 100,
});

// Destroy the instance
window.textScrambler.destroy();
```

## Performance Notes

- The plugin provides immediate response to mouse movement for fluid interaction
- Only processes characters on the same line as the cursor
- Prevents multiple simultaneous scrambles on the same character
- Works best with monospaced fonts (like your Tabular font)
- Optimized for smooth, continuous scrambling while hovering

## Browser Compatibility

- Modern browsers with ES6 support
- Requires Splitting.js
- Works with touch devices (uses mouse position)

## Troubleshooting

### Plugin Not Working

1. Ensure Splitting.js is loaded before text-scrambler.js
2. Check that elements have the `data-scramble` attribute
3. Verify the font is monospaced for best results

### Performance Issues

1. Reduce `scrambleRadius` for better performance
2. Increase `scrambleSpeed` to reduce animation frequency
3. Limit the number of elements with `data-scramble`

## Integration with Existing Animations

The plugin works alongside your existing GSAP animations. It doesn't interfere with:

- Page load animations
- Scroll-triggered animations
- Other text effects

Just ensure the text scrambler is initialized after your main animations complete.
