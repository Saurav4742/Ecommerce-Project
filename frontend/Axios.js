import axios from "axios";

// export const BASE_URL = "http://192.168.0.105:8000";
export const BASE_URL="http://192.168.100.100:8000";

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default client;
