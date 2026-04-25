import { useNavigate } from 'react-router-dom';



function JoinUsNow() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full bg-black overflow-hidden px-6 py-24">

            {/* Top border fade */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            {/* Grid lines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
                }}
            />

            {/* Glow blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, transparent 70%)' }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">

                {/* Badge */}
                <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/8 text-indigo-300 text-xs font-medium tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    Now open to everyone
                </div>

                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl font-semibold text-slate-100 leading-tight mb-4">
                    Start tracking issues.<br />
                    <span className="text-slate-400 font-normal">Stop letting things slip.</span>
                </h2>

                {/* Subheading */}
                <p className="text-[15px] text-slate-500 leading-relaxed max-w-md mb-10">
                    Whether you're an owner building a team or someone looking to contribute — TrelloApp gives you the structure to get things done.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 justify-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-7 py-3 rounded-xl text-white font-medium bg-indigo-500 hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-900/40 ring-1 ring-indigo-500/30 hover:-translate-y-px"
                    >
                        Get Started →
                    </button>
                    <button
                        onClick={() => navigate('/issues')}
                        className="px-7 py-3 rounded-xl text-slate-400 font-medium bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-slate-200 transition-all backdrop-blur-sm hover:-translate-y-px"
                    >
                        Browse Issues
                    </button>
                </div>

                {/* Note */}
                <p className="mt-5 text-xs text-slate-700">Free to join. No credit card required.</p>

            </div>
        </div>
    );
}

export default JoinUsNow;