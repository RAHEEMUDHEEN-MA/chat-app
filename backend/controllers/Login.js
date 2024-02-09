const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const userdata = await User.findOne({ mobile });
    if (userdata && (await bcrypt.compare(password, userdata.password))) {
      const token = genarateToken(userdata._id);
      res
        .status(200)
        .json({ message: "login success", token: token, userdata: userdata });
    } else {
      if (!userdata) {
        res.status(404).json({ message: "Mobile number is not registered" });
      } else {
        res.status(401).json({ success: false, message: "Incorrect password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const genarateToken = (id) => {
  return jwt.sign({ id }, process.env.JwtSecretKey, { expiresIn: "20 min" });
};
module.exports = Login;
