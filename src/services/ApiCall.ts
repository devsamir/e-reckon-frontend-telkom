import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_URL;

const ApiCall = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true,
});

export default ApiCall;
