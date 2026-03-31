const express = require("express");
const router = express.Router();


const {auth, isOwner} = require("../Middlewares/Auth");
const {createDepartment} = require("../Controllers/Department");


router.post("/createDepartment", auth, isOwner, createDepartment);


module.exports = router;
