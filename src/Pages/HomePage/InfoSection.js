
const features = [
  {
    title: "Organisations",
    desc: "Create your workspace — public or private. Structure your teams under one roof, visible only to who you choose.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]">
        <rect x="3" y="3" width="6" height="6" rx="1.5" fill="#818cf8"/>
        <rect x="11" y="3" width="6" height="6" rx="1.5" fill="#818cf8" opacity="0.5"/>
        <rect x="3" y="11" width="6" height="6" rx="1.5" fill="#818cf8" opacity="0.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1.5" fill="#818cf8" opacity="0.3"/>
      </svg>
    ),
  },
  {
    title: "Departments",
    desc: "Break your organisation into focused departments. Control visibility per department — keep sensitive work private.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]">
        <path d="M4 5h12M4 10h8M4 15h6" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Issue Tracking",
    desc: "Raise issues, assign them, and watch them move from open to in-progress to done — in real time.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]">
        <circle cx="10" cy="10" r="7" stroke="#818cf8" strokeWidth="1.8"/>
        <path d="M10 7v3.5l2 2" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Role-based Access",
    desc: "Owners manage, employees execute. Anyone can browse public issues and request to contribute — owners decide who joins.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]">
        <circle cx="7" cy="8" r="3" stroke="#818cf8" strokeWidth="1.8"/>
        <circle cx="14" cy="6" r="2" stroke="#818cf8" strokeWidth="1.5" opacity="0.6"/>
        <path d="M2 16c0-2.5 2-4 5-4s5 1.5 5 4" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M14 10c2 0 4 1 4 3" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    title: "Request & Accept Flow",
    desc: "Employees can accept assigned issues or request ones they're interested in. Owners approve and delegate with a single action.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]">
        <path d="M5 10h10M12 7l3 3-3 3" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Public & Private Control",
    desc: "Every layer — org, department, issue — can be public or private. You decide exactly what the world sees.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]">
        <rect x="3" y="3" width="14" height="3" rx="1.5" fill="#818cf8" opacity="0.4"/>
        <rect x="3" y="8.5" width="10" height="3" rx="1.5" fill="#818cf8" opacity="0.6"/>
        <rect x="3" y="14" width="6" height="3" rx="1.5" fill="#818cf8"/>
      </svg>
    ),
  },
];

const whyItems = [
  { number: "2", title: "Clear roles", desc: "Owners lead, employees execute — no ambiguity about who does what." },
  { number: "∞", title: "Open contribution", desc: "Anyone can find public issues and request to help — building a real community around work." },
  { number: "0", title: "Missed issues", desc: "Everything is tracked, assigned, and visible — nothing slips through the cracks." },
  { number: "1", title: "Place for everything", desc: "Orgs, departments, issues, and people — all connected in one structured system." },
];

function InfoSection() {
  return (
    <div className="bg-black w-full py-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Badge */}
        <div className="mb-5 inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium tracking-widest uppercase">
          What we offer
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-semibold text-slate-100 leading-tight mb-4 max-w-xl">
          Everything you need to{' '}
          <span className="text-slate-400 font-normal">manage work, clearly.</span>
        </h2>

        {/* Subheading */}
        <p className="text-gray-500 text-base leading-relaxed max-w-lg mb-16">
          TrelloApp gives teams a structured way to raise, assign, and resolve issues — across organisations, departments, and roles.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 hover:border-indigo-500/35 hover:bg-indigo-500/[0.05] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mb-5">
                {f.icon}
              </div>
              <p className="text-sm font-semibold text-slate-200 mb-2">{f.title}</p>
              <p className="text-[13px] text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.06] mb-20" />

        {/* Why TrelloApp */}
        <p className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-10">
          Why TrelloApp
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {whyItems.map((w) => (
            <div key={w.title} className="flex flex-col gap-2">
              <span className="text-4xl font-semibold text-indigo-400 leading-none">{w.number}</span>
              <span className="text-sm font-medium text-slate-300">{w.title}</span>
              <p className="text-[13px] text-slate-600 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default InfoSection;