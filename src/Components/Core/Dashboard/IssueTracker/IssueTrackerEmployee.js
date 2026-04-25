import { useEffect, useState } from "react";
import { getAllDetailsOfEmployee } from "../../../../Services/Operations/employeeAPI";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateIssueStatus } from "../../../../Services/Operations/issueAPI";






const STATUS_FLOW = ["Assigned", "Working", "Done"];

const STATUS_STYLES = {
    Assigned: {
        badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
        dot: "bg-amber-400",
    },
    Working: {
        badge: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
        dot: "bg-indigo-400",
    },
    Done: {
        badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        dot: "bg-emerald-400",
    },
};

const COLUMN_HEADERS = {
    Assigned: {
        label: "Assigned",
        accent: "border-amber-500/40",
        dotColor: "bg-amber-400",
        countBg: "bg-amber-500/10 text-amber-400",
    },
    Working: {
        label: "Working",
        accent: "border-indigo-500/40",
        dotColor: "bg-indigo-400",
        countBg: "bg-indigo-500/10 text-indigo-400",
    },
    Done: {
        label: "Done",
        accent: "border-emerald-500/40",
        dotColor: "bg-emerald-400",
        countBg: "bg-emerald-500/10 text-emerald-400",
    },
};





function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
}







function IssueCard({ issue, fetchData }) {


    const currentIndex = STATUS_FLOW.indexOf(issue.status);
    const nextStatus = STATUS_FLOW[currentIndex + 1] || null;
    const style = STATUS_STYLES[issue.status] || STATUS_STYLES["Assigned"];
    const {token} = useSelector((state) => state.auth);


    async function handleNext() {
        console.log("issue id = ", issue._id);
        try{
            const response = await updateIssueStatus(token, issue._id);
            if(!response || !response.success){
                toast.error("Request failed");
            }
            fetchData();
            return;
        }
        catch(error){
            console.log(error);
            toast.error("Request Failed");
        }
    }

    return (
        <div className="group relative bg-[#1e1e2e] border border-[#2e2e3e] rounded-xl p-4 flex flex-col gap-3 transition-all duration-200 hover:border-[#3e3e4e] hover:bg-[#222236]">
        {/* Top row: org + date */}
        <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium truncate max-w-[65%]">
            {issue.organisationId?.title ?? "Unknown Org"}
            </span>
            <span className="text-xs text-gray-600 shrink-0">
            {formatDate(issue.createdAt)}
            </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-100 leading-snug line-clamp-2">
            {issue.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
            {issue.description}
        </p>

        {/* Bottom row: department badge + status */}
        <div className="flex items-center justify-between mt-1">
            <span className="text-xs bg-[#2a2a3e] text-gray-400 border border-[#3a3a50] px-2 py-0.5 rounded-md truncate max-w-[55%]">
            {issue.departmentId?.title ?? "—"}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${style.badge}`}>
            {issue.status}
            </span>
        </div>

        {/* Next button */}
        {nextStatus && (
            <button
            onClick={handleNext}
            className="mt-1 w-full flex items-center justify-center gap-2 text-xs font-medium text-indigo-400 border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/15 hover:border-indigo-500/50 hover:text-indigo-300 active:scale-[0.98] transition-all duration-150 rounded-lg py-2 cursor-pointer"
            >
            Move to {nextStatus}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            </button>
        )}
        </div>
    );
}






function Column({ status, issues, fetchData}) {


    const header = COLUMN_HEADERS[status];

    return (
        <div className="flex flex-col gap-3 min-w-0">
        {/* Column Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${header.accent}`}>
            <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${header.dotColor}`} />
            <h2 className="text-sm font-semibold text-gray-200 tracking-wide">
                {header.label}
            </h2>
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${header.countBg}`}>
            {issues.length}
            </span>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
            {issues.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-[#2e2e3e] rounded-xl">
                <span className="text-2xl mb-2 opacity-30">
                {status === "Done" ? "✓" : "○"}
                </span>
                <p className="text-xs text-gray-600">No issues here</p>
            </div>
            ) : (
            issues.map((issue) => (
                <IssueCard
                fetchData = {fetchData}
                key={issue._id}
                issue={issue}
                />
            ))
            )}
        </div>
        </div>
    );
}








function IssueTrackerEmployee() {

    const [loading, setLoading] = useState(false);
    const [issues, setIssues] = useState([]);
    const { token } = useSelector((state) => state.auth);

    async function fetchData() {
        setLoading(true);
        try {
        const response = await getAllDetailsOfEmployee(token);
        if (!response || !response.data) {
            toast.error("Error while fetching data");
            return;
        }
        const raw = response.data.assignedIssues ?? [];
        const unique = raw.filter(
            (issue, index, self) =>
            index === self.findIndex((i) => i._id === issue._id)
        );
        setIssues(unique);
        } catch (error) {
        console.log(error);
        toast.error("Error while fetching data");
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const grouped = {
        Assigned: issues.filter((i) => i.status === "Assigned"),
        Working: issues.filter((i) => i.status === "Working"),
        Done: issues.filter((i) => i.status === "Done"),
    };

    if (loading) {
        return (
        <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading issues...</p>
            </div>
        </div>
        );
    }

    return (
        <div className="mt-10 px-2">
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-100 tracking-tight">
            Issue Tracker
            </h1>
            <p className="text-sm text-gray-500 mt-1">
            {issues.length} issue{issues.length !== 1 ? "s" : ""} assigned to you
            </p>
        </div>

        {/* Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATUS_FLOW.map((status) => (
            <Column
                fetchData = {fetchData}
                key={status}
                status={status}
                issues={grouped[status]}
            />
            ))}
        </div>
        </div>
    );
}

export default IssueTrackerEmployee;
