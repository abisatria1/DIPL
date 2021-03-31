const Service = require("../Service")
const { getGeoIp } = require("./utils")
class User extends Service {
  constructor(idUser, email, password, nama, noHp) {
    super()
    this.idUser = idUser
    this.email = email
    this.password = password
    this.nama = nama
    this.noHp = noHp
  }

  login(email, password) {
    const { getData } = this
    const data = getData("user", { email, password })
    if (data) return "success"
  }

  register(email, password, ip) {
    const { insertData } = this
    const geoIp = getGeoIp(ip)
    const data = insertData("user", { email, password, nama, noHp, geoIp })
    if (data) return "success"
  }
}

module.exports = User
