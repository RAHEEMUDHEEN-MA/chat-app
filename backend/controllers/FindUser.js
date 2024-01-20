const User = require("../mongoose/models/UserSchema");

const FindUser = async (req, res) => {
  const {mobile}=req.body
  const theuser = await User.findOne({mobile});
  if(!theuser){
    return res.status(400).json({message:'user not found'})
  }
  res.json(theuser)
};

module.exports=FindUser