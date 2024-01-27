const Chat = require("../models/ChatSchema");

const LoadChatHistory = async (req, res) => {
  const { sender_id, receiver_id } = req.body;

  try {
    const chatHistory = await Chat.find({
      $or:[
        {    sender_id: sender_id,receiver_id: receiver_id},
        {sender_id: receiver_id,receiver_id: sender_id}
      ]
    
    });
    if (!chatHistory) {
      res.status(404).send("No previos chats")
    }

    res.status(200).json( chatHistory );
  } catch (error) {
    console.error("Error in loading chat history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = LoadChatHistory;
