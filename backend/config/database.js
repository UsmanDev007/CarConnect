import mongoose from "mongoose";
export const ConnectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('Mongo Connected Success!')
    } catch (error) {
        console.log(error)
    }
}