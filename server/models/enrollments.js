const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;

const enrollmentsSchema = new Schema({
  status: { type: String, enum: ["Da fare", "In corso", "Completato"], default: "Da fare" },
  progress: { type: Number, default: 0 },
  enrolledAt: { type: Date, default: Date.now },
  completedAt: Date,
  userId: { type: Types.ObjectId, ref: "Users", required: true },
  courseId: { type: Types.ObjectId, ref: "Courses", required: true },
});

// Indexes for performance optimization
enrollmentsSchema.index({ courseId: 1 });
enrollmentsSchema.index({ enrolledAt: 1 });

module.exports = model("Enrollments", enrollmentsSchema, "enrollments");