import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import AuthRouter from "./routes/auth.route.js"

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.get('/', (req, res) => {
  res.send(`<h1>
    <script>
        alert("Hackediii")
    </script>
  </h1>`);
});
app.use("/api/auth",AuthRouter)



export default app 