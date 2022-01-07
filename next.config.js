/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
module.exports = {
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: true,
    serverComponents: true
  }
};

module.exports = {
  env: {
    HTTPS: true,
    JWT_EXPIRES_IN: '90d',
    JWT_COOKIE_EXPIRES_IN: 90,
    // MONGODB_URI:
    //   'mongodb+srv://tabs7:preespecialidad@wachimingo.aorej.mongodb.net/microempresa?retryWrites=true',
    MONGODB_URI:
      'mongodb://localhost:27017/portfolio?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    // managementBackend: 'https://comedor-backend.herokuapp.com',
    managementBackend: 'http://localhost:3001',
    EMAIL_SERVER: 'smtp://09371a77bc9725:da68e33acb8eab@smtp.mailtrap.io:587',
    // EMAIL_SERVER:
    //   'smtp://apikey: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@smtp.sendgrid.net:587',
    EMAIL_FROM: 'joshua.herrera2@outlook.com',
    // NEXTAUTH_URL: 'http://localhost:3000'  ,
    // VERCEL_URL: 'http://localhost:3000',
    SECRET: 'comedor-buen-amanecer-san-marcos',
    FACEBOOK_CLIENT_ID: '1969796469875667',
    FACEBOOK_CLIENT_SECRET: 'ce06faa90c600eac31a90dcdb5efdd80',
    GOOGLE_API: 'https://developers.google.com/drive/api/v3/quickstart/nodejs'
  }
};