const Joi = require("joi");

/* regex patterns for validation */
const regexObjectId = /^[0-9a-fA-F]{24}$/;

const enrollCourseSchema = Joi.object({
  courseId: Joi.string().pattern(regexObjectId, "ID Corso non valido").required(),
  userId: Joi.string().pattern(regexObjectId, "ID utente non valido").required(),
});

const searchCoursesSchema = Joi.object({
  page: Joi.number().integer().min(1).required(),
  limit: Joi.number().integer().min(1).default(12).required(),
  title: Joi.string().optional(),
  category: Joi.string().optional(),
  teacher: Joi.string().pattern(regexObjectId, "ID utente non valido").optional(),
});

module.exports = { enrollCourseSchema, searchCoursesSchema };
