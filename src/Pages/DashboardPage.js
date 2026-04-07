import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Core/Dashboard/Sidebar";

function DashboardPage(){
    return (
        <div className="flex h-screen bg-black text-white">

            {/* Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">

                {/* Optional Top Padding / Header Space */}
                <div className="p-6 md:p-8">
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

export default DashboardPage;