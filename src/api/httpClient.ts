import axios from '../../node_modules/axios';

const httpClient = axios.create({
  baseURL: 'https://server-o8if.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;