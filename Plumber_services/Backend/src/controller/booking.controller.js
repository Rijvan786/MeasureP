
import OrderModel from "../models/Order.model"



export async function CreateOrderController(req,res){
   try{
 const {brand,modelName,serviceName,category,issueDescription,
          label,street, city,pin_code ,location, 
    }=req.body

       
    const booking=await OrderModel.create({

        laptopDetail:{
            brand:brand,
            modelName:modelName,
            serviceName:serviceName,
            category:category,
            issueDescription:issueDescription,
        },
        address:{
            label:label,
            street:street,
            city,
            pin_code:pin_code,
            location:location
        }

    })
   }catch(err){

   }
}