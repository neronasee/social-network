const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(30),
  description: Joi.string(),
  owner_id: Joi.number().integer(),
});
