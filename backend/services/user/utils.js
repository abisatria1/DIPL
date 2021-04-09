const axios = require("axios")
const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")

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
