import loginRateLimit from "../config/loginUpstash.js";

const loginRateLimiter = async (req, res, next) => {
  try {
    const { license } = req.body;
    console.log(license)
    const licenseNumber = license;
    const identifier = license ? `licenseNumber-${licenseNumber}` : req.ip;
    if (!identifier) {
  console.log("Missing identifier for rate limiting");
  return res.status(400).json({ message: "Invalid request data" });
}
    const { success } = await loginRateLimit.limit(`login-${identifier}`);
    if (!success) {
      return res.status(429).json({
        message: "Too many password login attempts. Please try again later.",
      });
    }
    next();
  } catch (error) {
    console.log("Rate limiter error:", error);
    next();
  }
};

export default loginRateLimiter;
