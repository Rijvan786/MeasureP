import dotenv from "dotenv"
dotenv.config()


const {MONGO_URI,JWT_SECRET, NODE_ENV,GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,GOOGLE_REFRESH_TOKEN,
    EMAIL_USER,GOOGLE_CLIENT_ID2,GOOGLE_CLIENT_SECRET2
} = process.env

if(!MONGO_URI){
    throw new Error("MONGO_URI is not defined in the environment variables")
}

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in the environment variables")
}

if(!GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID is not defined in environment variable")
}

if(!GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in environment variable")
}

if(!GOOGLE_REFRESH_TOKEN){
    throw new Error("GOOGLE_REFRESH_TOKEN is not defined in environment variable")
}

if(!EMAIL_USER){
    throw new Error("EMAIL_USER Token is not defined in environment variable")
}

if(!GOOGLE_CLIENT_ID2){
    throw new Error ("EMAIL_USER Token is not define in environment variable")
}
if(!GOOGLE_CLIENT_ID2){
    throw new Error ("GOOGLE_CLIENT_ID2 Token is not define in environment variable")
}

if(!GOOGLE_CLIENT_SECRET2){
    throw new Error ("GOOGLE_CLIENT_SECRET2 Token is not define in environment variable")
}

if(!NODE_ENV){
    throw new Error ("NODE_ENV Token is not define in environment variable")
}

export const  Config ={
    MONGO_URI:MONGO_URI,

    JWT_SECRET:JWT_SECRET,

    NODE_ENV:NODE_ENV,

    GOOGLE_CLIENT_ID:GOOGLE_CLIENT_ID,

    GOOGLE_CLIENT_SECRET:GOOGLE_CLIENT_SECRET,

    GOOGLE_REFRESH_TOKEN:GOOGLE_REFRESH_TOKEN,

    EMAIL_USER:EMAIL_USER,
    
    GOOGLE_CLIENT_ID2:GOOGLE_CLIENT_ID2,

    GOOGLE_CLIENT_SECRET2:GOOGLE_CLIENT_SECRET2

    
}