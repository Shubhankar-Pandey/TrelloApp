import Department from './Department';

function Organisation({ organisation }) {
    const initial = organisation.ownerId?.firstName?.[0]?.toUpperCase() || '?';
    const ownerName = `${organisation.ownerId?.firstName || ''} ${organisation.ownerId?.lastName || ''}`.trim();
    const deptCount = organisation.departments.length;

    return (
        <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-indigo-900 transition-all duration-200">

            {/* Top */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-[15px] font-semibold text-slate-100">{organisation.title}</h3>
                    {organisation.description && (
                        <p className="text-[13px] text-slate-500 line-clamp-1">{organisation.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                        <div className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-800 flex items-center justify-center text-[11px] font-bold text-indigo-400">
                            {initial}
                        </div>
                        <span className="text-[12px] text-slate-500">{ownerName}</span>
                    </div>
                </div>
                <span className="flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {deptCount} {deptCount === 1 ? 'dept' : 'depts'}
                </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-800" />

            {/* Departments label */}
            <p className="text-[11px] font-medium tracking-widest uppercase text-slate-600">Departments</p>

            {/* Departments grid */}
            {organisation.departments.length === 0 ? (
                <p className="text-[12px] text-slate-600">No departments yet.</p>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {organisation.departments.map((dept, i) => (
                        <Department key={i} department={dept} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Organisation;