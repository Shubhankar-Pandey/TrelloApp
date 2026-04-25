const express = require("express");
const router = express.Router();


const {auth, isOwner, isEmployee} = require("../Middlewares/Auth");
const {createIssue, getAllPublicIssueDetails, updateIssueStatus, deleteIssue,
    getIssueDetails, updateIssue
} = require("../Controllers/Issue");



router.post("/createIssue", auth, isOwner, createIssue);
router.get("/getAllPublicIssueDetails", getAllPublicIssueDetails);
router.post("/updateIssueStatus", auth, isEmployee, updateIssueStatus);
router.post("/deleteIssue", auth, isOwner, deleteIssue);
router.post("/updateIssue", auth, isOwner, updateIssue);


module.exports = router;
