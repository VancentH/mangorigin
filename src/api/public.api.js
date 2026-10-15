import axios from 'axios';
import store from '@/store'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER_URL,
  timeout: Number(process.env.VUE_APP_API_TIMEOUT),
})

/* eslint-disable */
instance.interceptors.request.use(
  config => {
    store.dispatch("load");
    return config;
  },
  error => {
    store.dispatch("complete");
    return Promise.reject(error);
  });

instance.interceptors.response.use(
  response => {
    store.dispatch("complete");
    return response;
  },
  error => {
    console.log(error)
    switch (error.response.status) {
      case 400:
        // Duplicate username
        break;
      case 401:
        break
      case 403:
        break
      case 404:
        break
      default:
    }
    store.dispatch("complete");
    return Promise.reject(error.response.data);
  });
/* eslint-enable */

export default instance
