import { Router } from "express";
import passport from "passport";
import { RegisterController } from "../controller/auth.controller.js";

const router =Router()

router.post("/register",RegisterController)


export default router