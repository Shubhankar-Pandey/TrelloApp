const express = require("express");
const router = express.Router();


// importing controller 
const {signup, login, sendOtp, logout} = require("../Controllers/Auth");
const {auth} = require("../Middlewares/Auth"); 

// mapping 

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendOtp", sendOtp);
router.post("/logout", auth, logout);




// export
module.exports = router;


