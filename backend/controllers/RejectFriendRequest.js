const FriendRequest = require("../models/FriendRequestSchema");

const RejectFriendRequest = async (req, res) => {
  const rid = req.params.rid;
  try {
    const requeststatus = await FriendRequest.findOne({ _id: rid });

    if (requeststatus.status === "pending") {
      const rejectRequest = await FriendRequest.findByIdAndUpdate(
        rid,
        {
          status: "rejected",
        },
        { new: true }
      );
      res.status(200).send("request rejected")
    } else {
      res.status(404).send(`${rid} is not a pending request !!`);
    }
  } catch (error) {
    console.error(`Error in fetching friend request status: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = RejectFriendRequest;
