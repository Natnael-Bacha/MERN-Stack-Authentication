import express from 'express'
import { connectDB } from "./config/connectDB.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import passport from 'passport';
import "../Backend/config/passport.js"
import session from "express-session";
import userAuthRouter from '../Backend/routes/userAuth.js'

dotenv.config();
const app = express();
// app.use(
//     cookieSession({
//         name: "session",
//         keys: ["cyberwolve"],
//         maxAge: 24 * 60 * 60 * 100
//     })
// )
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(
    cors({
        origin:  ["http://localhost:5173"],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    })
)


app.use(
  session({
    secret: process.env.SESSION_SECRET || "cyberwolve_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());





app.use('/userAuth', userAuthRouter);

const port = process.env.PORT || 5002;
connectDB().then(()=>{
app.listen(port, ()=>{
    console.log(`Server Started on PORT: ${port}`);
})
})
