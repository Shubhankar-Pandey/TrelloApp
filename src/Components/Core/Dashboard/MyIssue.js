// pages/MyIssue.jsx
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllDetailOfOwner } from "../../../Services/Operations/ownerAPI";
import IssueColumn from "./IssueColumn"; // adjust path as per your folder structure
import { useSelector } from "react-redux";

function MyIssue() {
  const [loading, setLoading] = useState(false);
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [nonAssignedIssues, setNonAssignedIssues] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const {token} = useSelector((state) => state.auth);

  async function fetchData() {
    setLoading(true);
    try {
        const response = await getAllDetailOfOwner(token);
        console.log("getAllDetailOfOwner = ", response);
        if (!response || !response?.success) {
            toast.error("Failed in fetching data");
            return;
        }

        const ownerData = response.data;

        // Flatten all issues across all orgs and departments
        const allIssues = [];
        ownerData.organisations?.forEach((org) => {
            org.departments?.forEach((dept) => {
            dept.issues?.forEach((issue) => {
                allIssues.push({
                ...issue,
                orgTitle: org.title,
                deptTitle: dept.title,
                });
            });
            });
        });

        setTotalCount(allIssues.length);

        // Partition issues into the 4 columns
        setAssignedIssues(allIssues.filter((i) => i.assignedTo !== null));
        setNonAssignedIssues(allIssues.filter((i) => i.assignedTo === null));
        
    } 
    catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching data");
    } 
    finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e16] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
            <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin" />
          </div>
          <p className="text-slate-500 text-sm font-medium tracking-wide animate-pulse">
            Loading issues...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-14">
      {/* Page Header */}
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            My Issues
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of all issues across your organisations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">
              {totalCount} total issues
            </span>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 px-4 py-2 rounded-xl transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <IssueColumn
          title="Assigned Issues"
          issues={assignedIssues}
          type="assigned"
        />
        <IssueColumn
          title="Non Assigned Issues"
          issues={nonAssignedIssues}
          type="nonAssigned"
        />
      </div>
    </div>
  );
}

export default MyIssue;
