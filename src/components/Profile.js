import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import { FaUserCircle } from "react-icons/fa";

const Profile = ({ auth }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changeMsg, setChangeMsg] = useState("");

  useEffect(() => {
    if (auth?.user?.id) {
      axios
        .get(`http://localhost:3001/users/${auth.user.id}/comments`, { withCredentials: true })
        .then((res) => setComments(res.data))
        .catch(() => setComments([]));
    }
  }, [auth]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/logout", {}, { withCredentials: true });
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert("Αποτυχία αποσύνδεσης. Δοκιμάστε ξανά.");
    }
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    setChangeMsg("");
    try {
      await axios.post(
        `http://localhost:3001/users/${auth.user.id}/change-username`,
        { newUsername },
        { withCredentials: true }
      );
      setChangeMsg("Το username άλλαξε επιτυχώς!");
      setShowUsernameModal(false);
      window.location.reload();
    } catch (err) {
      setChangeMsg("Σφάλμα αλλαγής username.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setChangeMsg("");
    try {
      await axios.post(
        `http://localhost:3001/users/${auth.user.id}/change-password`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      setChangeMsg("Το password άλλαξε επιτυχώς!");
      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setChangeMsg("Σφάλμα αλλαγής password.");
    }
  };

  if (!auth?.authenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.3) !important; /* overlay με διαφάνεια μόνο στο backdrop */
          z-index: 1050;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1 !important;
        }

        .modal {
          display: flex !important;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: transparent !important;
          border: none;
          box-shadow: none;
          margin: 0;
          padding: 0;
          opacity: 1 !important;
        }

        .modal-dialog {
          margin: 0 auto;
          max-width: 400px;
          width: 100%;
          opacity: 1 !important;
          background-color: #fff !important;
          box-shadow: none !important;
        }

        .modal-content {
          background: #fff !important;
          border-radius: 12px;
          border: none;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          opacity: 1 !important;
          padding: 0;
        }

      `}</style>

      <NavBar auth={auth} />
      <div className="container py-5 flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="profile-card text-center p-4 bg-white rounded shadow-sm" style={{ minWidth: 350 }}>
          <FaUserCircle size={80} color="#4169e1" className="mb-3" />
          <h2 className="fw-bold mb-2">{auth.user?.username || "Χρήστης"}</h2>
          <div className="mb-4 text-muted">{auth.user?.email || "-"}</div>

          <button className="btn btn-outline-primary mb-2 w-100" onClick={() => setShowUsernameModal(true)}>
            Αλλαγή Username
          </button>
          <button className="btn btn-outline-secondary mb-4 w-100" onClick={() => setShowPasswordModal(true)}>
            Αλλαγή Password
          </button>
          <button className="btn btn-outline-success mb-4 w-100" onClick={() => navigate("/weekly-planner")}>
            Εβδομαδιαίο Πρόγραμμα
          </button>
          <button className="btn btn-danger px-4 w-100" onClick={handleLogout}>
            Αποσύνδεση
          </button>

          {changeMsg && <div className="alert alert-info mt-3">{changeMsg}</div>}

          <hr className="my-4" />

          <h5 className="mb-3">Τα σχόλιά μου</h5>
          {comments.length === 0 ? (
            <div className="text-muted">Δεν έχετε γράψει ακόμα σχόλια.</div>
          ) : (
            <ul className="list-group">
              {comments.map((comment) => (
                <li key={comment.comment_id} className="list-group-item d-flex flex-column align-items-start">
                  <div>
                    <b>Σε συνταγή:</b>{" "}
                    <Link to={`/recipes/${comment.recipe_id}`}>{comment.recipe_title}</Link>
                  </div>
                  <div>
                    <b>Σχόλιο:</b> {comment.comment_text}
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.85em" }}>
                    {new Date(comment.created_at).toLocaleString("el-GR")}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {showUsernameModal && (
        <div className="modal-backdrop show" style={{ zIndex: 1050 }}>
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
              <form className="modal-content" onSubmit={handleUsernameChange}>
                <div className="modal-header">
                  <h5 className="modal-title">Αλλαγή Username</h5>
                  <button type="button" className="btn-close" onClick={() => setShowUsernameModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Νέο username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Αποθήκευση
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowUsernameModal(false)}>
                    Ακύρωση
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showPasswordModal && (
        <div className="modal-backdrop show" style={{ zIndex: 1050 }}>
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
              <form className="modal-content" onSubmit={handlePasswordChange}>
                <div className="modal-header">
                  <h5 className="modal-title">Αλλαγή Password</h5>
                  <button type="button" className="btn-close" onClick={() => setShowPasswordModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Τρέχον password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Νέο password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Αποθήκευση
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>
                    Ακύρωση
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
