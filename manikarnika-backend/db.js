// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // your MySQL username
  password: '7492',         // your MySQL password
  database: 'manikarnika'  // your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;

//mongoose.connect("mongodb://127.0.0.1/27017/roshan")