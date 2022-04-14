import axios from "@api/axios.js";

export function testGet(query) {
  return axios({
    url: "/testGet",
    method: "get",
    params: query,
  });
}

export function testPost(data) {
  return axios({
    url: "/testPost",
    method: "post",
    data: data,
  });
}
