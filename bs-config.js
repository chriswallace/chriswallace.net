module.exports = {
    files: ["./_site/**/*.*"],
    server: false,
    proxy: "http://127.0.0.1:4000",
    reloadDelay: 500,
    injectChanges: true,
    https: {
        key: "./ssl/localhost.key",
        cert: "./ssl/localhost.crt",
    },
    open: false // Prevents Browsersync from automatically opening your browser
};