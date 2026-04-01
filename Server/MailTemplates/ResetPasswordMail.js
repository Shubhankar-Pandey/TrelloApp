

exports.resetPasswordMail = (url) => {
    return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
    <h1 style="color: #0052cc;">TrelloApp</h1>
    <p>You requested a password reset. Click the button below to reset your password:</p>
    <a href="${url}" 
       style="background:#0052cc; color:white; padding:10px 20px; 
              text-decoration:none; border-radius:5px; display:inline-block;">
      Reset Password
    </a>
    <p style="margin-top:20px; color:#666;">
      This link will expire in <strong>5 minutes</strong>. 
      If you didn't request this, please ignore this email.
    </p>
  </div>
`
}