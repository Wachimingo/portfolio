const withPreact = require('next-plugin-preact');

module.exports = withPreact({
    reactStrictMode: true,
    i18n: {
        locales: ["en", "es"],
        defaultLocale: "en",
    },
});
