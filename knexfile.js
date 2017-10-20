if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV not set');
}

const config = require('config');

module.exports = {
  test: {
    client: 'pg',
    debug: false,
    connection: {
      host: config.get('dbConfig.dbHost'),
      port: config.get('dbConfig.dbPort'),
      user: config.get('dbConfig.dbUser'),
      // password: process.env.DB_PASSWORD,
      database: `${config.get('dbConfig.database')}`,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
  },
  development: {
    client: 'pg',
    debug: false,
    connection: {
      host: config.get('dbConfig.dbHost'),
      port: config.get('dbConfig.dbPort'),
      user: config.get('dbConfig.dbUser'),
      // password: process.env.DB_PASSWORD,
      database: `${config.get('dbConfig.database')}`,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
  },
};
