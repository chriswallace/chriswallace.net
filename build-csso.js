const csso = require('csso');
const fs = require('fs');

const css = fs.readFileSync('./assets/main.css', 'utf8');
const minifiedCss = csso.minify(css).css;
fs.writeFileSync('./assets/main.css', minifiedCss);