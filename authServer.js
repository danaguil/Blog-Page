// server only for authentication and issuing token, login, logout and refresh
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

// better to store refresh tokens in db or redis
let refreshTokens = []; // store refresh tokens in memory, in production use db or redis

// creating a new token
// POST http://localhost:4000/token
app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
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
    const accessToken = generateAccessToken(user) // gen access token
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, refreshToken.push(refreshToken)); // creating resfresh token, adding same user to token


    res.json({ 
      accessToken: accessToken, refreshToken: refreshToken
      //user: { id: user.id, username: user.username }
    });
    /*
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
    */
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}





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