import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Blog from "./pages/blog";
import About from "./pages/about";
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null); 

  const url = 'https://blogg-uiis.onrender.com'; 

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);  
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); 
    }
  }, [token]);

  return (
    <Router>
      <div className="relative">
        <Navbar setShowLogin={setShowLogin} logout={logout} token={token} />

        <Routes>
          <Route path="/" element={<HomePage url={url} />} />
          <Route path="/Login" element={<LoginPage url={url} setToken={setToken} setShowLogin={setShowLogin}  />} />
          <Route path="/blog" element={<Blog url={url} setToken={setToken} setShowLogin={setShowLogin} token={token} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div className="text-center mt-4">404 - Page Not Found</div>} />
        </Routes>

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
