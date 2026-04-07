import "./App.css";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import VerifyEmailPage from "./Pages/VerifyEmailPage"
import Navbar from "./Components/Common/Navbar";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import ResetPassword from "./Pages/ResetPassword";
import OrganisationsPage from "./Pages/OrganisationsPage";
import PrivateRoute from "./Components/Common/PrivateRoute";
import DashboardPage from "./Pages/DashboardPage";
import MyDashboard from "./Components/Core/Dashboard/MyDashboard";
import MyOrganisations from "./Components/Core/Dashboard/MyOrganisations";
import AllPublicIssues from "./Pages/AllPublicIssues";



function App() {
  return (
    <div className="w-screen min-h-screen bg-black">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/verifyEmail" element={<VerifyEmailPage/>}/>
        <Route path="/forgetPassword" element={<ForgetPasswordPage/>}/>
        <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
        <Route path="/organisations" element={<OrganisationsPage/>}/>
        <Route path="issues" element={<AllPublicIssues/>}/>

        <Route element={
          <PrivateRoute>
            <DashboardPage/>
          </PrivateRoute>
        }>
          <Route path="/myDashboard" element={<MyDashboard/>}/>
          <Route path="/myOrganisations" element={<MyOrganisations/>}/>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
