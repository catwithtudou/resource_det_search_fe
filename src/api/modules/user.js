import axios from "@api/axios.js";

export function userLogin(data) {
  return axios({
    url: "/user/login",
    method: "post",
    data: data,
  });
}

export function userRegister(data) {
  return axios({
    url: "/user",
    method: "post",
    data: data,
  });
}

export function userInfo(query) {
  return axios({
    url: "/user",
    method: "get",
    params: query,
  });
}

export function userInfoUpdate(data) {
  return axios({
    url: "/user",
    method: "put",
    data: data,
  });
}


export function helloWorld(query) {
  return axios({
    url: "/test",
    method: "get",
    params: query,
  });
}
