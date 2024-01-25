const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  dob: { type: Date },
  gender: { type: String },
  profile_photo: { type: String,default:"" },
  mobile: { type: String, unique: true },
  password: { type: String, required: true },
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]  
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
