import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com/orgs/'
});

export default api;
