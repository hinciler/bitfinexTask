import axios from 'axios';
import React from 'react';
import {store} from '../store';
export const path = 'mobile/';
import {REST_ADDRESS} from 'config/constants';

const axiosInstance = axios.create({
  timeout: 0,
});
axiosInstance.interceptors.request.use((config) => {
  config.baseURL = REST_ADDRESS;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;
