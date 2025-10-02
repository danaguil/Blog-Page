require('dotenv').config(); // load env variables from .env file

// server.js
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt'); // importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); // importing json web token 
const {mongoose} = require('mongoose'); // importing mongoose


// Create an Express application
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // use json from the body it's getting passed in req
app.use(express.static(path.join(__dirname, 'public'))); // servign static files from 'public' directory


// testing if our server is working fine using rest
// GET http://localhost:8080/posts
const posts = [
  {
    username: 'john_doe',
    title: 'My First Post'
  },
  {
    username: 'jane_smith',
    title: 'A Day in the Life'
  }
]

// adding middle ware to authenticate token for POST
app.get('/posts', authenticateToken, (req, res) => {
  // we have no access to user after authenticating the token
  // res.json(posts);

  // filtering the list of post, only return the post that belongs to the user
  res.json(posts.filter(post => post.username === req.user.name));
})


// User login endpoint. making sure nobody can access
app.post('/login', (req, res) => {
  //try {
    /*
    // Find the user
    const user = users.find(u => u.username === req.body.username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Create JWT token (don't include sensitive data like password)
    const tokenPayload = { 
      id: user.id, 
      username: user.username 
    };
    */

    // testing without db
    const username = req.body.username;
    const user = {name: username};

    /*
    const accessToken = jwt.sign(
      tokenPayload, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' } // Add expiration for security, might not need it
    );
    */

    // serializing the user using the jwt
    const accessToken = jwt.sign(
      user, 
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({ 
      accessToken: accessToken
      //user: { id: user.id, username: user.username }
    });
    /*
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
    */
});


// creating middle ware function to authenticate token for POST
// get token, verify that token/user and return
function authenticateToken(req, res, next) {
  // Getting token from header
  const authHeader = req.headers['authorization']; // have the format of bearer than token
  // if we have authHeader, then we return token
  const token = authHeader && authHeader.split(' ')[1]; // split at the space and get the token part
  // Bearer TOKEN
  if (token == null) return res.sendStatus(401); // if there is no token

  // after, we know we have a valid token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403); // if the token is no longer valid, 403: token is no longer valid
    req.user = user; // if everything is good, we will have the user in the req obj
    next(); // call the next middle ware or the actual request handler
  });
} // moving on from middleware


app.listen(PORT);




/*
// Mock user storage (in production, use a database)
const users = [
  // Example user - in production, passwords should already be hashed in the database
  { 
    id: 1, 
    username: 'testuser', 
    password: '$2b$10$example.hashed.password' // This would be a real bcrypt hash
  }
];


// serve login.html at "/"
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/home', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// User registration endpoint
app.post('/register', async (req, res) => {
  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Check if user already exists
    const existingUser = users.find(u => u.username === req.body.username);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      username: req.body.username,
      password: hashedPassword
    };
    
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


*/