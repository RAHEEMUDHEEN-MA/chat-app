const Chat = require("../../models/ChatSchema");
const FriendRequest = require("../../models/FriendRequestSchema");
const User = require("../../models/UserSchema");

const clearDB = async (req, res) => {
  try {
    // await User.deleteMany({});
    // await FriendRequest.deleteMany({});
    await Chat.deleteMany({});

    res.status(200).json({ message: "All data cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = clearDB;
