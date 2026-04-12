import { apiConnector } from "../ApiConnector/apiConnector";
import {request_endPoints} from "../ApisEndpoints/apis";
import {toast} from "react-hot-toast";




const {
    GET_ALL_REQUEST_CAME_TO_ME
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