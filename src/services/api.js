import axios from 'axios';

const api = axios.create({
  baseURL: 'https://game-state-backend-4ww3.vercel.app/',
});

export default api;
