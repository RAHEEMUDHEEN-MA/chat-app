

const { Server } = require("socket.io");
const Chat = require("../models/ChatSchema");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: " http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });


  io.on("connection", (socket) => {
    console.log(`user with socket ID ${socket.id} is logged in`);

    socket.on("socketTest", (data) => {
      console.log(data);
    });

    socket.on("sendChatMessage", async (message) => {
      const { sender_id, receiver_id, content } = message;

      try {
        if (sender_id && receiver_id) {
          const newMessage = await Chat.create({
            sender_id,
            receiver_id,
            content,
          });
        } else {
          console.log("Do login ! ");
        }
      } catch (error) {
        console.error(`Failed to send message: ${error}`);
      }

      console.log(message);

      socket.broadcast.emit("recieveChatMessage", message);
    });

    socket.on("disconnect", () => {
      console.log(`user with socket ID ${socket.id} is logged out`);
    });
  });
};
