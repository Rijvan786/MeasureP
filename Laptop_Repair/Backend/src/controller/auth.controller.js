import jwt  from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Config } from "../config/config.js"
import UserModel from "../models/auth.model.js"
import { validatedAndFormat } from "../validator/contact.validator.js"


const SendTokenResponse = (res,user,message)=>{
try {
    const token =jwt.sign({
    id:user._id                                      
},
  Config.JWT_SECRET,{expiresIn:"7d"}
)
res.cookie("token",token),
res.status(200).json({
    message,
    success:true,
    user:{
        id:user._id,
        email:user.email,
        contact:user.contact,
        FullName:user.FullName,
        role:user.role,
        city:user.city,
        experienceYears:user.experienceYears,
        isVerifiedTech:user.isVerifiedTech
        
    }

})
}
 catch (error) {
   res.status(401).json({
    message:'Token is Unauthorized'
   })  
}
}


export async function RegisterController(req,res){
  
try {
        const {FullName,email,contact,city,password,experienceYears,isVerifiedTech,role}=req.body
console.log(FullName,email,contact,city,password,isVerifiedTech,role);     

    const validContact =validatedAndFormat(contact)
    console.log(validContact)
    if(!validContact){
        return res.status(400).json({
            message:"contact Number is Invalid"
        })
    }   
    const isExist= await UserModel.findOne({
        $or:[
            {email:email},
            {contact:validContact}
        ]
    })
    if(isExist){
        return res.status(409).json({
            message: `User ${isExist.email==email?"email is All ready Registered ":"is All ready registered"}`
        })
    
    }
        const user =await UserModel.create({
            FullName,
            contact:validContact,
            email,
            city,
            password,
            role,
            experienceYears,
            isVerifiedTech
        })
        await SendTokenResponse(res,user,"User is registered Successfully")
    
} catch (error) {
    res.status(500).json({
        message: ` Internal  Server error ${error.message} `
    })
}

}
 
