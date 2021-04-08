const axios = require("axios")

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
  getGeoIp,
}
