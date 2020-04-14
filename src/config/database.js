require('dotenv/config');

module.exports = {
  production: {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    storage: process.env.DB_STORAGE || './database.sqlite',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: false,
  },
  development: {
    dialect: process.env.DEV_DB_CONNECTION,
    host: process.env.DEV_DB_HOST,
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    database: process.env.DEV_DB_NAME,
    storage: process.env.DEV_DB_STORAGE || './database.dev.sqlite',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    dialect: process.env.TEST_DB_CONNECTION,
    host: process.env.TEST_DB_HOST,
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASS,
    database: process.env.TEST_DB_NAME,
    storage: process.env.TEST_DB_STORAGE || './database.test.sqlite',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: false,
  },
};
