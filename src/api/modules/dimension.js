import axios from "@api/axios.js";

export function getUserDimension(query) {
  return axios({
    url: "/dimension",
    method: "get",
    params: query,
  });
}