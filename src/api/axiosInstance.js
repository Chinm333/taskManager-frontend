import axios from "axios";

const axiosInstance = axios.create({
    baseURL:process.env.REACT_APP_API_BASE_URL
});

axiosInstance.interceptors.response.use(
    (res)=>res,
    (err)=>{
        console.error(err.response?.data?.message || "API Error");
        return Promise.reject(err);
    }   
)

export default axiosInstance;