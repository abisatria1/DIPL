const Joi = require("joi")

const createEventSchema = Joi.object().keys({
  nama_event: Joi.string().max(25).required(),
  tanggal_event: Joi.date().required(),
  jumlah_anggota: Joi.number().required(),
  deskripsi_event: Joi.string().allow(""),
  template_twibbon: Joi.any(),
})

const updateEventSchema = Joi.object().keys({
  nama_event: Joi.string().max(25).required(),
  tanggal_event: Joi.date().required(),
  jumlah_anggota: Joi.number().required(),
  deskripsi_event: Joi.string().allow(""),
})

module.exports = {
  createEventSchema,
  updateEventSchema,
}
