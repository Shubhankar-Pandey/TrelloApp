import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../../Common/Modal";
import { removeToken } from "../../../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const OWNER_LINKS = [
  { label: "My Dashboard",    to: "/mydashboard"    },
  { label: "My Organisations", to: "/myOrganisations" },
  { label: "Creation Board",  to: "/creationBoard" },
  { label: "My Issues",       to: "/myIssues"        },
  { label: "Issue Tracker",   to: "/issueTracker"    },
  { label: "Requests",        to: "/requests"        },
];

const EMPLOYEE_LINKS = [
  { label: "My Dashboard",  to: "/myDashboard"    },
  { label: "Issue Tracker", to: "/issueTracker" },
  { label: "Requests",      to: "/requests"             },
];

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  const [modalData, setModalData] = useState(null);

  const handleCancelLogout  = () => setModalData(null);
  const handleConfirmLogout = () => {
    setModalData(null);
    dispatch(removeToken());
    navigate("/", { replace: true });
  };

  const openLogoutModal = () => {
    setModalData({
      text1:          "Logout",
      text2:          "Are you sure you want to logout?",
      button1text:    "Cancel",
      button2text:    "Logout",
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

  const links = role === "Owner" ? OWNER_LINKS : EMPLOYEE_LINKS;

  return (
    <div className="h-screen w-[240px] bg-slate-900/70 border-r border-[#1f2937] p-4 flex flex-col justify-between pt-24">

      {/* Top Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xs text-white/90 uppercase tracking-wider px-2">
          Menu
        </h2>
        <div className="w-full border-t-2 border-white/25 mb-2" />

        {links.map(({ label, to }) => (
          <NavLink key={to} to={to} className={linkClass}>
            {label}
          </NavLink>
        ))}
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