// pages/IssueTracker.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getAllDetailOfOwner } from "../../../../Services/Operations/ownerAPI";
import IssueColumn from "../IssueColumn";

const STATUS_META = [
  { key: "open",     label: "Open",     status: "Open",     dot: "bg-amber-400",   text: "text-amber-400",   badge: "bg-amber-400/10 border-amber-400/20"   },
  { key: "assigned", label: "Assigned", status: "Assigned", dot: "bg-cyan-400",    text: "text-cyan-400",    badge: "bg-cyan-400/10 border-cyan-400/20"    },
  { key: "working",  label: "Working",  status: "Working",  dot: "bg-blue-400",    text: "text-blue-400",    badge: "bg-blue-400/10 border-blue-400/20"    },
  { key: "done",     label: "Done",     status: "Done",     dot: "bg-emerald-400", text: "text-emerald-400", badge: "bg-emerald-400/10 border-emerald-400/20" },
];

function IssueTrackerOwner() {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [openIssues,     setOpenIssues]     = useState([]);
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [workingIssues,  setWorkingIssues]  = useState([]);
  const [doneIssues,     setDoneIssues]     = useState([]);
  const [totalCount,     setTotalCount]     = useState(0);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await getAllDetailOfOwner(token);
      if (!response || !response?.success) {
        toast.error("Failed in fetching data");
        return;
      }

      const allIssues = [];
      response.data.organisations?.forEach((org) => {
        org.departments?.forEach((dept) => {
          dept.issues?.forEach((issue) => {
            allIssues.push({
              ...issue,
              orgTitle:  org.title,
              deptTitle: dept.title,
            });
          });
        });
      });

      setTotalCount(allIssues.length);
      setOpenIssues(    allIssues.filter((i) => i.status === "Open"));
      setAssignedIssues(allIssues.filter((i) => i.status === "Assigned"));
      setWorkingIssues( allIssues.filter((i) => i.status === "Working"));
      setDoneIssues(    allIssues.filter((i) => i.status === "Done"));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  // map each meta entry to its live count for the header badges
  const statusCounts = {
    open:     openIssues.length,
    assigned: assignedIssues.length,
    working:  workingIssues.length,
    done:     doneIssues.length,
  };

  // map each meta entry to its issues array for the columns
  const statusIssues = {
    open:     openIssues,
    assigned: assignedIssues,
    working:  workingIssues,
    done:     doneIssues,
  };

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

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Issue Tracker
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track progress of all issues across your organisations
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">

          {/* Total count badge */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">
              {totalCount} total
            </span>
          </div>

          {/* Per-status breakdown badges */}
          {STATUS_META.map(({ key, label, dot, text, badge }) => (
            <div
              key={key}
              className={`flex items-center gap-2 border rounded-xl px-3 py-2 ${badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              <span className={`text-xs font-medium ${text}`}>
                {statusCounts[key]} {label}
              </span>
            </div>
          ))}

          {/* Refresh button */}
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

      {/* ── 4-column board ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATUS_META.map(({ key, label, status }) => (
          <IssueColumn
            key={key}
            title={`${label} Issues`}
            issues={statusIssues[key]}
            type={key}
          />
        ))}
      </div>

    </div>
  );
}

export default IssueTrackerOwner;