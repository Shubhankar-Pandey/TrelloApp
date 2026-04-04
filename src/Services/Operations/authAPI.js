import {toast} from "react-hot-toast"
import { apiConnector } from "../ApiConnector/apiConnector";

import  {endpoints} from "../ApisEndpoints/apis";
import { setToken } from "../../Redux/authSlice";



const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints



export const sendOtp = async(email, navigate) => {
    console.log("reache in sendOtp : ", email);
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", SENDOTP_API, {email});
        console.log("sendOtp api response : ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("OTP sent successfully");
        navigate("/verifyEmail");
    }
    catch(error){
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
    }
    toast.dismiss(toastId)
}




export const signup = async(password, confirmPassword, otp,  firstName, lastName, email, role, navigate) => {
    console.log("reached in sign services");
    const toastId = toast.loading("Loading...");
    try{
        console.log(password, " ", confirmPassword, " ", role, " ", otp, " ", email);
        const response = await apiConnector("POST", SIGNUP_API, {
            password,
            confirmPassword,
            firstName,
            lastName,
            role,
            otp,
            email
        })
        console.log("signup api response : ", response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Sign up successfull");
        navigate("/login");
    }
    catch(error){
        console.log("Signup API ERROR............", error)
        toast.error("Could not signup");
    }
    toast.dismiss(toastId);
}




export const login = async(email, password, navigate, dispatch) => {
    console.log("reached login service : ", email , " ", password);
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", LOGIN_API, {email, password});
        console.log("login api response : ", response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Login successfull");
        dispatch(setToken(response.data.token));
        navigate("/");
    }
    catch(error){
        console.log("Login api error : ", error);
        toast.error("Login failed");
    }
    toast.dismiss(toastId);
}



export const resetPasswordToken = async(email, navigate) => {
    console.log("reached in resetPasswordToken");
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log("resetPasswordToken api response : ", response);
        toast.success("Password reset link is sent on your registered email address");
        navigate("/");
    }
    catch(error){
        console.log("resetPasswordToken Api error : ", error);
        toast.error("Request failed");
    }
    toast.dismiss(toastId);
}




export const resetPassword = async(token, password, confirmPassword, navigate) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", RESETPASSWORD_API, {token, password, confirmPassword});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Password reset successfull");
        navigate("/login");
    }
    catch(error){
        console.log("resetPassword api error : ", error);
        toast.error("Request failed");
    }
    toast.dismiss(toastId);
}