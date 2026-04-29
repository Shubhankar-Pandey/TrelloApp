
const z = require("zod");


const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must not exceed 20 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[@$!%*?&_]/, "Must contain at least one special character");

const emailSchema = z.string().email().max(50);


exports.emailPasswordValidator = async(req, res, next) => {
    try{
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const emailValidation = emailSchema.safeParse(email);
        if(!emailValidation.success){
            console.log("emailValidator");
            return res.status(200).json({
                success: false,
                message: JSON.parse(emailValidation.error)[0].message,
            });
        }

        const passwordValidation = passwordSchema.safeParse(password);
        if(!passwordValidation.success){
            return res.status(200).json({
                success: false,
                message: JSON.parse(passwordValidation.error)[0].message,
            });
        }    
        
        next();
    }
    catch(error){
        return res.status(500).json({
            success : false, 
            message : error.message,
        })
    }
}