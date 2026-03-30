const Organisation = require("../Models/Organisations");
const User = require("../Models/USERS");


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
        
        const newOrganisation = await Organisation.create({
            title, 
            description,
            owner : userId,
            privacy,
        })

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $push : {
                organisations : newOrganisation._id,
            }
        }, {new : true})

        return res.status(200).json({
            success : true, 
            message : "Organisation created successfully",
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