// pages/RequestForEmployee.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { acceptRequest, getAllRequestCameToMe, rejectRequest, sendRequestByEmployee } from "../../../../Services/Operations/requestAPI";
import { getAllPublicOpenIssues } from "../../../../Services/Operations/organisationAPI";
import PendingRequestCard from "./PendingRequestCard";
import SendRequestFormForEmployee from "./SendRequestFormForEmployee";

function RequestForEmployee() {
  const { token } = useSelector((state) => state.auth);

  const [loadingRequests, setLoadingRequests] = useState(false);
  const [loadingIssues, setLoadingIssues] = useState(false);

  const [pendingRequests, setPendingRequests] = useState([]);
  const [issuesData, setIssuesData] = useState([]);

  // ─── Fetch pending requests ───────────────────────────────────────────────
  async function fetchPendingRequests() {
    setLoadingRequests(true);
    try {
      const response = await getAllRequestCameToMe(token);
      if (!response || !response?.success) {
        toast.error("Failed to fetch requests");
        return;
      }
      const pending = response.data.filter((r) => r.status === "Pending");
      setPendingRequests(pending);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingRequests(false);
    }
  }

  // ─── Fetch public open issues (for cascading dropdowns) ───────────────────
  async function fetchIssues() {
    setLoadingIssues(true);
    try {
      const response = await getAllPublicOpenIssues(token);
      if (!response || !response?.success) {
        toast.error("Failed to fetch issues");
        return;
      }
      setIssuesData(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingIssues(false);
    }
  }

  useEffect(() => {
    fetchPendingRequests();
    fetchIssues();
  }, []);

  // ─── Accept / Reject ──────────────────────────────────────────────────────
  async function handleAccept(requestId) {
    try{
        const response = await acceptRequest(token, requestId);
        if(!response || !response.success){
            toast.error("Request failed");
            return;
        }
        fetchPendingRequests();
        fetchIssues();
    }   
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
  }

  async function handleReject(requestId) {
    try{
        const response = await rejectRequest(token, requestId);
        if(!response || !response.success){
            toast.error("Request failed");
            return;
        }
        fetchPendingRequests();
        fetchIssues();
    }
    catch(error){
        console.log(error);
        toast.error(error.message);
    }
  }

  // ─── Send request (employee) ──────────────────────────────────────────────
  async function handleSendRequest({ organisationId, departmentId, issueId, message }) {
    const toastId = toast.loading("Loading...");
    try {
        const response = await sendRequestByEmployee(token, organisationId, departmentId, issueId, message);
        if(!response || !response.success){
            toast.error("Request failed");
            return;
        }
        toast.success("Request sent successfully");
    } catch (error) {
      
      toast.error("Request failed");
    }
    finally{
      toast.dismiss(toastId);
    }
  }

  return (
    <div className="min-h-screen bg-black px-6 py-14">
      {/* Page Header */}
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Requests</h1>
          <p className="text-sm text-slate-500 mt-1">
            View incoming requests and raise new ones
          </p>
        </div>
        <button
          onClick={() => { fetchPendingRequests(); fetchIssues(); }}
          className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 px-4 py-2 rounded-xl transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

        {/* ── Left: Pending Requests ── */}
        <div className="flex flex-col gap-4 rounded-2xl bg-slate-900/70 border border-yellow-600/80 p-5">
          {/* Section header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-sm font-semibold text-yellow-400 tracking-wide">
                Pending Requests
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-yellow-400/5 text-yellow-400 border border-yellow-500/20">
              {pendingRequests.length}
            </span>
          </div>

          {/* List */}
          {loadingRequests ? (
            <div className="flex items-center justify-center py-16">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
                <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin" />
              </div>
            </div>
          ) : pendingRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span className="text-3xl opacity-20">📭</span>
              <p className="text-xs text-slate-600">No pending requests</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {pendingRequests.map((request) => (
                <PendingRequestCard
                  key={request._id}
                  request={request}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Send Request ── */}
        <div className="rounded-2xl bg-slate-900/70 border border-white/50 p-5 flex flex-col gap-4">
          {/* Section header */}
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <h2 className="text-sm font-semibold text-indigo-400 tracking-wide">
              Send Request
            </h2>
          </div>

          {loadingIssues ? (
            <div className="flex items-center justify-center py-16">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
                <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin" />
              </div>
            </div>
          ) : (
            <SendRequestFormForEmployee
              issuesData={issuesData}
              onSendRequest={handleSendRequest}
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default RequestForEmployee;
