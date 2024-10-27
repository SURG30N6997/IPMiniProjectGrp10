import React from'react';
//rotas
import {BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
//pages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Login from './pages/Login_page.js';
import Signup from './pages/Signup_Page.js';
import { useState } from "react";
//componentes
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Profile from './components/profile.js';
import Dashboard from './pages/Dashboard/Dashboard.js'
import Analytics from './pages/Analytics/Analytics.js'
import Transactions from './pages/Transactions/Transactions.js'
import NewNavbar from './components/Navbar/Navbar.js'

function App() {
  const location = useLocation(); // Hook to get current path

  // Function to determine which navbar to show
  const renderNavbar = () => {
    const showNavbarPaths = ['/', '/about', '/profile', '/contact', '/signup', '/login'];
    return showNavbarPaths.includes(location.pathname) ? <Navbar /> : <NewNavbar />;
  };
  return (
    <>
      
        {renderNavbar()}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/transactions' element={<Transactions />} />
        </Routes>
        <ToastContainer />
      
      
    </>
  );
}

export default App;



