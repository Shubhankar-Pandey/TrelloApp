import { apiConnector } from "../ApiConnector/apiConnector";
import {toast} from "react-hot-toast";


import {owner_endPoints} from "../ApisEndpoints/apis";


const {
    GET_ALL_DETAILS_OF_OWNER 
} = owner_endPoints;



export const getAllDetailOfOwner = async(token) => {
    try{
        // console.log("reached in getAllDetailOfOwner , token : ", token);
        const response = await apiConnector("GET", GET_ALL_DETAILS_OF_OWNER , null,
            {Authorization : `Bearer ${token}`}
        )
        if(!response.data.success){
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
        console.log("getAllDetailOfOwner API response : ", response);
        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error("Something went wrong in ownerAPI in operations");
    }
}