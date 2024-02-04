const FriendRequest = require("../models/FriendRequestSchema");
const User = require("../models/UserSchema");

const UnFriend = async (req, res) => {
  const { requestingId, targetId } = req.body;

  try {
    
    const requestingUser = await User.updateOne(
      { _id: requestingId },
      { $pull: { connections: targetId } }
    );

    const targetUser = await User.updateOne(
      { _id: targetId },
      { $pull: { connections: requestingId } }
    );

   
   

    const dltFrequest= await FriendRequest.deleteOne({
        $or:[
            {sender_Id:requestingId,reciever_Id:targetId},
            {sender_Id:targetId,reciever_Id:requestingId}
        ]
    })

    res.status(200).json({ message: "Unfriended successfully",requestingUser,targetUser,dltFrequest });
  } catch (error) {
    console.error("Error unfriending:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = UnFriend;
 