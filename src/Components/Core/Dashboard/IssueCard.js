// components/IssueCard.jsx

function IssueCard({ issue }) {
  const statusColors = {
    Open: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    "In Progress": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    Done: "bg-green-500/10 text-green-400 border border-green-500/20",
    Closed: "bg-red-500/10 text-red-400 border border-red-500/20",
  };

  const privacyColors = {
    Public: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    Private: "bg-slate-500/10 text-slate-400 border border-slate-500/20",
  };

  const formattedDate = new Date(issue.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="group flex flex-col gap-2 rounded-xl bg-[#1e1e2e] border border-white/5 hover:border-indigo-500/30 p-4 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-900/10">
      {/* Title */}
      <h4 className="text-sm font-semibold text-slate-100 leading-snug group-hover:text-white transition-colors">
        {issue.title}
      </h4>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
        {issue.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-1 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              statusColors[issue.status] ?? "bg-slate-700 text-slate-300"
            }`}
          >
            {issue.status}
          </span>
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              privacyColors[issue.privacy] ?? "bg-slate-700 text-slate-300"
            }`}
          >
            {issue.privacy}
          </span>
        </div>
        <span className="text-[10px] text-slate-500">{formattedDate}</span>
      </div>
        {
          issue.status === "Assigned" && <div className="text-sm border-[1px] border-green-600 flex items-center justify-center rounded-full bg-green-600/30 py-1 px-3">
            {"Assigned To : " + issue?.assignedTo?.firstName + " " + issue?.assignedTo?.lastName}
            </div>
        }
    </div>
  );
}

export default IssueCard;
