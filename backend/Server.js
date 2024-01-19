const Connection = require("./mongoose/Connection");
const express=require('express');
const appRouter = require("./routers/appRouter");

const app=express()

Connection()
app.use(express.json())

app.use('/chatapp',appRouter)

const port=8080
app.listen(port,console.log(`server is running on port : ${port}`))




