/*
 *  Script for handling user login
 *  Send req.body to the /login endpoint
 */


// Handle form submission, from html to this
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // user inputs 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to server
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
    
    // Parse JSON response
    const data = await response.json();

    // Error handling based on response status
    if(response.ok) {
        alert('Login successful!');
    } else {
        alert(`Login failed: ${data.error}`);
    } 
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});