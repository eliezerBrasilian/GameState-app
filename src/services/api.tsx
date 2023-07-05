import axios from 'axios';
import {strings} from '../assets/strings';

const url: string = strings.url_on;
const api = axios.create({
  baseURL: url,
});

export default api;
