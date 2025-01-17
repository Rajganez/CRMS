import axios from "axios";
import { HOST } from "./constants.js";

export const clientAPI = axios.create({
  baseURL: HOST,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
//   withCredentials: true,
});
