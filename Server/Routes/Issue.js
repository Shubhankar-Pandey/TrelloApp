const express = require("express");
const router = express.Router();


const {auth, isOwner} = require("../Middlewares/Auth");
const {createIssue} = require("../Controllers/Issue");


router.post("/createIssue", auth, isOwner, createIssue);


module.exports = router;
