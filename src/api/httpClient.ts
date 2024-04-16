import axios from '../../node_modules/axios';

const BASE_URL = "https://server-o8if.onrender.com"
const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;