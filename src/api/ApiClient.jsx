import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_HOST,
});

export const apiSocket = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_WEBSOCKET,
});
