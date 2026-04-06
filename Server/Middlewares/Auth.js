const jwt = require("jsonwebtoken");



exports.auth = async(req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success : false,
                message : "Token is missing",
            })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload;

        next();
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}


exports.isOwner = async(req, res, next) => {
    try{
        const {role} = req.user;
        if(!role){
            return res.status(400).json({
                success : false,
                message : "User role is not defined",
            })
        }
        if(role !== "Owner"){
            return res.status(400).json({
                success : false,
                message : "This is protected route for owner",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal Server error"
        })
    }
}