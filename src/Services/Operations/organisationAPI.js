import { apiConnector } from "../ApiConnector/apiConnector";
import toast from "react-hot-toast";


import {organisation_endPoints} from "../ApisEndpoints/apis"

const {
    GET_ALL_ORG,
} = organisation_endPoints


export const getAllOrganisations = async() => {
    // console.log("Reached in getAllOrganisations service");
    try{
        const response = await apiConnector("GET", GET_ALL_ORG);
        if(!response.data.success){
            toast.error("Something went wrong");
            throw new Error(response.data.message);
        }
        // console.log("getAllOrganisations api response : ", response);
        return response;
    }
    catch(error){
        console.log(error);
        toast.error("Something went wrong");
    }
}



