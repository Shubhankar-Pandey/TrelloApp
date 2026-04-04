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
            if (!response.data.success) {
                toast.error("Error in loading the page");
                return;
            }
            setResult(response.data.data);
        } catch (error) {
            console.log(error);
            toast.error("Error in loading the page");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        getAllOrg();
    }, []);

    return (
        <div className='min-h-screen bg-black px-6 py-10 pt-24'>
            <div className='max-w-5xl mx-auto'>

                {/* Page header */}
                <div className='mb-8'>
                    <h1 className='text-2xl font-semibold text-white tracking-tight'>
                        Organisations
                    </h1>
                    <p className='text-sm text-white/40 mt-1'>
                        Browse all public organisations and their departments.
                    </p>
                    {/* Teal + indigo accent line */}
                    <div className='mt-4 h-px w-full bg-gradient-to-r from-teal-500/50 via-indigo-500/30 to-transparent' />
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div className='flex flex-col gap-4'>
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className='h-52 rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse'
                            />
                        ))}
                    </div>
                )}

                {/* Org list */}
                {!loading && result.length > 0 && (
                    <div className='flex flex-col gap-4'>
                        {result.map((organisation, index) => (
                            <Organisation key={index} organisation={organisation} />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && result.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-24 gap-3'>
                        <div className='w-10 h-10 rounded-xl bg-teal-500/5 border border-teal-500/15 flex items-center justify-center'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <rect x="1.5" y="1.5" width="6" height="10" rx="1.5" stroke="#2dd4bf" strokeWidth="1.3" strokeOpacity="0.7"/>
                                <rect x="10.5" y="1.5" width="6" height="6" rx="1.5" stroke="#6366f1" strokeWidth="1.3" strokeOpacity="0.5"/>
                                <rect x="10.5" y="10.5" width="6" height="6" rx="1.5" stroke="#6366f1" strokeWidth="1.3" strokeOpacity="0.3"/>
                            </svg>
                        </div>
                        <p className='text-sm text-white/30'>No public organisations found.</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default OrganisationsPage;
