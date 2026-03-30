const express = require("express");

const router = express.Router();


const {signup, login, sendOtp, logout} = require("../Controllers/Auth");
const {auth} = require("../Middlewares/Auth"); 

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendOtp", sendOtp);
router.post("/logout", auth, logout);

module.exports = router;


