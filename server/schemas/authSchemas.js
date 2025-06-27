const Joi = require("joi");

const regexUnibaEmail = /@(studenti\.)?([a-zA-Z0-9-]+\.)*uniba\.it$/;
const signUpSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().pattern(regexUnibaEmail, "L'email non è valida").required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("student", "teacher").default("student"),
});

module.exports = { signUpSchema };
