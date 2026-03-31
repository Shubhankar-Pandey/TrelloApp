const express = require("express");
const router = express.Router();


const {auth, isOwner} = require("../Middlewares/Auth");
const {createIssue, getAllIssueDetails} = require("../Controllers/Issue");



router.post("/createIssue", auth, isOwner, createIssue);
router.get("/getAllIssueDetails", getAllIssueDetails);



module.exports = router;
