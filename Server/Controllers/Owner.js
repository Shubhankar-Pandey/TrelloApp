const User = require("../Models/User");


exports.getAllDetailOfOwner = async(req, res) => {
    try{
        // console.log("reached in getAllDetailOfOwner controller");
        const {userId} = req.user;

        const data = await User.findById(userId)
        .populate(
            {
                path : "organisations",
                populate : {
                    path : "departments",
                    populate : {
                        path : "issues",
                        populate : {
                            path : "assignedTo",
                            select : "firstName lastName"
                        }
                    }
                }

            }
        )

        if(!data){
            return res.status(404).json({
                success : false,
                message : "User not found",
            })
        }

        return res.status(200).json({
            success : true,
            data : data,
        })

        
    }
    catch(error){
        console.log("error in getAllDetailOfOwner controller : ", error);
        return res.status(500).json({
            sucess : false,
            message : "Internal Server Error",
        })
    }
}

