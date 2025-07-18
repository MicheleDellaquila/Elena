const Joi = require("joi");
const { regexObjectId } = require("@constants/constants.js");

const createCourseSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  files: Joi.object().optional(),
  category: Joi.string().required(),
  teacher: Joi.string().pattern(regexObjectId, "ID utente non valido").required(),
})

const enrollCourseSchema = Joi.object({
  courseId: Joi.string().pattern(regexObjectId, "ID corso non valido").required(),
  userId: Joi.string().pattern(regexObjectId, "ID utente non valido").required(),
});

const searchCoursesSchema = Joi.object({
  page: Joi.number().integer().min(1).required(),
  limit: Joi.number().integer().min(1).default(12).required(),
  title: Joi.string().optional(),
  category: Joi.string().optional(),
  teacher: Joi.string().pattern(regexObjectId, "ID utente non valido").optional(),
});

module.exports = { createCourseSchema, enrollCourseSchema, searchCoursesSchema };
