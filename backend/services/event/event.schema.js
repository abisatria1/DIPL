const Joi = require("joi")

const createEventSchema = Joi.object().keys({
  nama_event: Joi.string().max(25).required(),
  tanggal_event: Joi.date().required(),
  jumlah_anggota: Joi.number().required(),
  template_twibbon: Joi.string(),
  deskripsi_event: Joi.string(),
})

const updateEventSchema = Joi.object().keys({
  nama_event: Joi.string().max(25).required(),
  tanggal_event: Joi.date().required(),
  jumlah_anggota: Joi.number().required(),
  template_twibbon: Joi.string(),
  deskripsi_event: Joi.string(),
})

module.exports = {
  createEventSchema,
  updateEventSchema,
}
