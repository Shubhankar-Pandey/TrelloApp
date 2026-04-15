import { useSelector } from "react-redux";
import OwnerDashboard from "./OwnerDashboard";
import EmployeeDashboard from "./EmployeeDashboard";


function MyDashboard(){

  const {role} = useSelector((state) => state.auth);

  if(role === "Owner"){
    return (
      <div>
        <OwnerDashboard/>
      </div>
    )
  }
  else{
    return (
      <div>
        <EmployeeDashboard/>
      </div>
    )
  }
  
}


export default MyDashboard;