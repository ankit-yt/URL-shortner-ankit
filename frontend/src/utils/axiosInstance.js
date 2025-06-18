import axios from "axios";
const axiosInstance = axios.create({
    baseURL:"http://localhost:5000",
    timeout:10000,
    withCredentials:true,
})


// Global response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response) {
      console.error("🔴 Response Error:", {
        status: error.response.status,
        message: error.response.data?.message,
      });
    } else if (error.request) {
      console.error("🔴 No Response from server:", error.request);
    } else {
      console.error("🔴 Unexpected Error:", error.message);
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;