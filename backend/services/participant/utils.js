const sharp = require("sharp")

/**
 *
 * @param {Path} frame
 * @param {Path} fotoParticipant
 * @param {Path} outputPath
 * @returns bool
 */
const generateTwibbon = async (frame, fotoParticipant) => {
  try {
    const { data } = await sharp(frame)
      .resize(1000, 1000)
      .toBuffer({ resolveWithObject: true })

    const result = await sharp(fotoParticipant)
      .resize(1000, 1000)
      .composite([{ input: data }])
      .toBuffer({ resolveWithObject: true })

    return result.data
  } catch (err) {
    throw err
  }
  // sharp(frame)
  //   .resize(1000, 1000)
  //   .toBuffer({ resolveWithObject: true }) // We want it to a buffer
  //   .then(({ data, info }) => {
  //     return sharp(fotoParticipant)
  //       .resize(1000, 1000)
  //       .composite([{ input: data }])
  //       .toBuffer({ resolveWithObject: true })
  //       .then(({ data, info }) => {
  //         console.log({ data, info })
  //         return data
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         return err
  //       })
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     return err
  //   })
}

module.exports = {
  generateTwibbon,
}
