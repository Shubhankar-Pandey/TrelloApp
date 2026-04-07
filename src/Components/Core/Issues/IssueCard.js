function IssueCard({ issue }) {
    const departmentStyles = {
        "CSE":      { badge: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
        "CSE-AIML": { badge: "bg-purple-500/10 text-purple-400 border-purple-500/30" },
        "IT":       { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
        "DS":       { badge: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
    };

    const dept = departmentStyles[issue.departmentTitle] || { badge: "bg-gray-500/10 text-gray-400 border-gray-500/30" };

    const formattedDate = new Date(issue.createdAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric"
    });

    return (
        <div className="bg-gray-900 border border-[#2e2e3e] rounded-xl p-5 flex flex-col gap-3 hover:border-white transition-colors duration-200">

            {/* Top row: department badge + date */}
            <div className="flex justify-between items-start">
                <span className={`text-[11px] font-medium px-3 py-1 rounded-full border ${dept.badge}`}>
                    {issue.departmentTitle}
                </span>
                <span className="text-[11px] text-gray-500">{formattedDate}</span>
            </div>

            {/* Title + description */}
            <div>
                <h3 className="text-[15px] font-medium text-slate-200 m-0">
                    {issue.title}
                </h3>
                <p className="text-[13px] text-slate-400 leading-relaxed mt-1.5 mb-0">
                    {issue.description}
                </p>
            </div>

            {/* Footer: owner + assigned status */}
            <div className="border-t border-[#2e2e3e] pt-2.5 flex justify-between items-center">
                <div className="text-xs text-gray-500">
                    <span className="text-slate-400">{issue.ownerName}</span>
                    <span className="mx-1.5">·</span>
                    <span>{issue.organisationTitle}</span>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border ${
                    issue.assignedTo
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                }`}>
                    {issue.assignedTo ? "Assigned" : "Unassigned"}
                </span>
            </div>
        </div>
    );
}

export default IssueCard;