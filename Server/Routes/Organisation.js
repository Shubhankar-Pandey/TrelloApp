const express = require("express");
const router = express.Router();


const {auth, isOwner, isEmployee} = require("../Middlewares/Auth");
const {createOrganisation, getAllOrganisationsAndItsDepartments, getAllPublicOpenIssues,
    updateOrganisation, deleteOrganisation
} = require("../Controllers/Organisation");



router.post("/createOrganisation", auth, isOwner, createOrganisation);
router.get("/getAllOrganisationsAndItsDepartments", getAllOrganisationsAndItsDepartments);
router.get("/getAllPublicOpenIssues", auth, isEmployee, getAllPublicOpenIssues);
router.post("/updateOrganisation", auth, isOwner, updateOrganisation);
router.post("/deleteOrganisation", auth, isOwner, deleteOrganisation);



module.exports = router;
