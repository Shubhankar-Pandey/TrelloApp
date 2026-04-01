const Department = require("../Models/Department");
const Issue = require("../Models/Issues");
const Organisation = require("../Models/Organisations")



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