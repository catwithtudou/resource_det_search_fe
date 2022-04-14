import axios from "@api/axios.js";

export function dTestGet(query) {
  return axios({
    url: "/testGet",
    method: "get",
    params: query,
  });
}

export function dTestPost(data) {
  return axios({
    url: "/testPost",
    method: "post",
    data: data,
  });
}
