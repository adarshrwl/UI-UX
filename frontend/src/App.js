import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin/adminDashboard"; // Import AdminDashboard component
import Homepage from "./pages/homepage/homepage";
import Login from "./pages/login/login";
import Practice from "./pages/practice/practice"; // Import Practice component
import Pricing from "./pages/pricing/pricing";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/register";
import AboutUs from "./pages/about/Aboutus";
import ContactForm from "./pages/help/help";
import History from "./pages/records/history";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />{" "}
        {/* Route for homepage */}
        <Route path="/login" element={<Login />} /> {/* Route for login page */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Route for register page */}
        <Route path="/pricing" element={<Pricing />} />{" "}
        {/* Route for pricing page */}
        <Route path="/practice" element={<Practice />} />{" "}
        {/* Route for practice page */}
        <Route path="/admin" element={<AdminDashboard />} />{" "}
        {/* Route for admin dashboard */}
        <Route path="/profile" element={<Profile />} />{" "}
        {/* Route for admin dashboard */}
        <Route path="/about" element={<AboutUs />} />{" "}
        {/* Route for admin dashboard */}
        <Route path="/help" element={<ContactForm />} />{" "}
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
