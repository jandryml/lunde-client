import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const createRequest = async (data) => {
    return axios.post(`${SERVER_URL}/api/request`, data);
};

export {
    createRequest
};