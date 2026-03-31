const express = require("express");
const router = express.Router();


const {auth, isOwner} = require("../Middlewares/Auth");
const {createIssue, getAllPublicIssueDetails} = require("../Controllers/Issue");



router.post("/createIssue", auth, isOwner, createIssue);
router.get("/getAllPublicIssueDetails", getAllPublicIssueDetails);



module.exports = router;
