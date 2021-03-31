const axios = require("axios")

const getGeoIp = async (ip) => {
  const url = `http://ip-api.com/json/${ip}`
  try {
    const response = await axios.get(url)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getGeoIp,
}
