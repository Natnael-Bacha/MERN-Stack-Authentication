import forgotPasswordRateLimit from "../config/forgotPasswordUpstash.js"
import validator from "validator"

const forgotPasswordRateLimiter = async (req, res, next) => {
  try {
    const { email } = req.body;
    if(!email || !validator.isEmail(email)){
      return res.status(400).json({message: "Please Make sure you entered a valid email!"});
    }
    console.log(email)
    const identifier = email ? `email-${email}` : req.ip;
    
    const { success } = await forgotPasswordRateLimit.limit(`forgot-pwd-${identifier}`);
    if (!success) {
      return res.status(429).json({ 
        message: "Too many password reset attempts. Please try again later." 
      });
    }
    next();
  } catch (error) {
    console.log("Rate limiter error:", error);
    next();
  }
}

export default  forgotPasswordRateLimiter