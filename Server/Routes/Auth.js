const express = require("express");
const router = express.Router();


// importing controller 
const {signup, login, sendOtp, logout} = require("../Controllers/Auth");
const {auth} = require("../Middlewares/Auth"); 
const {emailPasswordValidator} = require("../Middlewares/EmailPasswordValidator")
const {resetPasswordToken, resetPassword} = require("../Controllers/ResetPassword");


// mapping 

router.post("/signup", emailPasswordValidator, signup);
router.post("/login", login);
router.post("/sendOtp", emailPasswordValidator, sendOtp);
router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);



// export
module.exports = router;


