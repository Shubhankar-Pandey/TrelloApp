function Department({ department }) {
    const count = department.issues.length;

    return (
        <div className="flex flex-col gap-2 p-4 rounded-xl border border-slate-800 bg-black/50 hover:border-indigo-900 transition-all duration-200 h-full">
            <p className="text-[13px] font-semibold text-slate-300 truncate">{department.title}</p>
            {department.description && (
                <p className="text-[12px] text-slate-600 line-clamp-2 leading-relaxed">{department.description}</p>
            )}
            <p className="text-[11px] font-medium text-indigo-500 mt-auto pt-2">
                {count} {count === 1 ? 'issue' : 'issues'}
            </p>
        </div>
    );
}

export default Department;