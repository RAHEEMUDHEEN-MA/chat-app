const FriendRequest = require("../mongoose/models/FriendRequestSchema");

const SendFriendRequest = async (req, res) => {
  try {
    const { sender_Id, reciever_Id } = req.body;

    if (!sender_Id || !reciever_Id) {
      return res
        .status(400)
        .json({ message: "SenderID and RecieverID are required" });
    }

    const newRequest = await FriendRequest.create({
      sender_Id,
      reciever_Id,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error(`Error sending friend request: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = SendFriendRequest;
