import { useEffect, useState } from "react";
import { getAllDetailOfOwner } from "../../../Services/Operations/ownerAPI";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../Redux/authSlice";
import {toast} from "react-hot-toast"


function MyDashboard(){

    const {loading, token} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [result, setResult] = useState(null);

    const [totalIssues, setTotalIssues] = useState(0);
    const [openIssues, setOpenIssues] = useState(0);
    const [inWorkingIssues, setInWorkingIssues] = useState(0);
    const [doneIssues, setDoneIssues] = useState(0);


    async function apiCall(){
        dispatch(setLoading(true));
        try{
            const response = await getAllDetailOfOwner(token);
            setResult(response.data);
        }
        catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
        finally{
            dispatch(setLoading(false));
        }
    }


    function getAllIssueCounts(){
        let total = 0;
        let open = 0;
        let working = 0;
        let done = 0;

        const organisationsArray = result.organisations;

        if (!result?.organisations || result.organisations.length === 0) {
            return;
        }

        for(let i = 0; i<organisationsArray.length; i++){
            const departmentsArray = organisationsArray[i]?.departments || [];
            for(let j = 0; j<departmentsArray.length; j++){
                const issuesArray = departmentsArray[j]?.issues || [];
                for(let k = 0; k<issuesArray.length; k++){
                    const currIssue = issuesArray[k];
                    total++;
                    if(currIssue.status === "Open"){
                        open++;
                    }
                    else if(currIssue.status === "Working"){
                        working++;
                    }
                    else if(currIssue.status === "Done"){
                        done++;
                    }
                }
            }
        }
        setTotalIssues(total);
        setDoneIssues(done);
        setInWorkingIssues(working);
        setOpenIssues(open);
    }

    useEffect(() => {
        async function fetchData(){
            await apiCall();
        }
        fetchData();
    }, [token])

    useEffect(() => {
        if(result){
            getAllIssueCounts();
        }
    }, [result])

    console.log("result : ", result);


    return (
        <div className="pt-14">
            {/* Heading */}
            <div>
                <h1 className="text-2xl ml-2 text-white">My Dashboard</h1>
                <div className="border-t-2 border-white/30 w-full"></div>
            </div>


            <div>

            </div>




            
        </div>
    )
}


export default MyDashboard;