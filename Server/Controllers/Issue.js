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