    import mongoose from "mongoose";

    const LaptopSchema=mongoose.Schema({
        brand:{
            type:String,             //hp , dell
            required:true,
        },
        modelName:{
            type:String,     // 
            required:true
        },
        serviceName:{
            type:String,
            required:true
        },
        category:{
            type:String,
            enum:["Hardware","Software","Maintenance"],   
        },
        
        issuedDescription:{
            type:String,
            required:true
        }
    },
    {timestamps:true,optimisticConcurrency:true})
    LaptopSchema.index({ category: 1 }, { partialFilterExpression: { isActive: true } });

    export default LaptopSchema