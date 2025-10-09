import express from "express"
import { handleUserSignup, handleUserSignin } from "../controllers/userAuth.js";

const route = express.Router();

route.post('/userSignup', handleUserSignup)
route.post('/userSignin', handleUserSignin)

export default route;