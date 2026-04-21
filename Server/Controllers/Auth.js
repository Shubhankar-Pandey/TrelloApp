const User = require("../Models/User");
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

        const userExist = await User.findOne({email : email});

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
        // console.log("reached in signup controller in server : ", req.body);
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

        // console.log("before finding userExist");
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(403).json({
                success : false,
                message : "User with this email already exist",
            })
        }

        // console.log("before otp checking");
        const compareOtp = await Otp.findOne({email});
        if(!compareOtp || otp !== compareOtp.otp){
            return res.status(400).json({
                success: false,
                message: "Invalid otp",
            });
        }

        // console.log("before password hashing");
        const hashedPassword = await bcrypt.hash(password, 10);

        // console.log("before user creation");
        await User.create({
            email,
            password : hashedPassword,
            firstName,
            lastName,
            role,
        })
        // console.log("after user creation");

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
    // console.log("reached in login controller : ", req.body);
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

        // console.log("before userExist");

        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(404).json({
                success : false,
                message : "No user exist with this email, please signup first",
            })
        }

        // console.log("userExist : ", userExist);

        if(await bcrypt.compare(password, userExist.password)){

            const payload = {
                email : email,
                userId : userExist._id,
                role : userExist.role,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "2h"})

            userExist.password = undefined;

            return res.status(200).json({
                success : true, 
                message : "Login successfully",
                role : userExist.role,
                token,
            })
        }
        else{
            console.log("wrong password");
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
