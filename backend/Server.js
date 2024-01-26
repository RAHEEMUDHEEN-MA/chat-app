const express = require("express");
const app = express();
const Connection = require("./mongoose/Connection");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const bodyParser = require("body-parser");
const appRouter = require("./routers/appRouter");
const Chat = require("./mongoose/models/ChatSchema");

app.use(cors());
Connection();
app.use(express.json());
app.use(bodyParser.json());
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



  socket.on("send_message", async (data) => {
    try {
      const { sender_id, receiver_id, content } = data;
    //   console.log(sender_id,receiver_id)

    
     if(sender_id&&receiver_id){
        const message = await Chat.create({
            sender_id,
            receiver_id,
            content,
          });

          console.log("sended message :",message) 
     }
     else{
        console.log("login cheyyada nayee!")

     }

      
    } catch (error) {
      console.error(`Failed to send message: ${error}`);
    }
  });

socket.on("socketTest",(data)=>{
    console.log(data)
})

  socket.on("disconnect", () => {
    console.log(`user with socket ID ${socket.id} is logged out`);
  });
});

const port = 7070;
server.listen(port, console.log(`server is running on port : ${port}`));
