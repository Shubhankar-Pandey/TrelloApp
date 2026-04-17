import { apiConnector } from "../ApiConnector/apiConnector";
import toast from "react-hot-toast";


import {organisation_endPoints} from "../ApisEndpoints/apis"

const {
    GET_ALL_ORG,
    CREATE_ORG,
    GET_ALL_PUBLIC_OPEN_ISSUES,
} = organisation_endPoints


export const getAllOrganisations = async() => {
    try{
        const response = await apiConnector("GET", GET_ALL_ORG);
        if(!response.data.success){
            toast.error("Something went wrong in organisationAPI");
            throw new Error(response.data.message);
        }
        // console.log("getAllOrganisations api response : ", response);
        return response;
    }
    catch(error){
        console.log(error);
        toast.error("Something went wrong in catch block in organisation API");
    }
}


export const createOrganisation = async(token, title, description, privacy) => {
    try{
        const response = await apiConnector("POST", CREATE_ORG, {
            title, description, privacy
        },
        {
            Authorization : `Bearer ${token}`
        }
        )

        if(!response || !response.data.success){
            toast.error("Something went wrong while creating organisation");
            throw new Error(response.data.message);
        }
        return response;
    }
    catch(error){
        console.log(error);
        toast.error("Something went wrong while creating organisation");
    }
}



export const getAllPublicOpenIssues = async(token) => {
    try{
        const response = await apiConnector("GET", GET_ALL_PUBLIC_OPEN_ISSUES, null,
            {Authorization : `Bearer ${token}`}
        )
        if(!response || !response.data.success){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error("Error while fetching issues");
    }
}



