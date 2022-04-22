import axios from "@api/axios.js";

export function searchAll(query) {
  return axios({
    url: "/search/all",
    method: "get",
    params: query,
  });
}
