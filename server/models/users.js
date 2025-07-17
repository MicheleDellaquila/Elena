const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profileImage: String,
  role: { type: String, enum: ["Studente", "Insegnante"], default: "Studente" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Users", usersSchema, "users");
