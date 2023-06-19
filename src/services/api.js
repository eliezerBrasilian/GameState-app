import axios from 'axios';

const api = axios.create({
  baseURL: 'https://game-state-backend.vercel.app',
});

export default api;
