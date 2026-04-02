import "./App.css";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import VerifyEmailPage from "./Pages/VerifyEmailPage"
import Navbar from "./Components/Common/Navbar";


function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/verifyEmail" element={<VerifyEmailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
