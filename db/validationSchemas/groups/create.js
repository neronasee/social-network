const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  description: Joi.string().default('No description'),
  owner_id: Joi.number()
    .integer()
    .required(),
});
