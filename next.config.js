const withPreact = require('next-plugin-preact');

module.exports = withPreact({
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ["en", "es"],
        defaultLocale: "en",
    },
});
