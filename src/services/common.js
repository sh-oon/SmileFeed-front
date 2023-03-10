import axios from "axios";

axios.defaults.withCredentials = true;
export const apiRequest = async (method, url, param, Accept = "application/json") => {
  const accessToken = getCookie("accessToken");
  return axios({
    method: method,
    url: url,
    data: param,
    headers: {
      "Content-Type": "application/json",
      Accept: Accept,
      Authorization: accessToken ? "Bearer " + accessToken : "",
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const setCookie = (name, value, exp = 5, unit = 'd') => {
  const date = new Date();
  if(unit === 'd') date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  if(unit === 'h') date.setTime(date.getTime() + exp * 60 * 60 * 1000);
  if(unit === 'm') date.setTime(date.getTime() + exp * 60 * 1000);
  if(unit === 's') date.setTime(date.getTime() + exp * 1000);

  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export const deleteCookie = (name) => {
  const date = new Date("2020-01-01").toUTCString();
  document.cookie = name + "=; expires=" + date;
}