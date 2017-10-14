const Joi = require('joi');

module.exports = Joi.object().keys({
  firstname: Joi.string()
    .regex(/^[A-z]+$/)
    .min(3)
    .max(30),
  lastname: Joi.string()
    .regex(/^[A-z]+$/)
    .min(3)
    .max(30),
  birthdate: Joi.string().isoDate(),
  phone: Joi.string().replace(/[^\d+]+/g, ''),
  gender: Joi.number()
    .min(1)
    .max(2),
  city_id: Joi.number().integer(),
  password: Joi.string(),
  email: Joi.string().email(),
});
