const express = require("express");
const router = express.Router();



// import the controller
const {auth, isOwner, isEmployee} = require("../Middlewares/Auth")
const {getAllRequestCameToMe, sendRequestByOwner, sendRequestByEmployee, acceptRequest, rejectRequest} = require("../Controllers/Request");




// map the controller
router.get("/getAllRequestCameToMe", auth, getAllRequestCameToMe);
router.post("/sendRequestByOwner", auth, isOwner, sendRequestByOwner);
router.post("/sendRequestByEmployee", auth, isEmployee, sendRequestByEmployee);
router.post("/acceptRequest", auth, acceptRequest);
router.post("/rejectRequest", auth, rejectRequest);




module.exports = router;