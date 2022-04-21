import axios from "@api/axios.js";

export function getUserDimension(query) {
  return axios({
    url: "/dimension",
    method: "get",
    params: query,
  });
}

export function addUserDimension(data) {
  return axios({
    url: "/dimension",
    method: "post",
    data: data,
  });
}

export function getPartDimension() {
  return axios({
    url: "/dimension/part",
    method: "get",
  });
}