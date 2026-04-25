import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/authSlice";
import { toast } from "react-hot-toast";
import { getAllOrganisations } from "../Services/Operations/organisationAPI";
import Organisation from "../Components/Core/Organisation/Organisation";

function OrganisationsPage() {
    const [result, setResult] = useState([]);
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    async function getAllOrg() {
        try {
            dispatch(setLoading(true));
            const response = await getAllOrganisations();
            if (!response.data.success) { toast.error("Error loading organisations"); return; }
            setResult(response.data.data);
        } catch (error) {
            console.error(error);
            toast.error("Error loading organisations");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => { getAllOrg(); }, []);

    return (
        <div className="min-h-screen bg-[#030712] px-6 py-10 pt-24">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-[22px] font-semibold text-slate-100">Organisations</h1>
                    <p className="text-[13px] text-slate-500 mt-1">Browse all public organisations and their departments.</p>
                    <div className="mt-4 h-px bg-gradient-to-r from-indigo-700 via-indigo-500 to-transparent" />
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-48 rounded-2xl bg-slate-900 border border-slate-800 animate-pulse" />
                        ))}
                    </div>
                )}

                {/* Organisations */}
                {!loading && result.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {result.map((org, i) => (
                            <Organisation key={i} organisation={org} />
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && result.length === 0 && (
                    <div className="flex flex-col items-center py-24 gap-3">
                        <div className="w-11 h-11 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect x="3" y="3" width="6" height="6" rx="1.5" fill="#6366f1" opacity=".6"/>
                                <rect x="11" y="3" width="6" height="6" rx="1.5" fill="#6366f1" opacity=".3"/>
                                <rect x="3" y="11" width="6" height="6" rx="1.5" fill="#6366f1" opacity=".3"/>
                                <rect x="11" y="11" width="6" height="6" rx="1.5" fill="#6366f1" opacity=".15"/>
                            </svg>
                        </div>
                        <p className="text-[13px] text-slate-500">No organisations found.</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default OrganisationsPage;