const User = require("../models/UserSchema")

const profilePhoto=async (req,res)=>{ 
    console.log("PROFILE PIC UPLOADING ...",req.file,req.body)
    const imagePath=req.file.filename
    const _id=req.body.userID
    
    try {
        if (imagePath ==""||_id=="") {
            return res.status(400).json({error:"image or id not passed properly"})
        }
        const updatedProfile=await User.findByIdAndUpdate(_id,{
            profile_photo:imagePath
        }, { new: true })
        console.log("profile photo successfully updated.")
        res.json({updatedProfile})
    } catch (error) {
        console.log("failed to upadate the profile picture",error)
        res.status(500).json({ error: "Internal server error." })
    }
}

module.exports=profilePhoto     