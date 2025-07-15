const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;

const coursesSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  thumbnail: String,
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  teacher: { type: Types.ObjectId, ref: "Users", required: true },
});

coursesSchema.index({ createdAt: 1 });
module.exports = model("Courses", coursesSchema, "courses");
