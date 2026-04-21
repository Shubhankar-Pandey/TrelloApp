import { apiConnector } from "../ApiConnector/apiConnector";
import { issue_endPoints } from "../ApisEndpoints/apis";
import {toast} from "react-hot-toast"

const {
    GET_ALL_PUBLIC_ISSUE_DETAILS,
    CREATE_ISSUE,
    UPDATE_ISSUE_STATUS,
    DELETE_ISSUE
} = issue_endPoints;



export const getAllPublicIssueDetails = async() => {
    try{
        console.log("reached in getAllPublicIssueDetails API in services");
        const response = await apiConnector("GET", GET_ALL_PUBLIC_ISSUE_DETAILS);
        if(!response || !response.data?.success){
            toast.error("Error in fetching details");
            return null;
        }
        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error("Error in fetching details");
        return null;
    }
}


export const createIssue = async(token, title, description, privacy, departmentId, organisationId) => {
    try{
        const response = await apiConnector("POST", CREATE_ISSUE, {
            title, description, privacy, departmentId, organisationId,
        },
        {Authorization : `Bearer ${token}`}
        )
        if(!response || !response.data.message){
            toast.error("Somthing went wrong");
            return null;
        }
        return response;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
}



export const updateIssueStatus = async(token, issueId) => {
    try{
        const response = await apiConnector("POST", UPDATE_ISSUE_STATUS, {
            issueId
        },
        {
            Authorization : `Bearer ${token}`
        })
        if(!response || !response.data.message){
            toast.error("Somthing went wrong");
            return null;
        }
        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
}


export const deleteIssue = async(issueId, token) => {
    try{
        const response = await apiConnector("POST", DELETE_ISSUE, {issueId}, 
            {Authorization : `Bearer ${token}`},
        )
        if(!response || !response.data.success){
            throw new Error("Delete issue request failed");
        }
        return response;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
}