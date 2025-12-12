import express from "express"
import { handleUserSignup, handleUserSignin, handleForgotPassword, handleResetPassword, handleGoogleSignin, handleLogout } from "../controllers/userAuth.js";
import forgotPasswordRateLimiter from "../middlewares/forgotPasswordRateLimiter.js";
import loginRateLimiter from "../middlewares/loginRateLimiter.js";
import passport from "passport";
const route = express.Router();

route.post('/userSignup', handleUserSignup)
route.post('/userSignin', loginRateLimiter, handleUserSignin)
route.post('/googleSignin', handleGoogleSignin)
route.post('/logout', handleLogout)
route.post('/forgotPassword',forgotPasswordRateLimiter, handleForgotPassword)
route.post('/resetPassword/:token', handleResetPassword)
route.get("/login/failed", (req, res)=>{
    console.log("login failed")
    res.status(401).json({
        error: true,
        message: "Log in failure",
    })
})
route.get('/login/success', (req, res)=>{

    if(req.user){
        console.log(req.user)
        res.status(200).json({
            error: false,
            message: "Successfully loggedin",
            user: req.user
        })
    }
})
route.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.frontend_URL,
    failureRedirect: "/login/failed"
})
);

route.get("/google", passport.authenticate("google", ["profile", "email"]))

route.get("/logoutg", (req, res)=>{
    req.logOut();
    res.redirect(process.env.frontend_URL);
})
export default route;