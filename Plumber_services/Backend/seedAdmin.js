// seedAdmin.js
 // 🚀 .env से डेटा पढ़ने के लिए ज़रूरी
import mongoose from "mongoose";
import UserModel from "./src/models/auth.model.js";// UserModel का सही पाथ दें
import { Config } from "./src/config/config.js";

const createSuperAdmin = async () => {
  try {
    // 1. डेटाबेस से कनेक्ट करें (URL .env से आएगा)
    await mongoose.connect(Config.MONGO_URI);
    console.log("MongoDB Connected...");

    // 2. चेक करें कि एडमिन पहले से तो नहीं है? (ताकि गलती से दो बार रन हो जाए तो क्रैश न हो)
    const adminExists = await UserModel.findOne({ email: 'maniharr130@gmail.com' });
    if (adminExists) {
      console.log("⚠️ एडमिन अकाउंट पहले से मौजूद है!");
      process.exit(); // स्क्रिप्ट बंद कर दें
    }

    // 3. नया एडमिन बनाएँ
 
   const user= await UserModel.create({
      FullName: 'Super Admin',
      email: 'maniharr130@gmail.com',
      contact: '+917748067905',
      password: 'Rijvan@12345',
      role: 'Admin',
      verified:true
    })
     console.log(user);

    console.log("✅ Admin Account Created Successfully!");
    process.exit(); // 🚀 काम End       होने के बाद स्क्रिप्ट अपने आप बंद हो जाएगी

  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
};

createSuperAdmin();