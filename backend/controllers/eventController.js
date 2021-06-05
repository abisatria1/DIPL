/**
 * Class ini berisi terkait dengan controller dari event
 */
class eventControler {
  /**
   * depedency injection service event.
   * untuk menambahkan depedency bisa menambahkan pada parameter
   * @param {eventService} eventService
   */
  constructor({ eventService }) {
    this.eventService = eventService
    // javascript binding setiap ada method baru wajib di binding supaya bisa menggunakan this
    this.viewAllEvent = this.viewAllEvent.bind(this)
  }

  /**
   * Untuk mendapatkan seluruh event yang ada
   * @param {Express.Request} req
   * @param {Express.Response} req
   * @param {Express.NextFunction} next
   */
  async viewAllEvent(req, res, next) {
    try {
      const event = await this.eventService.viewAllEvent()
      return res.sendSuccess(event)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = eventControler
