const API_URL = 'http://127.0.0.1:5000'; // Replace with your backend API URL

export const loginUser = async (username, email, password) => { // Added username parameter
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }), // Send username, email, and password
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // Return the response data
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, message: 'Login failed' }; // Return error message
    }
};
