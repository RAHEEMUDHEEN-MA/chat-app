const mongoose=require('mongoose')

const Connection=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MongoURL)
             
      
        console.log(`Database connected successfully`)
    } catch (error) {
        console.log(`failed to connect mongoDB ,error:${error}`)
        
    }
}

module.exports=Connection