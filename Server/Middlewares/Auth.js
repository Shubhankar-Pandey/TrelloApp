const jwt = require("jsonwebtoken");



exports.auth = async(req, res, next) => {
    try{
        const {token} = req.cookies;

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