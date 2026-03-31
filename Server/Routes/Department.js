const express = require("express");
const router = express.Router();


const {auth, isOwner} = require("../Middlewares/Auth");
const {createDepartment, getAllPublicIssuesOfDepartment} = require("../Controllers/Department");


router.post("/createDepartment", auth, isOwner, createDepartment);
router.get("/getAllPublicIssuesOfDepartment", getAllPublicIssuesOfDepartment);

module.exports = router;
