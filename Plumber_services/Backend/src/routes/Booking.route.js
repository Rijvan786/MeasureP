import { Router } from "express";
import { CreateOrderController } 
from "../controller/booking.controller.js";


const router=Router()


router.post("/CreateOrder",CreateOrderController)


// router.get("/OrderDetail",            GetOrderDetailController)








export default router