const User = require("../mongoose/models/UserSchema");


const SignUp = async (req, res) => {
  try {
    const { name, email, dob, gender, mobile, password } = req.body;
    const newUser = await User.create({
        name, email, dob, gender, mobile, password
    });
    res.send(newUser);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(`failed to add user ,error:${error}`);
  }
};

module.exports = SignUp;
