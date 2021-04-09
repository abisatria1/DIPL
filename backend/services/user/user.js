const Service = require("../Service")
const bcrypt = require("bcrypt")
const Op = require("sequelize").Op
const { getGeoIp, signJwtToken } = require("./utils")
class User extends Service {
  constructor({ db }) {
    super({ db })
  }

  async login({ email, password }) {
    const user = await this.db.User.findOne({
      include: [this.db.Campaigner, this.db.Participant],
      where: { email },
    })
    if (!user) return false

    if (bcrypt.compareSync(password, user.password)) {
      let token
      if (user.participant) {
        token = signJwtToken({ participantId: user.participant.id })
      } else {
        token = signJwtToken({ campaignerId: user.campaigner.id })
      }
      return token
    } else {
      return false
    }
  }

  async registerParticipant(
    user = { username, passsword, email, status },
    { nama_participant }
  ) {
    const checkUser = await this.db.User.findOne({
      where: { [Op.or]: [{ email: user.email }, { username: user.username }] },
    })
    if (checkUser) {
      const error = new Error("Email or Username has been used")
      error.status = 400
      throw error
    }

    const result = await this.db.Participant.create(
      {
        nama_participant,
        user: {
          ...user,
        },
      },
      {
        include: [this.db.User],
      }
    )
    return result
  }

  async registerCampaigner(
    user = { username, passsword, email, status },
    campaigner = {
      nama_campaigner,
      notelp_campaigner,
      maks_kuota_campaigner,
    }
  ) {
    const checkUser = await this.db.User.findOne({
      where: { [Op.or]: [{ email: user.email }, { username: user.username }] },
    })
    if (checkUser) {
      const error = new Error("Email or Username has been used")
      error.status = 400
      throw error
    }

    const result = await this.db.Campaigner.create(
      {
        ...campaigner,
        user: {
          ...user,
        },
      },
      {
        include: [this.db.User],
      }
    )
    return result
  }
}

module.exports = User
