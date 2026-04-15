import { useEffect, useState } from "react";
import { getAllDetailsOfEmployee } from "../../../../Services/Operations/employeeAPI";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const STATUS_CONFIG = {
  Open:     { label: "Open",     bg: "bg-blue-500/15",   text: "text-blue-400",   dot: "bg-blue-400"   },
  Assigned: { label: "Assigned", bg: "bg-amber-500/15",  text: "text-amber-400",  dot: "bg-amber-400"  },
  Working:  { label: "Working",  bg: "bg-indigo-500/15", text: "text-indigo-400", dot: "bg-indigo-400" },
  Done:     { label: "Done",     bg: "bg-emerald-500/15",text: "text-emerald-400",dot: "bg-emerald-400"},
};

const PRIVACY_CONFIG = {
  Public:  { bg: "bg-teal-500/15",  text: "text-teal-400"  },
  Private: { bg: "bg-rose-500/15",  text: "text-rose-400"  },
};

function getInitials(firstName = "", lastName = "") {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || { label: status, bg: "bg-gray-700", text: "text-gray-300", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function PrivacyBadge({ privacy }) {
  const cfg = PRIVACY_CONFIG[privacy] || { bg: "bg-gray-700", text: "text-gray-300" };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      {privacy}
    </span>
  );
}

function IssueCard({ issue, index }) {
  const createdDate = new Date(issue.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const updatedDate = new Date(issue.updatedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="group relative bg-slate-900/70 border border-[#2e2e3e] rounded-2xl p-5 flex flex-col gap-4
                 hover:border-indigo-500/40"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Top row: title + badges */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white font-semibold text-base leading-snug">{issue.title}</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <StatusBadge status={issue.status} />
            <PrivacyBadge privacy={issue.privacy} />
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{issue.description}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-[#2e2e3e]" />

      {/* Meta: org + department */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-widest text-gray-500 font-medium">Organisation</span>
          <span className="text-sm text-gray-200 font-medium truncate">
            {issue.organisationId?.title ?? "—"}
          </span>
          {issue.organisationId?.description && (
            <span className="text-xs text-gray-500 truncate">{issue.organisationId.description}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-widest text-gray-500 font-medium">Department</span>
          <span className="text-sm text-gray-200 font-medium truncate">
            {issue.departmentId?.title ?? "—"}
          </span>
          {issue.departmentId?.description && (
            <span className="text-xs text-gray-500 truncate">{issue.departmentId.description}</span>
          )}
        </div>
      </div>

      {/* Footer: dates */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
        <span>Created {createdDate}</span>
        <span>Updated {updatedDate}</span>
      </div>
    </div>
  );
}

function ProfileHeader({ data }) {
  const initials = getInitials(data.firstName, data.lastName);
  const totalIssues = data.assignedIssues?.length ?? 0;
  const doneCount = data.assignedIssues?.filter(i => i.status === "Done").length ?? 0;
  const workingCount = data.assignedIssues?.filter(i => i.status === "Working").length ?? 0;

  return (
    <div className="bg-slate-900/70 border border-[#2e2e3e] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
      {/* Avatar */}
      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30
                      flex items-center justify-center text-indigo-400 text-xl font-bold tracking-tight">
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h2 className="text-white text-xl font-semibold">
          {data.firstName} {data.lastName}
        </h2>
        <p className="text-gray-400 text-sm mt-0.5">{data.email}</p>
        <span className="inline-block mt-2 px-2.5 py-0.5 bg-indigo-500/15 text-indigo-400 text-xs font-medium rounded-full">
          {data.role}
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
        <Stat label="Assigned" value={totalIssues} color="text-amber-400" />
        <Stat label="Working"  value={workingCount} color="text-indigo-400" />
        <Stat label="Done"     value={doneCount}    color="text-emerald-400" />
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-slate-900/70 border border-[#2e2e3e] rounded-2xl p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex justify-between items-start gap-3">
        <div className="h-4 bg-gray-700 rounded w-2/5" />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-700 rounded-full w-20" />
          <div className="h-6 bg-gray-700 rounded-full w-14" />
        </div>
      </div>
      <div className="h-3 bg-gray-800 rounded w-4/5" />
      <div className="border-t border-[#2e2e3e]" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-10 bg-gray-800 rounded-lg" />
        <div className="h-10 bg-gray-800 rounded-lg" />
      </div>
      <div className="flex justify-between">
        <div className="h-3 bg-gray-800 rounded w-24" />
        <div className="h-3 bg-gray-800 rounded w-24" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#1e1e2e] border border-[#2e2e3e] flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <p className="text-gray-300 font-medium">No issues assigned yet</p>
      <p className="text-gray-500 text-sm mt-1">Issues assigned to you will appear here</p>
    </div>
  );
}

function EmployeeDashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [filter, setFilter] = useState("All");
  const { token } = useSelector((state) => state.auth);

  const STATUS_FILTERS = ["All", "Open", "Assigned", "Working", "Done"];

  async function fetchData() {
    setLoading(true);
    try {
      const response = await getAllDetailsOfEmployee(token);
      if (!response) {
        toast.error("Request failed");
        return;
      }
      setResult(response.data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token]);

  const filteredIssues = result?.assignedIssues?.filter(
    (issue) => filter === "All" || issue.status === filter
  ) ?? [];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">
        <h1 className="text-white text-2xl border-b-[1px] border-white/75 py-2 px-2">My Dashboard</h1>
        

        {/* Profile Header */}
        {loading ? (
          <div className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-2xl p-6 animate-pulse flex gap-5 items-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-700" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-5 bg-gray-700 rounded w-40" />
              <div className="h-3 bg-gray-800 rounded w-52" />
              <div className="h-5 bg-gray-800 rounded-full w-20 mt-1" />
            </div>
          </div>
        ) : result ? (
          <ProfileHeader data={result} />
        ) : null}

        {/* Issues Section */}
        <div className="flex flex-col gap-4">
          {/* Section heading + filter pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">
              Assigned Issues
              {!loading && result && (
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({filteredIssues.length})
                </span>
              )}
            </h2>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150
                    ${filter === s
                      ? "bg-indigo-500 border-indigo-500 text-white"
                      : "bg-transparent border-[#2e2e3e] text-gray-400 hover:border-indigo-500/40 hover:text-gray-200"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredIssues.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredIssues.map((issue, i) => (
                <IssueCard key={`${issue._id}-${i}`} issue={issue} index={i} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default EmployeeDashboard;
