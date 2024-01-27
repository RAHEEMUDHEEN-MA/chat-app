const express = require("express");
const app = express();
const Connection = require("./mongoose/Connection");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const bodyParser = require("body-parser");
const appRouter = require("./routers/appRouter");
const Chat = require("./mongoose/models/ChatSchema");
const SendMessage = require("./controllers/SendMessage");

app.use(cors());
Connection();
app.use(express.json());
// app.use(bodyParser.json());
app.use("/chatapp", appRouter);

const server = http.createServer(app);
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
  });http://localhost:3000/home/chat/65b2121512b52d856a77a0f7

  // ----------------------------load Chat History

socket.on("loadChatHistory",async ({sender_id,receiver_id})=>{
  console.log("loadhistory server: ",sender_id,receiver_id.id)
  try {

    const chatHistory=await Chat.find({
     $or:[
      { sender_id: receiver_id.id, receiver_id: sender_id },
      { sender_id: sender_id, receiver_id: receiver_id.id },
     ]
    }).sort("time")
    console.log("historryy: ",chatHistory)

    socket.emit("receiveChatHistory", chatHistory);
  } catch (error) {
    
  }
})

 
  // ------------------------------------------
  socket.on("send_message", async (data) => {
    // console.log("at server socket", data);
    const { sender_id, receiver_id, content } = data;
    try {
     

      if (sender_id && receiver_id) {
        const message = await Chat.create({
          sender_id,
          receiver_id,
          content,
        });
        io.to(receiver_id).emit("receive_message", message);
        console.log(" message sended");
      } else {
        console.log("Do login ! ");
      }
    } catch (error) {
      console.error(`Failed to send message: ${error}`);
    }
  });

  // ------------------------------------

  socket.on("disconnect", () => {
    console.log(`user with socket ID ${socket.id} is logged out`);
  });
});

// const port = 7070;
// server.listen(port, console.log(`server is running on port : ${port}`));
