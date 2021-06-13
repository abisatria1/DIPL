const Service = require("../Service")
const bcrypt = require("bcrypt")
const Op = require("sequelize").Op
const { getGeoIp, signJwtToken } = require("./utils")

/**
 * Class ini berisi bisnis logic dari user
 */
class User extends Service {
  /**
   * depedency injection service event.
   * untuk menambahkan depedency bisa menambahkan pada parameter
   * @param {Sequelize} db
   */
  constructor({ db }) {
    super({ db })
  }

  /**
   * fungsi ini digunakan untuk memproses login dari user
   * @param {String} email email user
   * @param {String} password password user
   * @returns token jwt
   */
  async login({ email, password }) {
    // mencari user berdasarkan email
    const user = await this.db.User.findOne({
      include: [this.db.Campaigner, this.db.Participant],
      where: { email },
    })
    if (!user) return false

    // compare hash password dengan password yang diberikan user
    if (bcrypt.compareSync(password, user.password)) {
      let token
      // sign jwt token
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

  /**
   * Registrasi participant
   * @param {Object} user
   * @param {String} user.username
   * @param {String} user.password
   * @param {String} user.email
   * @param {String} nama_participant
   * @returns data participant yang berhasil registrasi
   */
  async registerParticipant(
    user = { username, passsword, email },
    { nama_participant }
  ) {
    // mengecek apakah ada user yang menggunakan username dan email yang saama
    const checkUser = await this.db.User.findOne({
      where: { [Op.or]: [{ email: user.email }, { username: user.username }] },
    })
    if (checkUser) {
      const error = new Error("Email or Username has been used")
      error.status = 400
      throw error
    }

    // create participant dan create user
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

  /**
   * Registrasi campaigner
   * @param {Object} user
   * @param {String} user.username
   * @param {String} user.password
   * @param {String} user.email
   * @param {Object} campaigner
   * @param {String} campaigner.nama_campaigner
   * @param {String} campaigner.notelp_campaigner
   * @param {Number} campaigner.maks_kuota_campaigner
   * @returns data campaigner yang berhasil registrasi
   */
  async registerCampaigner(
    user = { username, passsword, email },
    campaigner = {
      nama_campaigner,
      notelp_campaigner,
      maks_kuota_campaigner,
    }
  ) {
    // mengecek apakah ada user yang menggunakan username dan email yang saama
    const checkUser = await this.db.User.findOne({
      where: { [Op.or]: [{ email: user.email }, { username: user.username }] },
    })
    if (checkUser) {
      const error = new Error("Email or Username has been used")
      error.status = 400
      throw error
    }
    // create data campaigner dan user
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

  /**
   * Update data email dari user
   */
  async updateEmail(user, email) {
    const userModel = user.user
    if (userModel.email === email) {
      throw this.createError("Email is same", 400)
    }

    const isEmailExist = await this.db.User.findOne({ where: { email } })
    if (isEmailExist && isEmailExist.id != userModel.id) {
      throw this.createError("Email has been used", 400)
    }

    return await userModel.update({ email })
  }

  /**
   * Update data password dari user
   */
  async updatePassword(user, oldPassword, newPassword) {
    const userModel = user.user
    if (oldPassword === newPassword) {
      throw this.createError("Password is same", 400)
    }
    if (!bcrypt.compareSync(oldPassword, userModel.password)) {
      throw this.createError("Password invalid with old password", 401)
    }

    return await userModel.update({ password: newPassword })
  }

  createError(message, code) {
    const error = new Error(message)
    error.code = code
    return error
  }
}

module.exports = User
