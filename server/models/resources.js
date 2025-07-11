const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;

const resourcesSchema = new Schema({
  name: { type: String, required: true },
  fileType: { type: String, enum: ["jpg", "png", "jpeg", "webp", "pdf", "doc", "ppt", "zip"], required: true },
  courseId: { type: Types.ObjectId, ref: "Courses", required: true },
  lessonId: { type: Types.ObjectId, ref: "Lessons", required: true },
});

module.exports = model("Resources", resourcesSchema, "resources");
