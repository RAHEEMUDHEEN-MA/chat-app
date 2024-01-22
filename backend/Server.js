const Connection = require("./mongoose/Connection");
const express=require('express');
const cors=require("cors")
const bodyParser = require('body-parser');
const appRouter = require("./routers/appRouter");

const app=express()

Connection()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());

app.use('/chatapp',appRouter) 

const port=7070 
app.listen(port,console.log(`server is running on port : ${port}`))




