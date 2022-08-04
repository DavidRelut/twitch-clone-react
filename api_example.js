import axios from 'axios';

let api = axios.create({
  headers: {
    "Client-ID": 'YOUR_CLIENT_ID',
    "Authorization": 'Bearer YOUR_API_KEY',
  },
});

export default api;