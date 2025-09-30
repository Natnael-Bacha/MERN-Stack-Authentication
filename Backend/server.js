import express from 'express'
import { connectDB } from "./config/connectDB.js";
import dotenv from 'dotenv'
dotenv.config();
const app = express();
const port = process.env.PORT || 5002;
connectDB().then(()=>{
app.listen(5001, ()=>{
    console.log(`Server Started on PORT: ${port}`);
})
})
