/**
 * Class ini berisi terkait dengan controller dari user
 * Berfungsi untuk menghandle segala jenis usecase yang berkaitan dengan user
 */
class userController {
  /**
   * depedency injection service user.
   * untuk menambahkan depedency bisa menambahkan pada parameter
   * @param {UserService} userService
   */
  constructor({ userService }) {
    this.userService = userService

    // javascript binding setiap ada method baru wajib di binding supaya bisa menggunakan this
    this.login = this.login.bind(this)
    this.registerParticipant = this.registerParticipant.bind(this)
    this.registerCampaigner = this.registerCampaigner.bind(this)
  }

  /**
   * Login user
   * Data req.body = {email, password}
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.Nextfunction} next
   * @returns Express.Response
   */
  async login(req, res, next) {
    try {
      // memanggil userService method
      const token = await this.userService.login(req.body)
      if (!token) {
        return res.sendError({}, "Invalid credentials", 401)
      }
      return res.sendSuccess({ jwtToken: token })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Registrasi participant
   * Data req.body = {user = {username,password,email}, participant= {nama_participant}}
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.Nextfunction} next
   * @returns Express.Response
   */
  async registerParticipant(req, res, next) {
    try {
      const { user, participant } = req.body
      // memanggil userService method
      const result = await this.userService.registerParticipant(
        user,
        participant
      )

      const response = {
        id: result.id,
        username: result.user.username,
        email: result.user.email,
        nama_participant: result.nama_participant,
        userId: result.userId,
      }
      return res.sendSuccess(response, "Success", 201)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Registrasi campaigner
   * Data req.body = {user = {username,password,email}, campaigner= {nama_camapigner, notelp_campaigner}}
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.Nextfunction} next
   * @returns Express.Response
   */
  async registerCampaigner(req, res, next) {
    try {
      const { user, campaigner } = req.body
      const result = await this.userService.registerCampaigner(user, campaigner)

      const response = {
        id: result.id,
        username: result.user.username,
        email: result.user.email,
        nama_campaigner: result.nama_campaigner,
        notelp_campaigner: result.notelp_campaigner,
        maks_kuota_campaigner: result.maks_kuota_campaigner,
        userId: result.userId,
      }
      return res.sendSuccess(response, "Success", 201)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController
