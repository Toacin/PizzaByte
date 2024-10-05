require("dotenv").config();

let productionConfig = {};

if (process.env.JAWSDB_URL) {
  const jawsdbUrl = new URL(process.env.JAWSDB_URL);

  productionConfig = {
    username: jawsdbUrl.username,
    password: jawsdbUrl.password,
    database: jawsdbUrl.pathname.substring(1),
    host: jawsdbUrl.hostname,
    port: jawsdbUrl.port,
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false,
  };
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: true,
  },
  test: {
    username: process.env.GH_SECRET_USER || process.env.DB_USER,
    password: process.env.GH_SECRET_PASSWORD || process.env.DB_PASSWORD,
    database:
      process.env.GH_SECRET_DATABASE || process.env.DB_DATABASE + "_test",
    host: process.env.GH_SECRET_HOST || process.env.DB_HOST,
    port: process.env.GH_SECRET_PORT || process.env.DB_PORT,
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false,
  },
  production: productionConfig,
};
