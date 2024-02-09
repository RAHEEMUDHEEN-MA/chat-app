const multer = require("multer");
const path = require("path");

// Assuming you'll require the User model later
// const User = require("../models/UserSchema");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images/profile"));
  },
  filename: (req, file, cb) => {
    const username = req.body.userName;
        console.log(username);
    cb(
      null,

     "profile" + Date.now() + path.extname(file.originalname)
    );
  },
}); 

const photoUpload = multer({ storage: storage });

module.exports = photoUpload;
