import axios from "@api/axios.js";

export function getUserAllResource(query) {
  return axios({
    url: "/resource/user/all",
    method: "get",
    params: query,
  });
}

export function getUserDmResource(query) {
  return axios({
    url: "/resource/user/dimension",
    method: "get",
    params: query,
  });
}

export function getUserDmDetailResource(query) {
  return axios({
    url: "/resource/info",
    method: "get",
    params: query,
  });
}

export function addLike(data) {
  return axios({
    url: "/resource/like",
    method: "put",
    data: data,
  });
}

export function getAllResource(query) {
  return axios({
    url: "/resource/all",
    method: "get",
    params: query,
  });
}

export function getPartResource(query) {
  return axios({
    url: "/resource/dimension",
    method: "get",
    params: query,
  });
}

export function getUserDocCount(query) {
  return axios({
    url: "/resource/user/all/count",
    method: "get",
    params: query,
  });
}
