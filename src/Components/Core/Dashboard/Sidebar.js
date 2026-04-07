import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../Common/Modal";
import { removeToken } from "../../../Redux/authSlice";
import { useDispatch } from "react-redux";

function Sidebar(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalData, setModalData] = useState(null);

    const handleCancelLogout = () => setModalData(null);
    const handleConfirmLogout = () => {
        setModalData(null);
        dispatch(removeToken());
        navigate("/", { replace: true });
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

    const linkClass = ({ isActive }) =>
        `px-4 py-2 rounded-xl text-sm transition-all duration-200 no-underline
        ${isActive
            ? "bg-[#1f2937] text-white"
            : "text-gray-400 hover:text-white hover:bg-[#1f2937]"
        }`;

    return (
        <div className="h-screen w-[240px] bg-black border-r border-[#1f2937] p-4 flex flex-col justify-between pt-24">

            {/* Top Section */}
            <div className="flex flex-col gap-2">

                <h2 className="text-xs text-white/90 uppercase tracking-wider px-2">
                    Menu
                </h2>

                <div className="w-full border-t-2 border-white/25 mb-2"></div>

                <NavLink to="/mydashboard" className={linkClass}>
                    My Dashboard
                </NavLink>

                <NavLink to="/myprofile" className={linkClass}>
                    My Profile
                </NavLink>

                <NavLink to="/myOrganisations" className={linkClass}>
                    My Organisations
                </NavLink>

                <NavLink to="/myIssues" className={linkClass}>
                    My Issues
                </NavLink>

                <NavLink to="/issueTracker" className={linkClass}>
                    Issue Tracker
                </NavLink>

                <NavLink to="/requests" className={linkClass}>
                    Requests
                </NavLink>

                <NavLink to="/settings" className={linkClass}>
                    Settings
                </NavLink>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-2">

                <button
                    onClick={openLogoutModal}
                    className="px-4 py-2 text-sm rounded-xl text-white border-2 border-red-600
                     bg-red-500/20 hover:scale-95 transition-all duration-200"
                >
                    Logout
                </button>

            </div>

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

        </div>
    );
}

export default Sidebar;