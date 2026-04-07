import { apiConnector } from "../ApiConnector/apiConnector";
import { issue_endPoints } from "../ApisEndpoints/apis";
import {toast} from "react-hot-toast"

const {
    GET_ALL_PUBLIC_ISSUE_DETAILS
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