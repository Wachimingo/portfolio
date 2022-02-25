const path = require('path');
const withPreact = require('next-plugin-preact');
/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
module.exports = withPreact({
    // runtime: 'nodejs',
    // compress: true,
    // swcMinify: true,
    reactStrictMode: true,
    i18n: {
        locales: ["en", "es"],
        defaultLocale: "en",
    },
    // experimental: {
    //     outputStandalone: true,
    //     // concurrentFeatures: true,
    //     // serverComponents: true,
    // },
    env: {
        HTTPS: true,
        JWT_EXPIRES_IN: '90d',
        JWT_COOKIE_EXPIRES_IN: 90,
        MONGODB_URI:
            'mongodb+srv://tabs7:preespecialidad@wachimingo.aorej.mongodb.net/microempresa?retryWrites=true',
        // MONGODB_URI:
        //     'mongodb://127.0.0.1:27017/portfolio?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
        managementBackend: 'https://comedor-backend.herokuapp.com',
        // managementBackend: 'http://localhost:3001',
        // EMAIL_SERVER: 'smtp://09371a77bc9725:da68e33acb8eab@smtp.mailtrap.io:587',
        SENDGRID_API_KEY: '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',
        EMAIL_SERVER:
            'smtp://apikey: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@smtp.sendgrid.net:587',
        EMAIL_FROM: 'joshua.herrera2@outlook.com',
        // NEXTAUTH_URL: 'http://localhost:3000'  ,
        // VERCEL_URL: 'http://localhost:3000',
        SECRET: 'comedor-buen-amanecer-san-marcos',
        FACEBOOK_CLIENT_ID: '1969796469875667',
        FACEBOOK_CLIENT_SECRET: 'ce06faa90c600eac31a90dcdb5efdd80',
        GOOGLE_API: 'https://developers.google.com/drive/api/v3/quickstart/nodejs',
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_test_51KPTBHCqE0Zs1JMwoniQ4l75MVq3QSzTgmSZTJnFiMheuVGTKWpDw2hrX8K1GJpqLHrMVF3jrP20s6PEQP5xRAxy00huZo12Le',
        NEXT_PUBLIC_STRIPE_SECRET_KEY: 'sk_test_51KPTBHCqE0Zs1JMwRNuPNrCgsj4T3WT8WQjuBJnBpwYTc41MMW8sq0mCqtwPAShoExVDjW63FbQLwP5NTkQ3Kecp003ZrsgpsI',
        // NEXT_PUBLIC_OPENNODE_API_KEY: '02393c07-ad5b-404d-8b34-f0dedb8f96e7',
        NEXT_PUBLIC_OPENNODE_API_KEY: '521ba1ac-4ff7-4586-b3fc-2a89adcc16ea',
        NEXT_PUBLIC_OPENNODE_ECOMERCE_KEY: '1d0781ff-dfe1-4e52-a906-7d210280685e',
        NEXT_PUBLIC_OPENNODE_API_PROD_KEY: 'a8fea2cf-cb75-4f28-8f5d-fcd6e9182964',
        NEXT_PUBLIC_OPENNODE_PAYMENT_PROD_KEY: 'e896c4ce-d87c-460c-9eeb-f5daf93044fa'
    }
});

// module.exports = {
//     compress: true,
//     swcMinify: true,
//     reactStrictMode: true,
//     i18n: {
//         locales: ["en", "es"],
//         defaultLocale: "en",
//         localePath: path.resolve('./public/static/messages')
//     },
//     // experimental: {
//     //     concurrentFeatures: true,
//     //     serverComponents: true,
//     // },
//     env: {
//         HTTPS: true,
//         JWT_EXPIRES_IN: '90d',
//         JWT_COOKIE_EXPIRES_IN: 90,
//         MONGODB_URI:
//             'mongodb+srv://tabs7:preespecialidad@wachimingo.aorej.mongodb.net/microempresa?retryWrites=true',
//         // MONGODB_URI:
//         //     'mongodb://127.0.0.1:27017/portfolio?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
//         managementBackend: 'https://comedor-backend.herokuapp.com/',
//         // managementBackend: 'http://localhost:3001',
//         // EMAIL_SERVER: 'smtp://09371a77bc9725:da68e33acb8eab@smtp.mailtrap.io:587',
//         SENDGRID_API_KEY: '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',
//         EMAIL_SERVER:
//             'smtp://apikey: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@smtp.sendgrid.net:587',
//         EMAIL_FROM: 'joshua.herrera2@outlook.com',
//         // NEXTAUTH_URL: 'http://localhost:3000'  ,
//         // VERCEL_URL: 'http://localhost:3000',
//         SECRET: 'comedor-buen-amanecer-san-marcos',
//         FACEBOOK_CLIENT_ID: '1969796469875667',
//         FACEBOOK_CLIENT_SECRET: 'ce06faa90c600eac31a90dcdb5efdd80',
//         GOOGLE_API: 'https://developers.google.com/drive/api/v3/quickstart/nodejs',
//         NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_test_51KPTBHCqE0Zs1JMwoniQ4l75MVq3QSzTgmSZTJnFiMheuVGTKWpDw2hrX8K1GJpqLHrMVF3jrP20s6PEQP5xRAxy00huZo12Le',
//         NEXT_PUBLIC_STRIPE_SECRET_KEY: 'sk_test_51KPTBHCqE0Zs1JMwRNuPNrCgsj4T3WT8WQjuBJnBpwYTc41MMW8sq0mCqtwPAShoExVDjW63FbQLwP5NTkQ3Kecp003ZrsgpsI',
//         // NEXT_PUBLIC_OPENNODE_API_KEY: '02393c07-ad5b-404d-8b34-f0dedb8f96e7',
//         NEXT_PUBLIC_OPENNODE_API_KEY: '521ba1ac-4ff7-4586-b3fc-2a89adcc16ea',
//         NEXT_PUBLIC_OPENNODE_ECOMERCE_KEY: '1d0781ff-dfe1-4e52-a906-7d210280685e',
//         NEXT_PUBLIC_OPENNODE_API_PROD_KEY: 'a8fea2cf-cb75-4f28-8f5d-fcd6e9182964',
//         NEXT_PUBLIC_OPENNODE_PAYMENT_PROD_KEY: 'e896c4ce-d87c-460c-9eeb-f5daf93044fa'
//     }
// };