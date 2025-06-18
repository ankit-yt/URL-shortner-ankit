import dotenv from 'dotenv'
dotenv.config()
if(!process.env.MONGO_URL){
    throw new Error("MONGO_URL is not defined");
}
import mongoose from 'mongoose'
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected successfully")).catch((err)=>console.log("error while connecting to db" + err))
export default mongoose