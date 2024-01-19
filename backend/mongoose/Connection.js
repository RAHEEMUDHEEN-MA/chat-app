const mongoose=require('mongoose')

const Connection=async()=>{
    try {
        const connect=await mongoose.connect('mongodb+srv://raheemudheenma118:119881141@r4heem.4zbotc0.mongodb.net/chat-app?retryWrites=true&w=majority')
        console.log(`Database connected successfully`)
    } catch (error) {
        console.log(`failed to connect mongoDB ,error:${error}`)
        
    }
}

module.exports=Connection