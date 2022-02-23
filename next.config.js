// const withPreact = require('next-plugin-preact')
/* eslint-disable prettier/prettier */
// /** @type {import('next').NextConfig} */
// module.exports = withPreact({
//     compress: true,
//     swcMinify: true,
//     reactStrictMode: true,
//     experimental: {
//         concurrentFeatures: true,
//         serverComponents: true
//     }
// });

module.exports = {
    compress: true,
    swcMinify: true,
    reactStrictMode: true,
    i18n: {
        locales: ["en", "es"],
        defaultLocale: "en",
    },
    // experimental: {
    //     concurrentFeatures: true,
    //     serverComponents: true,
    // },
};
