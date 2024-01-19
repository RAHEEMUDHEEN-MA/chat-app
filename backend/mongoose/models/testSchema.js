const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  name: { type: String },
  age:{type:String}
});

const testmodel = mongoose.model("test", testSchema);

module.exports = testmodel;
