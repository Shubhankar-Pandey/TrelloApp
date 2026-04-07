import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import GradientText from '../../ReactBitComponents/GradientText';
import { useSelector } from 'react-redux';


function Navbar() {

    const location = useLocation();
    const { token } = useSelector((state) => state.auth);

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Organisations', to: '/organisations' },
        { label: 'Issues', to: '/issues' },
    ];

    return (
        <>
            <nav className='fixed z-50 top-0 left-0 right-0'>

                {/* Dark Navbar */}
                <div className='max-w-full mx-auto flex items-center justify-between bg-black border-b border-gray-800 px-6 py-3 shadow-md'>

                    {/* Logo */}
                    <Link to='/' className='flex items-center gap-2 no-underline'>
                        <div className='w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm'>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <rect x="1" y="1" width="5" height="8" rx="1.2" fill="white"/>
                                <rect x="8" y="1" width="5" height="5" rx="1.2" fill="white" opacity="0.7"/>
                                <rect x="8" y="8" width="5" height="5" rx="1.2" fill="white" opacity="0.5"/>
                            </svg>
                        </div>

                        <GradientText
                            colors={["#6366F1", "#8B5CF6", "#EC4899"]}
                            animationSpeed={8}
                            showBorder={false}
                            className="text-lg font-semibold text-white"
                        >
                            TrelloApp
                        </GradientText>
                    </Link>

                    {/* Nav Links */}
                    <div className='flex items-center gap-2'>
                        {navLinks.map(({ label, to }) => {
                            const isActive = location.pathname === to;
                            return (
                                <Link
                                    key={label}
                                    to={to}
                                    className={`px-4 py-2 text-sm rounded-xl transition-all no-underline
                                    ${isActive
                                        ? 'text-indigo-400 bg-gray-800'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Buttons */}
                    <div className='flex items-center gap-3'>
                        {token ? (
                            <>
                                <NavLink to={"/myDashboard"} 
                                className='px-4 py-2 text-sm font-medium text-white rounded-xl bg-indigo-600 hover:bg-indigo-700 transition shadow-sm no-underline'>
                                    My Dashboard
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <Link
                                    to='/login'
                                    className='px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-xl hover:bg-gray-800 transition no-underline'
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/signup'
                                    className='px-4 py-2 text-sm font-medium text-white rounded-xl bg-indigo-600 hover:bg-indigo-700 transition shadow-sm no-underline'
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                </div>
            </nav>
        </>
    );
}

export default Navbar;