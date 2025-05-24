import React, { useState } from "react";
import axios from "axios";
import NavBar from './NavBar';

const TABS = [
  { key: "login", label: "Σύνδεση" },
  { key: "register", label: "Εγγραφή" },
];

const Login = ({ auth }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [credentials, setCredentials] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setError("");
    setCredentials({ username: "", password: "", email: "" });
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (activeTab === "login") {
      try {
        await axios.post(
          "http://localhost:3001/login",
          {
            username: credentials.username,
            password: credentials.password,
          },
          { withCredentials: true }
        );
        window.location.href = "/recipes";
      } catch (err) {
        setError("Λανθασμένο όνομα χρήστη ή κωδικός.");
      }
    } else {
      try {
        await axios.post(
          "http://localhost:3001/register",
          {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
          },
          { withCredentials: true }
        );
        window.location.href = "/recipes";
      } catch (err) {
        setError("Η εγγραφή απέτυχε. Δοκιμάστε ξανά.");
      }
    }
  };

  const tabIdx = TABS.findIndex((t) => t.key === activeTab);
  const blobLeft = tabIdx === 0 ? "calc(25% - 30px)" : "calc(75% - 30px)";

  return (
    <>
      <NavBar auth={auth} />
      <div className="auth-outer">
        <div className="auth-tabs">
          {TABS.map((tab) => (
            <div
              key={tab.key}
              className={`auth-tab${activeTab === tab.key ? " active" : ""}`}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.label}
            </div>
          ))}
          <div className="auth-blob" style={{ left: blobLeft }}>
            <svg width="48" height="24" viewBox="0 0 48 24">
              <path
                d="M0,0 A24,24 0 0 0 48,0"
                fill="#23272b"
              />
            </svg>
          </div>
        </div>
        <div className="auth-container">
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Όνομα χρήστη</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
            {activeTab === "register" && (
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            )}
            <div className="input-group">
              <label>Κωδικός</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                autoComplete={activeTab === "login" ? "current-password" : "new-password"}
              />
            </div>
            <button type="submit">
              {activeTab === "login" ? "Σύνδεση" : "Εγγραφή"}
            </button>
          </form>
        </div>
      </div>
      <style>{`
        .auth-outer {
          max-width: 420px;
          margin: 60px auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .auth-tabs {
          position: relative;
          display: flex;
          justify-content: space-between;
          background: #23272b;
          padding: 0 0 24px 0;
          font-size: 1.5rem;
          font-weight: 500;
        }
        .auth-tab {
          flex: 1;
          text-align: center;
          color: #bdbdbd;
          cursor: pointer;
          padding: 16px 0 8px 0;
          transition: color 0.2s, font-weight 0.2s;
          z-index: 2;
        }
        .auth-tab.active {
          color: #fff;
          font-weight: bold;
        }
        .auth-blob {
          position: absolute;
          bottom: -16px;
          transition: left 0.4s cubic-bezier(.6,.05,.28,.91);
          z-index: 1;
        }
        .auth-container {
          padding: 40px 32px 32px 32px;
        }
        .input-group {
          margin-bottom: 20px;
        }
        .input-group label {
          display: block;
          margin-bottom: 6px;
          font-size: 1rem;
          color: #23272b;
        }
        .input-group input {
          width: 100%;
          padding: 10px 12px;
          font-size: 1.1rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          outline: none;
          transition: border 0.2s;
        }
        .input-group input:focus {
          border-color: #4169e1;
        }
        button[type="submit"] {
          width: 100%;
          padding: 12px;
          font-size: 1.1rem;
          background: #4169e1;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.2s;
        }
        button[type="submit"]:hover {
          background: #27408b;
        }
        .error {
          color: #e74c3c;
          margin-bottom: 16px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Login;
