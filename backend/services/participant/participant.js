const Service = require("../Service")
const { generateTwibbon } = require("./utils")
const { deleteFile, findFile, writeFile } = require("../../helper/file")
const Op = require("sequelize").Op
const multer = require("multer")
class Participant extends Service {
  /**
   * depedency injection db.
   * untuk menambahkan depedency bisa menambahkan pada parameter
   * @param {Sequelize} db
   */
  constructor({ db, eventService }) {
    super({ db })
    this.eventService = eventService
  }

  /**
   * view hasil jadi twibbon yang sudah dibuat
   * @param {Number} eventId
   * @param {Number} participantId
   * @returns String
   */
  async viewTwibbon(eventId, participantId) {
    const event = await this.eventService.viewDetailEventByParticipant(eventId)
    const twibbon = await this.db.EventParticipant.findOne({
      where: {
        [Op.and]: [{ eventId: event.id }, { participantId }],
      },
    })
    return twibbon
  }

  /**
   * create twibbon dengan upload foto diri
   * @param {Number} eventId
   * @param {Number} participantId
   * @param {multer.file} foto
   * @returns Integer
   */
  async createTwibbon(eventId, participantId, foto) {
    const event = await this.eventService.viewDetailEventByParticipant(eventId)

    // generate
    const fotoDiriOutputPath = `image/foto_participant/${Date.now()}_${
      foto.originalname
    }`
    const hasilOutputPath = `image/hasil_foto/${participantId}${eventId}${Date.now()}.jpg`

    const resFoto = await generateTwibbon(event.template_twibbon, foto.buffer)
    writeFile(fotoDiriOutputPath, foto.buffer)
    writeFile(hasilOutputPath, resFoto)

    const result = await this.db.EventParticipant.create({
      foto_participant: fotoDiriOutputPath,
      participantId,
      eventId: event.id,
      hasil_foto: hasilOutputPath,
    })
    await event.update({
      jumlah_anggota : parseInt(event.jumlah_anggota) - 1
    })
    return { ...result, hasil_foto_buffer: resFoto }
  }

  /**
   * delete twibbon
   * @param {Number} twibbonId
   * @param {Number} participantId
   * @returns True
   */
  async deleteTwibbon(twibbonId, participantId) {
    const twibbon = await this.db.EventParticipant.findOne({
      where: {
        [Op.and]: [{ twibbonId }, { participantId }],
      },
    })
    const event = await this.db.Event.findByPk(twibbon.eventId)
    if (!twibbon) {
      const error = new Error("twibbon not found")
      error.status = 404
      throw error
    }
    if (!event) {
      const error = new Error("event not found")
      error.status = 404
      throw error
    }
    if (twibbon.hasil_foto) {
      deleteFile(twibbon.hasil_foto)
    }
    deleteFile(twibbon.foto_participant)
    await twibbon.destroy()
    await event.update({
      jumlah_anggota : parseInt(event.jumlah_anggota) + 1
    })
    return true
  }

  /**
   * view all twibbon yang dimiliki / diikuti oleh participant
   * @param {Number} twibbonId
   * @param {Number} participantId
   * @returns True
   */
  async viewAllTwibbon(participant) {
    const twibbons = await participant.getEvents({
      include: [this.db.Campaigner],
    })
    return twibbons
  }

  /**
   * update data profile participant
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns Promise<Event>
   */
  async updateProfile(user, username, nama_participant) {
    const userModel = user.user

    const isExistUsername = await this.db.User.findOne({ where: { username } })
    if (isExistUsername && isExistUsername.id != userModel.id) {
      throw this.createError("Username has been used", 400)
    }

    await userModel.update({ username })

    return await user.update({
      nama_participant,
      user: {
        username,
      },
    })
  }

  createError(message, code) {
    const error = new Error(message)
    error.code = code
    return error
  }
}

module.exports = Participant
