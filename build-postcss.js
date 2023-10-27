// postcss-script.js
const postcss = require('postcss');
const fs = require('fs');

// Load your CSS file
let css = fs.readFileSync('./assets/main.css', 'utf8');

// Process your CSS using PostCSS
postcss([
    require('tailwindcss'),
    require('autoprefixer'),
    // ...other PostCSS plugins
])
    .process(css, { from: './assets/main.css', to: '../assets/main.css' })
    .then(result => {
        fs.writeFileSync('./assets/main.css', result.css);
        if (result.map) fs.writeFileSync('./assets/main.css.map', result.map);
    });
