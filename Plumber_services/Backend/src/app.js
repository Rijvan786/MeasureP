import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import AuthRouter from "./routes/auth.route.js"
import BookingRouter from "./routes/Booking.route.js"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Config } from "./config/config.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))

app.use(cookieParser())
app.get('/', (req, res) => {
  res.send(`<h1>
    
        Hello World 
    
  </h1>`);
});
app.use(cors({
        origin:"http://localhost:3000",
        credentials:true
}))


// routes
app.use("/api/auth",AuthRouter)
app.use("/api/auth",BookingRouter)

app.use(passport.initialize())

passport.use(new GoogleStrategy({
  clientID:Config.GOOGLE_CLIENT_ID2,
  clientSecret:Config.GOOGLE_CLIENT_SECRET2,
  callbackURL:"/api/auth/google/callback"
},
(_,__,profile,done)=>{
  return done(null,profile)
} 
))




export default app 