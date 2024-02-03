const { Server } = require("socket.io");
const Chat = require("../models/ChatSchema");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: " http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE,UPDATE"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`user with socket ID ${socket.id} is logged in`);

    // ----------------------------test socket

    socket.on("socketTest", (data) => {
      console.log(data);
    });


    const socketTestMessage = "socket test is OK";
    socket.broadcast.emit("SocketTest", socketTestMessage);

    // ----------- -------------------------onlineStatus

    //     let activeUsers = ["hi"];

    // socket.on("setOnline", (ActiveUserID) => {
    //     console.log("user online:", ActiveUserID);
    //     activeUsers.push(ActiveUserID);
    //     console.log("users active now:", activeUsers);
    // });

    // socket.on("setOffline", (deActivatingId) => {
    //     console.log("user offline", deActivatingId);
    //     activeUsers = activeUsers.filter((userId) => userId !== deActivatingId);
    //     console.log("users active now:", activeUsers);
    // });

    // ---------------------------one to one chat

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

    // --------------------------------------typing status
 
    socket.on("typing", (data) => {
      console.log("typing:", data);

    socket.broadcast.emit("ListenTyping", data);
 
    });

    // -------------------------random chat

    socket.on("joinRoom", (data) => {
      socket.join(data.room);
      console.log(
        `${data.name}  with socket ID: ${socket.id} joined chatroom :${data.room}`
      );
    });

    socket.on("sendRandomMessage", (messageData) => {
      socket.to(messageData.room).emit("reciveRandomMessage", messageData);
    });

    socket.on("disconnect", () => {
      console.log(`user with socket ID ${socket.id} is logged out`);
    });
  });
};
