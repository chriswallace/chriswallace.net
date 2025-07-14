const fs = require("fs");
const terser = require("terser");

const filesToConcatAndMinify = [
  "./assets/js/video-player.js",
  "./assets/js/animations.js",
  "./assets/js/card-flip.js",
  "./assets/js/card.js",
  "./assets/js/image-lazyloader.js",
  "./assets/js/zoomable.js",
  "./assets/js/homepage-loader.js",
];

const individualFilesToMinify = [
  "./assets/js/fxhash.js",
  "./assets/js/interplay-page.js",
  "./assets/js/toc-toggle.js",
];

// Function to minify a single file
async function minifyFile(inputFile, outputFile) {
  try {
    const fileContent = fs.readFileSync(inputFile, "utf-8");
    const result = await terser.minify(fileContent);
    fs.writeFileSync(outputFile, result.code, "utf-8");
    console.log(`Minified ${inputFile} to ${outputFile}`);
  } catch (err) {
    console.error(`Failed to minify ${inputFile}:`, err);
  }
}

// Function to concatenate and minify multiple files
async function concatAndMinifyFiles(inputFiles, outputFile) {
  try {
    let concatenatedContent = "";
    for (const file of inputFiles) {
      concatenatedContent += fs.readFileSync(file, "utf-8");
    }
    const result = await terser.minify(concatenatedContent);
    fs.writeFileSync(outputFile, result.code, "utf-8");
    console.log(
      `Concatenated and minified ${inputFiles.length} files to ${outputFile}`
    );
  } catch (err) {
    console.error(`Failed to concatenate and minify files:`, err);
  }
}

// Minify individual files
individualFilesToMinify.forEach((file) => {
  const outputFile = file.replace(".js", ".min.js");
  minifyFile(file, outputFile);
});

// Concatenate and minify specified files
concatAndMinifyFiles(filesToConcatAndMinify, "./assets/js/concatenated.min.js");
