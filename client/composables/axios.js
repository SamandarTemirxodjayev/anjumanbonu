import axios from "axios";

const API_URL = "https://localhost/api/";
let accessToken = null;
let headers = {
  "Content-Type": "application/json",
};

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("token");
  headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

export const $host = axios.create({
  baseURL: API_URL,
  headers: headers,
});

$host.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      navigateTo("/logout");
      return;
    }
    return Promise.reject(error);
  },
);
