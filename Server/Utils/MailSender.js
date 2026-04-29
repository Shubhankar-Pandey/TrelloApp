const nodemailer = require("nodemailer");

// 2 step process 
// step 1. -> create transporter
// step 2. -> send mail using transporter

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


exports.mailSender = async (email, title, body) => {
    try{
        // send mail using transporter 
        let info = await transporter.sendMail({
            from : `"Trello App" <${process.env.EMAIL_USER}>`,
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`,
        })

        return info;
    }   
    catch(error){
        console.log("Error in sending mail : error -> ", error);
        throw error;
    }
}
