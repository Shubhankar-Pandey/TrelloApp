const express = require("express");
const router = express.Router();


// import controllers
const {auth, isOwner} = require("../Middlewares/Auth")
const {getAllDetailOfOwner} = require("../Controllers/Owner");




// map controlllers
router.get("/getAllDetailOfOwner", auth, isOwner, getAllDetailOfOwner);






module.exports = router;