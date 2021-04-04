const Sequelize = require("sequelize")
const { container } = require("../../config/depedency-injection.config")
const db = container.resolve("db")

const CampaignerModel = db.define("campaigner", {
  nama_campaigner: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  notelp_campaigner: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  maks_kuota_campaigner: {
    type: Sequelize.INTEGER,
    defaultValue: 200,
  },
})

module.exports = CampaignerModel
