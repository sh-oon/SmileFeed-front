import axios from "axios";

axios.defaults.withCredentials = true;
export const apiRequest = async (
  method,
  url,
  param,
  Accept = "application/json"
) => {
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

axios.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        const res = await apiRequest("post", "/v1/api/auth/refresh", {
          refreshToken: refreshToken,
        });
        if (res.status === 200) {
          setCookie("accessToken", res.data.data.accessToken, 30, "m");
          setCookie("refreshToken", res.data.data.refreshToken, 7, "d");
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + getCookie("accessToken");
          return axios(originalRequest);
        } else if (res.status === 401) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const setCookie = (name, value, exp = 5, unit = "d") => {
  const date = new Date();
  if (unit === "d") date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  if (unit === "h") date.setTime(date.getTime() + exp * 60 * 60 * 1000);
  if (unit === "m") date.setTime(date.getTime() + exp * 60 * 1000);
  if (unit === "s") date.setTime(date.getTime() + exp * 1000);

  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

export const deleteCookie = (name) => {
  const date = new Date("2020-01-01").toUTCString();
  document.cookie = name + "=; expires=" + date;
};
