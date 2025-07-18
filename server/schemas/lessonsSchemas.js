const Joi = require("joi");

/* regex patterns for validation */
const regexObjectId = /^[0-9a-fA-F]{24}$/;

const lessonsSchema = Joi.object({
  courseId: Joi.string().pattern(regexObjectId, "ID corso non valido").required(),
});

module.exports = { lessonsSchema };