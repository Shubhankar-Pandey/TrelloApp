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
                toast.error("Error loading organisations");
                return;
            }

            setResult(response.data.data);
        } catch (error) {
            console.error(error);
            toast.error("Error loading organisations");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        getAllOrg();
    }, []);

    return (
        <div className='min-h-screen bg-white px-6 py-10 pt-24'>
            <div className='max-w-5xl mx-auto'>

                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-2xl font-semibold text-gray-900'>
                        Organisations
                    </h1>
                    <p className='text-sm text-gray-500 mt-1'>
                        Browse all public organisations and their departments.
                    </p>
                    <div className='mt-4 h-px w-full bg-gradient-to-r from-indigo-200 via-indigo-100 to-transparent' />
                </div>

                {/* Loading */}
                {loading && (
                    <div className='flex flex-col gap-4'>
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className='h-52 rounded-2xl bg-gray-100 border border-gray-200 animate-pulse'
                            />
                        ))}
                    </div>
                )}

                {/* Organisations */}
                {!loading && result.length > 0 && (
                    <div className='flex flex-col gap-4'>
                        {result.map((organisation, index) => (
                            <Organisation key={index} organisation={organisation} />
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && result.length === 0 && (
                    <div className='flex flex-col items-center py-24 gap-3'>
                        <div className='w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center'>
                            📦
                        </div>
                        <p className='text-sm text-gray-500'>
                            No organisations found.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default OrganisationsPage;