import { useEffect, useState } from "react";
import { getAllDetailOfOwner } from "../../../Services/Operations/ownerAPI";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

// ── tiny helpers ────────────────────────────────────────────────────────────
const statusColor = {
  Open: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  Working: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  Done: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
};

const statusDot = {
  Open: "bg-amber-400",
  Working: "bg-blue-400",
  Done: "bg-emerald-400",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor[status] || "text-slate-400 bg-slate-400/10 border-slate-400/30"}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[status] || "bg-slate-400"}`} />
      {status}
    </span>
  );
}

// ── stat card ───────────────────────────────────────────────────────────────
function StatCard({ label, count, sub, accent }) {
  const accents = {
    total: "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-300",
    open: "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-300",
    working: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-300",
    done: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-300",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 ${accents[accent]}`}
    >
      {/* decorative circle */}
      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 bg-white blur-xl" />
      <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-5xl font-black font-mono leading-none mb-2">{count}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  );
}

// ── main component ──────────────────────────────────────────────────────────
function MyDashboard() {
  const { token } = useSelector((state) => state.auth);

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [totalIssues, setTotalIssues] = useState(0);
  const [openIssues, setOpenIssues] = useState(0);
  const [inWorkingIssues, setInWorkingIssues] = useState(0);
  const [doneIssues, setDoneIssues] = useState(0);
  const [assignedIssues, setAssignedIssues] = useState([]);

  // ── fetch ──────────────────────────────────────────────────────────────
  async function apiCall() {
    setIsLoading(true);
    try {
      const response = await getAllDetailOfOwner(token);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in My Dashboard");
    } finally {
      setIsLoading(false);
    }
  }

  // ── count issues ───────────────────────────────────────────────────────
  function getAllIssueCounts() {
    if (!result?.organisations?.length) return;

    // flat list of all issues across all orgs & departments
    const allIssues = result.organisations.flatMap((org) =>
      org.departments.flatMap((dept) => dept.issues)
    );

    setTotalIssues(allIssues.length);
    setOpenIssues(allIssues.filter((i) => i.status === "Open").length);
    setInWorkingIssues(allIssues.filter((i) => i.status === "Working").length);
    setDoneIssues(allIssues.filter((i) => i.status === "Done").length);

    // Issues assigned TO the current user (not created by them)
    const myAssigned = allIssues.filter(
      (i) => i.assignedTo && i.assignedTo === result._id
    );
    setAssignedIssues(myAssigned);
  }

  useEffect(() => {
    if (token) apiCall();
  }, [token]);

  useEffect(() => {
    if (result) getAllIssueCounts();
  }, [result]);

  // ── loading skeleton ───────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] pt-14 px-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <p className="text-slate-400 text-sm tracking-widest uppercase">Loading Dashboard…</p>
        </div>
      </div>
    );
  }

  // ── null guard ─────────────────────────────────────────────────────────
  if (!result) return null;

  const organisations = result.organisations || [];

  return (
    <div
      className="min-h-screen bg-black text-slate-100 pt-14"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* subtle noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 space-y-10">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="pt-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-1">Overview</p>
          <h1 className="text-3xl font-black tracking-tight">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              {result.firstName} {result.lastName}
            </span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">{result.email}</p>
          <div className="mt-4 h-px bg-gradient-to-r from-violet-500/40 via-slate-700/30 to-transparent" />
        </div>

        {/* ── Stat Cards ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Issues" count={totalIssues} sub="Across all organisations" accent="total" />
          <StatCard label="Open" count={openIssues} sub="Need attention" accent="open" />
          <StatCard label="In Progress" count={inWorkingIssues} sub="Actively ongoing" accent="working" />
          <StatCard label="Completed" count={doneIssues} sub="Resolved issues" accent="done" />
        </div>

        {/* ── Body Grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Assigned Issues + Organisations */}
          <div className="lg:col-span-2 space-y-6">

            {/* Assigned Issues */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-slate-100">My Assigned Issues</h2>
                  <p className="text-xs text-slate-500">Issues assigned to you across all organisations</p>
                </div>
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
                  {assignedIssues.length}
                </span>
              </div>

              {assignedIssues.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-slate-600">
                  <svg className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-sm">No issues assigned to you yet</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {assignedIssues.map((issue) => (
                    <li key={issue._id}
                      className="flex items-start justify-between gap-4 rounded-xl p-3 bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-slate-200">{issue.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{issue.description}</p>
                      </div>
                      <StatusBadge status={issue.status} />
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* My Organisations */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5">
              <h2 className="font-bold text-slate-100 mb-1">My Organisations</h2>
              <p className="text-xs text-slate-500 mb-4">All organisations you manage</p>

              {organisations.length === 0 ? (
                <p className="text-slate-600 text-sm text-center py-8">No organisations found</p>
              ) : (
                <div className="space-y-3">
                  {organisations.map((org) => (
                    <div key={org._id}
                      className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 hover:border-violet-500/40 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                            <h3 className="font-semibold text-slate-100 truncate">{org.title}</h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 ml-4 line-clamp-2">{org.description}</p>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full shrink-0">
                          {org.privacy}
                        </span>
                      </div>

                      {/* Department pills */}
                      {org.departments?.length > 0 && (
                        <div className="mt-3 ml-4 flex flex-wrap gap-1.5">
                          {org.departments.map((dept) => (
                            <span key={dept._id}
                              className="text-[11px] text-slate-400 bg-slate-700/60 border border-slate-600/50 px-2.5 py-0.5 rounded-full">
                              {dept.title}
                              <span className="ml-1.5 text-slate-500">
                                {dept.issues?.length ?? 0}
                              </span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right: All Issues list */}
          <div className="space-y-6">

            {/* Pending Requests placeholder */}
            <section className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-5">
              <h2 className="font-bold text-slate-400 mb-1">Pending Requests</h2>
              <p className="text-xs text-slate-600">No pending requests at this time.</p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5">
              <h2 className="font-bold text-slate-100 mb-1">Recent Issues</h2>
              <p className="text-xs text-slate-500 mb-4">Latest across all departments</p>

              <ul className="space-y-2 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                {organisations.flatMap((org) =>
                  org.departments.flatMap((dept) =>
                    dept.issues.map((issue) => (
                      <li key={issue._id}
                        className="rounded-xl p-3 bg-slate-800/50 border border-slate-700/40 hover:border-slate-600 transition-colors space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-slate-200 leading-snug">{issue.title}</p>
                          <StatusBadge status={issue.status} />
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] text-violet-400 bg-violet-400/10 border border-violet-400/20 px-2 py-0.5 rounded-full">
                            {org.title}
                          </span>
                          <span className="text-[10px] text-slate-500 bg-slate-700/50 border border-slate-700 px-2 py-0.5 rounded-full">
                            {dept.title}
                          </span>
                        </div>
                      </li>
                    ))
                  )
                )}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDashboard;
