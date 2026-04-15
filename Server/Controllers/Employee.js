const User = require("../Models/User");



exports.getAllEmployees = async(req, res) => {
    try{
        const employees = await User.find({role : "Employee"});
        return res.status(200).json({
            success : true,
            message : "Got all employees successfully",
            data : employees,
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


exports.getAllDetailsOfEmployee = async(req, res) => {
    try{
        const {userId} = req.user;
        if(!userId){
            return res.status(400).json({
                success : false, 
                message : "UserId missing",
            })
        }

        const existUser = await User.findById(userId)
        .populate({
            path : "assignedIssues",
            populate : [
                {
                    path  : "departmentId",
                    select : "title description privacy"
                },
                {
                    path : "organisationId",
                    select : "title description privacy"
                }
            ]
        }).lean();

        if(!existUser){
            return res.status(404).json({
                success : false, 
                message : "User not found",
            })
        }

        return res.status(200).json({
            success : true, 
            message : "Details fetched successfully",
            data : existUser,
        })
    }
    catch(error){
        return res.status(500).json({
            success : false, 
            message : "Internal server error",
        })
    }
}



