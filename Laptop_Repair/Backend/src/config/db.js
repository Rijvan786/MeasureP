import mongoose from "mongoose"
import {Config} from "./config.js"



 export const connectDB = async () => {
   try{ await mongoose.connect(Config.MONGO_URI)
    console.log("Database connected successfully")}
catch(err){
    console.error("Database connection Error",err)
    throw err
}
}
