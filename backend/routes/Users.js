const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "YS122212][ggf@#$*%&@fhbhadsfjvmfgsgsdf7594759hbnuvv87b7vrhvrvbvvbh@#dfg123^fdf"
const nodemailer = require('nodemailer');


//========= user Register =================//

router.post("/user/signup", async (req, res) => {
    const { fullName, userName, email, address, password, isAdmin,image } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
  
    try {
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.send({ error: "User Exists" });
      }
      await User.create({
        fullName,
        userName,
        email,
        address,
        password: encryptedPassword,
        isAdmin,
        image,
      });
      res.send({ status: "ok" });
    } catch (error) {
      console.log(error);
      res.send({ status: "error", error: "Failed to create user" });
    }
  });

  // check user exists or not

  router.post("/user/check", async (req, res) => {
    const { email} = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.send({ error: "User Not Found", data: false});
      }
      res.send({ status: "ok", data: true });
    } catch (error) {
      console.log(error);
      res.send({ status: "error", error: "Failed to Check" });
    }
  });


//========= user Login =================//
router.post("/user/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: "error", error: "User not found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "3000m",
      });
      return res.status(201).json({ status: "ok", data: token });
    } else {
      return res.status(401).json({ status: "error", error: "Invalid Password" });
    }
  } catch (error) {
    console.error('Error signing in:', error);
    return res.status(500).json({ status: "error", error: "Internal server error" });
  }
});



//========= user Data =================

router.post("/user/data", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const useremail = decoded.email;
    User.findOne({ email: useremail }, (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send({ status: "error", data: 'Database error' });
      }
      if (!user) {
        return res.status(404).send({ status: "error", data: 'User not found' });
      }
      res.send({ status: "ok", data: user });
    });
  } catch (error) {
    console.error('JWT Verification error:', error);
    res.status(401).send({ status: "error", data: 'Invalid token' });
  }
});

//========= get All users =================//

 router.get("/user/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

//========= get user by id =================//
router.get("/user/getUserById/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ status: "error", message: "User not found" });
    }
    res.send({ status: "ok", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
});

// Assuming you have a User model and it has a field 'email'
router.get("/user/getUserByEmail/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).send({ status: "error", message: "User not found" });
    }
    res.send({ status: "ok", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
});




//========= delete user =================//

// Assuming express is used and User is a mongoose model
router.delete("/user/deleteUser/:userid", async (req, res) => {
  const userid = req.params.userid; // Corrected destructuring
 
  try {
     const result = await User.deleteOne({ _id: userid });
     if (result.deletedCount === 0) {
       return res.status(404).send({ status: "Error", message: "User not found" });
     }
     res.send({ status: "Ok", message: "User deleted successfully" });
  } catch (error) {
     console.error(error); // Using console.error for error logging
     res.status(500).send({ status: "Error", message: error.message });
  }
 });
 


//========= update user =================//

router.put("/user/updateUser/:id", async (req, res) => {
  const userId = req.params.id; // Extract user ID from URL parameters
  const { username, fullName, email, address, password, isAdmin, image } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Update user properties if they are provided
    if (username) user.userName = username;
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (address) user.address = address;
    if (password) user.password = password;
    if (typeof isAdmin !== 'undefined') user.isAdmin = isAdmin; // Check for undefined to allow false values
    if (image) user.image = image;

    await user.save();
    res.json({ status: "ok", message: "User updated successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ status: "error", message: "Failed to update user" });
  }
});


// Generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
// Store OTPs for verification later
const otpMap = new Map();
console.log("OTP==>",otpMap);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
        user: process.env.USER, // Your Gmail address
        pass: process.env.PASS, // Your Gmail password or app-specific password
    }
});
//========= Forgot Password -> Reset Password =================//

// Step 1: Forgot Password - Generate OTP and send it to user's email
router.post("/user/forgotPassword", async (req, res) => {
  const { email } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.send({ error: "User Not found" });
      }
      const OTP = generateOTP();
      otpMap.set(email, OTP); // Store OTP for verification later
      const mailOptions = {
          from: 'hacksick7@gmail.com',
          to: email,
          subject: 'Password Reset OTP',
          text: `Your OTP for password reset is: ${OTP}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
              return res.send({ status: "error", error: "Failed to send OTP" });
          } else {
              console.log('Email sent: ' + info.response);
              res.send({ status: "ok", message: "OTP sent to your email" });
          }
      });
  } catch (error) {
      console.log(error);
      res.send({ status: "error", error: "Failed to generate OTP" });
  }
});

// Step 2: Verify OTP and Reset Password
router.post("/user/resetPassword", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.send({ error: "User Not found" });
      }
      const storedOTP = otpMap.get(email);
      if (!storedOTP || storedOTP !== parseInt(otp)) {
          return res.send({ error: "Invalid OTP" });
      }
      const encryptedPassword = await bcrypt.hash(newPassword, 10);
      user.password = encryptedPassword;
      await user.save();
      otpMap.delete(email); // Delete OTP after successful password reset
      res.send({ status: "ok", message: "Password reset successfully" });
  } catch (error) {
      console.log(error);
      res.send({ status: "error", error: "Failed to reset password" });
  }
});


module.exports = router;