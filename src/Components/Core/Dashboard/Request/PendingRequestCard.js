
function PendingRequestCard({ request, onAccept, onReject }) {
  const { from, issue, message, createdAt } = request;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-[#16161] border border-white/60 hover:border-white p-5 transition-all duration-200">
      {/* From + date */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">
              {from?.firstName?.[0]}{from?.lastName?.[0]}
            </div>
            <div>
              <p className="text-xs text-slate-400">
                From:{" "}
                <span className="text-slate-200 font-medium">
                  {from?.firstName} {from?.lastName}
                </span>
              </p>
            </div>
          </div>
          {message && (
            <p className="text-xs text-slate-400 mt-1 pl-9">
              <span className="text-slate-500">Message: </span>
              <span className="text-slate-300 italic">"{message}"</span>
            </p>
          )}
        </div>
        <span className="text-[10px] text-slate-600 shrink-0">{formattedDate}</span>
      </div>

      {/* Issue details box */}
      <div className="rounded-lg bg-black border border-white/5 p-4 flex flex-col gap-2">
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5">
          <span className="text-xs text-slate-500">Organisation</span>
          <span className="text-xs text-slate-200 font-medium">
            {issue?.organisationId?.title ?? "—"}
          </span>

          <span className="text-xs text-slate-500">Department</span>
          <span className="text-xs text-slate-200 font-medium">
            {issue?.departmentId?.title ?? "—"}
          </span>

          <span className="text-xs text-slate-500">Issue</span>
          <span className="text-xs text-slate-200 font-medium">
            {issue?.title ?? "—"}
          </span>

          <span className="text-xs text-slate-500">Description</span>
          <span className="text-xs text-slate-400 leading-relaxed">
            {issue?.description ?? "—"}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onAccept(request._id)}
          className="flex-1 py-2 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all duration-200"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(request._id)}
          className="flex-1 py-2 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default PendingRequestCard;
