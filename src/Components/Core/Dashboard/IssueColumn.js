// components/IssueColumn.jsx
import IssueCard from "./IssueCard";

const columnAccents = {
  open: {
    border: "border-yellow-500/60",
    headerColor: "text-yellow-400",
    glow: "shadow-yellow-900/20",
    dot: "bg-yellow-400",
    countBg: "bg-yellow-500/10 text-yellow-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  assigned: {
    border: "border-indigo-500/60",
    headerColor: "text-indigo-400",
    glow: "shadow-indigo-900/20",
    dot: "bg-indigo-400",
    countBg: "bg-indigo-500/10 text-indigo-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  nonAssigned: {
    border: "border-orange-500/60",
    headerColor: "text-orange-400",
    glow: "shadow-orange-900/20",
    dot: "bg-orange-400",
    countBg: "bg-orange-500/10 text-orange-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  working: {
    border: "border-blue-500/60",
    headerColor: "text-blue-400",
    glow: "shadow-blue-900/20",
    dot: "bg-blue-400",
    countBg: "bg-blue-500/10 text-blue-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  done: {
    border: "border-green-500/60",
    headerColor: "text-green-400",
    glow: "shadow-green-900/20",
    dot: "bg-green-400",
    countBg: "bg-green-500/10 text-green-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

function IssueColumn({ title, issues, type }) {
  const accent = columnAccents[type] ?? columnAccents.assigned;

  return (
    <div
      className={`flex flex-col rounded-2xl bg-slate-900/70 border ${accent.border} shadow-lg ${accent.glow} overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#12121a]">
        <div className="flex items-center gap-2.5">
          <span className={`${accent.headerColor}`}>{accent.icon}</span>
          <h3 className={`text-sm font-semibold tracking-wide ${accent.headerColor}`}>
            {title}
          </h3>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${accent.countBg}`}>
          {issues.length}
        </span>
      </div>

      {/* Scrollable issue list */}
      <div className="flex-1 overflow-y-auto max-h-[340px] p-3 flex flex-col gap-2.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {issues.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <span className="text-2xl opacity-20">
              {type === "done" ? "✅" : type === "working" ? "⚙️" : "📋"}
            </span>
            <p className="text-xs text-slate-600 text-center">No issues here</p>
          </div>
        ) : (
          issues.map((issue) => <IssueCard key={issue._id} issue={issue} />)
        )}
      </div>
    </div>
  );
}

export default IssueColumn;
