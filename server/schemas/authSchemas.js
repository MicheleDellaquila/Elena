const Joi = require("joi");

/* regex patterns for validation */
const regexUnibaEmail = /@(studenti\.)?([a-zA-Z0-9-]+\.)*uniba\.it$/;

const signUpSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().pattern(regexUnibaEmail, "L'email non è valida").required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("Studente", "Insegnante").default("Studente"),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { signUpSchema, loginSchema };
