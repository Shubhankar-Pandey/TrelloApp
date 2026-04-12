const User = require("../Models/User");



exports.getAllEmployees = async(req, res) => {
    try{
        const employess = await User.find({role : "Employee"});
        return res.status(200).json({
            success : true,
            messag : "Got all employees successfully",
            data : employess,
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



