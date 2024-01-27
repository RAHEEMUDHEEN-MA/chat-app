const User = require("../models/UserSchema");

const ViewConnections = async (req, res) => {
  const _id = req.params.id;
  try {
    const UserWIthFriends = await User.findById({_id}).populate('connections');
    if (UserWIthFriends) {
      res.status(200).json({ user: UserWIthFriends });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = ViewConnections;
