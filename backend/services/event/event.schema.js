const Joi = require("joi");

const createEventSchema = Joi.object().keys({
  nama_event: Joi.string().max(25).required().min(3),
  tanggal_event: Joi.date().required(),
  jumlah_anggota: Joi.number().required().min(1),
  deskripsi_event: Joi.string().allow(""),
  template_twibbon: Joi.any(),
});

const updateEventSchema = Joi.object().keys({
  nama_event: Joi.string().max(25).required().min(3),
  tanggal_event: Joi.date().required(),
  jumlah_anggota: Joi.number().required().min(1),
  deskripsi_event: Joi.string().allow(""),
});

const updateProfileSchema = Joi.object().keys({
  username: Joi.string().min(3).required(),
  nama_campaigner: Joi.string().min(3).required(),
  notelp_campaigner: Joi.string().min(6).required(),
});

module.exports = {
  createEventSchema,
  updateEventSchema,
  updateProfileSchema,
};
