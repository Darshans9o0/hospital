import express from "express"
import cors from "cors"
import 'dotenv/config.js'
import connectDb from "./config/mongoDb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/admin.route.js"
import doctorRouter from "./routes/doctor.route.js"
import userRoutes from "./routes/user.Routes.js"



// app congfig 

const app = express()
const port = process.env.PORT || 4000

connectDb()
connectCloudinary()

// MIDDLLEWARE 
app.use(express.json())
app.use(cors())

// api end point 
app.use('/api/admin' , adminRouter)
app.use('/api/doctor' , doctorRouter)
app.use('/api/user' , userRoutes)
// localhost:4000/api/admin/add-doctor

app.get('/' , (req, res)=>{
    res.send('api working')
})

app.listen(port , ()=> console.log("server Started",port));
