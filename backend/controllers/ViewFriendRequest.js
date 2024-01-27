const FriendRequest = require("../models/FriendRequestSchema");
const User = require("../models/UserSchema");

const ViewFriendRequest = async (req, res) => {
  const reciever_Id = req.params.id;

  try {
    const requests = await FriendRequest.find({ reciever_Id: reciever_Id ,status:"pending"});

    if (requests.length === 0) {
      return res.status(404).send("No friend requests found");
    }
    const requestsWithSenderInfo = await Promise.all(
      requests.map(async (request) => {
        const reqSender = await User.findById(request.sender_Id);
        return {
          friendRequest: request,
          senderInfo: reqSender,
        };
      })
    );

   //  console.log("Friend Requests:", requestsWithSenderInfo);

    res.status(200).json(requestsWithSenderInfo);
  } catch (error) {
    console.error(`Error in fetching friend request data: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = ViewFriendRequest;
