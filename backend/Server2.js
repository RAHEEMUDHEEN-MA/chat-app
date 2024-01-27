const express = require("express");
const app = express();
const Connection = require("./configs/Connection");
const cors = require("cors");
const http = require("http");
const appRouter = require("./routers/appRouter");
const Chat = require("./models/ChatSchema");
const SendMessage = require("./controllers/SendMessage");



app.use(cors());
Connection();
app.use(express.json());
app.use("/chatapp", appRouter);
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: " http://localhost:3000",
    methods: ["GET", "POST"],
  },
});



io.on("connection", (socket) => {
  console.log(`user with socket ID ${socket.id} is logged in`);

  // ----------------------------socket testing function

  socket.on("socketTest", (data) => {
    console.log(data);
  });
  // ------------------------------------------sending message

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
  // const message1="hi user"
  // socket.emit('recieveChatMessage',message1)

  socket.on("disconnect", () => {
    console.log(`user with socket ID ${socket.id} is logged out`);
  });
});



const port = 7070;
server.listen(port, console.log(`server is running on port : ${port}`));
