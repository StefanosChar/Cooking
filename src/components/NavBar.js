import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const royalBlue = "#4169e1";

const NavBar = ({ auth }) => (
  <nav className="navbar navbar-expand-lg navbar-dark shadow-sm bg-dark">
    <style>{`
      .navbar {
        background: #23272b !important;
      }
      .nav-btn-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .royal-btn {
        display: flex;
        align-items: center;
        gap: 0.4em;
        font-weight: 500;
        background: ${royalBlue};
        color: #fff !important;
        border: none;
        box-shadow: 0 1px 4px rgba(65,105,225,0.07);
        transition: background 0.2s, box-shadow 0.2s;
      }
      .royal-btn:hover {
        background: #27408b;
        color: #fff !important;
        text-decoration: none;
      }
      .profile-link {
        display: flex;
        align-items: center;
        gap: 0.4em;
        font-weight: 500;
        color: #fff !important;
        background: none;
        border: none;
        box-shadow: none;
        padding: 0.375rem 0.75rem;
        transition: color 0.2s;
        text-decoration: none;
      }
      .profile-link:hover, .profile-link:focus {
        color: #b3b3b3 !important;
        text-decoration: none;
        background: none;
      }
    `}</style>
    <div className="container">
      <Link className="navbar-brand fw-bold" to="/">CookBook</Link>
      <div className="nav-btn-group">
        <Link
          className={auth?.authenticated ? "profile-link" : "btn royal-btn"}
          to={auth?.authenticated ? "/profile" : "/login"}
        >
          {auth?.authenticated ? (
            <>
              <FaUser style={{ fontSize: 18 }} />
              {auth.user?.username || "User"}
            </>
          ) : (
            "Login"
          )}
        </Link>
        <Link className="btn royal-btn" to="/recipes">Συνταγές</Link>
      </div>
    </div>
  </nav>
);

export default NavBar;
