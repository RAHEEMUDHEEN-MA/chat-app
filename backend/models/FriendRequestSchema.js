const mongoose = require("mongoose");

const FriendRequestSchema = mongoose.Schema({
  sender_Id: { type: String },
  reciever_Id: { type: String },
  date:{type:Date},
  status: { type: String ,default:"pending"},
});

const FriendRequest=mongoose.model("friend_requests",FriendRequestSchema)

module.exports=FriendRequest
