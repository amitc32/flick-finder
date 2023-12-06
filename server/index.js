const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3004;
const router = express.Router();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
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


app.use('/api/flickfinder', router);

router.route('/users')
  .get((req, res) =>{
    const query = 'SELECT * FROM users';

    connection.query(query, (error, results) =>{
      if(error) {
        res.status(500).send('Error executing query');
        return;
      }
      console.log('success')
      res.json(results);
    });
  })

  router.route('/:movieID/movie')
  .get((req, res) =>{
    const movieID = req.params.movieID;
    const query =  `
      SELECT movieName, coverImage
      FROM movie
      WHERE movieID = '${movieID}'
    `;

    connection.query(query, (error, results) =>{
      if(error) {
        res.status(500).send('Error executing query');
        return;
      }
      console.log('success')
      res.json(results);
    });
  })

router.route('/movie/:movieID/actors').get((req, res) => {
    const movieID = req.params.movieID;
  
    const query = `
    SELECT actor.actorID, actor.actorName
    FROM actor
    JOIN movieactor ON actor.actorID = movieactor.actorID
    WHERE movieactor.movieID = ${movieID};
    
    `
    
  
    connection.query(query, [movieID], (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error.stack);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.json(results);
    });
  });


  router.route('/login')
  .post((req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    const query = 'SELECT * FROM users WHERE email = ? AND Pwd = ?;';
    connection.query(query, [email, password], (error, results) => {
      if (error) {
        console.log('Error executing query:', error);
        return res.status(500).json({ message: 'Error executing query' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      res.json({ message: 'Login successful' });
    });
  });


  router.route('/register')
  .post((req, res) => {
    const { username, email, password, confirmPassword, displayName } = req.body;

    if (!username || !email || !password || !confirmPassword || !displayName) {
      return res.status(400).send('Please fill out all fields');
    }

    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    // Insert the user into the users table
    const insertQuery = 'INSERT INTO users (username, email, Pwd, displayName) VALUES (?, ?, ?, ?);';

    connection.query(insertQuery, [username, email, password], (insertError, insertResults) => {
      if (insertError) {
        console.error('Error inserting user:', insertError);
        return res.status(500).send('Error registering user');
      }

      console.log('User registered successfully');
      res.status(200).send('User registered successfully');
    });
  });




router.route('/:user/liked')
  .get((req, res) =>{
    const user = req.params.user
    const query =  `
      SELECT MovieId
      FROM likedmovies
      WHERE UserID = '${user}'
    `;
    connection.query(query, (error, results) =>{
      if(error) {
        res.status(500).send('Error executing query');
        return;
      }
      console.log('success')
      res.json(results);
    });
  });

  

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
});

