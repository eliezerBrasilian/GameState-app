import axios from 'axios';

const api = axios.create({
  baseURL: 'https://game-state-backend-4ww3.vercel.app/',
  //baseURL: 'http://localhost/',
});

export default api;
