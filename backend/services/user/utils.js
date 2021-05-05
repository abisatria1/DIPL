const axios = require("axios")
const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")

/**
 * Untuk membuat token jwt dengan bantuan library jsonwebtoken
 * @param {Object} payload
 * @returns jwt token
 */
const signJwtToken = (payload) => {
  const token = jwt.sign(
    {
      iss: "Tweebz",
      sub: payload,
      iat: Date.now(),
    },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  )
  return token
}

/**
 * Untuk mendapatkan data address dari ip address
 * @param {String} ip
 * @returns string data address
 */
const getGeoIp = async (ip) => {
  const url = `http://ip-api.com/json/${ip}`
  try {
    const response = await axios.get(url)
    return response.data.address
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signJwtToken,
  getGeoIp,
}
