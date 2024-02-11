const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images/profile"));
  },
  filename: (req, file, cb) => {
    // const username = req.body.userName;
    //     console.log("useraname",username);
    cb(
      null,

     "profile" + Date.now() + path.extname(file.originalname)
    );
  },
}); 

const photoUpload = multer({ storage: storage });

module.exports = photoUpload;
 