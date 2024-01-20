const FriendRequest = require("../mongoose/models/FriendRequestSchema");

const ViewFriendRequest = async (req, res) => {
  const sender_Id = req.params.id;

 try {
    const requests = await FriendRequest.find({ reciever_Id:sender_Id });
  
    if (requests.length===0) {
        res.send("no requests")
        
    }
    res.send(requests)
 } catch (error) {
    console.log(`error in fetching friend request data ${error}`)
    res.status(500).send('internal server error')
 }

};
module.exports=ViewFriendRequest
