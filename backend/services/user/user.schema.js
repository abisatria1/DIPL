const Joi = require("joi")

const registerParticipantSchema = Joi.object().keys({
  user: Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  }),
  participant: Joi.object({
    nama_participant: Joi.string().min(3).required(),
  }),
})

const registerCampaignerSchema = Joi.object().keys({
  user: Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  }),
  campaigner: Joi.object({
    nama_campaigner: Joi.string().min(3).required(),
    notelp_campaigner: Joi.string().min(6).required(),
  }),
})

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

module.exports = {
  registerParticipantSchema,
  registerCampaignerSchema,
  loginSchema,
}
