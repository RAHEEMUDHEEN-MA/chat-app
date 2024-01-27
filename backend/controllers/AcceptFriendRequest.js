const FriendRequest = require("../models/FriendRequestSchema");
const User = require("../models/UserSchema");

const AcceptFriendRequest = async (req, res) => {
  const rid = req.params.rid;
  try {
    const alreadyaccepted=await FriendRequest.findOne({_id:rid})
    if (alreadyaccepted.status==="accepted") {
        return res.send('not a pending request !!!!')
        
    }
    const acceptedRequest = await FriendRequest.findByIdAndUpdate(

      rid,
      {
        status: "accepted",
      },
      { new: true }
    );

    const updatedSender = await User.findByIdAndUpdate(
      acceptedRequest.sender_Id,
      { $push: { connections: [acceptedRequest.reciever_Id] } }, { new: true }
    );

    const updatedReciever = await User.findByIdAndUpdate(
      acceptedRequest.reciever_Id,
      { $push: { connections: [acceptedRequest.sender_Id] } }, { new: true }
    );

    res.send(`${updatedSender.name} friend of ${updatedReciever.name}\n
    ${updatedReciever.name} friend of ${updatedSender.name}`)
    
    ;
  } catch (error) {}
};

module.exports = AcceptFriendRequest;
