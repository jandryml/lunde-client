import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const getAllRequestTypes = async () => {
    return axios.get(`${SERVER_URL}/api/request-type`);
};

export {
    getAllRequestTypes
};