const User = require("../mongoose/models/UserSchema");
const bcrypt = require("bcrypt");

const SignUp = async (req, res) => {
  try {
    const { name, email, dob, gender, mobile, password } = req.body;
    const existingEmail=await User.findOne({email})
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(5);
    const encryptedPassword=await bcrypt.hash(password,salt)
    const newUser = await User.create({
      name,
      email,
      dob,
      gender,
      mobile,
      password:encryptedPassword,
    });
    res.send(newUser);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(`failed to add user ,error:${error}`);
  }
};

module.exports = SignUp;
