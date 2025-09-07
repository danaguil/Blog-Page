/*
    Frontend controller for authentication-related actions. Such as functional commenting, liking and saving articles.
    We will check if the user is authenticated before allowing these actions.
    This will be the connection between the frontend and backend for auth-related actions.
*/

// Initialize authentication controls
async function initAuthControls() { 
    try {
        const res = await fetch('/api/isLoggedIn'); // Check if the user is logged in
        const { user } = await res.json(); // Extract user information from the response

        document.querySelectorAll('[data-requires-auth]').forEach(el => { // Select elements that require authentication
            if (!user) {
                // Guest mode: locking controlers
                el.classList.add('disabled');
                el.setAttribute('title', 'Please log in to use this feature.');
                console.log('User is not logged in');
            } else {
                // User mode: unlocking controlers
                el.classList.remove('disabled');
                el.removeAttribute('title');
                console.log('User is logged in');
            }
        });
    } catch (error) {  // Handle any errors that occur during the fetch operation
        console.error('Error checking login status:', error);
    }
    
    document.addEventListener('DOMContentLoaded', initAuthControls);
}