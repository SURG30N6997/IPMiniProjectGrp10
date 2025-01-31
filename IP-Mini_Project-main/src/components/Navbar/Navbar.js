// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase.js";
import './Navbar.css'; // Import the CSS for the Navbar

const NewNavbar = () => {
    const navigate = useNavigate(); // Hook for programmatic navigation

    async function handleLogout() {
        try {
          await auth.signOut();
          window.location.href = "/login";
          console.log("User logged out successfully!");
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
      }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Expense Tracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/transactions">Transactions</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/analytics">Analytics</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NewNavbar;
