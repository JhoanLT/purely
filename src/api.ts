import axios from 'axios';

// Cambia si tu backend corre en otro host/puerto:
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});
