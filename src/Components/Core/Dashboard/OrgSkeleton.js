



function OrgSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden animate-pulse">
      <div className="h-1 bg-slate-800" />
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-800" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-800 rounded w-1/3" />
            <div className="h-3 bg-slate-800/60 rounded w-2/3" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded-lg bg-slate-800/60" />
          ))}
        </div>
      </div>
    </div>
  );
}


export default OrgSkeleton;