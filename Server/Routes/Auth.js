const express = require("express");
const router = express.Router();


// importing controller 
const {signup, login, sendOtp, logout} = require("../Controllers/Auth");
const {auth} = require("../Middlewares/Auth"); 
const {resetPasswordToken, resetPassword} = require("../Controllers/ResetPassword");


// mapping 

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendOtp", sendOtp);
router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);



// export
module.exports = router;


