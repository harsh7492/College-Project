const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '7492',
    database: process.env.DB_NAME || 'manikarnika'
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('✅ Connected to MySQL');
    }
});

// Root route for testing
app.get('/', (req, res) => {
    res.send('✅ Backend is live!');
});

// Contact API
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = 'INSERT INTO contact (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Message received' });
    });
});

// Register API
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    const checkUser = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUser, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const insertUser = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(insertUser, [name, email, password], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to register user' });
            }
            res.status(200).json({ message: 'Registration successful' });
        });
    });
});

// ✅ Login API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (results.length > 0) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
