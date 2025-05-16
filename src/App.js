import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Recipes from './components/Recipes';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Login />;
};

const Home = () => (
  <div className="bg-light min-vh-100 d-flex flex-column">
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">CookBook</Link>
        <div>
          <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
          <Link className="btn btn-primary" to="/recipes">View Recipes</Link>
        </div>
      </div>
    </nav>

    <main className="flex-grow-1 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="display-4 fw-bold">Welcome to CookBook</h1>
        <p className="lead mb-4">
          Discover, share, and enjoy delicious recipes from our community.<br />
          Sign in to upload your own creations!
        </p>
        <Link to="/login" className="btn btn-lg btn-success me-2">Get Started</Link>
        <Link to="/recipes" className="btn btn-lg btn-outline-secondary">Browse Recipes</Link>
      </div>
    </main>

    <footer className="bg-white text-center py-3 shadow-sm">
      &copy; {new Date().getFullYear()} CookBook. All rights reserved.
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/recipes" 
          element={
            <PrivateRoute>
              <Recipes />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
