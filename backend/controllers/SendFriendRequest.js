const FriendRequest = require("../mongoose/models/FriendRequestSchema");

const SendFriendRequest = async (req,res) => {
  try {
    const sender_Id=req.params.id
    const {  reciever_Id,} = req.body;
    const newRequest = await FriendRequest.create({
      sender_Id,
      reciever_Id,
     
    });
    res.json(newRequest);
  } catch (error) {
    return console.log(`error to send friend request ,error: ${error}`);
  }
};

module.exports = SendFriendRequest;
