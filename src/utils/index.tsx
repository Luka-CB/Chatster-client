import axios from "axios";

const url: any = import.meta.env.VITE_APP_API_URL;
const urlLocal: any = import.meta.env.VITE_APP_API_URL_LOCAL;
const nodeEnv: any = import.meta.env.VITE_APP_NODE_ENV;

export default axios.create({
  baseURL: "https://chatster-api.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
