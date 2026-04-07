import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllDetailOfOwner } from "../../../Services/Operations/ownerAPI";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  HiOutlineOfficeBuilding,
  HiOutlineLockClosed,
  HiOutlineGlobe,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from "react-icons/hi";

// ── helpers ──────────────────────────────────────────────────────────────────

const STATUS_STYLES = {
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

// ── Department accordion ──────────────────────────────────────────────────────

function DepartmentCard({ dept }) {
  const [open, setOpen] = useState(false);
  const issues = dept.issues ?? [];

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 overflow-hidden">
      {/* header row */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-700/30 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400/80" />
          <span className="text-sm font-semibold text-slate-200">{dept.title}</span>
          <span className="text-[11px] text-slate-500 bg-slate-700/60 border border-slate-600/40 px-2 py-0.5 rounded-full">
            {issues.length} issue{issues.length !== 1 ? "s" : ""}
          </span>
          {dept.privacy === "Public" ? (
            <HiOutlineGlobe className="text-slate-500 text-xs" />
          ) : (
            <HiOutlineLockClosed className="text-slate-500 text-xs" />
          )}
        </div>
        {open ? (
          <HiOutlineChevronUp className="text-slate-500 text-sm" />
        ) : (
          <HiOutlineChevronDown className="text-slate-500 text-sm" />
        )}
      </button>

      {/* issues list */}
      {open && (
        <div className="border-t border-slate-700/50 divide-y divide-slate-700/30">
          {issues.length === 0 ? (
            <p className="text-slate-600 text-xs text-center py-4">No issues in this department</p>
          ) : (
            issues.map((issue) => (
              <div
                key={issue._id}
                className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-slate-700/20 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">{issue.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{issue.description}</p>
                  <p className="text-[10px] text-slate-600 mt-1">
                    {new Date(issue.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <StatusBadge status={issue.status} />
                  {issue.assignedTo ? (
                    <span className="text-[10px] text-slate-500">Assigned</span>
                  ) : (
                    <span className="text-[10px] text-slate-600">Unassigned</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ── Organisation card ─────────────────────────────────────────────────────────

function OrgCard({ org, index }) {
  const departments = org.departments ?? [];
  const allIssues = departments.flatMap((d) => d.issues ?? []);
  const openCount = allIssues.filter((i) => i.status === "Open").length;
  const workingCount = allIssues.filter((i) => i.status === "Working").length;
  const doneCount = allIssues.filter((i) => i.status === "Done").length;

  // staggered fade-in via inline style
  const delay = `${index * 80}ms`;

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
              <DepartmentCard key={dept._id} dept={dept} />
            ))}
          </div>
        )}

        {departments.length === 0 && (
          <p className="text-xs text-slate-600 text-center py-2">No departments yet</p>
        )}
      </div>
    </div>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────────

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

// ── Main component ────────────────────────────────────────────────────────────

function MyOrganisations() {
  const { token } = useSelector((state) => state.auth);

  const [result, setResult] = useState(null); // ✅ null, not undefined
  const [isLoading, setIsLoading] = useState(false);

  async function apiCall() {
    setIsLoading(true);
    try {
      const response = await getAllDetailOfOwner(token);
      if (!response || !response.success) {
        toast.error("Could not fetch details");
        return;
      }
      setResult(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) apiCall();
  }, [token]);

  const organisations = result?.organisations ?? [];

  return (
    <div
      className="min-h-screen bg-black text-slate-100 pt-14"
      style={{ fontFamily: "'DM Mono', 'Fira Code', monospace" }}
    >
      <div className="max-w-5xl mx-auto px-6 pb-20">

        {/* ── Page header ───────────────────────────────────────── */}
        <div className="py-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-500 mb-1">Owner Panel</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-100">
              My Organisations
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your organisations and departments
            </p>
          </div>

          {/* New Org button */}
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                       bg-cyan-500 hover:bg-cyan-400 active:scale-95
                       text-slate-900 font-bold text-sm
                       shadow-lg shadow-cyan-500/20 transition-all duration-150"
          >
            <FaPlus className="text-xs" />
            New Organisation
          </button>
        </div>

        {/* divider */}
        <div className="h-px bg-gradient-to-r from-cyan-500/30 via-slate-700/40 to-transparent mb-8" />

        {/* ── Summary strip ─────────────────────────────────────── */}
        {!isLoading && result && (
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <div className="text-sm text-slate-400">
              <span className="text-2xl font-black text-slate-100 font-mono mr-1">
                {organisations.length}
              </span>
              organisation{organisations.length !== 1 ? "s" : ""}
            </div>
            <div className="text-slate-700">·</div>
            <div className="text-sm text-slate-400">
              <span className="text-2xl font-black text-slate-100 font-mono mr-1">
                {organisations.reduce((sum, org) => sum + (org.departments?.length ?? 0), 0)}
              </span>
              departments
            </div>
            <div className="text-slate-700">·</div>
            <div className="text-sm text-slate-400">
              <span className="text-2xl font-black text-slate-100 font-mono mr-1">
                {organisations.reduce(
                  (sum, org) =>
                    sum +
                    (org.departments?.reduce(
                      (s2, d) => s2 + (d.issues?.length ?? 0),
                      0
                    ) ?? 0),
                  0
                )}
              </span>
              total issues
            </div>
          </div>
        )}

        {/* ── States ────────────────────────────────────────────── */}

        {/* Loading */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2].map((i) => <OrgSkeleton key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!isLoading && result && organisations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
              <HiOutlineOfficeBuilding className="text-3xl text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-400 mb-1">No organisations yet</h3>
            <p className="text-slate-600 text-sm mb-6">Create your first organisation to get started</p>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                         bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-sm
                         shadow-lg shadow-cyan-500/20 transition-all"
            >
              <FaPlus className="text-xs" />
              New Organisation
            </button>
          </div>
        )}

        {/* Organisation cards */}
        {!isLoading && organisations.length > 0 && (
          <div className="space-y-5">
            {organisations.map((org, index) => (
              <OrgCard key={org._id} org={org} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrganisations;
