import { useEffect, useState } from "react";
import { getAllPublicIssueDetails } from "../Services/Operations/issueAPI";
import { toast } from "react-hot-toast";
import IssueCard from "../Components/Core/Issues/IssueCard";

function SkeletonCard() {
    return (
        <div className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-xl p-5 h-36 animate-pulse" />
    );
}

function AllPublicIssues() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    async function apiCall() {
        setLoading(true);
        try {
            const response = await getAllPublicIssueDetails();
            if (!response) {
                toast.error("Error in fetching details");
                return;
            }
            setResult(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        apiCall();
    }, []);

    return (
        <div className="min-h-screen bg-black px-6 py-28">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-[22px] font-medium text-slate-200">Public Issues</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {loading
                            ? "Loading issues..."
                            : result
                            ? `${result.length} issue${result.length !== 1 ? "s" : ""} found`
                            : ""}
                    </p>
                    <div className='mt-4 h-px w-full bg-gradient-to-r from-indigo-700 via-indigo-500 to-transparent' />
                </div>

                {/* Skeleton loading */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {/* Issues grid */}
                {!loading && result && result.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {result.map(issue => (
                            <IssueCard key={issue._id} issue={issue} />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && result?.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-600">
                        <p className="text-[15px]">No public issues found.</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default AllPublicIssues;