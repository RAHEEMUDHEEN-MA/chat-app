// const mongoose = require("mongoose");
// const moment = require("moment-timezone");

// const ChatSchema = mongoose.Schema(
//     {
//         sender_id: { type: String, ref: "User" },
//         receiver_id: { type: String, ref: "User" },
//         content: { type: String },
//         time: {
//             type: Date,
//             default: Date.now,
//             get: function () {

//                 if (this._doc.time) {

//                     return moment(this._doc.time).tz(timezone).format();
//                 }
//                 return null;
//             }
//         }
//     }
// );

// const Chat = mongoose.model("Chat", ChatSchema);

// module.exports = Chat;

const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const ChatSchema = mongoose.Schema({
  sender_id: { type: String, ref: "User" },
  receiver_id: { type: String, ref: "User" },
  content: { type: String },
  date: {
    type: Date,
    default: Date.now,
  }, 
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
