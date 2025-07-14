const Joi = require("joi");

/* regex patterns for validation */
const regexObjectId = /^[0-9a-fA-F]{24}$/;

const enrollCourseSchema = Joi.object({
  courseId: Joi.string().pattern(regexObjectId, "ID Corso non valido").required(),
  userId: Joi.string().pattern(regexObjectId, "ID utente non valido").required(),
});

module.exports = { enrollCourseSchema };
