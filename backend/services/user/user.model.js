const Sequelize = require("sequelize")
const { container } = require("../../config/depedency-injection.config")
const bycrpt = require("bcrypt")
const db = container.resolve("db")

const UserModel = db.define("user", {
  username: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(data) {
      const hashed = bycrpt.hashSync(data, 10)
      this.setDataValue("password", hashed)
    },
  },
  email: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: 1,
  },
})

module.exports = UserModel
