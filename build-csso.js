const csso = require("csso");
const fs = require("fs");

function minifyCSS(inputPath, outputPath, description) {
  try {
    const css = fs.readFileSync(inputPath, "utf8");
    const minifiedCss = csso.minify(css, {
      restructure: false, // Disable restructuring to avoid issues with CSS custom properties
      forceMediaMerge: false, // Disable media query merging to be safer
    }).css;
    fs.writeFileSync(outputPath, minifiedCss);
    console.log(`✓ Minified ${description}`);
  } catch (error) {
    console.warn(`⚠ Warning: Could not minify ${description}:`, error.message);
    console.log(`  Copying original file instead...`);
    // Copy the original file if minification fails
    const originalCss = fs.readFileSync(inputPath, "utf8");
    fs.writeFileSync(outputPath, originalCss);
  }
}

// Minify CSS files
minifyCSS(
  "./assets/css/content-preloader.css",
  "./assets/content-preloader.css",
  "content-preloader.css"
);
minifyCSS(
  "./assets/css/legendary.css",
  "./assets/legendary.css",
  "legendary.css"
);
minifyCSS("./assets/css/main.css", "./assets/main.css", "main.css");
