const express = require("express");
const app = express();
const Connection = require("./configs/Connection");
const cors = require("cors");
const http = require("http");
const appRouter = require("./routers/appRouter");

app.use(cors()); 
Connection();
app.use(express.json());
app.use("/chatapp", appRouter);

const server = http.createServer(app);

const SocketIO = require("./socket/chatSocket");
SocketIO(server);

const port = 7070;
server.listen(port, console.log(`server is running on port : ${port}`));
 