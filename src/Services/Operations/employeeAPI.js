import { apiConnector } from "../ApiConnector/apiConnector";
import {employee_endPoints} from "../ApisEndpoints/apis"
import {toast} from "react-hot-toast"



const {
    GET_ALL_EMPLOYEES
} = employee_endPoints;



export const getAllEmployees = async(token) => {
    try{
        const response = await apiConnector("GET", GET_ALL_EMPLOYEES, null, 
            {Authorization : `Bearer ${token}`}
        )

        if(!response || !response?.data?.success){
            toast.error("Request Failed");
            return;
        }

        return response.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
} 