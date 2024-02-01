const FriendRequest = require("../models/FriendRequestSchema");

const SendFriendRequest = async (req, res) => {
  const { sender_Id, reciever_Id ,date} = req.body;
  try {
    

    if (!sender_Id || !reciever_Id) {
      return res
        .status(400)
        .json({ message: "SenderID and RecieverID are required" });
    }

    const alreadyconnected = await FriendRequest.findOne({
      sender_Id: sender_Id,
      reciever_Id: reciever_Id,
    });
    console.log("already   :", alreadyconnected);
    if (!alreadyconnected) {
      const newRequest = await FriendRequest.create({
        sender_Id,
        reciever_Id,
        date
      });

      res.status(201).json(newRequest);
    } else {
      return res
        .status(400)
        .json({ message: "Request is already pending " });
    }
  } catch (error) {
    console.error(`Error sending friend request: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = SendFriendRequest;
