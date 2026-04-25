const Organisation = require("../Models/Organisations");
const User = require("../Models/User");
const Department = require("../Models/Department");
const Issue = require("../Models/Issues");


exports.createOrganisation = async(req, res) => {
    try{
        const {title, description, privacy} = req.body;
        const {userId} = req.user;

        if(!title || !description || !privacy || !userId){
            return res.status(400).json({
                success : false,
                message : "Missing data",
            })
        }

        const existUser = await User.findById(userId);
        if(!existUser){
            return res.status(404).json({
                success : false,
                message : "User not found",
            })
        }
        
        const newOrganisation = await Organisation.create({
            title, 
            description,
            ownerId : userId,
            privacy,
        })

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $push : {
                organisations : newOrganisation._id,
            }
        }, { returnDocument: "after" })

        return res.status(200).json({
            success : true, 
            message : "Organisation created successfully",
            newOrganisation,
            updatedUser
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in creating organisation",
        })
    }
}



exports.getAllOrganisationsAndItsDepartments = async(req, res) => {
    try{
        let data = await Organisation.find({ privacy: "Public" })
        .populate([
            {
                path : "departments",
                match : {privacy : "Public"},
                populate : {
                    path: "issues", 
                    match : {privacy : "Public"}
                }
            },
            {
                path : "ownerId",
                select: "firstName lastName"
            }
    ]).exec()
        

        return res.status(200).json({
            success : true,
            data,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server error",
        })
    }
}



exports.getAllPublicOpenIssues = async(req, res) => {
    try{
        // console.log("reached in controller");
        const issues = await Organisation.find(
            {
                privacy : "Public",
            }
        )
        .select("title description")
        .populate([
            {
                path : "departments",
                match : {
                    privacy : "Public",
                },
                select : "title description",
                populate : {
                    path : "issues",
                    match : {
                        privacy : "Public",
                        status : "Open",
                        assignedTo : null,
                    },
                    select : "title description",
                }
            },
            {
                path : "ownerId",
                select : "firstName lastName"
            }
        ]).exec();

        return res.status(200).json({
            success : true, 
            message : "Issues fetched successfully",
            data : issues,
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



exports.updateOrganisation = async(req, res) => {
    try{
        console.log("request body in update org : ", req.body);
        const {organisationId, title, description, privacy} = req.body;
        if(!organisationId || !title || !description || !privacy){
            return res.status(400).json({
                success : false, 
                message : "Bad request",
            })
        }

        const updatedOrgnisation = await Organisation.findByIdAndUpdate(organisationId, 
            {
                title, 
                description, 
                privacy,
            }
        )

        if(!updatedOrgnisation){
            return res.status(404).json({
                success : false, 
                message : "Orgainsation not found",
            })
        }

        return res.status(200).json({
            success : true, 
            message : "Organisation updated successfully",
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



exports.deleteOrganisation = async(req, res) => {
    try{
        const {organisationId} = req.body;
        const {userId} = req.user;
        if(!organisationId || !userId){
            return res.status(400).json({
                success : false, 
                message : "Bad request",
            })
        }

        const existOrganisation = await Organisation.findById(organisationId);
        if(!existOrganisation){
            return res.status(404).json({
                success : false, 
                message : "Organisation not found",
            })
        }

        if(existOrganisation.ownerId.toString() !== userId.toString()){
            return res.status(403).json({
                success : false, 
                message : "This organisation does not belongs to you",
            })
        }

        // remove this org from user
        await User.findByIdAndUpdate(userId, {
            $pull : {
                organisations : organisationId,
            }
        })
        
        // delete all departments for this org
        const departments = existOrganisation.departments;
        for(let i = 0; i<departments.length; i++){
            const existDepartment = await Department.findById(departments[i]);
            if(!existDepartment){
                continue;
            }
            const allIssue = existDepartment.issues;
            for(let j = 0; j<allIssue.length; j++){
                const existIssue = await Issue.findByIdAndDelete(allIssue[j]);
                if(!existIssue){
                    continue;
                }
                // after deleting the issue remove it from assigned person
                const assignedTo = existIssue.assignedTo;
                if(assignedTo){
                    await User.findByIdAndUpdate(assignedTo, {
                        $pull : {
                            assignedIssues : existIssue._id,
                        }
                    })
                }
            }
        }
        
        // delete org
        await Organisation.findByIdAndDelete(organisationId);

        return res.status(200).json({
            success : true,
            message : "Organisation deleted successfully",
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




