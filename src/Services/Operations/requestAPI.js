import { apiConnector } from "../ApiConnector/apiConnector";
import {request_endPoints} from "../ApisEndpoints/apis";
import {toast} from "react-hot-toast";




const {
    GET_ALL_REQUEST_CAME_TO_ME,
    ACCEPT_REQUEST, 
    REJECT_REQUEST,
    SEND_REQUEST_BY_OWNER,
    SEND_REQUEST_BY_EMPLOYEE,
} = request_endPoints;


export const getAllRequestCameToMe = async(token) => {
    try{
        const response = await apiConnector("GET", GET_ALL_REQUEST_CAME_TO_ME, null, {
            Authorization : `Bearer ${token}`,
        })
        if(!response || !response?.data?.success){
            toast.error("Failed to fetch requests");
            return;
        }   
        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
}


export const acceptRequest = async(token, requestId) => {
    try{
        const response = await apiConnector("POST", ACCEPT_REQUEST, {requestId}, 
            {Authorization : `Bearer ${token}`},
        )
        if(!response || !response.data.success){
            toast.error("Failed in accepting request");
            return;
        }
        console.log("acceptRequest API Response : ", response);
        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
}



export const rejectRequest = async(token, requestId) => {
    try{
        const response = await apiConnector("POST", REJECT_REQUEST, {requestId}, 
            {Authorization : `Bearer ${token}`},
        )
        if(!response || !response.data.success){
            toast.error("Failed in accepting request");
            return;
        }
        console.log("rejectRequest API Response : ", response);
        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
}


export const sendRequestByOwner = async(token, to, issueId, message, organisationId, departmentId) => {
    try{
        const response = await apiConnector("POST", SEND_REQUEST_BY_OWNER, 
            {to, issueId, message, organisationId, departmentId}, 
            {Authorization : `Bearer ${token}`}
        )
        if(!response || !response.data.success){
            toast.error("Failed in accepting request");
            return;
        }
        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
}



export const sendRequestByEmployee = async(token, organisationId, departmentId, issueId, message) => {
    try{
        const response = await apiConnector("POST", SEND_REQUEST_BY_EMPLOYEE, 
            {organisationId, departmentId, issueId, message}, 
            {Authorization : `Bearer ${token}`}
        )
        if(!response || !response.data.success){
            toast.error("Failed in accepting request");
            return;
        }
        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
}


