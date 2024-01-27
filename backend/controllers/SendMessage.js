// const Chat = require("../mongoose/models/ChatSchema");
// const moment = require("moment-timezone");

// const SendMessage = async (req, res) => {
//   const { sender_id, receiver_id, content } = req.body;
//   try {
//     const message = await Chat.create({
//       sender_id,
//       receiver_id,
//       content,
//     });
    

//     const utcDate = message.time;
//     const istDate = moment.utc(utcDate).tz("Asia/Kolkata").format();
//     res.status(201).json({ "Message sended": message ,"IST":istDate});
   

//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//     console.log(`failed to send message :${error}`);
//   }
// };

// module.exports = SendMessage;


const Chat = require("../models/ChatSchema");
const moment = require("moment-timezone");

const SendMessage = async (req, res,data={}) => {
  console.log("at sendmessage function:",data)
  
  try {
    const message = await Chat.create(data);
    

    const utcDate = message.time;
    const istDate = moment.utc(utcDate).tz("Asia/Kolkata").format();
    res.status(201).json({ "Message sended": message ,"IST":istDate});
   

  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(`failed to send message :${error}`);
  }
};

module.exports = SendMessage;
  