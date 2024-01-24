const User = require("../mongoose/models/UserSchema");

const ViewConnections = async (req, res) => {
  const _id = req.params.id;
  try {
    const friendsIDs = await User.findById(_id);
    if (friendsIDs) {
    //   const friendListWithInfo = await Promise.all(
    //     user.connections.map(async (friend) => {
            
    //     })
    //   );

      res.status(200).json({ friendlist: friendsIDs });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = ViewConnections;
