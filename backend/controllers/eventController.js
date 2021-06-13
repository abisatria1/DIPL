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
    this.viewDetailEvent = this.viewDetailEvent.bind(this)
    this.searchEvent = this.searchEvent.bind(this)
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

  /**
   * Melihat detail event
   * @param {Express.Request} req
   * @param {Express.Response} req
   * @param {Express.NextFunction} next
   */
  async viewDetailEvent(req, res, next) {
    try {
      const { eventId } = req.params
      const event = await this.eventService.viewDetailEventByParticipant(
        eventId
      )
      return res.sendSuccess(event)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Search event by name
   * @param {Express.Request} req
   * @param {Express.Response} req
   * @param {Express.NextFunction} next
   */
  async searchEvent(req, res, next) {
    try {
      const { nama_event } = req.query
      const event = await this.eventService.searchEventByName(nama_event)
      return res.sendSuccess(event)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = eventControler
