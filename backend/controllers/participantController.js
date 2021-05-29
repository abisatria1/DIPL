/**
 * Class ini berisi terkait dengan controller dari participant
 * Berfungsi untuk menghandle segala jenis usecase yang berkaitan dengan participant
 */
class participantController {
  /**
   * depedency injection service participant.
   * untuk menambahkan depedency bisa menambahkan pada parameter
   * @param {participantService} participantService
   */
  constructor({ participantService }) {
    this.participantService = participantService
    // javascript binding setiap ada method baru wajib di binding supaya bisa menggunakan this
    this.createTwibbon = this.createTwibbon.bind(this)
    this.uploadFotoDiri = this.uploadFotoDiri.bind(this)
    this.viewTwibbon = this.viewTwibbon.bind(this)
    this.deleteTwibbon = this.deleteTwibbon.bind(this)
  }

  async createTwibbon(req, res, next) {
    try {
      const { user } = req
      const { eventId } = req.params
      const result = await this.participantService.createTwibbon(
        user.id,
        eventId
      )
      return res.sendSuccess(result)
    } catch (err) {
      next(err)
    }
  }

  async uploadFotoDiri(req, res, next) {
    try {
      const { user } = req
      const { eventId } = req.params
      const foto = req.file.path
      const result = await this.participantService.uploadFotoDiri(
        eventId,
        user.id,
        foto
      )
      return res.sendSuccess(result)
    } catch (err) {
      next(err)
    }
  }

  async viewTwibbon(req, res, next) {
    try {
      const { user } = req
      const { eventId } = req.params
      const result = await this.participantService.viewTwibbon(eventId, user.id)
      return res.sendSuccess(result)
    } catch (err) {
      next(err)
    }
  }

  async deleteTwibbon(req, res, next) {
    try {
      const { user } = req
      const { twibbonId } = req.params
      await this.participantService.deleteTwibbon(twibbonId, user.id)
      return res.sendSuccess()
    } catch (err) {
      next(err)
    }
  }
}

module.exports = participantController
