const Organisation = require("../Models/Organisations");
const Department = require("../Models/Department");
const Issue = require("../Models/Issues");
const User = require("../Models/User");



exports.createDepartment = async(req, res) => {
    try{
        const {title, description, privacy} = req.body;
        const {organisationId} = req.body;
        const {userId} = req.user;

        if(!title || !description || !organisationId || !privacy || !userId){
            return res.status(400).json({
                success : false,
                message : "Data are missing",
            })
        }

        const existOrganisation = await Organisation.findById(organisationId);
        if(!existOrganisation){
            return res.status(404).json({
                success : false,
                message : "Organisation not exist",
            })
        }

        if(existOrganisation.ownerId.toString() !== userId){
            return res.status(403).json({
                success : false,
                message : "You are not owner of this organisation, only owner can create department",
            })
        }

        const newDepartment = await Department.create({
            title, 
            description,
            organisationId,
            privacy,
        })

        const updatedOrganisation = await Organisation.findByIdAndUpdate(organisationId, {
            $push : {
                departments : newDepartment._id,
            }
        },{ returnDocument: "after" });

        return res.status(200).json({
            success : true,
            message : "Department created successfully",
            updatedOrganisation,
            newDepartment,
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



exports.getAllPublicIssuesOfDepartment = async(req, res) => {
    try{
        const {departmentId} = req.body;
        
        if(!departmentId){
            return res.status(400).json({
                success : false,
                message : "DepartmentId is missing",
            })
        }

        const data = await Department.findById(departmentId)
        .populate({
            path : "issues",
            match : {privacy : "Public"},
            populate: [
                { path: "departmentId" },
                { path: "userId" },
                { path: "organisationId" }
            ]
        }).exec();

        if(!data){
            return res.status(404).json({
                success : false,
                message : "Department is not found",
            })
        }

        if(data.privacy === "Private"){
            return res.status(401).json({
                success : false,
                message : "This is department is private",
            })
        }


        let filterData = [];
            const issuesArray = data.issues || [];
            for(let j = 0; j<issuesArray.length; j++){
                const currIssue = issuesArray[j];
                const newData = {
                    _id : currIssue._id,
                    title : currIssue.title,
                    description : currIssue.description,
                    departmentTitle : currIssue.departmentId.title,
                    ownerName : currIssue.userId.firstName + " " + currIssue.userId.lastName,
                    organisationTitle :  currIssue.organisationId.title,
                    createdAt : currIssue.createdAt,
                    updatedAt : currIssue.updatedAt,
                    assignedTo : currIssue.assignedTo,
                }
                filterData.push(newData);
            }

            
        return res.status(200).json({
            success : true,
            data : filterData,
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



exports.deleteDepartment = async(req, res) => {
    try{
        const {departmentId} = req.body;
        if(!departmentId){
            return res.status(400).json({
                success : false, 
                message : "Bad request",
            })
        }

        const existDepartment = await Department.findById(departmentId);
        if(!existDepartment){
            return res.status(404).json({
                success : false, 
                message : "Department not found",
            })
        }

        // delete this department from respected organisation 
        const organisationId = existDepartment.organisationId;
        await Organisation.findByIdAndUpdate(organisationId, 
            {
                $pull : {
                    departments : departmentId,
                }
            }
        )

        // delete all the issues of the department 
        const allIssue = existDepartment.issues;
        for(let i = 0; i<allIssue.length; i++){
            const existIssue = await Issue.findByIdAndDelete(allIssue[i]);
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


        await Department.findByIdAndDelete(departmentId);


        return res.status(200).json({
            success : true, 
            message : "Department deleted successfully",
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




exports.updateDepartment = async(req, res) => {
    try{
        const {departmentId, title, description, privacy} = req.body;
        if(!departmentId || !title || !description || !privacy){
            return res.status(400).json({
                success : true, 
                message : "Bad request",
            })
        }

        const updatedDepartment = await Department.findByIdAndUpdate(departmentId, 
            {
                title, 
                description, 
                privacy,
            }
        )

        if(!updatedDepartment){
            return res.status(404).json({
                success : false, 
                message : "Department not found",
            })
        }

        return res.status(200).json({
            success : true, 
            message : "Department updated successfully",
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