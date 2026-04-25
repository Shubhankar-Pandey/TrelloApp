import { useNavigate } from 'react-router-dom';

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Organisations', path: '/organisations' },
    { label: 'Browse Issues', path: '/issues' },
];

const accountLinks = [
    { label: 'Login', path: '/login' },
    { label: 'Sign Up', path: '/signup' },
];

function Footer() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full bg-slate-900/70 px-6 pt-14 pb-8 overflow-hidden">

            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/35 to-transparent" />

            <div className="max-w-4xl mx-auto flex flex-col gap-10">

                {/* Top row */}
                <div className="flex items-start justify-between flex-wrap gap-8">

                    {/* Brand */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                    <rect x="3" y="3" width="6" height="6" rx="1.5" fill="#818cf8"/>
                                    <rect x="11" y="3" width="6" height="6" rx="1.5" fill="#818cf8" opacity=".5"/>
                                    <rect x="3" y="11" width="6" height="6" rx="1.5" fill="#818cf8" opacity=".5"/>
                                    <rect x="11" y="11" width="6" height="6" rx="1.5" fill="#818cf8" opacity=".25"/>
                                </svg>
                            </div>
                            <span className="text-[15px] font-semibold text-slate-200">TrelloApp</span>
                        </div>
                        <p className="text-[12px] text-white/70 max-w-[200px] leading-relaxed">
                            Raise issues. Assign them.<br />Get them resolved.
                        </p>
                    </div>

                    {/* Nav links */}
                    <div className="flex gap-10 flex-wrap">
                        <div className="flex flex-col gap-2.5">
                            <p className="text-[11px] font-semibold tracking-widest uppercase text-white/70 mb-1">Navigate</p>
                            {navLinks.map((link) => (
                                <button
                                    key={link.path}
                                    onClick={() => navigate(link.path)}
                                    className="text-[13px] text-slate-500 hover:text-indigo-400 transition-colors text-left"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <p className="text-[11px] font-semibold tracking-widest uppercase text-white/70 mb-1">Account</p>
                            {accountLinks.map((link) => (
                                <button
                                    key={link.path}
                                    onClick={() => navigate(link.path)}
                                    className="text-[13px] text-slate-500 hover:text-indigo-400 transition-colors text-left"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between flex-wrap gap-3 pt-6 border-t border-slate-900">

                    <p className="text-[12px] text-white/70 flex items-center gap-1.5 flex-wrap">
                        Built by
                        <a
                            href="https://www.linkedin.com/in/shubhankarpandey/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-500 hover:text-indigo-400 font-medium transition-colors inline-flex items-center gap-1.5"
                        >
                            Shubhankar Pandey
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 01-1.979-1.98 1.98 1.98 0 011.979-1.98 1.98 1.98 0 011.98 1.98 1.98 1.98 0 01-1.98 1.98zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </p>

                    <p className="text-[12px] text-white/70">Thank you for visiting 🙏</p>

                </div>

            </div>
        </div>
    );
}

export default Footer;