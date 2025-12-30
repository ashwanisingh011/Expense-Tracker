import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'
})

// Interceptor to add the token to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export default api;