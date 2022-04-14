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
