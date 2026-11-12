
import axios from "axios";

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000", // Use the environment variable or fallback to localhost
    timeout: 10000, // Set a timeout for requests (in milliseconds)
    headers: {
        "Content-Type": "application/json",
        // Add any other default headers you need here
    },
});

export default apiService;