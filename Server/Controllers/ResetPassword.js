const User = require("../Models/User");
const crypto = require("crypto");
const {mailSender} = require("../Utils/MailSender");
const bcrypt = require("bcrypt");
const {resetPasswordMail} = require("../MailTemplates/ResetPasswordMail")




exports.resetPasswordToken = async(req, res) => {
    try{
        const {email} = req.body;
        
        if(!email){
            return res.status(400).json({
                success : false,
                message : "Please enter registered email address",
            })
        }

        const existUser = await User.findOne({email});
        if(!existUser){
            return res.status(404).json({
                success : false,
                message : "No user is registered with this email address",
            })
        }

        const resetPasswordToken = crypto.randomBytes(32).toString("hex");

        await User.findOneAndUpdate({email}, {
            resetPasswordExpires : Date.now() + 5*60*1000,
            resetPasswordToken,
        }, { returnDocument: "after" });

        const url = `${process.env.FRONTEND_URL}/resetPassword/${resetPasswordToken}`;

        await mailSender(
            email,
            "Reset Password for TrelloApp",
            resetPasswordMail(url),
        )

        return res.status(200).json({
            success : true,
            message : "Reset password link sent successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server error",
        })
    }
}




exports.resetPassword = async(req, res) => {
    try{
        const {token, password, confirmPassword} = req.body;
        
        if(!password || !confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Details are missing",
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password and confirmPassword is not matching",
            })
        }

        const existUser = await User.findOne({resetPasswordToken : token});

        if(!existUser){
            return res.status(404).json({
                success : false,
                message : "User not found",
            })
        }

        if(existUser.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success : false,
                message : "Reset password time out",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(existUser._id, {
            password : hashedPassword,
            resetPasswordToken : undefined,
            resetPasswordExpires : undefined,
        })

        return res.status(200).json({
            success : true,
            message : "Password updated successfully",
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