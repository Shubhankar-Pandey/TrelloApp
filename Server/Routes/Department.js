const express = require("express");
const router = express.Router();



const {auth, isOwner} = require("../Middlewares/Auth");
const {createDepartment, getAllPublicIssuesOfDepartment, deleteDepartment, 
    updateDepartment
} = require("../Controllers/Department");




router.post("/createDepartment", auth, isOwner, createDepartment);
router.get("/getAllPublicIssuesOfDepartment", getAllPublicIssuesOfDepartment);
router.post("/deleteDepartment", deleteDepartment);
router.post("/updateDepartment", updateDepartment);



module.exports = router;
