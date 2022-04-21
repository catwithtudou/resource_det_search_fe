import axios from "axios";
import store from "@/store";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  responseType: "json",
});

instance.interceptors.request.use(function (config) {
  if (store.getters["home/getUserInfo"].token !== "") {
    config.headers["Authorization"] = `Bearer ${
      store.getters["home/getUserInfo"].token
    }`;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

export default instance;
