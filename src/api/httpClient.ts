import axios from '../../node_modules/axios';

const BASE_URL = process.env.BASE_URL;
const httpClient = axios.create({
  
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;