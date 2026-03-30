const mongoose = require("mongoose");
const {mailSender} = require("../Utils/MailSender")



const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String, 
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 5*60,
    }
})


async function sendEmail (email, otp){
    try{
        const mailResponse = await mailSender(email, "Email verification", `<h1> Your otp is : ${otp} </h1>`);
    }
    catch(error){
        console.log("Error occurred in sending mail : ", error);
    }
}


// post save middlware
otpSchema.post("save", async(doc) => {
    try{
        await sendEmail(doc.email, doc.otp);
    }
    catch(error){
        console.log("OTP email failed:", error);
    }
})


module.exports = mongoose.model("Otp", otpSchema);