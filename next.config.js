const withPreact = require('next-plugin-preact');
/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
module.exports = withPreact({
    reactStrictMode: true,
    i18n: {
        locales: ["en", "es"],
        defaultLocale: "en",
    },
});
