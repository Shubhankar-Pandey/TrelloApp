import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GradientText from '../../ReactBitComponents/GradientText';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import { removeToken } from '../../Redux/authSlice';

function Navbar() {

    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const [modalData, setModalData] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancelLogout = () => setModalData(null);

    const handleConfirmLogout = () => {
        dispatch(removeToken());
        setModalData(null);
        navigate("/");
    };

    const openLogoutModal = () => {
        setModalData({
            text1: 'Logout',
            text2: 'Are you sure you want to logout?',
            button1text: 'Cancel',
            button2text: 'Logout',
            button1handler: handleCancelLogout,
            button2handler: handleConfirmLogout,
        });
    };

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Organisations', to: '/organisations' },
        { label: 'Issues', to: '/issues' },
    ];

    return (
        <>
            <nav className='fixed z-50 top-0 left-0 right-0'>

                {/* Light Navbar */}
                <div className='max-w-full mx-auto flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 shadow-sm'>

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
                            className="text-lg font-semibold text-gray-900"
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
                                        ? 'text-indigo-600 bg-indigo-50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Buttons */}
                    <div className='flex items-center gap-3'>
                        {token ? (
                            <button
                                onClick={openLogoutModal}
                                className='px-4 py-2 text-sm font-medium text-white rounded-xl bg-red-500 hover:bg-red-600 transition shadow-sm'
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    to='/login'
                                    className='px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-xl hover:bg-gray-100 transition no-underline'
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

            {/* Modal */}
            {modalData && (
                <Modal
                    text1={modalData.text1}
                    text2={modalData.text2}
                    button1text={modalData.button1text}
                    button2text={modalData.button2text}
                    button1handler={modalData.button1handler}
                    button2handler={modalData.button2handler}
                />
            )}
        </>
    );
}

export default Navbar;