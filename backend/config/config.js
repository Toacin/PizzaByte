require("dotenv").config();

// db config file
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
  // test values need not go in env file as they exist solely in Github during PR
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
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false,
  },
};
