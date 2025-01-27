import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Blog from "./pages/blog";
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Retrieve token from localStorage

  const url = 'https://blog-oritg5lkf-ganeshs-projects-3b7848cf.vercel.app'; 
  // // Use your Vercel URL here

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);  // Remove token from state as well
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);  // Save token to localStorage whenever it's set
    }
  }, [token]);

  return (
    <Router>
      <div className="relative">
        {/* Navbar with login/logout buttons */}
        <Navbar setShowLogin={setShowLogin} logout={logout} token={token} />

        <Routes>
          <Route path="/" element={<HomePage url={url} />} />
          <Route path="/Login" element={<LoginPage url={url} setToken={setToken} setShowLogin={setShowLogin}  />} />
          <Route path="/blog" element={<Blog url={url} setToken={setToken} setShowLogin={setShowLogin} token={token} />} />
          <Route path="*" element={<div className="text-center mt-4">404 - Page Not Found</div>} />
        </Routes>

        {/* Conditional Login Popup */}
        {showLogin && (
          <div className="fixed top-[20%] left-[40%] animate-fadeIn duration-300">
            <LoginPage url={url} setShowLogin={setShowLogin} setToken={setToken} />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
