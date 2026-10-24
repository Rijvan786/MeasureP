import mongoose from "mongoose";



 const priceSchema=new mongoose.Schema({
  
        // सर्विस का नाम (यह पहचानना ज़रूरी है कि यह कीमत किस चीज़ की है)
    // उदा: "Screen Repair", "Keyboard Replacement"
    serviceName: {
      type: String,
      required: true,
      unique: true, 
      trim: true
    },
    
    amount:{
        type:Number,
        required:true,
      },
       currency: {
      type: String,
      default: "INR", 
      trim: true
    },
    
    // (Optional) Soft Delete के लिए, अगर In future remove from price List
    isActive: {
      type: Boolean,
      default: true
    }
},
 {timestamps:true},
 {partialFilterExpression:{
    isActive:true
 }}
);

export default priceSchema