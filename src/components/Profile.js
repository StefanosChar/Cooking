import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import { FaUserCircle } from "react-icons/fa";

const Profile = ({ auth }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/logout", {}, { withCredentials: true });
      navigate("/"); // Redirect to home after logout
      window.location.reload(); // Ensure auth state updates everywhere
    } catch (err) {
      alert("Αποτυχία αποσύνδεσης. Δοκιμάστε ξανά.");
    }
  };

  if (!auth?.authenticated) {
    // Optionally redirect or show a message
    navigate("/login");
    return null;
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <NavBar auth={auth} />
      <div className="container py-5 flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="profile-card text-center p-4 bg-white rounded shadow-sm">
          <FaUserCircle size={80} color="#4169e1" className="mb-3" />
          <h2 className="fw-bold mb-2">{auth.user?.username || "Χρήστης"}</h2>
          <div className="mb-4 text-muted">{auth.user?.email || "-"}</div>
          <button className="btn btn-danger px-4" onClick={handleLogout}>
            Αποσύνδεση
          </button>
        </div>
      </div>
      <footer className="bg-white text-center py-3 shadow-sm mt-auto">
        &copy; {new Date().getFullYear()} CookBook. All rights reserved.
      </footer>
      <style>{`
        .profile-card {
          max-width: 380px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default Profile;
