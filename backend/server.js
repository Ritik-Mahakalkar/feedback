const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'feedback'
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log(' MySQL connected.');
  });

  // Ensure table exists
db.query(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Table creation error:', err);
  });
  
  // POST /feedback
  app.post('/feedback', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    db.query(
      'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)',
      [name, email, message],
      (err) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.status(201).json({ message: 'Feedback submitted successfully!' });
      }
    );
  });
  
// Start server
app.listen(5000, () => {
  console.log(' Server running at http://localhost:5000');
});
