/* 
    This script handles the registration form submission
    Send req.body to the /register endpoin
*/
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! You can now log in.');
        } else {
            alert(`Registration failed: ${data.error}`);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again.');
    }
});