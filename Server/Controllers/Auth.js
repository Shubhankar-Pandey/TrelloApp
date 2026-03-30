const Users = require("../Models/USERS");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const Otp = require("../Models/Otp");



exports.sendOtp = async(req, res) => {
    try{
        let {email} = req.body;

        if(!email){
            return res.status(401).json({
                success : false,
                message : "Email is missing",
            })
        }

        email = email.toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        const userExist = await Users.findOne({email : email});

        if(userExist){
            return res.status(409).json({
                success : false,
                message : "User with this email already exist",
            })
        }
        
        // generate otp
        let otp = otpGenerator.generate(6, {
            lowerCaseAlphabets : false,
            upperCaseAlphabets : false,
            specialChars : false,
        })

        await Otp.deleteMany({email});
        await Otp.create({
            email,
            otp, 
        })

        return res.status(200).json({
            success : true,
            message : "OTP sent successfully",
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



exports.signup = async(req, res) => {
    try{
        const {password, confirmPassword, firstName, lastName, role, otp} = req.body;
        let {email} = req.body;
        
        if(!email || !password || !confirmPassword || !firstName || !lastName || !role || !otp){
            return res.status(400).json({
                success : false,
                message : "Please fill all the details",
            })
        }

        email = email.toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password are not matching",
            });
        }

        const compareOtp = await Otp.findOne({email});
        if(!compareOtp || otp !== compareOtp.otp){
            return res.status(400).json({
                success: false,
                message: "Invalid otp",
            });
        }

        const userExist = await Users.findOne({email : email});
        if(userExist){
            return res.status(403).json({
                success : false,
                message : "User with this email already exist",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Users.create({
            email,
            password : hashedPassword,
            firstName,
            lastName,
            role,
        })

        return res.status(200).json({
            success : true,
            message : "New user created successfully"
        })
    }   
    catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}



exports.login = async(req, res) => {
    try{
        const {password} = req.body;
        let {email} = req.body;

        if(!email || !password){
            return res.status(401).json({
                success : false,
                message : "Please fill all the details",
            })
        }

        email = email.toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        const userExist = await Users.findOne({email : email});
        if(!userExist){
            return res.status(404).json({
                success : false,
                message : "No user exist with this email, please signup first",
            })
        }

        if(await bcrypt.compare(password, userExist.password)){

            const payload = {
                email : email,
                userId : userExist._id,
                role : userExist.role,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "2h"})

            const options = {
                httpOnly : true,
                sameSite : "lax",
                expires : new Date(Date.now() + 2*60*60*1000),
            }

            userExist.password = undefined;

            return res.cookie("token", token, options).status(200).json({
                success : true, 
                message : "Login successfully",
                userExist,
            })
        }
        else{
            return res.status(400).json({
                success : false,
                message : "Wrong Password",
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}



exports.logout = (req, res) => {
    try{
        const options = {
            httpOnly : true,
            sameSite : "lax",
            expires : new Date(Date.now() + 2*60*60*1000),
        }
        return res.clearCookie("token", options).status(200).json({
            success : true, 
            message : "Logout Successfull",
        })
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}