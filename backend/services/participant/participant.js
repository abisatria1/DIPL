const Service = require("../Service")
const { generateTwibbon } = require("./utils")
const { deleteFile } = require("../../helper/file")
const Op = require("sequelize").Op
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
   * create twibbon
   * @param {Number} idEvent
   * @param {fs.File} foto
   * @returns
   */
  async createTwibbon(participantId, eventId) {
    const event = await this.eventService.viewDetailEventByParticipant(eventId)
    const twibbon = await this.db.EventParticipant.findOne({
      where: {
        [Op.and]: [{ eventId }, { participantId }],
      },
    })
    if (!event || !twibbon) {
      const error = new Error("Can't create twibbon, data not found")
      error.status = 404
      throw error
    }
    // generate
    // save hasil generate ke db
    return {
      event: event.template_twibbon,
      foto_participant: twibbon.foto_participant,
    }
  }

  /**
   * upload Foto Diri
   * @param {Number} eventId
   * @param {Number} participantId
   * @param {String} foto
   * @returns Integer
   */
  async uploadFotoDiri(eventId, participantId, foto) {
    const event = await this.eventService.viewDetailEventByParticipant(eventId)
    const result = await this.db.EventParticipant.create({
      foto_participant: foto,
      participantId,
      eventId: event.id,
    })
    return result
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
    if (!twibbon) {
      const error = new Error("twibbon not found")
      error.status = 404
      throw error
    }
    if (twibbon.hasil_foto) {
      deleteFile(twibbon.hasil_foto)
    }
    deleteFile(twibbon.foto_participant)
    await twibbon.destroy()
    return true
  }
}

module.exports = Participant
