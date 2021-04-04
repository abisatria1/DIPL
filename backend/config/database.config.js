const Sequelize = require("sequelize")
const dotenv = require("dotenv").config()

const database = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  }
)

module.exports = database
