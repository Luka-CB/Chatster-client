import axios from "axios";

const url: any = import.meta.env.VITE_APP_API_URL;

export default axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
