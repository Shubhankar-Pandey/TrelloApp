import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllDetailOfOwner } from "../../../Services/Operations/ownerAPI";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import OrgCard from "./OrgCard";
import OrgSkeleton from "./OrgSkeleton";


import {
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";





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
  
  const navigate = useNavigate();
  function handleOnClick(){
    navigate(`/creationBoard/${1}`);
  }

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
          <button onClick={handleOnClick}
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
