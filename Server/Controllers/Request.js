const Request = require("../Models/Request");
const User = require("../Models/User");
const Organisation = require("../Models/Organisations");
const Department = require("../Models/Department");
const Issue = require("../Models/Issues");



exports.getAllRequestCameToMe = async(req, res) => {
    try{
        const {userId} = req.user;
        if(!userId){
            return res.status(401).json({
                success : false,
                message : "UserId is missing",
            })
        } 

        const existUser = await User.findById(userId);
        if(!existUser){
            return res.status(404).json({
                success : false,
                message : "User not found",
            })
        }

        const requests = await Request.find({
            to : userId,
            status : "Pending",
        })
        .populate([{
            path : "issue",
            select : "title description", 
            populate : [
                {
                path : "departmentId",
                select : "title",
                },
                {
                path : "organisationId",
                select : "title",
                }
            ]
        },
        {
            path : "from",
            select : "firstName lastName",
        }]).exec()

        return res.status(200).json({
            success : true,
            message : "Requests fetched successfully",
            data : requests,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal server error",
        })
    }
}



exports.sendRequestByOwner = async(req, res) => {
    try{
        const {userId} = req.user;
        const {to, issueId, organisationId, departmentId, message} = req.body;

        if(!userId || !to || !issueId || !message || !organisationId || !departmentId){
            return res.status(400).json({
                success : false,
                message : "Details missing",
            })
        }

        const alreadyExists = await Request.findOne({
            from: userId,
            to,
            issue: issueId,
            status: "Pending"
        });

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Request already sent",
            });
        }

        const userExist = await User.findById(userId);
        if(!userExist){
            return res.status(404).json({
                success : false,
                message : "User not found",
            })
        }

        const toUserExist = await User.findById(to);
        if(!toUserExist){
            return res.status(404).json({
                success : false,
                message : "Receiver user is not found",
            })
        }

        const organisationExist = await Organisation.findById(organisationId)
        .populate({
            path : "departments",
            match : {_id : departmentId},
            populate : {
                path : "issues",
                match : {_id : issueId},
            }
        }).exec();

        if(!organisationExist){
            return res.status(404).json({
                success : false,
                message : "No such issue found",
            })
        }

        if(organisationExist.ownerId.toString() !== userId){
            return res.status(403).json({
                success : false,
                message : "This organisation does not belongs to you",
            })
        }
       
        const newRequest = await Request.create({
            from : userId,
            to,
            issue : issueId,
            message,
        })

        return res.status(200).json({
            success : true,
            message : "Request sent successfully",
            newRequest,
        })
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}



exports.sendRequestByEmployee = async(req, res) => {
    try{
        const {userId} = req.user;
        const {organisationId, departmentId, issueId, message} = req.body;

        if(!userId || !issueId || !message || !organisationId || !departmentId){
            return res.status(400).json({
                success : false,
                message : "Details missing",
            })
        }

        const userExist = await User.findById(userId);

        if(!userExist){
            return res.status(404).json({
                success : false,
                message : "User not found",
            })
        }

        const organisationExist = await Organisation.findById(organisationId)
        .populate({
            path : "departments",
            match : {_id : departmentId},
            populate : {
                path : "issues",
                match : {_id : issueId},
            }
        }).exec();

        if(!organisationExist){
            return res.status(404).json({
                success : false,
                message : "Not found",
            })
        }

        const existIssue = await Issue.findOne({
            _id : issueId,
            assignedTo : null,
        })
        
        if(!existIssue){
            return res.status(404).json({
                success : false,
                message : "Either issue not found or this issue is already assigned to someone",
            })
        }
        console.log("issue Exist 1");
        const alreadyExists = await Request.findOne({
            from: userId,
            to : organisationExist.ownerId,
            issue: issueId,
            status: "Pending"
        });
        console.log("issue Exist 2");

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Request already sent",
            });
        }

        console.log("issue Exist 3");

        const newRequest = await Request.create({
            from : userId,
            to : organisationExist.ownerId,
            issue : issueId,
            message,
        })

        return res.status(200).json({
            success : true,
            message : "Request sent successfully",
            newRequest,
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}


exports.acceptRequest = async(req, res) => {
    try{
        const {requestId} = req.body;
        if(!requestId){
            return res.status(400).json({
                success : false, 
                message : "Data missing, bad request",
            })
        }

        const existRequest = await Request.findByIdAndUpdate(requestId, {
            status : "Accepted",
        });

        if(!existRequest){
            return res.status(404).json({
                success : false, 
                message : "Request not found",
            })
        }

        const issueId = existRequest.issue;

        let employeeId;

        if(req.user.role === "Owner"){
            employeeId = existRequest.from;
        }
        else{
            employeeId = existRequest.to;
        }

        const existIssue = await Issue.findByIdAndUpdate(issueId, {
            assignedTo : employeeId,
            status : "Assigned",
        })

        if(!existIssue){
            return res.status(404).json({
                success : false, 
                message : "Issue not found",
            })
        }

        const existUser = await User.findByIdAndUpdate(employeeId, {
            $push : {
                assignedIssues : issueId,
            }
        })

        if(!existUser){
            return res.status(404).json({
                success : false, 
                message : "User not found",
            })
        }

        return res.status(200).json({
            success : true, 
            message : "Request Accepted",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false, 
            message : "Internal Server Error",
        })
    }
}


exports.rejectRequest = async(req, res) => {
    try{
        const {requestId} = req.body;
        if(!requestId){
            return res.status(400).json({
                success : false, 
                message : "Data missing, bad request",
            })
        }

        const existRequest = await Request.findByIdAndUpdate(requestId, {
            status : "Rejected",
        });

        if(!existRequest){
            return res.status(404).json({
                success : false, 
                message : "Request not found",
            })
        }

        return res.status(200).json({
            success : true, 
            message : "Request Accepted",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false, 
            message : "Internal Server Error",
        })
    }
}


