const User = require("../models/UserSchema");

const EditProfile = async (req, res) => {
  const { _id, name, email } = req.body;
  console.log(_id, name, email);
  try {
    if (name == "" || email == "") {
      return res.status(400).json({ error: "name and email is null" });
    } else {
      const editedProfile = await User.findByIdAndUpdate(
        _id,
        {
          name: name,
          email: email,  
        },
        { new: true }
      );
      console.log("profile updated succsessfully :", editedProfile);

      return res.json(editedProfile);
    }
  } catch (error) {
    console.log("error in updating profile", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = EditProfile; 
   