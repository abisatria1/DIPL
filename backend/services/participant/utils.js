const sharp = require("sharp")

/**
 *
 * @param {Path} frame
 * @param {Path} fotoParticipant
 * @param {Path} outputPath
 * @returns bool
 */
const generateTwibbon = (frame, fotoParticipant, outputPath) => {
  sharp(frame)
    .resize(1000, 1000)
    .toBuffer({ resolveWithObject: true }) // We want it to a buffer
    .then(({ data, info }) => {
      sharp(fotoParticipant)
        .resize(1000, 1000)
        .composite([{ input: data }])
        .toFile(outputPath, function (err) {
          if (err == null) {
            return true
          }
        })
    })
  return false
}

module.exports = {
  generateTwibbon,
}
