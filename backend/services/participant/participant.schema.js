const Joi = require("joi")

const updateProfileSchema = Joi.object().keys({
  username: Joi.string().min(3).required(),
  nama_participant: Joi.string().min(3).required(),
})

module.exports = {
  updateProfileSchema,
}
