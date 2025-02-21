const express = require("express")
const router = express.Router();

const {resetPasswordToken,resetPassword} =require("../controllers/ResetPassword")

const {signUp,logIn,sendOtp,changePassword} = require("../controllers/Auth")

const {auth} = require("../middlewares/auth")

// Route for user login
router.post("/login", logIn)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)



// Route for generating a reset password token
router.post("/resetPasswordtoken", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)



// Export the router for use in the main application
module.exports = router