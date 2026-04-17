import { useSelector } from "react-redux";
import RequestsForOwner from "./RequestsForOwner";
import RequestForEmployee from "./RequestForEmployee";


function Request(){
    const {role} = useSelector((state) => state.auth);

    if(role === "Owner"){
        return (
            <div>
                <RequestsForOwner/>
            </div>
        )
    }
    else if(role === "Employee"){
        return (
            <div>
                <RequestForEmployee/>
            </div>
        )
    }
    
}


export default Request;