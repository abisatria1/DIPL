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
    this.viewTwibbon = this.viewTwibbon.bind(this)
    this.deleteTwibbon = this.deleteTwibbon.bind(this)
    this.viewAllTwibbon = this.viewAllTwibbon.bind(this)
  }

  /**
   * untuk melihat twibbon yang sudah dibuat
   * @param {Express.Request} req
   * @param {Express.Response} req
   * @param {Express.NextFunction} next
   */
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

  /**
   * generate twibbon dengan mengupload foto diri
   * @param {Express.Request} req
   * @param {Express.Response} req
   * @param {Express.NextFunction} next
   */
  async createTwibbon(req, res, next) {
    try {
      const { user } = req
      const { eventId } = req.params
      const foto = req.file
      const result = await this.participantService.createTwibbon(
        eventId,
        user.id,
        foto
      )
      return res.sendSuccess(result)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Untuk menghapus twibbon
   * @param {Express.Request} req
   * @param {Express.Response} req
   * @param {Express.NextFunction} next
   */
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

  /**
   * Untuk melihat seluruh twibbon yang sudah dimiliki oleh user
   * @param {Express.Request} req
   * @param {Express.Response} req
   * @param {Express.NextFunction} next
   */
  async viewAllTwibbon(req, res, next) {
    try {
      const { user } = req
      const twibbons = await this.participantService.viewAllTwibbon(user)
      return res.sendSuccess(twibbons)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Untuk melihat seluruh twibbon yang sudah dimiliki oleh user
   * @param {Express.Request} req
   * @param {Express.Response} req
   * @param {Express.NextFunction} next
   */
  async viewAllTwibbon(req, res, next) {
    try {
      const { user } = req
      const twibbons = await this.participantService.viewAllTwibbon(user)
      return res.sendSuccess(twibbons)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = participantController
