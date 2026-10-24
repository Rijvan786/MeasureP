import {body, validationResult}  from "express-validator"

export async function Validation(req,res,next) {
    
    const error =await validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            message:error.array()
        })
    }
    next()

}
  
export const RegisterValidator=[
    body("FullName").notEmpty().withMessage("FullName is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("password").matches(/^(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/).withMessage("Password must be at least 8 character and include one special character or at least on number"),
    body("role").matches(/^(customer|technician)$/).withMessage("Role must be customer and technician"),
    body('experienceYears')
        .if((value, { req }) => req.body.role === 'technician')
        .notEmpty()
        .withMessage('Experience years are required for technician')
        .isNumeric()
        .withMessage('Experience years must be a number'), 
    body('isVerifiedTech')
        .if((value, { re     }) => req.body.role === 'technician')
        .notEmpty()
        .withMessage('Technically is verify are required for technician')
        .isBoolean()
        .withMessage('Experience years must be a number'), 
        Validation
]

