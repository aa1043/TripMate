const dotenv=require('dotenv')
dotenv.config()
const connectToDb=require('./db/db')
connectToDb()
const cors=require('cors')
const express=require("express")
const app=express()
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user_routes')
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.get("/",(req,res)=>{
    res.send("hi UBER ")
})
app.use('/users', userRoutes)

module.exports=app