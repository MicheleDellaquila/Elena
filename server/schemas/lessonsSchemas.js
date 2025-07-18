const Joi = require("joi");
const { regexObjectId } = require("@constants/constants.js");

const lessonsSchema = Joi.object({
  courseId: Joi.string().pattern(regexObjectId, "ID corso non valido").required(),
});

module.exports = { lessonsSchema };