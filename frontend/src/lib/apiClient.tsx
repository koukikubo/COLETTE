// src/lib/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default apiClient;
