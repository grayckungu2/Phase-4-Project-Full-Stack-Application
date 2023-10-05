import React from "react";
import { Link } from "react-router-dom";
import '../nav.css';

const NavigationBar = () => {
  return (
    <nav className="navbar bg-dark border-bottom border-body text-white" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="navbar-header">
          <h1 className="navbar-brand">Movie Review</h1>
        </div>
        <div className="navbar-links">
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register-login" className="nav-link text-white">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/MovieList" className="nav-link text-white">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ReviewList" className="nav-link text-white">
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    
  );
};

export default NavigationBar;
