const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;

const lessonsSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  filename: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  courseId: { type: Types.ObjectId, ref: "Courses", required: true },
});

lessonsSchema.index({ createdAt: -1 });

module.exports = model("Lessons", lessonsSchema, "lessons");
