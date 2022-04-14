import axios from "axios";
import config from "@api/config.js";

const instance = axios.create({
  baseURL: config.baseURL,
  headers: config.headers,
  timeout: config.timeout,
});

let callbacks = [];

instance.interceptors.request.use((config) => {
  return config;
}, (err) => {
  return err;
});

instance.interceptors.response.use((res) => {
  return res;
}, (err) => {
  return err;
});

export default instance;
