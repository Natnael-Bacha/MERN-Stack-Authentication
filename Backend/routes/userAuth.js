import express from "express"
import { handleUserSignup, handleUserSignin, handleForgotPassword, handleResetPassword } from "../controllers/userAuth.js";
import forgotPasswordRateLimiter from "../middlewares/forgotPasswordRateLimiter.js";
import loginRateLimiter from "../middlewares/loginRateLimiter.js";

const route = express.Router();

route.post('/userSignup', handleUserSignup)
route.post('/userSignin', handleUserSignin)
route.post('/forgotPassword', handleForgotPassword)
route.post('/resetPassword/:token', handleResetPassword)
export default route;