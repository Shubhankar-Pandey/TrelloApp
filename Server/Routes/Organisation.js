const express = require("express");
const router = express.Router();


const {auth, isOwner} = require("../Middlewares/Auth");
const {createOrganisation} = require("../Controllers/Organisation");


router.post("/createOrganisation", auth, isOwner, createOrganisation);


module.exports = router;
