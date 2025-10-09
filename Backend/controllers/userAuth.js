import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function handleUserSignup(req, res) {
  const {
    firstName,
    middleName,
    lastName,
    email,
    license,
    password,
    confirmPassword,
  } = req.body;
  const licenseNumber = license;
  try {
    const existingUser = await User.findOne({ licenseNumber });
    if (existingUser) {
      return res.status(409).json({ message: "User Already Exisits" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords should match" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      email,
      licenseNumber,
      password: hashPassword,
      confirmPassword,
    });

    await newUser.save();
    console.log("Signed Up!");
    return res.status(200).json({ message: "Signed Up successfully!" });
  } catch (error) {
    console.log("Error SiningUp!", error);
    return res.status(400).json({ message: "Please Try Again" });
  }
}

export async function handleUserSignin(req, res) {
  const { license, password } = req.body;

  const licenseNumber = license;
try {
    const user = await User.findOne({ licenseNumber });
    console.log("User Found!");

  if (!user) {
    return res.status(404).json({ message: "Error in signin" });
  }

  const verifyPassword = await bcrypt.compare(password, user.password);
  if (!verifyPassword) {
    return res.status(404).json({ message: "Error in signin" });
  }

  const token = jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      licenseNumber: user.licenseNumber,
    },
    process.env.KEY,
    { expiresIn: "24h" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 3600000,
  });
  console.log("Generated Token:", token);
  return res.status(200).json({ message: "login successful" }); 
} catch (error) {
    console.log("Error Signing in: ", error)
}
 
}
