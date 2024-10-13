import axios from 'axios';

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

//Add base url to place the url all in one place
export const httpClient = axios.create({
    baseURL: "http://127.0.0.1:5000",
    // baseURL: process.env.APP_API_BASE_URL,
});

//Automatically add token on all the request
httpClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('userToken');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});