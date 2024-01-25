const User = require("../mongoose/models/UserSchema");

const FindUserById= async(req,res)=>{
    const id=req.params.id
    try {
        const response=await User.findById(id)
        res.status(200).send(response)
        
    } catch (error) {
        console.log(error)
        res.status(404).send(" myrr not found")
        
    }
}

module.exports=FindUserById 