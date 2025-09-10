require('dotenv').config(); // load env variables from .env file

// server.js
const express = require('express');
const path = require('path');

const jwt = require('jsonwebtoken'); // importing json web token for authentication
app.use(express.json()); // use json from the body it's getting passed

// Create an Express application
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public'))); // servign static files from 'public' directory

// serve login.html at "/"
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/home', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Going to create a JWT token when user logs in
app.post('/login', (req, res) => {
  // Authentication Username and Password
  // input authentication login here!!! 
  const username = req.body.username; // payload
  const password = req.body.password;

  const user = { name: username };
  /* 
     Will serialize our user obj
     Needs a secret key to sign the token
          Create this in a env var, with a secret key using node crypt lib

     No exp date yet
  */
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
