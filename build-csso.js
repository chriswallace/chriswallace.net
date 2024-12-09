const csso = require('csso');
const fs = require('fs');

const preloaderCss = fs.readFileSync('./assets/css/content-preloader.css', 'utf8');
const minifiedPreloaderCss = csso.minify(preloaderCss).css;
fs.writeFileSync('./assets/content-preloader.css', minifiedPreloaderCss);

const preloaderCss = fs.readFileSync('./assets/css/legendary.css', 'utf8');
const minifiedPreloaderCss = csso.minify(preloaderCss).css;
fs.writeFileSync('./assets/legendary.css', minifiedPreloaderCss);

const css = fs.readFileSync('./assets/css/main.css', 'utf8');
const minifiedCss = csso.minify(css).css;
fs.writeFileSync('./assets/main.css', minifiedCss);