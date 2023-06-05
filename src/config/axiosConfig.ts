import axios, { AxiosInstance } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const setDefaultAxiosAuthToken = (token: string | null) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const removeAxiosAuthToken = (axios: AxiosInstance) => {
    delete axios.defaults.headers.common['Authorization'];
}

const axiosNoAuth = (): AxiosInstance => {
    const noAuthAxios = axios.create();
    removeAxiosAuthToken(noAuthAxios);
    return noAuthAxios;
}

const multipartFormDataConfig = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
};

export { setDefaultAxiosAuthToken, axiosNoAuth, multipartFormDataConfig }