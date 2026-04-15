const express = require("express");
const router = express.Router();



// import controller
const {getAllEmployees, getAllDetailsOfEmployee} = require("../Controllers/Employee");
const {auth, isOwner, isEmployee} = require("../Middlewares/Auth");





// map controller 
router.get("/getAllEmployees", auth, isOwner, getAllEmployees);
router.get("/getAllDetailsOfEmployee", auth, isEmployee, getAllDetailsOfEmployee);




module.exports = router;