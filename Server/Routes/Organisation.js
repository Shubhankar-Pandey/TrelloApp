const express = require("express");
const router = express.Router();


const {auth, isOwner} = require("../Middlewares/Auth");
const {createOrganisation, getAllOrganisationsAndItsDepartments} = require("../Controllers/Organisation");



router.post("/createOrganisation", auth, isOwner, createOrganisation);
router.get("/getAllOrganisationsAndItsDepartments", getAllOrganisationsAndItsDepartments);


module.exports = router;
