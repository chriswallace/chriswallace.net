// postcss-script.js
const postcss = require('postcss');
const fs = require('fs');

// Load your CSS files
let mainCss = fs.readFileSync('./assets/main.css', 'utf8');
let preloaderCss = fs.readFileSync('./assets/content-preloader.css', 'utf8');

// Process your main CSS using PostCSS
postcss([
    require('tailwindcss'),
    require('autoprefixer'),
    // ...other PostCSS plugins
])
    .process(mainCss, { from: './assets/main.css', to: '../assets/main.css' })
    .then(result => {
        fs.writeFileSync('./assets/main.css', result.css);
        if (result.map) fs.writeFileSync('./assets/main.css.map', result.map);
    });

// Process your preloader CSS using PostCSS
postcss([
    require('tailwindcss'),
    require('autoprefixer'),
    // ...other PostCSS plugins
])
    .process(preloaderCss, { from: './assets/content-preloader.css', to: '../assets/content-preloader.css' })
    .then(result => {
        fs.writeFileSync('./assets/content-preloader.css', result.css);
        if (result.map) fs.writeFileSync('./assets/content-preloader.css.map', result.map);
    });
