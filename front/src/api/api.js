import axios from "axios";
import { BASE_URL, NODE_BASE_URL } from "./url";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// export const nodeApi = axios.create({
//   baseURL: NODE_BASE_URL,
//   withCredentials: true,
//   headers: { "Content-Type": "application/json; charset=utf-8" },
// });

export default api;
