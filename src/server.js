const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');

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
  cookie: { secure: false }
}));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'cooking_site',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Δεν είστε συνδεδεμένος' });
  }
  next();
};

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Όλα τα πεδία είναι υποχρεωτικά' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?', 
      [username, username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Λάθος στοιχεία' });
    }

    const user = rows[0];
    let hash = user.password_hash;
    
    if (hash.startsWith('$2y$')) {
      hash = '$2b$' + hash.slice(4);
    }
    
    const match = await bcrypt.compare(password, hash);
    
    if (!match) {
      return res.status(401).json({ error: 'Λάθος στοιχεία' });
    }

    req.session.user = {
      id: user.user_id,
      username: user.username,
      email: user.email
    };

    res.json({ message: 'Επιτυχής σύνδεση', user: req.session.user });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Σφάλμα διακομιστή' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Αποσυνδέθηκετε επιτυχώς' });
});

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
      return res.status(400).json({ error: 'Όλα τα πεδία είναι υποχρεωτικά' });
    }

    const [existing] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Το όνομα χρήστη ή email υπάρχει ήδη' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'Εγγραφήκατε επιτυχώς!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Σφάλμα διακομιστή' });
  }
});

app.get('/recipes', async (req, res) => {
  try {
    const [recipes] = await pool.query(`
      SELECT 
        r.recipe_id AS id, 
        r.title, 
        r.description, 
        r.ingredients, 
        r.instructions, 
        r.categories,
        r.prep_time, 
        r.difficulty, 
        r.image_url, 
        r.rating, 
        u.username 
      FROM recipes r 
      JOIN users u ON r.user_id = u.user_id
    `);

    const formattedRecipes = recipes.map(recipe => ({
      ...recipe,
      ingredients: recipe.ingredients ? JSON.parse(recipe.ingredients) : [],
      instructions: recipe.instructions ? JSON.parse(recipe.instructions) : [],
      categories: recipe.categories || []
    }));

    res.json(formattedRecipes);
  } catch (error) {
    console.error('Σφάλμα:', error);
    res.status(500).json({ error: 'Σφάλμα διακομιστή' });
  }
});

app.get('/recipes/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;
    
    const [recipe] = await pool.query(`
      SELECT r.*, u.username 
      FROM recipes r 
      JOIN users u ON r.user_id = u.user_id 
      WHERE r.recipe_id = ?
    `, [recipeId]);
    
    if (recipe.length === 0) {
      return res.status(404).json({ error: 'Η συνταγή δεν βρέθηκε' });
    }

    const formattedRecipe = {
      ...recipe[0],
      ingredients: JSON.parse(recipe[0].ingredients),
      instructions: JSON.parse(recipe[0].instructions),
      categories: recipe[0].categories || []
    };

    const [comments] = await pool.query(`
      SELECT c.*, u.username 
      FROM comments c 
      JOIN users u ON c.user_id = u.user_id 
      WHERE c.recipe_id = ?
    `, [recipeId]);

    res.json({
      ...formattedRecipe,
      comments
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Σφάλμα διακομιστή' });
  }
});

app.post('/comments/:commentId/like', authMiddleware, async (req, res) => {
  const userId = req.session.user.id;
  const commentId = req.params.commentId;
  try {
    await pool.query(
      `INSERT IGNORE INTO comment_likes (comment_id, user_id) VALUES (?, ?)`,
      [commentId, userId]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Σφάλμα διακομιστή' });
  }
});

app.post('/comments/:commentId/unlike', authMiddleware, async (req, res) => {
  const userId = req.session.user.id;
  const commentId = req.params.commentId;
  try {
    await pool.query(
      `DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?`,
      [commentId, userId]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Σφάλμα διακομιστή' });
  }
});


app.get('/recipes/:id/comments', async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.session?.user?.id || 0;

  try {
    const [comments] = await pool.query(
      `SELECT c.*, u.username 
       FROM comments c 
       JOIN users u ON c.user_id = u.user_id 
       WHERE c.recipe_id = ? 
       ORDER BY c.created_at DESC`,
      [recipeId]
    );

    const commentIds = comments.map(c => c.comment_id);
    let likesMap = {};
    let likedMap = {};

    if (commentIds.length > 0) {
      const [likesRows] = await pool.query(
        `SELECT comment_id, COUNT(*) AS likes FROM comment_likes WHERE comment_id IN (?) GROUP BY comment_id`,
        [commentIds]
      );
      likesMap = Object.fromEntries(likesRows.map(r => [r.comment_id, r.likes]));

      if (userId) {
        const [likedRows] = await pool.query(
          `SELECT comment_id FROM comment_likes WHERE comment_id IN (?) AND user_id = ?`,
          [commentIds, userId]
        );
        likedMap = Object.fromEntries(likedRows.map(r => [r.comment_id, true]));
      }
    }

    const result = comments.map(c => ({
      ...c,
      likes: likesMap[c.comment_id] || 0,
      likedByMe: !!likedMap[c.comment_id]
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Σφάλμα διακομιστή' });
  }
});

app.get('/users/:id/comments', async (req, res) => {
  const userId = req.params.id;
  try {
    const [comments] = await pool.query(
      `SELECT c.*, r.title AS recipe_title 
       FROM comments c 
       JOIN recipes r ON c.recipe_id = r.recipe_id 
       WHERE c.user_id = ? 
       ORDER BY c.created_at DESC`,
      [userId]
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Σφάλμα διακομιστή' });
  }
});

app.post('/users/:id/change-username', authMiddleware, async (req, res) => {
  const userId = req.params.id;
  const { newUsername } = req.body;
  if (!newUsername) return res.status(400).json({ error: "Το username είναι υποχρεωτικό" });
  try {
    await pool.query('UPDATE users SET username = ? WHERE user_id = ?', [newUsername, userId]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Σφάλμα διακομιστή' });
  }
});

app.post('/users/:id/change-password', authMiddleware, async (req, res) => {
  const userId = req.params.id;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ error: "Συμπλήρωσε όλα τα πεδία" });
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    if (users.length === 0) return res.status(404).json({ error: "Χρήστης δεν βρέθηκε" });
    const user = users[0];
    const match = await bcrypt.compare(oldPassword, user.password_hash);
    if (!match) return res.status(401).json({ error: "Λάθος τρέχον password" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password_hash = ? WHERE user_id = ?', [hashedPassword, userId]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Σφάλμα διακομιστή' });
  }
});




const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
