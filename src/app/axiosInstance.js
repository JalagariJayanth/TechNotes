
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://technotes-api-i2dz.onrender.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if(config.method === "post" || config.method === 'patch'){
        config.headers['Content-Type'] = "application/json"
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;
