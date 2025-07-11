const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;

const lessonsSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  transcription: String,
  createdAt: { type: Date, default: Date.now },
  courseId: { type: Types.ObjectId, ref: "Courses", required: true },
});

module.exports = model("Lessons", lessonsSchema, "lessons");
