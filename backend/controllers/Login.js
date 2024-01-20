const User = require("../mongoose/models/UserSchema");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const userdata = await User.findOne({ mobile });
    if (userdata && await bcrypt.compare(password, userdata.password)) {
      res.status(200).json({ message: "login success" ,userdata } );
    } else {
      if (!userdata) {
        res.status(404).json({ message: "invalid mobile number" });
      } else {
        res.status(402).json({ message: "incorrect password" });
      }
    }
  } catch (error) {
    console.log(error)
  }
};

module.exports = Login;
