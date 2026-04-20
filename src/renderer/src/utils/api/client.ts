import axios from "axios";
import {resume} from "react-dom/server";
import i18n from "i18next";

export const SERVER_CONFIGS = {
  production: import.meta.env.VITE_API_PRODUCTION_URL || "https://164.92.241.92:8080/api",
  local: import.meta.env.VITE_API_LOCAL_URL || "http://localhost:8081/api"
};

const apiClient = axios.create({
  baseURL: localStorage.getItem('base_url') || SERVER_CONFIGS.production,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});

apiClient.interceptors.request.use(
    (config) => {

      const currentUrl = localStorage.getItem('base_url');
      if (currentUrl) config.baseURL = currentUrl;

      const token = localStorage.getItem('token');
      if(token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const currentLanguage = i18n.language || 'en';
      const lang = currentLanguage.split('-')[0];
      config.params = {
        locale: lang,
        ...config.params,
      };

      return config;
    },
    (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const {response} = error;
      if(response){
        switch (response.status){
          case 401:
            console.error('Error 401; Invalid login session');
            break;
          case 403:
            console.error('Error 403; Invalid user permissions');
            break;
          case 500:
            console.error('Error 500; Internal error');
            break;
          default:
            console.error(response.data.message || 'Request failed')
        }
      }
      return Promise.reject(error)
    }
)

export default apiClient;