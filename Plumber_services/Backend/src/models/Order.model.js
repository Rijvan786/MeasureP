import mongoose from "mongoose";
import  priceSchema  from "./price.model.js";
import LaptopSchema from "./laptop.model.js";
import AddressSchema from "./address.model.js";

const OrderSchema=mongoose.Schema({
   
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    technicianId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        default:null
    },
     laptopDetail:{
        type:LaptopSchema, 
        required:true
    },
    address:{
        type:AddressSchema,
        required:true
    },
   
    serviceRequested:[{
        serviceId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Price"
        },
        name:{type:String},
        cost:{type:Number}
    }],
    status:{
        type:String,
        enum:["Pending","Completed","Cancelled"],
        default:"Pending"
    },
    scheduleDate:{type:Date,required:true},
    totalAmount:{type:priceSchema},
    isArchived:{type:Boolean, default:false}
},
  {
    timestamps:true,optimisticConcurrency:true
  }
)
OrderSchema.index({ scheduledDate: 1 }, { partialFilterExpression: { status: 'Pending' } });
OrderSchema.index({ userId: 1, createdAt: -1 }, { partialFilterExpression: { isArchived: false } });



const OrderModel=mongoose.model("order",OrderSchema)
export default OrderModel