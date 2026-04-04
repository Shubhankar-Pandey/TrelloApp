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



function App() {
  return (
    <div className="w-screen h-screen">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/verifyEmail" element={<VerifyEmailPage/>}/>
        <Route path="/forgetPassword" element={<ForgetPasswordPage/>}/>
        <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
        <Route path="/organisations" element={<OrganisationsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
