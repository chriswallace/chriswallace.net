module.exports = {
    files: ["./_site/**/*.*"],
    server: false,
    proxy: "https://127.0.0.1:4000", // Jekyll's SSL enabled server address
    reloadDelay: 500,
    injectChanges: true,
    https: {
        key: "./ssl/localhost.key",
        cert: "./ssl/localhost.crt",
    },
    open: false // Prevents Browsersync from automatically opening your browser
};