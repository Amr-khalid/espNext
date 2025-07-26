import axios from "axios";
export const axiosClient = axios.create({
  baseURL: "https://esp32express-production.up.railway.app",
});