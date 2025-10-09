import express from 'express'
import { connectDB } from "./config/connectDB.js";
import dotenv from 'dotenv'
import cors from 'cors'
import userAuthRouter from '../Backend/routes/userAuth.js'
dotenv.config();
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(
    cors({
        origin:  ["http://localhost:5173"],
        credentials: true,
    })
)
app.use('/userAuth', userAuthRouter);

const port = process.env.PORT || 5002;
connectDB().then(()=>{
app.listen(5001, ()=>{
    console.log(`Server Started on PORT: ${port}`);
})
})
