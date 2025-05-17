const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { redirect } = require('react-router-dom');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: 'MYSECRETKEYWITHCOOKINGSITE',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Database connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'cooking_site',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Get user from database
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?', 
      [username, username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];

    console.log('User from DB:', user);
    console.log('Password from client:', password);
    console.log('Password hash from DB:', user.password_hash);
    
    // Compare passwords
    let hash = user.password_hash;
    if (hash.startsWith('$2y$')) {
      hash = '$2b$' + hash.slice(4);
    }
    const match = await bcrypt.compare(password, hash);

    console.log('Password match result:', match);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set session
    req.session.user = {
      id: user.user_id,
      username: user.username,
      email: user.email
    };

    res.json({ message: 'Login successful', user: req.session.user });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});

// Check auth status
app.get('/check-auth', (req, res) => {
  if (req.session.user) {
    res.json({ authenticated: true, user: req.session.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if username or email already exists
    const [existing] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 3001;
app.listen(PORT, '192.168.2.2', () => {
  console.log(`Server running on http://192.168.2.2:${PORT}`);
});
