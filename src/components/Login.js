import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://localhost:3001/login', // <-- Correct endpoint
      {
        username: credentials.username,
        password: credentials.password
      },
      { withCredentials: true } // <-- Important for session cookies!
    );

    // You can store user info if needed, or just redirect
    // localStorage.setItem('user', JSON.stringify(response.data.user));
    window.location.href = '/recipes'; // Redirect to protected route
  } catch (err) {
    setError('Invalid username or password');
  }
};

  return (
    <div className="auth-container">
      <h1>Login to CookBook</h1>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </div>
        
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
