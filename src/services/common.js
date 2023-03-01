import axios from "axios";

axios.defaults.withCredentials = true;
export const apiRequest = async (method, url, param, Accept = "application/json") => {
  return axios({
    method: method,
    url: url,
    data: param,
    headers: {
      "Content-Type": "application/json",
      Accept: Accept,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
