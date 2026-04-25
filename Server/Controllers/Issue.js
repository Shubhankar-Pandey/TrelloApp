const Department = require("../Models/Department");
const Issue = require("../Models/Issues");
const Organisation = require("../Models/Organisations")
const User = require("../Models/User");


exports.createIssue = async(req, res) => {
    try{
        const {title, description, privacy} = req.body;
        const {departmentId} = req.body;
        const {userId} = req.user;
        const {organisationId} = req.body;
        
        if(!title || !description || !privacy || !departmentId || !userId || !organisationId){
            return res.status(400).json({
                success : false,
                message : "Data are missing",
            })
        }


        const existDepartment = await Department.findById(departmentId);
        if(!existDepartment){
            return res.status(404).json({
                success : false,
                message : "Department not exist",
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
                message : "Only owner of this organisation can create issue in the department",
            })
        }



        if(existDepartment.organisationId.toString() !== organisationId){
            return res.status(400).json({
                success : false,
                message : "This department is not part of your organisation",
            })
        }


        const newIssue = await Issue.create({
            title,
            description, 
            privacy,
            departmentId,
            userId, 
            organisationId,
        })


        const updatedDepartment = await Department.findByIdAndUpdate(departmentId, {
            $push : {
                issues : newIssue._id,
            }
        }, { returnDocument: "after" })

        return res.status(200).json({
            success : true, 
            message : "Issue created successfully",
            newIssue,
            updatedDepartment,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false, 
            message : "Internal Server error",
        })
    }
}



exports.deleteIssue = async(req, res) => {
    try{
        const {issueId} = req.body;
        if(!issueId){
            return res.status(400).json({
                success : false, 
                message : "IssueId is missing",
            })
        }

        const existIssue = await Issue.findById(issueId);
        if(!existIssue){
            return res.status(404).json({
                success : false, 
                meassage : "Issue not found",
            })
        }

        await Issue.findByIdAndDelete(issueId);

        const departmentId = existIssue.departmentId;
        await Department.findByIdAndUpdate(departmentId, {
            $pull : {
                issues : issueId,
            }
        })

        const employeeId = existIssue.assignedTo;
        if(employeeId != null){
            await User.findByIdAndUpdate(employeeId, {
                $pull : {
                    assignedIssues : issueId,
                }
            })
        }

        return res.status(200).json({
            success : true, 
            message : "Issue deleted successfully",
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false, 
            message : "Internal Server error",
        })
    }
}





exports.getAllPublicIssueDetails = async(req, res) => {
    try{
        let data = await Organisation.find({privacy : "Public"})
        .populate({
            path : "departments",
            match : {privacy : "Public"},
            populate : {
                path : "issues",
                match : {privacy : "Public"},
                populate : [
                    {path : "departmentId"},
                    {path : "userId"},
                    {path : "organisationId"},
                ]
            }
        }).exec();

        let filterData = [];
        for(let i = 0; i<data.length; i++){
            const deparmentsArray = data[i].departments || [];
            for(let j = 0; j<deparmentsArray.length; j++){
                const issuesArray = deparmentsArray[j].issues || [];
                for(let k = 0; k<issuesArray.length; k++){
                    const newData = {
                        _id : issuesArray[k]._id,
                        title : issuesArray[k].title,
                        description : issuesArray[k].description,
                        departmentTitle : issuesArray[k].departmentId.title,
                        ownerName : issuesArray[k].userId.firstName + " " + issuesArray[k].userId.lastName,
                        organisationTitle :  issuesArray[k].organisationId.title,
                        createdAt : issuesArray[k].createdAt,
                        updatedAt : issuesArray[k].updatedAt,
                        assignedTo : issuesArray[k].assignedTo,
                    }
                    filterData.push(newData);
                }
            }
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
            message : "Internal server error",
        })
    }
}





exports.updateIssueStatus = async(req, res) => {
    try{
        const {issueId} = req.body;
        if(!issueId){
            return res.status(400).json({
                success : false, 
                message : "Bad request",
            })
        }

        const existIssue = await Issue.findById(issueId);
        if(!existIssue){
            return res.status(404).json({
                success : false, 
                message : "Issue not found",
            })
        }

        if(existIssue.status === "Open"){
            return res.status(403).json({
                success : false, 
                message : "This issue is not in assigned state",
            })
        }

        if(existIssue.status === "Done"){
            return res.status(403).json({
                success : false, 
                message : "This issue is already in done state",
            })
        }

        const currentState = existIssue.status;
        let nextState;
        if(currentState === "Assigned"){
            nextState = "Working";
        }
        else if(currentState === "Working"){
            nextState = "Done";
        }

        await Issue.findByIdAndUpdate(issueId, {
            status : nextState,
        })

        return res.status(200).json({
            success : true, 
            message : "State update successfully",
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



exports.updateIssue = async(req, res) => {
    try{
        const {id, title, description, privacy} = req.body;
        if(!id || !title || !description || !privacy){
            return res.status(400).json({
                success : false, 
                message : "Bad request",
            })
        }

        const existIssue = await Issue.findById(id);
        if(!existIssue){
            return res.status(404).json({
                success : false, 
                message : "Issue not found",
            })
        }

        await Issue.findByIdAndUpdate(id, {
            title,
            description,
            privacy,
        })

        return res.status(200).json({
            success : true, 
            message : "Issue updatad successfully",
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