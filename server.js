require('dotenv').config(); // load env variables from .env file

// server.js
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt'); // importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); // importing json web token 
const connectDB = require('./dbConnect');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // use json from the body it's getting passed in req
app.use(express.static(path.join(__dirname, 'public'))); // servign static files from 'public' directory

// connecting to the database
connectDB();

// testing if our server is working fine using rest
// GET http://localhost:8080/posts
const posts = [
  {
    username: 'dan',
    title: 'My First Post'
  },
  {
    username: 'carlos',
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


