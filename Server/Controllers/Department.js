const Organisation = require("../Models/Organisations");
const Department = require("../Models/Department");





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