const Service = require("../Service")
const { userService, eventService } = require("../index")
const { generateTwibbon } = require("./utils")
class Participant extends Service {
  /**
   * Participant
   * @param {String} jenisKelamin 
   * @param {String} pekerjaan 
   */
  constructor(jenisKelamin, pekerjaan) {
    super()
  }
  /**
   * create twibbon
   * @param {Number} idEvent 
   * @param {fs.File} foto 
   * @returns 
   */
  createTwibbon(idEvent, foto) {
    const event = eventService()
    const frame = event.getFrame(idEvent)
    const twibbon = generateTwibbon(frame, foto)
    return twibbon
  }
  /**
   * view twibbon
   * @param {Number} idEvent 
   * @param {Number} idUser 
   * @returns File
   */
  viewTwibbon(idEvent, idUser) {
    const event = eventService()
    const twibbon = event.getTwibbon(idEvent, idUser)
    return twibbon
  }
  /**
   * upload Foto Diri
   * @param {Number} idUser 
   * @param {fs.File} foto 
   * @returns String
   */
  uploadFotoDiri(idUser, foto) {
    const { insertData } = this
    const path = foto.savePath()
    const query = insertData("participant", "user", { idUser, path })
    if (query) return "ok"
  }
  /**
   * delete twibbon
   * @param {Number} idTwibbon 
   * @returns String
   */
  deleteTwibbon(idTwibbon) {
    const { deleteData } = this
    const query = deleteData("participant", "twibbon", { idTwibbon })
    if (query) return "ok"
  }
}

module.exports = Participant
