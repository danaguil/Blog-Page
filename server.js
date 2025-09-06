// server.js
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public'))); // servign static files from 'public' directory

// serve login.html at "/"
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('home', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// telling express if someone is logged in
app.get('/api/isLoggedIn', (_req, res) => {
  if(req.session && req.session.user) {
    res.json({ user: true }); // logged in
  } else {
    res.json({ user: null }); // not logged in
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
