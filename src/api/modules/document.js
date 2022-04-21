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
