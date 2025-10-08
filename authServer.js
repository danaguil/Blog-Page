// server only for authentication and issuing token, login, logout and refresh
require('dotenv').config(); // load env variables from .env file

// server.js
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt'); // importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); // importing json web token 

// Create an Express application
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // use json from the body it's getting passed in req
app.use(express.static(path.join(__dirname, 'public'))); // servign static files from 'public' directory


// Mock user storage (in production, use a database)
const users = [
  // Example user - in production, passwords should already be hashed in the database
  { 
    id: 1, 
    username: 'testuser', 
    password: '$2b$10$example.hashed.password' // This would be a real bcrypt hash
  }
];

app.get('/users', (req, res) => {
  res.json(users); // returning the list of users
})

// async b/c bcrypt lib is async
app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // hashing the password with the salt
    console.log(hashedPassword);

    const user = {name: req.body.name, password: hashedPassword};
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
})

// better to store refresh tokens in db or redis
let refreshTokens = []; // store refresh tokens in memory, in production use db or redis

// creating a new token
// POST http://localhost:4000/token
app.post('/token', (req, res) => {
  const refreshToken = req.body.token;

  // checking if token exist
  if(refreshToken == null) return res.sendStatus(401);
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403); // if token is not valid

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name }); // creating new access token
    res.json({ accessToken: accessToken }); // sending new access token
})
})

// delete those refresh tokens when user logs out
app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token); // remove the token from the array
  res.sendStatus(204); // successfully deleted
});

// User login endpoint. making sure nobody can access
app.post('/login', async (req, res) => {
  try {
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
  

    // serializing the user using the jwt
    const accessToken = generateAccessToken(user) // gen access token
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET); // creating resfresh token, adding same user to token
    refreshTokens.push(refreshToken) // saving refresh token

    res.json({ 
      accessToken: accessToken, refreshToken: refreshToken
      //user: { id: user.id, username: user.username }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '40s' });
}

app.listen(PORT);
