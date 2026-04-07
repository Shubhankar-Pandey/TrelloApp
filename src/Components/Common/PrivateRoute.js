import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";



function PrivateRoute({children}){

    const {token} = useSelector((state) => state.auth);

    if(token !== null){
        return children;
    }
    else{
        <NavLink to="/login" replace/>
    }
}

export default PrivateRoute;