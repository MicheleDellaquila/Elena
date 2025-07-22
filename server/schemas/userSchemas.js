const Joi = require("joi");

const profileSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required(),
});

module.exports = { profileSchema };
