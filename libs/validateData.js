const Joi = require('joi');

module.exports = (data, schema) => {
  const { error, value } = Joi.validate(data, schema, {
    abortEarly: false,
  });

  return { error, value };
};
