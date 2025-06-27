const Joi = require("joi");

const signUpSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string()
    .email()
    .pattern(/@([a-zA-Z0-9-]+\.)*uniba\.it$/, "L'email non è valida")
    .required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("student", "teacher").default("student"),
});

module.exports = { signUpSchema };
