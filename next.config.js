/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: true,
    serverComponents: true
  }
};

module.exports = {
  env: {
    // MONGODB_URI:
    //   'mongodb+srv://tabs7:preespecialidad@wachimingo.aorej.mongodb.net/microempresa?retryWrites=true',
    MONGODB_URI:
      'mongodb://localhost:27017/portfolio?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    managementBackend: 'https://comedor-backend.herokuapp.com',
    EMAIL_SERVER: 'smtp://0a5a6afb35a219:865872fdeb80cc@smtp.mailtrap.io:587',
    // EMAIL_SERVER: 'smtp://apikey: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@smtp.sendgrid.net:587',
    EMAIL_FROM: 'joshua.herrera2@outlook.com',
    // NEXTAUTH_URL: 'http://localhost:3000',
    // VERCEL_URL: 'http://localhost:3000',
    SECRET: 'secret',
    FACEBOOK_CLIENT_ID: '1969796469875667',
    FACEBOOK_CLIENT_SECRET: 'hola'
  }
};
