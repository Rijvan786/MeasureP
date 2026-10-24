import mongoose from "mongoose";


const AddressSchema=mongoose.Schema({
      
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    label:{
    type:String,
    enum:["Home","office","Other"],
    default:"Home",
},
street:{type:String,required:true},
city:{type:String,required:true},
pin_code:{type:String,required},

// GeoJSON
location:{
    type:{type:String,enum:["Point"],default:"Point"},
    coordinates:{type:[Number],required:true}
},
isActive:{
    type:Boolean,
    default:true

}},{
    timestamps:true
});
    
AddressSchema.index({location:'2dsphere'})

AddressSchema.index({userId:1},{partialFilterExpression:{isActive:true}})

export default AddressSchema