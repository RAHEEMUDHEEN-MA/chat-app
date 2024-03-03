const User = require("../models/UserSchema");

const FindUser = async (req, res) => {
  const mobile=req.params.mobile

  try {
    const theuser = await User.findOne({mobile});
    if(!theuser){
      return res.status(400).json({message:'User not found'})
    }
    res.json(theuser) 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
 
    
};   

module.exports=FindUser