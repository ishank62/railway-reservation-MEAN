const config = require('../config');

const utility = {
  /**
   * @name createDbString
   * @description Used to return mongo dynamic connection URL
   * @param {string} DBName Name of DB used for connection
   * @param {boolean} auth used to get mongo string accordingly
   * @returns {string} mongo connection URL
   */
  createDbString: (DBName, auth) => {
    if (auth) {
      const mongoURL = `mongodb://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_HOSTNAME}:${config.MONGO_PORT}/${DBName}?authSource=admin`;
      return mongoURL;
    }
    const mongoURL = `mongodb://${config.MONGO_HOSTNAME}:${config.MONGO_PORT}/${DBName}`;
    return mongoURL;
  },
};

module.exports = utility;