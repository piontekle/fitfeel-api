import dotenv from "dotenv";
dontenv.config();

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "fitfeel-dev",
    host: 127.0.0.1,
    dialect: "postgres",
    logging: true,
    operatorAliases: false
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "fitfeel-test",
    host: 127.0.0.1,
    dialect: "postgres",
    logging: false,
    operatorAliases: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_url,
    host: 127.0.0.1,
    dialect: "postgres",
    logging: true,
    operatorAliases: false
  }
}
