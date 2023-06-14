import axios from "axios";

export const baseHost = 'http://localhost:8000'
export const baseURL = `${baseHost}/api/rest/v1`
const axiosInstance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
})

export default axiosInstance