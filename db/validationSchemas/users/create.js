const Joi = require('joi');

module.exports = Joi.object().keys({
  firstname: Joi.string()
    .regex(/^[A-z]+$/)
    .min(3)
    .max(30)
    .required(),
  lastname: Joi.string()
    .regex(/^[A-z]+$/)
    .min(3)
    .max(30)
    .required(),
  birthdate: Joi.string()
    .isoDate()
    .required(),
  phone: Joi.string()
    .replace(/[^\d+]+/g, '')
    .required(),
  gender: Joi.number()
    .min(1)
    .max(2)
    .required(),
  city_id: Joi.number()
    .integer()
    .required(),
  password: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
});
