const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3004;

const connection = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',
  password: 'root', 
  database: 'moviedb', 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the local database as ID ' + connection.threadId);
});

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
});

