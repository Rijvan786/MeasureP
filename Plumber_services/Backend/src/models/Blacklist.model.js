import mongoose from "mongoose";


const BlacklistSchema=await mongoose.Schema({
    token:{
        type:String,
        createAt:{type:Date,default:Date.now,expires:3600},
        required:[true,"Required for creating account"]
    }
},{
    timestamps:true
}
)

const BlackListModel=mongoose.model("blacklist",BlacklistSchema)

export default BlackListModel