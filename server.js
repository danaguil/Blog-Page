require('dotenv').config(); // load env variables from .env file

// server.js
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt'); // importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); // importing json web token for 

// Create an Express application
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // use json from the body it's getting passed
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



// User login endpoint
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
    
    const accessToken = jwt.sign(
      tokenPayload, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' } // Add expiration for security, might not need it
    );
    
    res.json({ 
      accessToken: accessToken,
      user: { id: user.id, username: user.username }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// creating middle ware function to authenticate token
function authenticateToken(req, res, next) {
  // Give the token from the header
  const authHeader = req.headers['authorization']; // have the format of bearer than token
  const token = authHeader && authHeader.split(' ')[1]; // split at the space and get the token part
  // Bearer TOKEN
  if (token == null) return res.sendStatus(401); // if there is no token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403); // if the token is no longer valid
    req.user = user; // if everything is good, we will have the user in the req obj
    next(); // call the next middle ware or the actual request handler
  });
} // moving on from middleware



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
