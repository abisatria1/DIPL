const Service = require("../Service")
const { userService, eventService } = require("../index")
const { generateTwibbon } = require("./utils")
class Participant extends Service {
  constructor(jenisKelamin, pekerjaan) {
    super()
  }
  createTwibbon(idEvent, foto) {
    const event = eventService()
    const frame = event.getFrame(idEvent)
    const twibbon = generateTwibbon(frame, foto)
    return twibbon
  }
  viewTwibbon(idEvent, idUser) {
    const event = eventService()
    const twibbon = event.getTwibbon(idEvent, idUser)
    return twibbon
  }
  uploadFotoDiri(idUser, foto) {
    const { insertData } = this
    const path = foto.savePath()
    const query = insertData("participant", "user", { idUser, path })
    if (query) return "ok"
  }
  deleteTwibbon(idTwibbon) {
    const { deleteData } = this
    const query = deleteData("participant", "twibbon", { idTwibbon })
    if (query) return "ok"
  }
}

module.exports = Participant
