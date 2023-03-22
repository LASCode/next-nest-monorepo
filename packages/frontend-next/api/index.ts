import axios from "axios";

export * from './apiGetUsers';
export * from './apiGetUserById';


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/',
    responseType: 'json',
    withCredentials: false,
});