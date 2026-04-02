import { Link, useLocation } from 'react-router-dom';
import GradientText from '../../ReactBitComponents/GradientText';

function Navbar() {

    const location = useLocation();

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Organisations', to: '/organisations' },
        { label: 'Issues', to: '/issues' },
    ];

    return (
        <nav className='fixed top-0 left-0 right-0 z-50'>

            {/* Glass pill container */}
            <div className='max-w-full mx-auto flex items-center justify-between bg-black border border-white/10 px-6 py-3 shadow-lg shadow-black/30'>

                {/* Left — Logo */}
                <Link to='/' className='flex items-center gap-2 cursor-pointer no-underline'>
                    {/* Icon mark */}
                    <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#5227FF] to-[#B19EEF] flex items-center justify-center shadow-md shadow-[#5227FF]/40'>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <rect x="1" y="1" width="5" height="8" rx="1.2" fill="white" fillOpacity="0.9"/>
                            <rect x="8" y="1" width="5" height="5" rx="1.2" fill="white" fillOpacity="0.6"/>
                            <rect x="8" y="8" width="5" height="5" rx="1.2" fill="white" fillOpacity="0.4"/>
                        </svg>
                    </div>
                    <GradientText
                        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-lg font-semibold tracking-tight"
                    >
                        TrelloApp
                    </GradientText>
                </Link>

                {/* Center — Nav Links */}
                <div className='flex items-center gap-1'>
                    {navLinks.map(({ label, to }) => {
                        const isActive = location.pathname === to;
                        return (
                            <Link
                                key={label}
                                to={to}
                                className={`relative px-4 py-2 text-sm font-light rounded-xl transition-colors duration-200 group no-underline ${isActive ? 'text-white bg-white/5' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                            >
                                {label}
                                {/* Underline accent */}
                                <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-[#5227FF] to-[#B19EEF] rounded-full transition-all duration-300 ${isActive ? 'w-4' : 'w-0 group-hover:w-4'}`} />
                            </Link>
                        );
                    })}
                </div>

                {/* Right — Auth Buttons */}
                <div className='flex items-center gap-3'>
                    <Link
                        to='/login'
                        className='px-4 py-2 text-sm font-light text-white/60 hover:text-white border border-white/10 rounded-xl hover:border-white/25 hover:bg-white/5 transition-all duration-200 no-underline'
                    >
                        Login
                    </Link>
                    <Link
                        to='/signup'
                        className='px-4 py-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-[#5227FF] to-[#B19EEF] hover:opacity-90 hover:scale-[0.98] active:scale-95 transition-all duration-200 shadow-md shadow-[#5227FF]/30 no-underline'
                    >
                        Sign Up
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;