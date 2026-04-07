import { useNavigate } from 'react-router-dom';

function Department({ department }) {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-3 p-4 rounded-2xl border border-gray-800 bg-gray-900 hover:border-indigo-500 hover:shadow-md transition-all duration-200 h-full'>

            {/* Title */}
            <p className='text-sm font-semibold text-white'>
                {department.title}
            </p>

            {/* Description */}
            {department.description && (
                <p className='text-xs text-gray-400 line-clamp-2'>
                    {department.description}
                </p>
            )}

            {/* Issues */}
            <span className='text-xs font-medium text-indigo-400'>
                {department.issues.length} {department.issues.length === 1 ? 'issue' : 'issues'}
            </span>

            {/* Button */}
            <button
                onClick={() => navigate(`/departments/${department._id}`)}
                className='mt-auto w-full py-2 text-xs font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition'
            >
                View Details
            </button>

        </div>
    );
}

export default Department;