import dotenv from "dotenv"
dotenv.config()


const {MONGO_URI,JWT_SECRET} = process.env

if(!MONGO_URI){
    throw new Error("MONGO_URI is not defined in the environment variables")
}

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in the environment variables")
}


export const  Config ={
    MONGO_URI:MONGO_URI,
    JWT_SECRET:JWT_SECRET

}