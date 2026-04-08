import { apiConnector } from "../ApiConnector/apiConnector";
import {department_endPoints} from "../ApisEndpoints/apis"
import {toast} from "react-hot-toast"


const {
    CREATE_DEPARTMENT
} = department_endPoints;


export const createDepartment = async(token, title, description, privacy, organisationId) => {
    try{
        const response = await apiConnector("POST", CREATE_DEPARTMENT, {
            title, description, privacy, organisationId
        },
        {Authorization : `Bearer ${token}`}
        ) 
        if(!response || !response.data.success){
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
        return response;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
}