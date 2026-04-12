const express = require("express");
const router = express.Router();



// import controller
const {getAllEmployees} = require("../Controllers/Employee");
const {auth, isOwner} = require("../Middlewares/Auth");



// map controller 
router.get("/getAllEmployees", auth, isOwner, getAllEmployees);



module.exports = router;