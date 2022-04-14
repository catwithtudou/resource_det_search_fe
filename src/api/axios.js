﻿import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  responseType: "json",
});

export default instance;
