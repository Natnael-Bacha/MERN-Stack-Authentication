import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import validator from 'validator'
import PasswordResetToken from "../models/passwordReset.js";
import crypto from "crypto";
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
      console.log("No user found to login")
      return res.status(404).json({ message: "Error in signin" });
      
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      console.log("Incorrect password")
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
    console.log("User Logged in")
    return res.status(200).json({ message: "login successful" });
  } catch (error) {
    console.log("Error Signing in: ", error);
  }
}

export async function handleForgotPassword(req, res) {
  const { email } = req.body;
  try {
    

    if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Failed to send reset link please try again" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        type: "password_reset", 
        iat: Math.floor(Date.now() / 1000)
      },
      process.env.KEY,
      { expiresIn: "15m" }
    );
    

        await PasswordResetToken.create({
      userId: user._id,
      token: crypto.createHash('sha256').update(token).digest('hex'),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), 
      used: false
    });
 
    const resetLink = `${process.env.frontend_URL}/resetPassword/${token}`;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rahelnaba716@gmail.com",
        pass: `${process.env.app_password}`,
      },
    });

    let mailOptions = {
      from: "rahelnaba716@gmail.com",
      to: `${email}`,
      subject: "Reset Your Password",
       html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. Click the link below to proceed:</p>
          <a href="${resetLink}" 
             style="background-color: #007bff; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
          <p><small>This link will expire in 15 minutes.</small></p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Security notice: This link contains a sensitive token. Do not share it with anyone.
          </p>
        </div>
      `,
      text: `Reset your password: ${resetLink}\n\nThis link expires in 15 minutes.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({message: "Email sent"})
      }
    });
  } catch (error) {
    console.log("Error in validating user:", error);
  }
}


export async function handleResetPassword(req, res) {
   const {token} = req.params
   const { newPassword,
        confirmPassword} = req.body

    if(newPassword !== confirmPassword){
       return res.status(404).json({message: "Password should match!"});
    }
    try {

       const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const resetToken = await PasswordResetToken.findOne({
      token: hashedToken,
      used: false,
      expiresAt: { $gt: new Date() }
    });

    if (!resetToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

      const decoded =  jwt.verify(token, process.env.KEY)
      const id = decoded.id;
      const hashPassword = await bcrypt.hash(newPassword, 10)
      await User.findByIdAndUpdate({_id: id}, {password: hashPassword});
      await PasswordResetToken.findByIdAndUpdate(resetToken._id, { used: true });
      return res.status(200).json({message: "Password resetted!"});
    } catch (error) {
      console.log("Error resetting password: ", error)
    }
}
