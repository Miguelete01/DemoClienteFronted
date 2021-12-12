import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:15972/api/'
});

export default axiosConfig;
