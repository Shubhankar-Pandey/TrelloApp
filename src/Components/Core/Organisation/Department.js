import { useNavigate } from 'react-router-dom';

function Department({ department }) {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-3 p-4 rounded-2xl border border-indigo-500/25 bg-indigo-500/5 hover:border-indigo-400/50 hover:bg-indigo-500/10 transition-all duration-200 h-full'>

            {/* Title */}
            <p className='text-sm font-semibold text-white leading-snug'>
                {department.title}
            </p>

            {/* Description */}
            {department.description && (
                <p className='text-xs text-white/40 leading-relaxed line-clamp-2'>
                    {department.description}
                </p>
            )}

            {/* Issues count */}
            <div className='flex items-center gap-1.5'>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="4.5" stroke="#2dd4bf" strokeWidth="1.2"/>
                    <line x1="6" y1="4" x2="6" y2="6.5" stroke="#2dd4bf" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="6" cy="8.2" r="0.7" fill="#2dd4bf"/>
                </svg>
                <span className='text-xs font-semibold text-teal-400'>
                    {department.issues.length} {department.issues.length === 1 ? 'issue' : 'issues'}
                </span>
            </div>

            {/* CTA Button — only this navigates */}
            <button
                onClick={() => navigate(`/departments/${department._id}`)}
                className='mt-auto w-full py-2 text-xs font-medium text-teal-300/80 border border-teal-500/20 rounded-xl hover:border-teal-400/50 hover:text-teal-200 hover:bg-teal-500/10 transition-all duration-200 cursor-pointer'
            >
                See full details
            </button>
        </div>
    );
}

export default Department;
