const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  dob: { type: Date },
  gender: { type: String },
  profile_photo: { type: String },
  mobile: { type: String, unique: true },
  password: { type: String, required: true },
  connections: { type: Array, default: [] }
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
