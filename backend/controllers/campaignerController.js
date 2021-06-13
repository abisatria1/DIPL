/**
 * Class ini berisi terkait dengan controller dari campaigner
 * Berfungsi untuk menghandle segala jenis usecase yang berkaitan dengan campaigner
 */
class campaignerController {
  /**
   * depedency injection service campaigner.
   * untuk menambahkan depedency bisa menambahkan pada parameter
   * @param {campaignerService} campaignerService
   */
  constructor({ campaignerService }) {
    this.campaignerService = campaignerService
    // javascript binding setiap ada method baru wajib di binding supaya bisa menggunakan this
    this.createEvent = this.createEvent.bind(this)
    this.updateEvent = this.updateEvent.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.viewAllEvent = this.viewAllEvent.bind(this)
    this.viewEvent = this.viewEvent.bind(this)
    this.findEvent = this.findEvent.bind(this)
    this.updateEventTemplateTwibbon = this.updateEventTemplateTwibbon.bind(this)
    this.viewEventParticipant = this.viewEventParticipant.bind(this)
  }

  /**
   * Membuat event baru dengan template twibbon.
   * Campaigner terlebih dahulu login,
   * Data req.body = {nama_event, tanggal_event, jumlah_anggota, deskripsi_event}
   * Data template_twibbon dari req.file.path
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.Nextfunction} next
   * @returns Express.Response
   */
  async createEvent(req, res, next) {
    try {
      const campaigner = req.user
      const file = req.file
      // memanggil campaigner service untuk mengakses method campaigner
      const createdEvent = await this.campaignerService.createEvent({
        ...req.body,
        template_twibbon: file.path,
        campaignerId: campaigner.id,
      })
      return res.sendSuccess(createdEvent, "Berhasil", 201)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Update data event suatu event dengan menyertakan id event
   * data yang di update hanya deskripsi dari event
   * Campaigner terlebih dahulu login,
   * Data body = {nama_event, tanggal_event, jumlah_anggota, deskripsi_event}
   * Data params = {eventId : id dari event yang ingin di update}
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.Nextfunction} next
   * @returns Express.Response
   */
  async updateEvent(req, res, next) {
    try {
      const { eventId } = req.params
      const campaignerId = req.user.id
      // memanggil campaigner service untuk mengakses method campaigner
      await this.campaignerService.updateEvent(req.body, eventId, campaignerId)
      return res.sendSuccess()
    } catch (err) {
      next(err)
    }
  }

  /**
   * Update data twibbon suatu event dengan menyertakan id event
   * Campaigner terlebih dahulu login,
   * Data params = {eventId : id dari event yang ingin di update}
   * Data template_twibbon dari req.file.path
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.Nextfunction} next
   * @returns Express.Response
   */
  async updateEventTemplateTwibbon(req, res, next) {
    try {
      const { eventId } = req.params
      const campaignerId = req.user.id
      const file = req.file
      // memanggil campaigner service untuk mengakses method campaigner
      await this.campaignerService.updateEventTemplateTwibbon(
        { template_twibbon: file.path },
        eventId,
        campaignerId
      )
      return res.sendSuccess()
    } catch (err) {
      next(err)
    }
  }

  /**
   * delete data suatu event dengan menyertakan id event
   * Campaigner terlebih dahulu login,
   * Data params = {eventId : id dari event yang ingin di delete}
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.Nextfunction} next
   * @returns Express.Response
   */
  async deleteEvent(req, res, next) {
    try {
      const { eventId } = req.params
      const campaignerId = req.user.id
      // memanggil campaigner service untuk mengakses method campaigner
      await this.campaignerService.deleteEvent(eventId, campaignerId)
      return res.sendSuccess()
    } catch (err) {
      next(err)
    }
  }

  /**
   * Mendapatkan data detail suatu event dengan menyertakan id event
   * Campaigner terlebih dahulu login,
   * Data params = {eventId : id dari event yang ingin di view}
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.Nextfunction} next
   * @returns Express.Response
   */
  async viewEvent(req, res, next) {
    try {
      const { eventId } = req.params
      const campaignerId = req.user.id
      // memanggil campaigner service untuk mengakses method campaigner
      const result = await this.campaignerService.viewEvent(
        eventId,
        campaignerId
      )
      return res.sendSuccess(result)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Mendapatkan seluruh data event dari campaigner yang login
   * Campaigner terlebih dahulu login,
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.Nextfunction} next
   * @returns Express.Response
   */
  async viewAllEvent(req, res, next) {
    const campaignerId = req.user.id
    // memanggil campaigner service untuk mengakses method campaigner
    const result = await this.campaignerService.viewAllEvent(campaignerId)
    return res.sendSuccess(result)
  }

  /**
   * Mencari suatu event dengan menggunakan query nama event, dari campaigner yang login
   * Campaigner terlebih dahulu login,
   * Data query = {namaEvent : nama event yang akan dicari}
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.Nextfunction} next
   * @returns Express.Response
   */
  async findEvent(req, res, next) {
    const { namaEvent } = req.query
    const campaignerId = req.user.id
    // memanggil campaigner service untuk mengakses method campaigner
    const result = await this.campaignerService.findEvent(
      namaEvent,
      campaignerId
    )
    return res.sendSuccess(result)
  }

  /**
   * Mendapatkan seluruh participant dari suatu event yang dibuat
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.Nextfunction} next
   * @returns Express.Response
   */
  async viewEventParticipant(req, res, next) {
    try {
      const { user } = req
      const { eventId } = req.params

      const result = await this.campaignerService.viewEventParticipant(
        eventId,
        user.id
      )
      return res.sendSuccess(result)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = campaignerController
