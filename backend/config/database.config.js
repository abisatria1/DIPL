const Sequelize = require("sequelize")
const dotenv = require("dotenv").config()
const environment = process.env.NODE_ENV.trim()

const dbConfig = {
  dev: {
    name: process.env.DEV_DATABASE_NAME,
    user: process.env.DEV_DATABASE_USER,
    password: process.env.DEV_DATABASE_PASS,
    host: process.env.DEV_DATABASE_HOST,
  },
  test: {
    name: process.env.TEST_DATABASE_NAME,
    user: process.env.TEST_DATABASE_USER,
    password: process.env.TEST_DATABASE_PASS,
    host: process.env.TEST_DATABASE_HOST,
  },
}

const database = new Sequelize(
  dbConfig[environment]["name"],
  dbConfig[environment]["user"],
  dbConfig[environment]["password"],
  {
    host: dbConfig[environment]["host"],
    dialect: "mysql",
    logging: false,
  }
)

module.exports = database
