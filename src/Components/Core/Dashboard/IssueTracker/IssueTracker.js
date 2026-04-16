import { useSelector } from "react-redux"
import IssueTrackerOwner from "./IssueTrackerOwner"
import IssueTrackerEmployee from "./IssueTrackerEmployee";



function IssueTracker(){

    const {role} = useSelector((state) => state.auth);

    if(role === "Owner"){
        return (
            <div>
                <IssueTrackerOwner/>
            </div>
        )
    }
    else{
        return (
            <div>
                <IssueTrackerEmployee/>
            </div>
        )
    }
    
}


export default IssueTracker;