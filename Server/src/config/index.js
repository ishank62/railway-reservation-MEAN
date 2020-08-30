const environment = {
  development: {
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_HOSTNAME: process.env.MONGO_HOSTNAME,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_DB: process.env.MONGO_DB,
    MONGO_AUTH: process.env.MONGO_AUTH,
  },
  production: {
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_HOSTNAME: process.env.MONGO_HOSTNAME,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_DB: process.env.MONGO_DB,
    MONGO_AUTH: process.env.MONGO_AUTH,
  },
};

module.exports = environment[process.env.NODE_ENV || 'development'];