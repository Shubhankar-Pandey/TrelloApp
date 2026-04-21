import DepartmentCard from "./DepartmentCard";
import {
  HiOutlineOfficeBuilding,
  HiOutlineLockClosed,
  HiOutlineGlobe,
} from "react-icons/hi";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


function OrgCard({ org, index, apiCall }) {
  const departments = org.departments ?? [];
  const allIssues = departments.flatMap((d) => d.issues ?? []);
  const openCount = allIssues.filter((i) => i.status === "Open").length;
  const workingCount = allIssues.filter((i) => i.status === "Working").length;
  const doneCount = allIssues.filter((i) => i.status === "Done").length;

  const navigate = useNavigate();

  const delay = `${index * 80}ms`;

  // ✏️ Write your create-department logic here
  const handleCreateDepartment = () => {
    navigate(`/creationBoard/${2}`);
  };

  return (
    <div
      className="rounded-2xl border border-slate-700/60 bg-slate-900/70 backdrop-blur overflow-hidden
                 hover:border-cyan-500/30 transition-all duration-300 group"
      style={{ animationDelay: delay }}
    >
      {/* top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500/60 via-blue-500/40 to-transparent" />

      <div className="p-5 space-y-4">
        {/* org header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20
                            flex items-center justify-center shrink-0 group-hover:bg-cyan-400/15 transition-colors">
              <HiOutlineOfficeBuilding className="text-cyan-400 text-lg" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-100 text-base leading-snug truncate">{org.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{org.description}</p>
            </div>
          </div>

          <span
            className={`shrink-0 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest
                        font-semibold px-2.5 py-1 rounded-full border
                        ${org.privacy === "Public"
                          ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/25"
                          : "text-slate-400 bg-slate-500/10 border-slate-500/25"
                        }`}
          >
            {org.privacy === "Public" ? (
              <HiOutlineGlobe className="text-sm" />
            ) : (
              <HiOutlineLockClosed className="text-sm" />
            )}
            {org.privacy}
          </span>
        </div>

        {/* mini issue stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Open", count: openCount, color: "text-amber-400", bg: "bg-amber-400/8" },
            { label: "Working", count: workingCount, color: "text-sky-400", bg: "bg-sky-400/8" },
            { label: "Done", count: doneCount, color: "text-emerald-400", bg: "bg-emerald-400/8" },
          ].map(({ label, count, color, bg }) => (
            <div
              key={label}
              className={`rounded-lg ${bg} border border-slate-700/40 px-3 py-2 text-center`}
            >
              <p className={`text-xl font-black font-mono ${color}`}>{count}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {/* departments */}
        {departments.length > 0 && (
          <div className="space-y-2">
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold mb-2">
              Departments ({departments.length})
            </p>
            {departments.map((dept) => (
              <DepartmentCard key={dept._id} dept={dept} apiCall={apiCall}/>
            ))}
          </div>
        )}

        {departments.length === 0 && (
          <p className="text-xs text-slate-600 text-center py-2">No departments yet</p>
        )}

        {/* create department button */}
        <button
          onClick={handleCreateDepartment}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                     border border-white text-white text-sm
                     transition-all duration-200 cursor-pointer bg-indigo-600
                     hover:bg-indigo-700 hover:scale-95"
        >
          <HiOutlinePlusSm className="text-base" />
          Create Department
        </button>
      </div>
    </div>
  );
}


export default OrgCard;