import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7081/api/', 
});

export default api;