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
  const ipApiUrl = `http://ip-api.com/json/${ip}`
  try {
    const metadataIP = await axios.get(ipApiUrl)
    const address = metadataIP.data.address 
    return userAddress
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signJwtToken,
  getGeoIp,
}
