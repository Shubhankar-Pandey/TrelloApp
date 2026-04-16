const express = require("express");
const router = express.Router();


const {auth, isOwner, isEmployee} = require("../Middlewares/Auth");
const {createIssue, getAllPublicIssueDetails, updateIssueStatus} = require("../Controllers/Issue");



router.post("/createIssue", auth, isOwner, createIssue);
router.get("/getAllPublicIssueDetails", getAllPublicIssueDetails);
router.post("/updateIssueStatus", auth, isEmployee, updateIssueStatus);



module.exports = router;
