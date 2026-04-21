

const STATUS_STYLES = {
  Assigned : {
    pill : "text-green-400 bg-green-200/5 border-green-700",
    dot : "bg-green-500"
  },
  Open: {
    pill: "bg-amber-400/10 text-amber-300 border-amber-400/25",
    dot: "bg-amber-400",
  },
  Working: {
    pill: "bg-sky-400/10 text-sky-300 border-sky-400/25",
    dot: "bg-sky-400",
  },
  Done: {
    pill: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
    dot: "bg-emerald-400",
  },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] ?? {
    pill: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    dot: "bg-slate-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${s.pill}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}


export default StatusBadge;