const jwt = require("jsonwebtoken");



exports.auth = async(req, res, next) => {
    try{
        // console.log("reached in auth middleware ");
        const token = req.header("Authorization").replace("Bearer ", "");
        // console.log("token : ", token);
        if(!token){
            return res.status(401).json({
                success : false,
                message : "Token is missing",
            })
        }
        // console.log("before verifying the token");
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload;
        // console.log("auth middleware done")
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}


exports.isOwner = async(req, res, next) => {
    // console.log("reached in isOwner middleware");
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
        // console.log("auth middleware done")
        next();
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal Server error"
        })
    }
}


exports.isEmployee = async(req, res, next) => {
    // console.log("reached in isEmployee middleware");
    try{
        const {role} = req.user;
        if(!role){
            return res.status(400).json({
                success : false,
                message : "User role is not defined",
            })
        }
        if(role !== "Employee"){
            return res.status(400).json({
                success : false,
                message : "This is protected route for employee",
            })
        }
        // console.log("auth middleware done")
        next();
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal Server error"
        })
    }
}
