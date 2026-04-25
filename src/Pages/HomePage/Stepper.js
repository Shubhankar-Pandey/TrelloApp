import { useEffect, useRef } from 'react';

const ownerSteps = [
  { tag: 'Setup', title: 'Create your organisation', desc: 'Sign up and create your organisation — set it public so anyone can discover it, or keep it private for your team only.' },
  { tag: 'Structure', title: 'Create departments', desc: 'Divide your organisation into departments — Engineering, Design, HR, or anything else. Control visibility per department independently.' },
  { tag: 'Action', title: 'Raise an issue', desc: 'Create an issue inside any department. Describe the problem, set its visibility, and decide if you want to assign it right away or leave it open.' },
  { tag: 'Delegate', title: 'Assign the issue', desc: 'Assign the issue to an employee directly, or review and accept employee requests to work on it. You stay in control of every assignment.' },
  { tag: 'Monitor', title: 'Track the progress', desc: 'Watch issues move from open → in progress → done. Get a clear view of what\'s being worked on, what\'s pending, and what\'s resolved.' },
];

const employeeSteps = [
  { tag: 'Discover', title: 'Browse public issues', desc: 'Explore public organisations and departments. Find issues that interest you or match your skills — no invite needed to browse.' },
  { tag: 'Request', title: 'Request or accept an issue', desc: 'If an issue is assigned to you, accept it to start. Spotted something you\'d like to take on? Send a request to the owner — they\'ll review and decide.' },
  { tag: 'Working', title: 'Issue in progress', desc: 'Once accepted, the issue moves to in progress. Work on it at your pace — the owner can see the status update in real time.' },
  { tag: 'Done', title: 'Issue completed', desc: 'Mark the issue as done once resolved. It\'s logged as completed, visible to the owner, and your contribution is on record.' },
];

function StepItem({ step, index, role }) {
  const ref = useRef(null);
  const isOwner = role === 'owner';

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('sp-visible'), index * 130);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const numStyle = isOwner
    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/25'
    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
  const lineStyle = isOwner ? 'bg-indigo-500/20' : 'bg-emerald-500/15';
  const tagStyle = isOwner
    ? 'bg-indigo-500/10 text-indigo-400'
    : 'bg-emerald-500/8 text-emerald-400';

  return (
    <div
      ref={ref}
      className="flex gap-6 opacity-0 translate-y-6 transition-all duration-500 ease-out [&.sp-visible]:opacity-100 [&.sp-visible]:translate-y-0"
    >
      <div className="flex flex-col items-center min-w-[40px]">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold flex-shrink-0 ${numStyle}`}>
          {index + 1}
        </div>
        {index < (isOwner ? ownerSteps : employeeSteps).length - 1 && (
          <div className={`w-px flex-1 min-h-[32px] my-1.5 ${lineStyle}`} />
        )}
      </div>
      <div className="pb-9 flex-1">
        <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-1 ${tagStyle}`}>
          {step.tag}
        </span>
        <p className="text-[15px] font-semibold text-slate-200 mt-2 mb-1.5">{step.title}</p>
        <p className="text-[13.5px] text-slate-500 leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}

function Stepper() {
  return (
    <div className="bg-black w-full py-24 px-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-5 inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium tracking-widest uppercase">
          How it works
        </div>

        <h2 className="text-4xl sm:text-5xl font-semibold text-slate-100 leading-tight mb-14">
          From start to done —<br />
          <span className="text-slate-400 font-normal">step by step.</span>
        </h2>

        {/* Owner */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
              Owner
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <div className="flex flex-col">
            {ownerSteps.map((step, i) => (
              <StepItem key={i} step={step} index={i} role="owner" />
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-white/[0.05] mb-16" />

        {/* Employee */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Employee
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <div className="flex flex-col">
            {employeeSteps.map((step, i) => (
              <StepItem key={i} step={step} index={i} role="employee" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Stepper;