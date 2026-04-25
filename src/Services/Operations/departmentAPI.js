import { apiConnector } from "../ApiConnector/apiConnector";
import {department_endPoints} from "../ApisEndpoints/apis"
import {toast} from "react-hot-toast"


const {
    CREATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    UPDATE_DEPARTMENT,
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




export const deleteDepartment = async(token, departmentId) => {
    try{
        const response = await apiConnector("POST", DELETE_DEPARTMENT, {departmentId},
            {Authorization : `Bearer ${token}`}
        )
        if(!response || !response.data.success){
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
}





export const updateDepartment = async(token, departmentId, title, description, privacy) => {
    try{
        const response = await apiConnector("POST", UPDATE_DEPARTMENT, {departmentId, title, description, privacy}, 
            {Authorization : `Bearer ${token}`}
        )

        if(!response || !response.data.success){
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }

        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
}