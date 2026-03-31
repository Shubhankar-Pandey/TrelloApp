const Organisation = require("../Models/Organisations");
const User = require("../Models/User");




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




