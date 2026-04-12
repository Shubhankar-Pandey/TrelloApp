const nodemailer = require("nodemailer");

// 2 step process 
// step 1. -> create transporter
// step 2. -> send mail using transporter


exports.mailSender = async (email, title, body) => {
    try{
        // create transporter 
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST, 
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        })

        // send mail using transporter 
        let info = await transporter.sendMail({
            from : "Trello App",
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`,
        })

        return info;
    }   
    catch(error){
        console.log("Error in sending mail : error -> ", error);
    }
}