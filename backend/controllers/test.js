const testmodel = require("../models/testSchema");

const test = async (req, res) => {
  const { name, age } = req.body;
  const testdata = await testmodel.create({ name, age });
  res.send(testdata)

// res.send("sbdskh")
};

module.exports = test;
