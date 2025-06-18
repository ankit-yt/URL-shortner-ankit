import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import {nanoid} from 'nanoid'
import './src/config/mongo.config.js'
import urlschema from "./src/models/shortUrl.model.js"
import shortUrlRoute from "./src/routes/shortUrl.routes.js"
import GlobalErrHandle from './src/utility/GlobalErrHandle.js';
import cors from 'cors'
import authRotues from './src/routes/auth.routes.js'
import userRoutes from "./src/routes/user.route.js"
import cookieParser from "cookie-parser";

const app = express()
app.use(cors({
   origin:"https://url-shortner-ankit.vercel.app",
   credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/auth", authRotues)
app.use( "/", shortUrlRoute)
app.use("/api",userRoutes)



app.use(GlobalErrHandle)
 app.listen(5000,()=>{
    console.log('server is running on port 5000')
 })