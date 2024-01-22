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
        res.status(404).json({ message: "Mobile number is not registered" });
      } else {
        res.status(401).json({  success: false, message: 'Incorrect password' });
      }
    }
  } catch (error) {
    console.log(error)
  }
};

module.exports = Login;
