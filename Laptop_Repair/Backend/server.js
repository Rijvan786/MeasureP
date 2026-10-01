// your work is only run server and connect to the database

import app from "./src/app.js"
import { connectDB } from "./src/config/db.js"

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
   
})


connectDB()
